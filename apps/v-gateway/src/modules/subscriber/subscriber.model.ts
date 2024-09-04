import { Schema, Document } from "mongoose";

const SubscriberSchema = new Schema({
    name: { type: String, trim: true, maxLength: 25 },
    email: { type: String, unique: true, required: true }
}, {
    timestamps: true
});

export { SubscriberSchema }

export interface Subscriber extends Document {
    name: string,
    email: string
}