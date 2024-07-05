import Messages from "@/components/dasboard/Messages";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-messages || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBMessagesPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Messages />
      </main>
    </>
  );
}
