import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Datetime from "react-datetime";
import { BluFetch } from "../../src/helpers/BluFetch";
import ReactCodeInput from "react-code-input";
import { useBluThemeContext } from "../ThemeProvider";
import { useRouter } from "next/router";
import LoadingSpinner from "../loadingSpinner";
import { handleApprove } from "../../src/authUtils/jwt";

const LoginCard: NextPage = () => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [loadingApproval, setLoadingApproval] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendLink: boolean = false;
  const { isDark } = useBluThemeContext();
  const [code, setCode] = useState("");
  const router = useRouter();

  const params = {
    email: email,
    sendLink: sendLink,
  };
  async function handleLogin() {
    // TODO: add better email validation
    if (email.length < 3) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
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
      setSentEmail(true);
      setLoading(false);
      toast.success("Email sent!");
      return;
    } catch (e) {
      setLoading(false);
      // adding events failed. notfy user.
      toast("Unable to send varification email.");
      return;
    }
  }

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  }

  async function handleCodeChage(newCode: string) {
    setCode(newCode);
    if (newCode.length == 8) {
      setLoadingApproval(true);
      const approvedStatus: boolean = await handleApprove(email, newCode);
      if (approvedStatus) {
        toast.success("You are now logged in!");
        setLoadingApproval(false);
        router.push("/");
        return;
      } else {
        setLoadingApproval(false);
        toast.error("Unable to verify code.");
        return;
      }
    }
  }

  return (
    <div className="dark:text-white">
      <Toaster />
      <div className="max-w-2xl mx-auto flex-col border border-gray-200 dark:border-gray-700 py-4 px-2 space-y-2 hover:border-green-400 rounded-md h-[220px]">
        <p className="text-sky-400 font-semibold mb-4 text-xl">Login</p>
        <div>
          {!sentEmail && loading && (
            <div>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                Sending email...
              </p>
            </div>
          )}
          {!loading && !sentEmail && (
            <div>
              <input
                type="text"
                className="appearance-none bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-400 dark:text-white"
                id="inline-full-name"
                placeholder={"Your Email"}
                value={email}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              <div
                className="bg-sky-400 text-white text-xl px-2 py-2 rounded-lg hover:cursor-pointer my-8 text-center"
                onClick={() => handleLogin()}
              >
                Login
              </div>
            </div>
          )}
          {!loading && sentEmail && (
            <div>
              <div className="mb-10 ml-[10%] md:ml-[20%]">
                <ReactCodeInput
                  name="Your Code"
                  fields={8}
                  inputMode={"numeric"}
                  onChange={handleCodeChage}
                  disabled={loadingApproval}
                />
              </div>
              <div className="flex flex-row text-center place-content-center">
                <p className="text-md text-gray-600 dark:text-gray-300">
                  Enter your eight digit code.{" "}
                </p>
                {loadingApproval && <LoadingSpinner />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
