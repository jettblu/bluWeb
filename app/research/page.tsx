import { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="text-black dark:text-white">
      <Head>
        <title>SYNC</title>
        <meta
          name="description"
          content="SYNC is a peer-to-peer data sharing protocol. It allows users to share data between devices without a central server using a QR code stream."
        />
      </Head>
      {/* fixed left hand side */}
      <div className="md:fixed md:left-0 md:h-full md:w-[50%] md:bg-green-900 md:text-white md:dark:bg-green-400/10 md:dark:text-white md:rounded-none rounded-xl px-2 py-1">
        <div className="md:pt-[25vh] md:px-12">
          <h1 className="text-3xl font-semibold mb-2">My Research</h1>
          <p className="text-slate-700 dark:text-slate-200 md:text-slate-200 md:dark:text-slate-200 text-xl">
            My primary research interests include machine learning, peer-to-peer
            sharing, and cryptography.
          </p>
        </div>
      </div>
      <div className="md:ml-[50%] h-full md:w-[50%] md:px-12 pt-8">
        <div className="grid grid-cols-1 gap-y-12 snap-y snap-mandatory mx-auto max-w-lg">
          <div className="bg-sky-400/10 w-full h-full">
            <div className="rounded-md ring-1 ring-sky-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
              <Link href="/research/brainstorm">
                <Image
                  src="/research/covers/brainstorm.gif"
                  alt="Brainstorm cover art"
                  className="w-full h-80 object-cover rounded-tr-md rounded-tl-md"
                  width={200}
                  height={200}
                />
                <div className="px-2 py-2">
                  <h2 className="text-2xl font-semibold mb-2">Brainstorm</h2>
                  <p className="text-lg text-sky-600">
                    A mind controlled keyboard.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-green-400/10 w-full h-full">
            <div className="rounded-md ring-1 ring-green-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
              <Link href="/research/sync">
                {" "}
                <Image
                  src="/research/covers/sync.gif"
                  alt="Brainstorm cover art"
                  className="w-full object-cover h-100 rounded-tr-md rounded-tl-md"
                  width={200}
                  height={200}
                />
                <div className="px-2 py-2">
                  <h2 className="text-2xl font-semibold mb-2">Sync</h2>
                  <p className="text-lg text-green-600">
                    Share data between devices with a QR code stream.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-purple-400/10 w-full h-full">
            <div className="rounded-md ring-1 ring-purple-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
              <a
                href="https://www.nanograd.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/research/covers/nanograd.png"
                  alt="Brainstorm cover art"
                  className="w-full object-cover h-80 rounded-tr-md rounded-tl-md"
                  width={200}
                  height={200}
                />
                <div className="px-2 py-2">
                  <h2 className="text-2xl font-semibold mb-2">Nanograd</h2>
                  <p className="text-lg text-purple-600">
                    A deep learning framework built from scratch in Rust.
                    Nanograd minimizes memory usage and maximizes performance
                    with a custom autograd engine.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="bg-pink-400/10 w-full h-full">
            <div className="rounded-md ring-1 ring-pink-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
              <a
                href="https://sword.kryptik.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/research/covers/sword.gif"
                  alt="Brainstorm cover art"
                  className="w-full object-cover h-100 rounded-tr-md rounded-tl-md"
                  width={200}
                  height={200}
                />
                <div className="px-2 py-2">
                  <h2 className="text-2xl font-semibold mb-2">SWORD</h2>
                  <p className="text-lg text-pink-600">
                    Instead of relying on a smart contract with trusted
                    guardians, SWORD distributes shares of an encryption key to
                    a group of shareholders. Whenever a user wants to regain
                    access to their wallet, the shares are reassembled, and the
                    wallet is decrypted.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
