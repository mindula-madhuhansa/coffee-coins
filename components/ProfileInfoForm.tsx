"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { saveProfile } from "@/actions/profileInfoActions";
import { ProfileInfo } from "@/models/ProfileInfo";
import UploadButton from "@/components/UploadButton";

export default function ProfileInfoForm({
  profileInfo,
}: {
  profileInfo: ProfileInfo | null;
}) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

  async function handleSaveProfile(formData: FormData) {
    await saveProfile(formData);

    toast.success("Profile updated successfully");
  }

  return (
    <form action={handleSaveProfile}>
      <div className="relative border bg-gray-100 rounded-lg h-64 mb-16">
        <Image
          src={coverUrl || ""}
          alt="Cover"
          width={1024}
          height={1024}
          className="object-cover object-center w-full h-full rounded-lg"
        />
        {/* Avatar */}
        <div className="absolute -bottom-12 left-4 size-24 rounded-lg">
          <Image
            src={avatarUrl || ""}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-lg h-24 w-24 object-cover"
          />
          <div className="absolute bottom-1 right-1">
            <UploadButton onUploadComplete={setAvatarUrl} />
          </div>
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
        </div>

        {/* Cover */}
        <div className="absolute bottom-4 right-4">
          <UploadButton label="Change Cover" onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="usernameInput" className="input-label">
            Username:{" "}
          </label>
          <input
            name="username"
            id="usernameInput"
            type="text"
            placeholder="username"
            defaultValue={profileInfo?.username}
          />
        </div>
        <div>
          <label htmlFor="displayNameInput" className="input-label">
            Display name:{" "}
          </label>
          <input
            name="displayName"
            id="displayNameInput"
            type="text"
            placeholder="display name"
            defaultValue={profileInfo?.displayName}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bioInput" className="input-label">
          Bio:{" "}
        </label>
        <textarea
          name="bio"
          id="bioInput"
          placeholder="bio"
          defaultValue={profileInfo?.bio}
        />
      </div>
      <div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded-lg font-semibold text-lg bg-yellow-400 hover:bg-yellow-300"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}
