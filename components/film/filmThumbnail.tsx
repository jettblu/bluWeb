import { Film } from "../../src/film/types";
import ImageWithBlur from "../images/ImageWithBlur";

interface Props {
  film: Film;
}
export default function FilmThumbnail(props: Props) {
  const { film } = { ...props };
  return (
    <div className="hover:z-10 transition ease-in-out hover:scale-110 hover:cursor-pointer">
      <ImageWithBlur
        src={film.thumbnailPath}
        width={100}
        height={100}
        alt={`${film.title} thumbnail`}
        className="hover:shadow-md hover:shadow-sky-40 h-44 w-72 rounded-md drop-shadow-lg object-cover"
      />
      <div className="flex">
        <p className="my-2 text-lg text-gray-400 dark:text-gray-400 font-semibold">
          {film.title}
        </p>
      </div>
    </div>
  );
}
