import { connect, model, Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectString = process.env.DATABASE_URL as string;

connect(connectString).then(() => {
  console.log(`\x1b[92mSuccessfully connected to the database. \x1b[0m`);
}).catch(() => {
  console.log(`\x1b[91mAn error occurred while connecting to database. \x1b[0m`);
});

const CoffeeSchema = new Schema({
  name: { type: String, required: true },
  tags: { type: Array<String>, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

export const coffees = model("Coffee", CoffeeSchema);