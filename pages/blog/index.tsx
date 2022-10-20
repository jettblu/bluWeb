import Link from 'next/link';
import Divider from '../../components/Divider';
import DocCategoryPreview from '../../components/docs/docCategoryPreview';
import Image from "next/image"

import { useKryptikThemeContext } from '../../components/ThemeProvider';
import { getAllDocs } from '../../src/helpers/docs';
import { DocType, DocTypeEnum } from '../../src/helpers/docs/types';
import BlogFeature from '../../components/docs/blogFeature';
import RecentDocCard from '../../components/docs/recentDocCard';
import Head from 'next/head';


type Props = {
    allDocs: DocType[]
}

export default function BlogHome({allDocs}:Props){
  const {isDark} = useKryptikThemeContext();
  // get the most recent blog post
  const mostRecentDoc:DocType = allDocs[0];
  // most recent docs that aren't the last posted doc
  const freshDocs:DocType[]  = allDocs.slice(1, 4)

  return (

    <div className="">
       <Head>
          <title>Thoughts: Jett Hays</title>
          <meta name="description" content="Thoughts on technology and philosophy." />
        </Head>
        <div className="">
            <div className="dark:text-white">
            <div className="max-w-3xl mx-auto mb-[5vh] md:mb-[10vh] text-left">
                <p className="text-sky-400 text-lg mt-2 ml-2 mb-4 font-semibold">Blog</p> 
            </div>

                <BlogFeature doc={mostRecentDoc}/>

                <div className="max-w-3xl mx-auto">
                  <p className="text-sky-400 text-lg mt-10 mb-4 font-semibold">Recent Thoughts</p> 
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                    {
                      freshDocs.map((doc:DocType, index:number)=>
                      <RecentDocCard doc={doc} key={index}/>
                      )
                    }
                  </div>
                </div>
                
            </div>

            <div className="h-[6rem]">
            {/* padding div for space between bottom and main elements */}
            </div>
        </div>
        

    </div>
       

 
  )
}

export const getStaticProps = async () => {
    const allDocs = getAllDocs({
        fields:[
        "slug",
        "title",
        "lastUpdate",
        "image",
        "oneLiner",
        "content",
        "category",
        "emoji",
        "tags",
        "authorName",
        "authorAvatar",
        "authorRole"
    ], docEnum:DocTypeEnum.Blog})
  
    return {
      props: { allDocs },
    }
}
