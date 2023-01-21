import { Event } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { addEvents } from "../../prisma/script";
import EventPlaceholder from "../../src/helpers/events/types";

interface Props {
  onDelete?: (eventToDelete: EventPlaceholder) => any;
  event: Event;
}

const StoredEvent: NextPage<Props> = (props) => {
  const { onDelete, event } = { ...props };
  function handleDelete() {
    if (onDelete) {
      onDelete(event);
    }
  }

  return (
    <div className="rounded-lg border border-gray-400 dark:border-gray-700 py-4 px-4 flex flex-col space-y-2 dark:text-gray-200 text-slate-800 text-lg">
      <div className="flex-row">
        <p>{event.description}</p>
      </div>
      <div>
        <p className="text-md">{event.createdAt.toString().substring(0, 10)}</p>
      </div>
    </div>
  );
};

export default StoredEvent;