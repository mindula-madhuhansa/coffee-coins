import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CoffeeIcon } from "lucide-react";

import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { Donation, DonationModel } from "@/models/Donation";
import DonationForm from "@/components/DonationForm";
import DonationStatus from "@/components/DonationStatus";

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

  const donations: Donation[] = await DonationModel.find({
    paid: true,
    email: profileInfoDoc.email,
  });

  return (
    <div className="px-6">
      <DonationStatus />
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
          <h3 className="font-semibold mt-6 text-lg">Recent supporters</h3>
          {!donations.length ? (
            <>
              <hr className=" mb-4" />
              <p className="text-black/50 font-semibold">
                No recent donations...
              </p>
            </>
          ) : (
            donations.map((donation, index) => (
              <div key={index} className="py-4 border-t">
                <h3>
                  <span className="font-semibold">{donation.name} </span>
                  bought you {donation.amount} coffee(s).
                </h3>
                <p className="bg-gray-100 p-2 rounded-md mt-2">
                  {donation.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <DonationForm email={profileInfoDoc.email} />
        </div>
      </div>
    </div>
  );
}
