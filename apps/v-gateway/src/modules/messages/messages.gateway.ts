import { Kafka, Producer, Consumer, KafkaMessage } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import {
    UseGuards,
    Logger,
    OnModuleInit,
    OnModuleDestroy,
} from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { MessageWebDto } from '@libs/v-dto';
import { JwtSocketGuard } from 'src/infrastructure/jwt/guard/jwt-socket.guard';

@WebSocketGateway()
export class MessagesGateway implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka; // Declare kafka as a class property
    private producer: Producer; // Declare producer as a class property
    private consumer: Consumer; // Declare consumer as a class property

    constructor(
        private readonly messagesService: MessagesService,
        private readonly configService: ConfigService,
    ) { }

    private readonly logger = new Logger(MessagesGateway.name);


    // web socket
    @WebSocketServer() server;

    // connection to the kafka message broker at the moment of initialization
    async onModuleInit() {
        try {
            // Initialize Kafka
            this.kafka = new Kafka({
                clientId: 'api-gateway',
                brokers: [this.configService.get<string>('KAFKA_URI')],
                sasl: {
                    mechanism: this.configService.get<string>('KAFKA_MECHANISM'),
                    username: this.configService.get<string>('KAFKA_USER'),
                    password: this.configService.get<string>('KAFKA_PASS'),
                } as any,
            });

            // Initialize producer and consumer
            this.producer = this.kafka.producer();
            this.consumer = this.kafka.consumer({
                groupId: this.configService.get<string>('KAFKA_READY_MESSAGE_GROUP'),
            });

            // Connect producer
            await this.producer.connect();

            // Connect and subscribe consumer
            await this.consumer.connect();
            await this.consumer.subscribe({
                topic: this.configService.get<string>('KAFKA_READY_MESSAGE_TOPIC'),
                fromBeginning: true,
            });

            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    this.receiveReadyMessage(message);
                },
            });
        } catch (error) {
            this.logger.error(error);
        }
    }

    // Disconnect Kafka producer and consumer in onModuleDestroy
    async onModuleDestroy() {
        try {
            await this.producer.disconnect();
            await this.consumer.disconnect();
        } catch (error) {
            this.logger.error(error);
        }
    }

    receiveReadyMessage(kafkaMessage: KafkaMessage) {
        try {
            const messageValue: MessageWebDto = JSON.parse(kafkaMessage.value.toString());
            this.server.to(messageValue.room_id).emit('message', messageValue);
        } catch (error) {
            this.logger.error(error);
        }
    }

    @UseGuards(JwtSocketGuard)
    @SubscribeMessage('message')
    async onMessage(@ConnectedSocket() client: any, @MessageBody() data: any) {
        try {
            const { uuid, message, room_id } = data;
            const { id: userId } = client.handshake.user;
            const rawMessage: MessageWebDto = {
                uuid,
                message,
                room_id,
                user_id: userId,
                created_at: new Date(),
            };
            await this.producer.send({
                topic: this.configService.get<string>('KAFKA_RAW_MESSAGE_TOPIC'),
                messages: [
                    { key: room_id, value: JSON.stringify(rawMessage), },
                ],
            });
        } catch (error) {
            this.logger.error(error);
        }
    }

    @UseGuards(JwtSocketGuard)
    @SubscribeMessage('joinPrivateRoom')
    async joinPrivateRoom(@ConnectedSocket() client: any, @MessageBody() data: any) {
        try {
            const { userId: secondId } = data;
            const { id: currentId } = client.handshake.user;
            const roomData = await this.messagesService.getPrivateRoom({
                userIds: [secondId, currentId]
            });

            const roomUsers = await this.messagesService.getUsersByIds({
                ids: [secondId, currentId]
            });

            const roomId = roomData?.room?.id;

            client.join(roomId);
            client.emit('joinPrivateRoom', {
                users: roomUsers?.users,
                room: roomData?.room,
                messages: roomData?.messages
            });
        } catch (error) {
            this.logger.error(error);
        }
    }
}
