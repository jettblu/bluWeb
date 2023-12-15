import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import NanogradImage from "../../public/research/covers/nanograd.png";
import { getPlaiceholder } from "plaiceholder";

import fs from "node:fs/promises";
import { join } from "path";

const researchCoversDirectory = join(
  process.cwd(),
  "public/research/covers/small/"
);

export const metadata: Metadata = {
  title: "Jett's Research",
  description:
    "My primary research interests include machine learning, peer-to-peer sharing, and cryptography.",
};

const syncImageURL =
  "https://res.cloudinary.com/drxzxoqu8/image/upload/f_auto,q_auto/v1/research/pfbtqk4rt7t49cigbwtn";

const brainstormImageURL =
  "https://res.cloudinary.com/drxzxoqu8/image/upload/f_auto,q_auto/v1/research/tvnhwx6qhlmfugnvqip7";

const swordImageURL =
  "https://res.cloudinary.com/drxzxoqu8/image/upload/f_auto,q_auto/v1/research/nzzd5mp3euyvvpk3shom";

const snakeImageURL =
  "https://res.cloudinary.com/drxzxoqu8/image/upload/v1702659911/research/snakeGameplay_gnksme.gif";
// generate placeholder urls base64.... using plaiceholder
// https://plaiceholder.co/
async function getPlaceholderUrl() {
  const preOptimized = [
    "brainstorm.jpg",
    "sync.png",
    "nanograd.png",
    "snake.jpg",
    "sword.webp",
  ];
  const temp_placeholders = await Promise.all(
    preOptimized.map(async (data, index) => {
      const buffer = await fs.readFile(`${researchCoversDirectory}${data}`);
      const { base64 } = await getPlaiceholder(buffer);
      return base64;
    })
  );
  return temp_placeholders;
}

export default async function Home() {
  const placeholders: string[] = await getPlaceholderUrl();
  return (
    <div className="text-black dark:text-white pb-16">
      {/* fixed left hand side */}
      <div className="md:fixed md:left-0 md:h-full md:w-[40%] md:bg-green-900 md:text-white md:dark:bg-green-400/10 md:dark:text-white md:rounded-none rounded-xl px-2 py-1">
        <div className="md:pt-[25vh] md:px-12">
          <h1 className="text-3xl font-semibold mb-2">My Research</h1>
          <p className="text-slate-700 dark:text-slate-200 md:text-slate-200 md:dark:text-slate-200 text-xl">
            My primary research interests include machine learning, peer-to-peer
            sharing, and cryptography.
          </p>
        </div>
      </div>
      <div className="md:ml-[40%] h-full md:w-[60%] md:px-12 pt-8">
        <div className="grid grid-cols-1 gap-y-12 snap-y snap-mandatory mx-auto max-w-lg">
          <div className="rounded-md ring-1 ring-sky-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
            <div className="bg-sky-400/10 w-full h-full">
              <Link href="/research/brainstorm">
                <Image
                  src={brainstormImageURL}
                  placeholder="blur"
                  blurDataURL={placeholders[0]}
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

          <div className="rounded-md ring-1 ring-green-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
            <div className="bg-green-400/10 w-full h-full">
              <Link href="/research/sync">
                {" "}
                <Image
                  src={syncImageURL}
                  placeholder="blur"
                  blurDataURL={placeholders[1]}
                  alt="SYNC cover art"
                  className="w-full object-cover h-[600px] rounded-tr-md rounded-tl-md"
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

          <div className="rounded-md ring-1 ring-purple-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
            <div className="bg-purple-400/10 w-full h-full">
              <a
                href="https://www.nanograd.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={NanogradImage}
                  placeholder="blur"
                  blurDataURL={placeholders[2]}
                  alt="Nanograd cover art"
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
          <div className="rounded-md ring-1 ring-red-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
            <div className="bg-purple-400/10 w-full h-full">
              <a
                href="https://www.nanograd.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={snakeImageURL}
                  placeholder="blur"
                  blurDataURL={placeholders[3]}
                  alt="Nanograd cover art"
                  className="w-full object-cover h-80 rounded-tr-md rounded-tl-md"
                  width={200}
                  height={200}
                />
                <div className="px-2 py-2">
                  <h2 className="text-2xl font-semibold mb-2">
                    Preference Arcade
                  </h2>
                  <p className="text-lg text-red-600">
                    End to end framework for training reinforcement learning
                    agents to learn from human preferences.
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-md ring-1 ring-pink-400 bg-gray-400/10 hover:cursor-pointer hover:scale-105 transition-ease-in duration-300 group snap-always snap-center">
            <div className="bg-pink-400/10 w-full h-full">
              <a
                href="https://sword.kryptik.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={swordImageURL}
                  placeholder="blur"
                  blurDataURL={placeholders[4]}
                  alt="SWORD cover art"
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
}
