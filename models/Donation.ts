import { Schema, model, models } from "mongoose";

export type Donation = {
  email: string;
  amount: number;
  crypto: "BTC" | "ETH" | "LTC";
  name: string;
  message?: string;
  paid: boolean;
};

const DonationSchema = new Schema<Donation>(
  {
    email: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
    },
    crypto: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => ["BTC", "ETH", "LTC"].includes(v),
      },
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const DonationModel =
  models?.Donation || model<Donation>("Donation", DonationSchema);
