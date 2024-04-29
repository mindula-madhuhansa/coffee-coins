"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";

export async function saveProfile(formData: FormData) {
  await mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { username, displayName, bio, coverUrl, avatarUrl } =
    Object.fromEntries(formData);

  const profileInfoDoc = await ProfileInfoModel.findOne({
    email: session.user?.email,
  });

  if (profileInfoDoc) {
    profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
    await profileInfoDoc.save();
  } else {
    await ProfileInfoModel.create({
      email: session.user?.email,
      username,
      displayName,
      bio,
      coverUrl,
      avatarUrl,
    });
  }

  return true;
}
