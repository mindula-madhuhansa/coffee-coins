"use server";

import md5 from "md5";
import mongoose from "mongoose";
import axios from "axios";

import { DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";

export async function createDonation(
  formData: FormData
): Promise<string | false> {
  const { amount, crypto, name, message, email } = Object.fromEntries(formData);

  mongoose.connect(process.env.MONGODB_URI!);

  //   Save details to DB
  const donationDoc = await DonationModel.create({
    email,
    amount,
    crypto,
    name,
    message,
  });

  const profileInfoDoc = await ProfileInfoModel.findOne({ email });

  if (!profileInfoDoc) {
    return false;
  }

  //   Create an invoice from cryptomus
  const data = {
    amount: (parseInt(amount as string) * 3).toString() + ".00",
    currency: "USD",
    order_id: donationDoc._id.toString(),
    to_currency: crypto,
    url_callback: `https://4a73-2402-d000-8104-1854-f580-4b50-3273-d0d0.ngrok-free.app/callback?id=${donationDoc._id}`,
    url_return: `${process.env.NEXTAUTH_URL}/${profileInfoDoc.username}`,
    url_success: `${process.env.NEXTAUTH_URL}/${profileInfoDoc.username}?success=1`,
  };

  const merchant = process.env.CRYPTOMUS_MERCHANT_ID!;
  const sign = md5(btoa(JSON.stringify(data)) + process.env.CRYPTOMUS_API_KEY!);

  try {
    console.log(data);

    const res = await axios.post(process.env.CRYPTOMUS_API_ENDPOINT!, data, {
      headers: {
        merchant,
        sign,
      },
    });

    return res.data.result.url;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
  }

  return false;
}
