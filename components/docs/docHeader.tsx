import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"
import DateFormatter from "../time/DateFormatter"

type Props = {
    title: string
    image?: string
    emoji?: string
    hideBackButton?:boolean
    lastUpdated: string
    hideIcon?: boolean
  }
  
  const DocHeader = ({ title, image, lastUpdated, emoji, hideBackButton, hideIcon}: Props) => {
    return (
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto mb-12">
            {
              !hideBackButton &&
              <Link
                href={"./"}
                className="inline-flex w-fit rounded-md p-1 -ml-1 text-slate-700 hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                aria-label="Back"
              >
                <AiOutlineArrowLeft size={24} className="shrink-0" />
              </Link>
            }
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              {
                !hideIcon &&
                <div>
                  {
                    image!=undefined?
                    <img src={image} width="40"/>:
                    emoji &&
                    <p className="text-3xl dark:text-white">{emoji}</p>
                  }
                </div>
              }
              <h1 className="text-black dark:text-white text-5xl font-bold">{title}</h1>
            </div>
            <DateFormatter dateString={lastUpdated}/>
      </div>
    )
  }
  
  export default DocHeader