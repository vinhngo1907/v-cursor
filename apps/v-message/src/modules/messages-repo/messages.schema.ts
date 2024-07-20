import { HydratedDocument } from "mongoose";
import { messageAnalysisDto } from 'micro-dto';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ type: String })
  login: string;

  @Prop({ type: String })
  user_id: string;

  @Prop({ type: String })
  message: string;

  @Prop({ type: String })
  room_id: string;

  @Prop({ type: Boolean })
  active: boolean;

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Object })
  analysis?: messageAnalysisDto;
}

export const MessageSchema = SchemaFactory.createForClass(Message);