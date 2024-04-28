import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <LoaderCircle className="animate-spin h-10 w-10" />
    </div>
  );
}
