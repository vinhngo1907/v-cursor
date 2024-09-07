import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { userAnalysisDto } from '@libs/v-dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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
  analysis: userAnalysisDto;
}

export const UsersSchema = SchemaFactory.createForClass(User);