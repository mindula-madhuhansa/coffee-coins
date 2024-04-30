import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CoffeeIcon } from "lucide-react";

import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import DonationForm from "@/components/DonationForm";

type Props = {
  params: {
    username: string;
  };
};

export default async function User({ params }: Props) {
  const username = params.username;

  await mongoose.connect(process.env.MONGODB_URI!);

  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({
    username,
  });

  if (!profileInfoDoc) {
    return notFound();
  }

  return (
    <div className="px-6">
      <div className="w-full h-64">
        <Image
          src={profileInfoDoc.coverUrl}
          alt="Cover"
          width={2048}
          height={2048}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="flex items-end relative -top-6 md:-top-12 left-8 gap-2">
        <Image
          src={profileInfoDoc.avatarUrl}
          alt="Avatar"
          width={256}
          height={256}
          className="size-24 md:size-32 object-cover rounded-xl"
        />
        <div className="mb-2">
          <h1 className="text-xl md:text-2xl mb-1 font-bold">
            {profileInfoDoc.displayName}
          </h1>
          <h2 className="flex items-center gap-1 rounded-lg">
            <CoffeeIcon className="h-5 w-5" />
            <span className="mt-1 text font-semibold">
              / {profileInfoDoc.username}
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
          {profileInfoDoc.bio}
          <hr className="my-4" />
          <h3 className="font-semibold">Recent supporters</h3>
          <p>No recent donations</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <DonationForm email={profileInfoDoc.email} />
        </div>
      </div>
    </div>
  );
}
