import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import Header from "@/components/Header";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Header session={session} />
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
