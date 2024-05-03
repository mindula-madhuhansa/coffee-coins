import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

import ProfileInfoForm from "@/components/ProfileInfoForm";
import { authOptions } from "@/utils/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import { Donation, DonationModel } from "@/models/Donation";
import { ArrowRightIcon } from "lucide-react";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const email = session.user?.email;

  await mongoose.connect(process.env.MONGODB_URI!);

  const profileInfoDoc = JSON.parse(
    JSON.stringify(await ProfileInfoModel.findOne({ email }))
  );

  const donations: Donation[] = await DonationModel.find({
    paid: true,
    email: email,
  });
  const total = donations.reduce((current, d) => current + d.amount * 3, 0);

  return (
    <div className="px-6 mt-4">
      <ProfileInfoForm profileInfo={profileInfoDoc} />

      <div className="bg-yellow-300/50 border-2 border-yellow-400 p-4 rounded-xl flex items-center justify-between gap-2 mt-4">
        <p className="font-semibold">
          Total money recieved: <span className="text-xl">${total | 0}</span>
        </p>

        <a
          href="/"
          className="bg-yellow-400 px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>Request a payout</span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}
