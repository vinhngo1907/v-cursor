import { HydratedDocument } from "mongoose";
import { messageAnalysisDto } from 'micro-dto';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ type: String, required: true, unique: true })
  login: string;
  
  @Prop({ type: String, required: true, unique: true })
  email: string;
  
  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  salt: string;

  @Prop({ type: Boolean })
  active: boolean;

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Object })
  analysis: messageAnalysisDto;
}

export const MessageSchema = SchemaFactory.createForClass(Message);