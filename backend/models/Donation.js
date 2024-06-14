import { Schema, model } from 'mongoose';

const DonationSchema = new Schema({
  donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default model('Donation', DonationSchema);
