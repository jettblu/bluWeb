"use client";

import { NextPage } from "next";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import EventPlaceholder from "../../src/helpers/events/types";

interface Props {
  onDelete?: (eventToDelete: EventPlaceholder) => any;
  event: EventPlaceholder;
}

const EventPreview: NextPage<Props> = (props) => {
  const { onDelete, event } = { ...props };
  const [saved, setSaved] = useState(false);
  function handleDelete() {
    setSaved(true);
    if (onDelete) {
      onDelete(event);
    }
  }

  return (
    <div className="rounded-lg border border-gray-400 dark:border-gray-700 py-4 px-4 flex flex-col space-y-2 dark:text-gray-200 text-slate-800 text-lg">
      <div className="flex-row">
        <div className="">{event.description}</div>
        <div className="flex-grow">
          <AiOutlineDelete
            size={20}
            className="hover:font-bold hover:text-red-400 float-right hover:cursor-pointer"
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
