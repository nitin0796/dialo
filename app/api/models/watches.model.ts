import mongoose, { Document } from "mongoose";

interface IWatches extends Document {
  image: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const WatchesSchema = new mongoose.Schema<IWatches>(
  {
    image: { type: String, required: [true, "Provide Image First"] },
    name: { type: String, required: [true, "Enter the product name"] },
    price: { type: Number, required: [true, "Enter the product price"] },
    link: { type: String, required: [true, "Enter the product Link"] },
    description: {
      type: String,
      required: [true, "Enter the product description"],
    },
  },
  { timestamps: true },
);

const WatchesModel =
  mongoose.models.Watches || mongoose.model("Watches", WatchesSchema);

export default WatchesModel;
