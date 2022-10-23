import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Film } from "../../src/film/types";
import { useBluThemeContext } from "../ThemeProvider";


interface Props {
    film:Film
}
const FilmPreview:NextPage<Props> = (props) => {
    const{film} = {...props};

    const filmCardId = `${film.title}Card`;
    const modalId = `${film.title}Modal`;
    const{isDark} = useBluThemeContext();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    function handlePreviewClicked(){
        // pop vimeo vids up in app
        if(film.url.toLowerCase().includes("vimeo")){
            const newWindow = window.open(film.url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null;
            return;
        }
        setShowModal(true);
    }

    useEffect(()=>{
        if(!document) return;
        const modal = document.getElementById(modalId);
        if(!modal) return;
        // close modal if you click area around the nft card
        modal.addEventListener("click", function(e){
            setShowModal(false);
        })
        // if you click the nft card itself, don't close the card!
        // stop propogation
        const filmCard = document.getElementById(filmCardId);
        if(!filmCard) return;
        filmCard.addEventListener("click", function(e){
            e.stopPropagation();
        })
    },[])

    return(
        <div className="mx-auto">
            
            <div className="mx-auto hover:z-10 transition ease-in-out hover:scale-110" onClick={()=>handlePreviewClicked()}>
                <img src={film.thumbnailPath} className="hover:shadow-md hover:shadow-sky-400 w-64 h-64 rounded-md drop-shadow-lg object-cover"/>
                <div className="flex">
                    <p className="my-2 text-lg text-gray-400 dark:text-gray-400 font-semibold">{film.title}</p>
                </div>
            </div>
            

            <div id={modalId} tabIndex={-1} aria-hidden={showModal?"false":"true"} className={`${!showModal && "hidden"} modal fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center overflow-y-auto`} style={{backgroundColor:`${isDark?"rgba(0, 0, 0, 0.9)":"rgba(0, 0, 0, 0.9)"}`}}>
            {/* top right fixed close button  */}
            <button type="button" className="invisible md:visible text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto fixed top-4 right-5 items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setShowModal(false)}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
            </button>
            {/* flex with card and image */}
            <div className="flex flex-col md:flex-row opacity-100 m-4 max-w-[95%] md:w-[600px] max-h-screen">
                <div className="md:hidden min-h-[2rem] dark:text-white">
                        
                        {/* padding div for space between top and main elements */}
                </div>

                {/* close button shown on small screens */}
                <button type="button" className="md:hidden mb-2 mt-4 text-black bg-white rounded-full font-bold text-sm p-1.5 ml-auto items-center dark:bg-white dark:text-black transition ease-in-out hover:scale-110" onClick={()=>setShowModal(false)}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>

                    
                {/* video info card */}
                <div id={filmCardId} className="flex-1 bg-white dark:bg-black md:ml-6 mt-8 md:mt-0 rounded-lg min-h-[30rem] md:min-h-[25rem] h-fit md:max-h-[40rem] dark:border dark:border-gray-100 md:overflow-x-hidden overflow-y-auto no-scrollbar">
                    <div className="mx-3 mt-3 text-black dark:text-white">
                        <div>
                            <h1 className="font-bold text-2xl text-sky-400">{film.title}</h1>
                        </div>
                        
                        <div className="my-4">

                            <div className="w-full">
                                <ReactPlayer url={film.url} playing={showModal} controls={true} width="100%"/>
                            </div>
 
                            <div>
                            <h2 className="text-lg dark:text-white font-bold mt-2">Description</h2>
                                <p className="text-gray-400 dark:text-gray-300">
                                    {film.description}
                                </p>
                            
                            </div>
                            
                            <div className="h-[2rem] dark:text-white">
                            {/* padding div for space between top and main elements */}
                            </div>              
                        </div>
                    </div>
                </div>
                <div className="md:hidden min-h-[4rem] dark:text-white">
                    
                            {/* padding div for space between top and main elements */}
                </div>
            </div>
        </div>

        </div>

    )
}

export default FilmPreview;