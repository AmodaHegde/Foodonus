import { Schema, model } from 'mongoose';

const RequestSchema = new Schema({
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default model('Request', RequestSchema);
