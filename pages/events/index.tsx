import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import NewEvent from "../../components/events/NewEvent";

import { BluFetch } from "../../src/helpers/BluFetch";
import EventPlaceholder from "../../src/helpers/events/types";
import EventPreview from "../../components/events/EventPreview";
import Datetime from "react-datetime";
import Link from "next/link";

const Home: NextPage = () => {
  const [eventsToAdd, setEventsToAdd] = useState<EventPlaceholder[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  function handleNewSave(newEvent: EventPlaceholder, id: string) {
    // TODO: ensure event does not exist
    setEventsToAdd([...eventsToAdd, newEvent]);
  }
  function handleNewDate(newTimestring: string) {
    console.log(startDate.toDateString());
    const newDate: Date = new Date(newTimestring);
    setStartDate(newDate);
  }
  const params = {
    eventsToAdd: eventsToAdd,
    startDate: startDate,
  };
  async function handlePushChanges() {
    if (eventsToAdd.length == 0) {
      toast.error("Please add an event before uploading.");
      return;
    }
    // try to add new friend on server
    try {
      const res = await BluFetch("/api/addEvents", {
        method: "POST",
        body: JSON.stringify(params),
        timeout: 8000,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        throw new Error("Bad request");
      }
      // TODO: capture result value and error handle
      setEventsToAdd([]);
      toast.success("Moments added!");
    } catch (e) {
      // adding events failed. notfy user.
      toast("Unable to add events.");
    }
  }
  function handleDelete(eventToDelete: EventPlaceholder) {
    const updatedEvents: EventPlaceholder[] = eventsToAdd.filter(
      (e) => e.description != eventToDelete.description
    );
    console.log("Filtered events");
    console.log(updatedEvents);
    setEventsToAdd(updatedEvents);
  }
  return (
    <div className="dark:text-white">
      <Head>
        <title>Moments</title>
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
              Moments
            </h1>
            <p className="text-slate-700 dark:text-slate-200 text-xl">
              A curated collection of moments.{" "}
              <Link
                href={"../events/all"}
                className="hover:cursor-pointer text-sky-400"
              >
                View All.
              </Link>
            </p>
          </div>
        </div>
        <NewEvent onSave={handleNewSave} />
        <div
          className="bg-sky-400 text-white text-xl px-2 py-2 rounded-lg hover:cursor-pointer my-8 text-center"
          onClick={() => handlePushChanges()}
        >
          Upload {eventsToAdd.length} Events
        </div>
        <div className="mb-4">
          <input
            type="date"
            value={startDate.toISOString().slice(0, 10)}
            onChange={(e) => handleNewDate(e.target.value)}
            className="border border-sky-400 rounded-md"
          />
        </div>
        <div className="flex-col space-y-2">
          {eventsToAdd
            .reverse()
            .map((event: EventPlaceholder, index: number) => (
              <EventPreview event={event} key={index} onDelete={handleDelete} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;