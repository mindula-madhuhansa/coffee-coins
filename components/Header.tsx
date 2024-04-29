"use client";

import Link from "next/link";
import { Coffee } from "lucide-react";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto mb-8">
      <Link href="/" className="flex items-center space-x-3">
        <Coffee className="h-10 w-10" />
        <span className="hidden md:flex md:text-xl font-semibold mt-1">
          Coffee Coins
        </span>
      </Link>

      <nav className="mt-1 text-base md:text-xl space-x-8">
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="bg-yellow-400 rounded-full px-6 py-2 md:px-8 md:py-3 font-bold hover:scale-[1.02] transition-transform ease-in-out"
          >
            Sign in
          </button>
        ) : (
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center space-x-4 px-4 py-2 bg-yellow-400 rounded-full font-bold hover:scale-[1.02] transition-transform ease-in-out"
          >
            <Image
              src={session.user?.image!}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p>{session.user?.name?.split(" ")[0]}</p>
          </button>
        )}
      </nav>
    </header>
  );
}
