import { NextPage } from "next";
import { Film } from "../../src/film/types";


interface Props {
    film:Film
}
const FilmPreview:NextPage<Props> = (props) => {
    const{film} = {...props};

    const handleFilmClicked = function(){

    }

    return(
        <div className="mx-auto">
            <a href={film.url} target="_blank" rel="noopener noreferrer">
            <div className="mx-auto hover:z-10 transition ease-in-out hover:scale-110" onClick={()=>handleFilmClicked()}>
                <img src={film.thumbnailPath} className="hover:shadow-md hover:shadow-sky-400 w-64 h-64 rounded-md drop-shadow-lg object-cover"/>
                <div className="flex">
                    <p className="my-2 text-lg text-gray-300 dark:text-gray-400 font-semibold">{film.title}</p>
                </div>
            </div>
            </a>
        </div>
    )
}

export default FilmPreview;