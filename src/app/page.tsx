'use client';

import NavigationBar from "./components/navbar"
import { Button } from 'flowbite-react';
import { useState} from "react";
import Image from 'next/image'
import SearchIcon from "../../public/SearchIcon.png"
import {processVideo}  from "./actions";
import ModernTextArea from "./textarea";

export interface SummaryResponse{
  generated_text: string
}



const Home = function () {

  

  const [URLEntered, setURLEntered] = useState("");

  const [validURL , setValidURL] = useState(true);

  const [iframeURL , setIframeURL] = useState("");

  const [summarized , setSummarized] = useState(false);

  const [summaryText, setSummaryText] = useState("");

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm()

  const isValidYouTubeUrl = (youtubeURL:any) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|(youtu\.be\/))(watch\?v=|embed\/|v\/|\.v=)?([^#\&\?\n]*).*/;
    return youtubeRegex.test(youtubeURL);
  };

  const youtube_parser = (youtubeURL:any) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = youtubeURL.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

  const handleSubmit = async (formData: FormData) =>{
    
    const youtubeURL:any = formData.get('URLInput')
    console.log("inside handlesubmit")
    
    if(youtubeURL && isValidYouTubeUrl(youtubeURL)){

      console.log("parser: "+youtube_parser(youtubeURL))
      //console.log(youtubeURL.replace("watch?v=", "v/"))

      setIframeURL("https://www.youtube.com/embed/"+ youtube_parser(youtubeURL))

      // processVideo(formData.get('URLInput') as string);

      var generatedText: string = await processVideo(formData.get('URLInput') as string);

      console.log(generatedText)
      setSummaryText(generatedText)
      

      setValidURL(true);

      setSummarized(true);



    }
    else{
      setValidURL(false);
      console.log("invalid URL")
    }

  }

  return (
    <>
      {/* <div className="mx-auto bg-white h-screen w-full">
        <NavigationBar /> */}
      
        <form action={handleSubmit} className="flex justify-center flex-col mt-10 w-4/5 mx-auto">
          <p className="text-black text-center text-xl pb-10">Summarize a Youtube video in seconds!</p>
          <div className="flex flex-row justify-center" >
            <input name="URLInput" className="w-3/4  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="Youtube URL"/>
            {/* <Button type="submit" className="size-11 ml-2     transition duration-150 ease-in-out" size="small" gradientDuoTone="greenToBlue">
              <Image src={SearchIcon} alt="summarize button" className="p-0.5"/>
            </Button> */}
            <button type="submit" 
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-5 h-10" >Summarize</button>
          </div>
          {!validURL && <div className="text-red-500 text-center pt-5">Invalid URL</div>}
        </form>

        
          <div className={`${summarized ? 'flex' : 'hidden'} pt-10 flex-row mx-5 flex-wrap justify-center gap-y-20`}>
            <div className="flex flex-col">
              <iframe width={444.4} height={250} className="" src={iframeURL}></iframe>
              
            </div>
            
            <div className="justify-center mx-10 h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>
            {/* <div className="text-black dark:text-white"> */}
            <ModernTextArea text={summaryText}/>
                {/* <textarea id="message"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={summaryText}></textarea> */}
            {/* </div> */}
            
          </div>
        


      {/* </div> */}
    </>
  )
}

export default Home