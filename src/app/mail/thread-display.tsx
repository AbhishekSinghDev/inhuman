"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useThread from "@/hooks/use-thread";
import {
  Archive,
  ArchiveX,
  Clock,
  MoreVerticalIcon,
  Trash2,
} from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import EmailDisplay from "./email-display";

const ThreadDisplay = () => {
  const { threadId, threads } = useThread();
  const thread = threads?.find((v) => v.id === threadId);

  //   if (!thread) return <></>;

  return (
    <div className="flex h-full flex-col">
      {/* button row */}
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled={!thread}>
            <Archive className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled={!thread}>
            <ArchiveX className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled={!thread}>
            <Trash2 className="size-4" />
          </Button>
        </div>
        <Separator orientation="vertical" className="ml-2" />
        <Button className="ml-2" variant="ghost" size="icon" disabled={!thread}>
          <Clock className="size-4" />
        </Button>

        <div className="item-center ml-auto flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="ml-2"
                variant="ghost"
                size="icon"
                disabled={!thread}
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Star thread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      {thread ? (
        <div className="flex flex-1 flex-col overflow-scroll">
          <div className="flex items-center p-4">
            <div className="flex items-center gap-4 text-sm">
              <Avatar>
                <AvatarImage alt="avatar" />
                <AvatarFallback>
                  {thread.emails[0]?.from.name
                    ?.split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">
                  {thread.emails[0]?.from.name}
                  <div className="line-clamp-1 text-xs">
                    {thread.emails[0]?.subject}
                  </div>
                  <div className="line-clamp-1 text-xs">
                    <span className="font-medium">Reply-To: </span>
                    {thread.emails[0]?.from.address}
                  </div>
                </div>
              </div>
            </div>

            {thread.emails[0]?.sentAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(thread.emails[0]?.sentAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex max-h-[calc(100vh-500px)] flex-col overflow-scroll">
            <div className="flex flex-col gap-4 p-6">
              {thread.emails.map((email) => {
                return <EmailDisplay key={email.id} email={email} />;
              })}
            </div>
          </div>
          <div className="flex-1"></div>
          <Separator className="mt-auto" />
          {/* Reply box */}
          Reply Box
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
};

export default ThreadDisplay;
