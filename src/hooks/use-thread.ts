import { api } from "@/trpc/react";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

import { atom, useAtom } from "jotai";

export const threadIdAtom = atom<string | null>(null);

const useThread = () => {
  const { data: accounts } = api.account.getAccounts.useQuery();
  const [accountId] = useLocalStorage("accountId", "");
  const [tab] = useLocalStorage("inhuman-tab", "");
  const [done] = useLocalStorage("inhuman-don", false);
  const [threadId, setThreadId] = useAtom(threadIdAtom);

  const {
    data: threads,
    isFetching,
    isPending,
    refetch,
  } = api.account.getThreads.useQuery(
    {
      accountId,
      tab,
      done,
    },
    {
      enabled: !!accountId && !!tab,
      placeholderData: (e) => e,
      refetchInterval: 500,
    },
  );

  return {
    threads,
    isFetching,
    refetch,
    accountId,
    threadId,
    isPending,
    setThreadId,
    account: accounts?.find((e) => e.id === accountId),
  };
};

export default useThread;
