import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import NewEvent from "../../components/events/NewEvent";

import { BluFetch } from "../../src/helpers/BluFetch";
import EventPlaceholder, {
  handleGetEvents,
} from "../../src/helpers/events/types";
import EventPreview from "../../components/events/EventPreview";
import Datetime from "react-datetime";
import { Event } from "@prisma/client";
import StoredEvent from "../../components/events/StoredEvent";
import Link from "next/link";

const All: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    handleGetEvents().then((newEvents) => {
      if (!newEvents) return;
      setEvents(newEvents);
    });
  }, []);

  function handleDelete(eventToDelete: Event) {
    console.log("not implemented");
  }
  return (
    <div className="dark:text-white">
      <Head>
        <title>All Moments</title>
        <meta
          name="description"
          content="A curated collection of life's moments."
        />
      </Head>
      <div className="max-w-2xl mx-auto">
        <Toaster />
        <div className="mb-12 mx-auto">
          <div className="">
            <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-t from-sky-400 to-green-400 mb-2">
              All Moments
            </h1>
            <p className="text-slate-700 dark:text-slate-200 text-xl">
              A curated collection of moments.{" "}
              <Link
                href={"../events/"}
                className="hover:cursor-pointer text-sky-400"
              >
                Create New.
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-col space-y-2">
          {events.length != 0 &&
            events.map((event: Event, index: number) => (
              <StoredEvent event={event} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default All;
