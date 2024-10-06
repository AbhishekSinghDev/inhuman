import React from "react";
// import Mail from "./mail";
import dynamic from "next/dynamic";
import { ModeToggle } from "@/components/shared/toggle-theme";

const Mail = dynamic(
  () => {
    return import("./mail");
  },
  {
    ssr: false,
  },
);

const page = () => {
  return (
    <>
      <div className="absolute bottom-4 left-4">
        <ModeToggle />
      </div>
      <Mail
        defaultLayout={[20, 32, 38]}
        defaultCollapsed={false}
        navCollapsedSize={4}
      />
    </>
  );
};

export default page;
