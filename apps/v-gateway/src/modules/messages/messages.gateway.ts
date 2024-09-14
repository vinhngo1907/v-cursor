import { Kafka, Producer, Consumer, KafkaMessage } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import {
    UseGuards,
    Logger,
    OnModuleInit,
    OnModuleDestroy,
} from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { MessageWebDto } from '@libs/v-dto';

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
}
