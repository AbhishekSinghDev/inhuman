// /api/aurinko/callback

import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { waitUntil } from "@vercel/functions";
import axios from "axios";

export const GET = async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ message: "Unauthorized !" });

  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  if (status != "success")
    return NextResponse.json(
      { message: "Failed to link account !" },
      { status: 400 },
    );

  const code = params.get("code");
  if (!code)
    return NextResponse.json(
      { message: "No code provided !" },
      { status: 400 },
    );

  const res = await exchangeCodeForAccessToken(code);
  if (!res.accessToken)
    return NextResponse.json({
      message: "Failed to exhange code for access token.",
    });

  const accountDetails = await getAccountDetails(res.accessToken);
  console.log("Account Details: ", accountDetails);

  // upsert = if i have a user with this accountId then update and if not then create
  await db.account.upsert({
    where: {
      id: res.accountId.toString(),
    },
    update: {
      accessToken: res.accessToken,
    },
    create: {
      id: res.accountId.toString(),
      userId: userId,
      emailAddress: accountDetails.email,
      name: accountDetails.name,
      accessToken: res.accessToken,
    },
  });

  // trigger initial sync endpoint

  waitUntil(
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/initial-sync`, {
        accountId: res.accountId.toString(),
        userId,
      })
      .then((response) => {
        console.log("Intial sync triggered: ", response.data);
      })
      .catch((err) => {
        console.error("Failed to trigger initial sync: ", err);
      }),
  );

  return NextResponse.redirect(new URL("/mail", req.url));
};
