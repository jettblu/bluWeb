import type { NextPage } from "next";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { handleApprove } from "../../src/authUtils/jwt";
import { useSearchParams } from "next/navigation";

const Approve: NextPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const code = searchParams?.get("code") || "";
  handleApprove(email, code).then((approved) => {
    if (approved) {
      router.push("/");
    } else {
      toast.error("Unable to approve login request. Link may be expired");
    }
  });

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