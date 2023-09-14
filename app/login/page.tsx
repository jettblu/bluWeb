import type { NextPage } from "next";
import Head from "next/head";
import LoginCard from "../../components/auth/LoginCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Create or access your profile.",
};

const Login: NextPage = () => {
  return (
    <div className="dark:text-white">
      <div className="max-w-2xl mx-auto h-screen">
        <div className="h-[20%]"></div>
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
