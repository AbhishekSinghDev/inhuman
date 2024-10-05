// api/clerk/webhook

import { ClerkResponse } from "@/lib/type";
import { db } from "@/server/db";

export const POST = async (req: Request) => {
  const { data }: { data: ClerkResponse } = await req.json();

  const emailAddress = data.email_addresses[0]?.email_address;
  const firstName = data.first_name;
  const lastName = data.last_name;
  const imageUrl = data.image_url;
  const id = data.id;

  await db.user.create({
    data: {
      id: id,
      emailAddress: emailAddress as string,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
    },
  });

  return new Response("Webhook received", { status: 200 });
};
