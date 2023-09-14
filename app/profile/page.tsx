"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { logout } from "../../src/helpers/auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Review your account information and logout.",
};

const Profile: NextPage = () => {
  const [email, setEmail] = useState();
  const router = useRouter();
  const params = {
    email: email,
  };
  async function handleLogout() {
    try {
      // try to logout
      await logout();
      // redirect to homepage
      router.push("/");
    } catch (e) {
      // adding events failed. notfy user.
      toast.error("Unable to logout.");
    }
  }

  return (
    <div className="dark:text-white text-xl">
      <div className="max-w-2xl mx-auto h-screen">
        <div className="h-[20%]"></div>
        <h1 className="font-bold text-2xl mb-4">Profile</h1>
        <p className="text-gray-800 dark:text-gray-200">
          This page will provide information about your account.
        </p>
        <div
          className="px-4 py-2 border-blue-400 border font-semibold rounded-lg w-fit my-4 hover:cursor-pointer hover:text-red-500"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
