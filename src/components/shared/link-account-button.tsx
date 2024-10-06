"use client";

import React from "react";
import { Button } from "../ui/button";
import { getAurinkoAuthUrl } from "@/lib/aurinko";

const LinkAccountButton = () => {
  const linkAccount = async () => {
    try {
      const authUrl = await getAurinkoAuthUrl({ type: "Google" });

      location.href = authUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return <Button onClick={linkAccount}>Link Account</Button>;
};

export default LinkAccountButton;
