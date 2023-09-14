"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Event } from "@prisma/client";
import Link from "next/link";
import StoredEvent from "../../../components/events/StoredEvent";
import { handleGetEvents } from "../../../src/helpers/events";
import LoadingSpinner from "../../../components/loadingSpinner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Moments",
  description: "A curated collection of life's moments.",
};

const All: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingAlEvents, setLoadingAllEvents] = useState(true);

  useEffect(() => {
    handleGetEvents().then((newEvents) => {
      if (!newEvents) {
        setLoadingAllEvents(false);
        return;
      }
      setEvents(newEvents);
      setLoadingAllEvents(false);
    });
  }, []);

  function handleDelete(eventToDelete: Event) {
    console.log("not implemented");
  }
  return (
    <div className="dark:text-white">
      <div className="max-w-2xl mx-auto">
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
            !loadingAlEvents &&
            events.map((event: Event, index: number) => (
              <StoredEvent event={event} key={index} />
            ))}
          {events.length == 0 && !loadingAlEvents && (
            <div className="flex flex-col space-y-2">
              <p>No events to show.</p>
              <Link
                href={"../events/"}
                className="hover:cursor-pointer text-sky-400"
              >
                Create New.
              </Link>
            </div>
          )}
          {loadingAlEvents && (
            <div className="flex flex-row">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Unscrambling moments.
              </p>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default All;
