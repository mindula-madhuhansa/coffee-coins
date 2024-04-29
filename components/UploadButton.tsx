import { PencilIcon } from "lucide-react";

import { uploadToS3 } from "@/actions/uploadActions";

type UploadButtonProps = {
  onUploadComplete?: (url: string) => void;
  label?: string;
};

export default function UploadButton({
  onUploadComplete,
  label,
}: UploadButtonProps) {
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.set("file", file);

      const res = await uploadToS3(formData);

      onUploadComplete?.(res.url as string);
    }
  }

  return (
    <>
      <label className="flex items-center gap-x-2 bg-gray-200 p-2 cursor-pointer rounded-lg shadow-md">
        <PencilIcon className="h-4 w-4" />
        {label}
        <input hidden type="file" accept="image/*" onChange={upload} />
      </label>
    </>
  );
}
