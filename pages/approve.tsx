import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import { handleApprove } from "../src/authUtils/jwt";

const Approve: NextPage = () => {
  const router = useRouter();

  // get asset price on page load
  useEffect(() => {
    // default network ticker to ethereum ticker
    let email: string | null = null;
    let code: string | null = null;
    console.log(router.query);
    // pull network ticker from route
    if (typeof router.query["code"] == "string") {
      code = router.query["code"];
    }
    // pull token ticker from route
    if (router.query["email"] && typeof router.query["email"] == "string") {
      email = router.query["email"];
    }
    if (!email || !code) {
      return;
    }
    handleApprove(email, code).then((approved) => {
      if (approved) {
        router.push("/");
      } else {
        toast.error("Unable to approve login request. Link may be expired");
      }
    });
  }, [router.isReady]);

  return (
    <div className="dark:text-white">
      <Head>
        <title>Approve Login</title>
        <meta name="description" content="Verify login request." />
      </Head>
      <div className="max-w-2xl mx-auto h-screen">
        <div className="h-[20%]"></div>
        <p>Approving login...</p>
        <Toaster />
      </div>
    </div>
  );
};

export default Approve;
