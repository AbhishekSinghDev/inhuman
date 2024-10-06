"use client";

import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { Nav } from "./nav";
import { File, Inbox, LucideIcon, Send } from "lucide-react";
import { api } from "@/trpc/react";

type Props = {
  isCollapsed: boolean;
};

type LinksArray = {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

const SideBar = ({ isCollapsed }: Props) => {
  const [accountId] = useLocalStorage("accountId", "");
  const [tab] = useLocalStorage<"inbox" | "draft" | "sent">(
    "inhuman-tab",
    "inbox",
  );

  const { data: inboxThreads } = api.account.getNumThread.useQuery({
    accountId: accountId,
    tab: "inbox",
  });
  const { data: draftThreads } = api.account.getNumThread.useQuery({
    accountId: accountId,
    tab: "draft",
  });
  const { data: sentThreads } = api.account.getNumThread.useQuery({
    accountId: accountId,
    tab: "sent",
  });

  const Links: LinksArray[] = [
    {
      title: "Inbox",
      label: inboxThreads?.toString(),
      icon: Inbox,
      variant: tab === "inbox" ? "default" : "ghost",
    },
    {
      title: "Draft",
      label: draftThreads?.toString(),
      icon: File,
      variant: tab === "draft" ? "default" : "ghost",
    },
    {
      title: "Sent",
      icon: Send,
      label: sentThreads?.toString(),
      variant: tab === "sent" ? "default" : "ghost",
    },
  ];

  return <Nav isCollapsed={isCollapsed} links={Links} />;
};

export default SideBar;
