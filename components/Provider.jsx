"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

export const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
