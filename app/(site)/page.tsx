import { StarIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <div className="mb-10">
        <div className="flex justify-center">
          <StarIcon fill="currentColor" />
          <StarIcon fill="currentColor" />
          <StarIcon fill="currentColor" />
          <StarIcon fill="currentColor" />
          <StarIcon fill="currentColor" />
        </div>
        <p className="mt-4">Loved by 100K+ creators</p>
      </div>

      <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-gray-800">
        Fund your
        <br />
        creative work
      </h1>
      <h2 className="mt-4 mb-20 text-lg md:text-3xl text-gray-700">
        Accept support for your work. It&apos;s easier than you think.
      </h2>

      <button
        type="button"
        className="bg-yellow-400 px-10 py-4 md:px-16 md:py-6 font-bold rounded-full text-lg md:text-3xl hover:bg-yellow-300 hover:scale-[1.02] transition-transform ease-in-out"
      >
        Start my page
      </button>
    </div>
  );
}
