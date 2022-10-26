import { Friend } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { BluFetch } from "../src/helpers/BluFetch";
import { isValidEmailAddress } from "../src/helpers/utils";

import { useBluThemeContext } from "./ThemeProvider";

const Subscribe:NextPage = () => {
    const{isDark} = useBluThemeContext();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const subCardId = `subCard`;
    const modalId = `subModal`;
    const closeButtonId = `subClose`;
    const subButtonId = 'subButton';
    const subFormId = `subForm`

    function handlePopUpClicked(){
        setShowModal(true);
    }

    async function addNewSubscriber(){
        const params = {
            name:name,
            email:email
        };
        // try to add new friend on server
        try{
            const res = await BluFetch('/api/addFriend', {method:"POST", body:JSON.stringify(params), timeout:8000, headers:{'Content-Type': 'application/json',}})
            if(res.status!=200){
                throw(new Error("Bad request"))
            }
            const newFriend:Friend|null = res.data.friend;
            if(newFriend){
                toast.success("You're subscribed!");
            }
            else{
                throw(new Error("Friend not returned by server"));
            }
            setName("");
            setEmail("");
            setShowModal(false);
        }
        // assuming create friend operation failed because friend already exists with email
        catch(e){
            toast("You're already subscribed!");
        }
      }
    
    async function handleSubscribeClicked(){
        if(!isValidEmailAddress(email)){
            toast.error("Please make sure your email address is correct");
            return;
        }
        if(name==""){
            toast.error("Please enter your name.")
            return;
        }
        await addNewSubscriber();
    }

    useEffect(()=>{
        if(!document) return;
        const modal = document.getElementById(modalId);
        if(!modal) return;
        const subCard = document.getElementById(subCardId);
        // close modal if you click area around the nft card
        modal.addEventListener("click", function(e:any){
            const clickedId = e.target.id;
            // if you click the subscribe card itself, don't close the card!
            if(clickedId){
                const clickedElement = document.getElementById(clickedId);
                // don't close modal if card clicked
                if(clickedElement){
                    if(subCard?.contains(clickedElement)){
                        return;
                    }
                }
            }
            setShowModal(false);
        })
        const closeButton = document.getElementById(closeButtonId);
        if(closeButton){
            closeButton.addEventListener("click", function(e){
                setName("");
                setEmail("");
                setShowModal(false);
                e.stopPropagation();
            })
        }
    },[])

    function handleNameChange(newName:string){
        setName(newName);
    }

    function handleEmailChange(newEmail:string){
        setEmail(newEmail);
    }

    return(
        <div>
            <Toaster/>
            <div className="p-4 flex flex-row font-semibold hover:cursor-pointer hover:text-white w-fit rounded-full space-x-2 text-black bg-slate-100 dark:bg-slate-800 dark:text-white hover:bg-sky-400" onClick={()=>handlePopUpClicked()}>
                <AiOutlineUser size={20}/>
                <p>Subscribe</p>
            </div>
            {/* uncomment div below for slightly transparent button */}
             {/* <div className="p-4 flex flex-row font-semibold hover:cursor-pointer hover:text-white w-fit rounded-full space-x-2 text-black dark:text-white hover:bg-sky-400" onClick={()=>handlePopUpClicked()} style={{backgroundColor:`${isDark?"rgba(1, 22, 48, 0.8)":"rgba(209, 209, 209, 0.8)"}`}}>
                <AiOutlineUser size={20}/>
                <p>Subscribe</p>
              </div> */}

            <div id={modalId} tabIndex={-1} aria-hidden={showModal?"false":"true"} className={`${!showModal && "hidden"} modal fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center overflow-y-auto`} style={{backgroundColor:`${isDark?"rgba(0, 0, 0, 0.9)":"rgba(0, 0, 0, 0.9)"}`}}>
            {/* flex with card and image */}
            <div className="flex flex-col md:flex-row opacity-100 m-4 md:w-[420px] max-h-screen">
                <div className="md:hidden min-h-[2vh] dark:text-white">
                        
                        {/* padding div for space between top and main elements */}
                </div>

                {/* close button shown on small screens */}
                <button type="button" className="md:hidden mb-2 mt-4 text-black bg-white rounded-full font-bold text-sm p-1.5 ml-auto items-center dark:bg-white dark:text-black transition ease-in-out hover:scale-110" onClick={()=>setShowModal(false)}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>

                    
                {/* subscribe card */}
                <div id={subCardId} className="flex-1 bg-white dark:bg-black  mt-8 md:mt-0 rounded-xl h-fit dark:border dark:border-gray-100 md:overflow-x-hidden overflow-y-auto">
                    <div className="mx-3 mt-3 text-black dark:text-white">
                        <div className="flex flex-row">
                            <div className="flex-1"></div>
                            {
                                <Link href="/">
                                <img src={isDark?"/head.jpg":"/icon.ico"} alt="Jett" className="w-16 h-auto"/>
                                </Link>
                            }
                            <div className="invisible md:visible flex-grow text-gray-200 dark:text-gray-700">
                                <AiOutlineClose id={closeButtonId} className="float-right mr-2 font-semibold hover:text-sky-400 hover:cursor-pointer" size={20}/>
                            </div>
                        </div>
                        
                        <div className="my-4">
 
                            <div className="mb-4">
                                <p className="text-gray-400 dark:text-gray-300">
                                    Subscribe for more thoughts on philosophy, adventure, and technology.
                                </p>    
                            </div>
                            
                            <div id={subFormId} className="grid grid-cols-1 gap-y-4">
                                <div>
                                    <label className="block text-gray-500 md:text-left text-sm mb-1">
                                        First Name
                                    </label>
                                    <input type="text" maxLength={20} className="appearance-none bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-400 dark:text-white" id="inline-full-name" placeholder={"Your Name"} value={name} onClick={(e)=>e.stopPropagation()} onChange={(e) => handleNameChange(e.target.value)}/>
                                </div>
                                <div>
                                    <label className="block text-gray-500 md:text-left text-sm mb-1">
                                        Email
                                    </label>
                                    <input type="email" maxLength={40} className="appearance-none bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-400 dark:text-white" id="inline-full-name" placeholder={"abcd@gmail.com"} value={email} onClick={(e)=>e.stopPropagation()} onChange={(e) => handleEmailChange(e.target.value)}/>
                                </div>
                                <div id={subButtonId} className="rounded-md py-4 px-4 border text-center font-bold bg-black dark:bg-slate-200 text-white dark:text-black hover:cursor-pointer hover:bg-sky-400" onClick={(e)=>handleSubscribeClicked()}>
                                    Sign Up
                                </div>
                            </div>
                        
                    
                            
                            <div className="h-[2em] dark:text-white">
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

export default Subscribe;