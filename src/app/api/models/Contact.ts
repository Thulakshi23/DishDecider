// src/app/models/contactModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the contact document
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
}

// Create the contact schema
const contactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// Create the contact model
const Contact = mongoose.models.ContactDetails || mongoose.model<IContact>('ContactDetails', contactSchema);

export default Contact;
