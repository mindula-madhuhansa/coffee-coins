import { NextRequest } from "next/server";

async function handler(req: NextRequest) {
  console.log(req);

  return Response.json(true);
}

export { handler as GET, handler as POST };
