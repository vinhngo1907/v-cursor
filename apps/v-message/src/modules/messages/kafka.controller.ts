import { Controller, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kafka, Producer, Consumer, KafkaMessage } from "kafkajs";
import { MessagesService } from "./messages.service";
import { messageAnalysisDto } from "@libs/v-dto";
import { MessageWebDto } from "@libs/v-dto";

@Controller()
export class KafkaController implements OnModuleInit, OnModuleDestroy {
	constructor(
		private configService: ConfigService,
		private messagesService: MessagesService,

	) { }

	private readonly logger = new Logger(KafkaController.name);

	private readonly kafka: Kafka = new Kafka({
		clientId: 'user_service',
		brokers: [this.configService.get<string>('KAFKA_URI')]
	});

	private readonly analysisConsumer: Consumer = this.kafka.consumer({
		groupId: this.configService.get<string>('KAFKA_ANALYSIS_MESSAGE_GROUP'),
	});

	private readonly producer: Producer = this.kafka.producer();

	async onModuleInit() {
		try {
			await this.analysisConsumer.subscribe({
				topic: this.configService.get<string>('KAFKA_ANALYSIS_MESSAGE_TOPIC'),
				fromBeginning: true,
			});
			await this.analysisConsumer.run({
				eachMessage: async ({ topic, partition, message }) => {
					this.receiveAnalysis(message)
				}
			})
		} catch (error) {
			this.logger.error(error);
		}
	}

	async onModuleDestroy() {
		try {
			await this.analysisConsumer.disconnect();
		} catch (error) {
			this.logger.error(error);
		}
	}

	async receiveAnalysis(params: KafkaMessage) {
		try {
			const messageValue: { user_id: string, analysis: messageAnalysisDto } = JSON.parse(params.value.toString());
			const { user_id: id, analysis } = messageValue;
			await this.messagesService.receiveAnalysis({ id, analysis });
		} catch (error) {
			this.logger.error(error);
		}
	}

	async receiveMessage(params: KafkaMessage) {
		try {
			const messageValue = JSON.parse(params.value.toString());
			const { uuid, message, room_id, user_id, created_at } = messageValue;
			const readyMessage: MessageWebDto = await this.messagesService.receiveMessage({
				uuid, message, room_id, user_id, created_at
			});

			await this.producer.send({
				topic: this.configService.get<string>('KAFA_READY_MESSAGE_TOPIC'),
				messages: [{
					key: room_id,
					value: JSON.stringify(readyMessage)
				}]
			})
		} catch (error) {
			this.logger.error(error);
		}
	}
}