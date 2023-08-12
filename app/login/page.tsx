import type { NextPage } from "next";
import Head from "next/head";
import LoginCard from "../../components/auth/LoginCard";

const Login: NextPage = () => {
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
