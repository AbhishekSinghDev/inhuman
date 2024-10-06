import LinkAccountButton from "@/components/shared/link-account-button";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <LinkAccountButton />
    </HydrateClient>
  );
}
