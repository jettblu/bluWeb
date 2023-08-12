"use client";

import { Event } from "@prisma/client";
import { NextPage } from "next";
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
    <div className="rounded-lg border border-gray-400 dark:border-gray-700 py-4 px-4 flex flex-col space-y-2 text-gray-600 dark:text-gray-200 text-lg hover:border-sky-400 dark:hover:border-sky-400">
      <div className="flex-row">
        <p>{event.description}</p>
      </div>
      <div>
        <p className="text-sm text-gray-300 dark:text-gray-700">
          {event.createdAt.toString().substring(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default StoredEvent;
