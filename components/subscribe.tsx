"use client";

import { Friend } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { BluFetch } from "../src/helpers/BluFetch";
import { isValidEmailAddress } from "../src/helpers/utils";
import { useTheme } from "next-themes";
import Modal from "./modals/modal";

const Subscribe: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [headImg, setHeadImg] = useState("");
  const [mounted, setMounted] = useState(false);

  const subCardId = `subCard`;
  const modalId = `subModal`;
  const closeButtonId = `subClose`;
  const subButtonId = "subButton";
  const subFormId = `subForm`;

  const { resolvedTheme } = useTheme();

  function handlePopUpClicked() {
    setShowModal(true);
  }

  async function addNewSubscriber() {
    const params = {
      name: name,
      email: email,
    };
    // try to add new friend on server
    try {
      const res = await BluFetch("/api/addFriend", {
        method: "POST",
        body: JSON.stringify(params),
        timeout: 8000,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        throw new Error("Bad request");
      }
      const newFriend: Friend | null = res.data.friend;
      if (newFriend) {
        toast.success("You're subscribed!");
      } else {
        throw new Error("Friend not returned by server");
      }
      setName("");
      setEmail("");
      setShowModal(false);
    } catch (e) {
      // assuming create friend operation failed because friend already exists with email
      toast("You're already subscribed!");
    }
  }

  async function handleSubscribeClicked() {
    if (!isValidEmailAddress(email)) {
      toast.error("Please make sure your email address is correct");
      return;
    }
    if (name == "") {
      toast.error("Please enter your name.");
      return;
    }
    await addNewSubscriber();
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // set head image based on theme
    switch (resolvedTheme) {
      case "light":
        setHeadImg("/icon.ico");
        break;
      case "dark":
        setHeadImg("/head.jpg");
        break;
      default:
        setHeadImg(
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
        break;
    }
  }, [resolvedTheme]);

  function handleNameChange(newName: string) {
    setName(newName);
  }

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div
        className="p-4 flex flex-row font-semibold hover:cursor-pointer hover:text-white w-fit rounded-full space-x-2 text-black bg-slate-100 dark:bg-slate-800 dark:text-white hover:bg-sky-400"
        onClick={() => handlePopUpClicked()}
      >
        <AiOutlineUser size={20} />
        <p>Subscribe</p>
      </div>

      <Modal isOpen={showModal} onRequestClose={handleModalClose}>
        {/* subscribe card */}
        <div
          id={subCardId}
          className="flex-1 bg-white dark:bg-black  mt-8 md:mt-0 rounded-xl h-fit dark:border dark:border-gray-100 md:overflow-x-hidden overflow-y-auto max-w-md"
        >
          <div className="mx-3 mt-3 text-black dark:text-white">
            <div className="flex flex-row">
              <div className="flex-1"></div>
              {
                <Link href="/">
                  <img src={headImg} alt="Jett" className="w-16 h-auto" />
                </Link>
              }
              <div className="invisible md:visible flex-grow text-gray-200 dark:text-gray-700">
                <AiOutlineClose
                  id={closeButtonId}
                  className="float-right mr-2 font-semibold hover:text-sky-400 hover:cursor-pointer"
                  size={20}
                  onClick={handleModalClose}
                />
              </div>
            </div>

            <div className="my-4">
              <div className="mb-4">
                <p className="text-gray-400 dark:text-gray-300">
                  Subscribe for more thoughts on philosophy, adventure, and
                  technology.
                </p>
              </div>

              <div id={subFormId} className="grid grid-cols-1 gap-y-4">
                <div>
                  <label className="block text-gray-500 md:text-left text-sm mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    className="appearance-none bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-400 dark:text-white"
                    id="inline-full-name"
                    placeholder={"Your Name"}
                    value={name}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-500 md:text-left text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    maxLength={40}
                    className="appearance-none bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-400 dark:text-white"
                    id="inline-full-name"
                    placeholder={"abcd@gmail.com"}
                    value={email}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                </div>
                <div
                  id={subButtonId}
                  className="rounded-md py-4 px-4 border text-center font-bold bg-black dark:bg-slate-200 text-white dark:text-black hover:cursor-pointer hover:bg-sky-400"
                  onClick={(e) => handleSubscribeClicked()}
                >
                  Sign Up
                </div>
              </div>

              <div className="h-[2em] dark:text-white">
                {/* padding div for space between top and main elements */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subscribe;
