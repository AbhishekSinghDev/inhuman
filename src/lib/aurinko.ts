"use server";

import { auth } from "@clerk/nextjs/server";
import { ServiceType } from "./type";

import axios from "axios";

export const getAurinkoAuthUrl = async ({ type }: ServiceType) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized !");

  const params = new URLSearchParams({
    clientId: process.env.AURINKO_CLIENT_ID as string,
    serviceType: type,
    scopes: "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All",
    responseType: "code",
    returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};

export const exchangeCodeForAccessToken = async (code: string) => {
  try {
    const response = await axios.post(
      `https://api.aurinko.io/v1/auth/token/${code}`,
      {},
      {
        auth: {
          username: process.env.AURINKO_CLIENT_ID as string,
          password: process.env.AURINKO_CLIENT_SECRET as string,
        },
      },
    );

    return response.data as {
      accountId: number;
      accessToken: string;
      userId: string;
      userSession: string;
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data.error || "Failed to exchange code for access token.",
      );
    }

    console.log(err);
    throw new Error("Failed to exchange code for access token.");
  }
};

export const getAccountDetails = async (accessToken: string) => {
  try {
    const response = await axios.get("https://api.aurinko.io/v1/account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data as {
      email: string;
      name: string;
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Error fetching account details: ", err.response?.data);
    } else {
      console.error("Unexpected error fetching account details: ", err);
    }

    throw err;
  }
};
