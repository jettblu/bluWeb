"use client";

import { NextPage } from "next";
import { useState } from "react";
import EventPlaceholder from "../../src/helpers/events/types";

interface Props {
  onSave?: (eventToAdd: EventPlaceholder, id: string) => any;
}

const NewEvent: NextPage<Props> = (props) => {
  const { onSave } = { ...props };
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);
  const id: string = (Math.random() * 10).toString();
  function handleDescriptionChange(newDescription: string) {
    setDescription(newDescription);
  }
  function handleSave() {
    setSaved(true);
    const eventToAdd: EventPlaceholder = {
      description: description,
      // blank for now... filled in on server
      userId: "",
    };
    setDescription("");
    if (onSave) {
      onSave(eventToAdd, id);
    }
  }

  return (
    <div className="rounded-lg border border-gray-400 dark:border-gray-700 py-4 px-4 flex flex-col space-y-2">
      <div>
        <label className="block text-gray-500 md:text-left text-sm mb-1">
          New Event
        </label>
        <input
          type="text"
          className="appearance-none bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-400 dark:text-white"
          id="inline-full-name"
          placeholder={"Description"}
          value={description}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex-grow text-right">
          <p
            className="text-sky-400 font-semibold hover:font-bold hover:cursor-pointer"
            onClick={() => handleSave()}
          >
            Add
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
