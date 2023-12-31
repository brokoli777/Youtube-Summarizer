'use client';

import NavigationBar from "./components/navbar"
import { Button } from 'flowbite-react';
import { useState} from "react";
import Image from 'next/image'
import SearchIcon from "../../public/SearchIcon.png"
import processVideo  from "./actions";



const Home = function () {
  const [URLEntered, setURLEntered] = useState("");

  const [validURL , setValidURL] = useState(true);
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm()

  const handleSubmit = async (formData: FormData) =>{
    
    const youtubeURL = formData.get('URLInput')
    
    const isValidYouTubeUrl = (youtubeURL:any) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|(youtu\.be\/))(watch\?v=|embed\/|v\/|\.v=)?([^#\&\?\n]*).*/;
      return youtubeRegex.test(youtubeURL);
    };

    if(youtubeURL && isValidYouTubeUrl(youtubeURL)){
      processVideo(formData.get('URLInput') as string).then(output =>{return output});
      setValidURL(true);

    }
    else{
      setValidURL(false);
    }

  }

  return (
    <>
      {/* <div className="mx-auto bg-white h-screen w-full">
        <NavigationBar /> */}
      
        <form action={handleSubmit} className="flex justify-center flex-col mt-10">
          <p className="text-black text-center text-xl pb-10">Summarize a Youtube video in seconds!</p>
          <div className="flex flex-row justify-center" >
            <input name="URLInput" className="w-3/4  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="Youtube URL"/>
            {/* <Button type="submit" className="size-11 ml-2     transition duration-150 ease-in-out" size="small" gradientDuoTone="greenToBlue">
              <Image src={SearchIcon} alt="summarize button" className="p-0.5"/>
            </Button> */}
            <button type="button" 
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-5 h-10" >Summarize</button>
          </div>
          <div className="text-red-500 text-center pt-5">Invalid URL</div>
        </form>

        <div className="pt-20 flex flex-row mx-5 flex-wrap justify-center gap-y-20">
          
          <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
          <div className="justify-center mx-10 h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>
          <div className="text-black dark:text-white">alksjdflkjahwkhjgkjhgl</div>
          
        </div>


      {/* </div> */}
    </>
  )
}

export default Home