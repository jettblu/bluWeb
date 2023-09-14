"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { handleApprove } from "../../src/authUtils/jwt";
import { useSearchParams } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approve Login",
  description: "Approve login request.",
};

const Approve: NextPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const code = searchParams?.get("code") || "";
  handleApprove(email, code).then((approved) => {
    if (approved) {
      router.push("/");
    } else {
      console.warn("Unable to approve login request. Link may be expired");
    }
  });

  return (
    <div className="dark:text-white">
      <div className="max-w-2xl mx-auto h-screen">
        <div className="h-[20%]"></div>
        <p>Approving login...</p>
      </div>
    </div>
  );
};

export default Approve;
