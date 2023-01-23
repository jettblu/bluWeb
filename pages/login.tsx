import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { BluFetch } from "../src/helpers/BluFetch";
import LoginCard from "../components/auth/LoginCard";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [email, setEmail] = useState();

  const params = {
    email: email,
  };
  async function handleLogin() {
    // try to add new friend on server
    try {
      const res = await BluFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(params),
        timeout: 8000,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        toast.error("Unable to login.");
        return;
      }
      toast.success("Email sent!");
    } catch (e) {
      // adding events failed. notfy user.
      toast("Unable to send varification email.");
    }
  }

  return (
    <div className="dark:text-white">
      <Head>
        <title>Login</title>
        <meta name="description" content="Create or access your profile." />
      </Head>
      <div className="max-w-2xl mx-auto h-screen">
        <div className="h-[20%]"></div>
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
