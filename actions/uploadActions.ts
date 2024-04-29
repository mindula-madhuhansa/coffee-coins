"use server";

import s3Client from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(formData: FormData) {
  const file = formData.get("file") as File;

  const ext = file.type.split("/").pop();
  const newFileName = Date.now() + "." + ext!;

  const chunks = [];
  // @ts-ignore
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: newFileName,
      ACL: "public-read",
      Body: buffer,
      ContentType: file.type,
    })
  );

  const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${newFileName}`;

  return {
    newFileName,
    ext,
    url,
  };
}
