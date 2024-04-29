import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

import ProfileInfoForm from "@/components/ProfileInfoForm";
import { authOptions } from "@/utils/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";

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

  return (
    <div className="px-6">
      <ProfileInfoForm profileInfo={profileInfoDoc} />
      <div>donation list...</div>
    </div>
  );
}
