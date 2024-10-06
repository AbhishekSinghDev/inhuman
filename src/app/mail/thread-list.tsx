"use client";

import useThread from "@/hooks/use-thread";
import React, { Component, ComponentProps } from "react";

import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

import domPurify from "dompurify";
import { Badge } from "@/components/ui/badge";
import ThreadListSkeleton from "@/components/shared/threads-skeleton";

const ThreadList = () => {
  const { threads, threadId, isPending, setThreadId } = useThread();

  const groupedThreads = threads?.reduce(
    (acc, thread) => {
      const date = format(thread.emails[0]?.sentAt ?? new Date(), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(thread);

      return acc;
    },
    {} as Record<string, typeof threads>,
  );

  if (isPending) {
    return <ThreadListSkeleton />;
  }

  return (
    <div className="max-h-[calc(100vh-120px)] max-w-full overflow-y-scroll">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {Object.entries(groupedThreads ?? {}).map(([date, threads]) => {
          return (
            <React.Fragment key={date}>
              <div className="mt-5 text-xs font-medium text-muted-foreground first:mt-0">
                {date}
              </div>
              {threads.map((thread) => {
                return (
                  <button
                    key={thread.id}
                    onClick={() => setThreadId(thread.id)}
                    className={cn(
                      "relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
                      {
                        "bg-accent": thread.id === threadId,
                      },
                    )}
                  >
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">
                            {thread.emails.at(-1)?.from.name}
                          </div>
                        </div>
                        <div className={cn("ml-auto text-xs")}>
                          {formatDistanceToNow(
                            thread.emails.at(-1)?.sentAt ?? new Date(),
                            { addSuffix: true },
                          )}
                        </div>
                      </div>
                      <div className="text-xs font-medium">
                        {thread.subject}
                      </div>
                    </div>

                    <div
                      className="line-clamp-2 text-xs text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: domPurify.sanitize(
                          thread.emails.at(-1)?.bodySnippet ?? "",
                          { USE_PROFILES: { html: true } },
                        ),
                      }}
                    ></div>
                    {thread.emails[0]?.sysLabels.length && (
                      <div className="flex items-center gap-2">
                        {thread.emails[0].sysLabels.map((label) => {
                          return (
                            <Badge
                              key={label}
                              variant={getBadgeVariantFromLabel(label)}
                            >
                              {label}
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }
  return "secondary";
}

export default ThreadList;
