'use client';

import NavigationBar from "./components/navbar"
import { Button } from 'flowbite-react';
import { useState } from "react";
import Image from 'next/image'
import SearchIcon from "../../public/SearchIcon.png"
import WomanHeroImage from '../../public/crop-3d-female-character-working-laptop-while-sitting-chair-bgremove.png'

import { processVideo } from "./actions";
import ModernTextArea from "./textarea";
import Footer from "./components/footer";

export interface SummaryResponse {
  generated_text: string
}



const Home = function () {



  // const [URLEntered, setURLEntered] = useState(false);

  const [loading, setLoading] = useState(false);

  const [validURL, setValidURL] = useState(true);

  const [iframeURL, setIframeURL] = useState("");

  const [summarized, setSummarized] = useState(false);

  const [summaryText, setSummaryText] = useState("");

  const [videoTitle, setVideoTitle] = useState("");

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm()

  const isValidYouTubeUrl = (youtubeURL: any) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|(youtu\.be\/))(watch\?v=|embed\/|v\/|\.v=)?([^#\&\?\n]*).*/;
    return youtubeRegex.test(youtubeURL);
  };

  const youtube_parser = (youtubeURL: any) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = youtubeURL.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

  const handleSubmit = async (formData: FormData) => {
    // setLoading(false);
    // setValidURL(false);
    // setIframeURL("");
    // setSummarized(false);
    // setSummaryText("");
    // setVideoTitle("");

    console.log(loading, validURL, iframeURL, summarized, summaryText, videoTitle)


    const youtubeURL: any = formData.get('URLInput')
    console.log("inside handlesubmit")

    if (youtubeURL && isValidYouTubeUrl(youtubeURL)) {

      console.log("parser: " + youtube_parser(youtubeURL))
      //console.log(youtubeURL.replace("watch?v=", "v/"))

      var parsedURL = "https://www.youtube.com/embed/" + await youtube_parser(youtubeURL)
      // setIframeURL("https://www.youtube.com/embed/"+ youtube_parser(youtubeURL))
      setIframeURL(parsedURL)
      setValidURL(true);

      setSummarized(false);
      setLoading(true);

      console.log("loading 1: " + loading)

      // processVideo(formData.get('URLInput') as string);

      var generatedText: string = await processVideo(formData.get('URLInput') as string);

      await fetch(`https://noembed.com/embed?dataType=json&url=${youtubeURL}`)
        .then(res => res.json())
        .then(data => { console.log('fetch', data.title); setVideoTitle(data.title) })

      console.log(generatedText)
      setSummaryText(generatedText)
      setLoading(false);
      console.log("loading 2: " + loading)

      await setSummarized(true);


    }
    else {
      setValidURL(false);
      console.log("invalid URL")
    }

  }

  return (
    <>

      <form action={handleSubmit} className="flex justify-center flex-col mt-5 md:mt-10 w-4/5 mx-auto">
        {/* <p className="text-black text-center text-xl pb-10">Summarize a Youtube video in seconds!</p> */}
        <div className="flex flex-row justify-center" >
          <input name="URLInput" className="w-3/4  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="Youtube URL" />

          <button
            type="submit"
            className="transition duration-150 ease-in-out  text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl active:ring-4 active:outline-none active:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-5 h-10"
          //className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Summarize</button>
        </div>
        {!validURL && <div className="text-red-500 text-center pt-5">Invalid URL</div>}
      </form>


      {/* <div className={`${summarized ? 'flex' : 'hidden'} py-10 flex-row flex-wrap justify-center gap-y-10 px-10 bg-white `}> */}
      {iframeURL && <div className="flex py-20 flex-row flex-wrap justify-center gap-y-10 px-10 bg-white">

        <div className="flex flex-col gap-y-5 ">
          <iframe width={320} height={200} className=" aspect-video md:w-auto mx-auto" src={iframeURL}></iframe>
          <div className="px-10 max-w-[420px] font-semibold text-xs  text-center mx-auto text-black dark:white ">{videoTitle}</div>
        </div>


        {/* {iframeURL && <div className="hidden md:block justify-center mx-10 h-[350px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>} */}
        <div className="hidden md:block justify-center mx-10 h-[350px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>
        {/* {summarized ? <ModernTextArea text={summaryText}/> :
            
              // <div className={`${validURL ? 'flex':'hidden'} flex-col justify-center items-center`}>
              //   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              //   <div className="text-black dark:text-white text-lg font-medium pt-5">Summarizing...</div>
              // </div>

              <div className={`flex-col justify-center items-center`}>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                <div className="text-black dark:text-white text-lg font-medium pt-5">Summarizing...</div>
              </div>
              
            } */}

        {summarized ? (
          <ModernTextArea text={summaryText} />
        ) : (
          <div className="flex-col justify-center items-center md:px-20">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                <div className="text-black dark:text-white text-lg font-medium pt-5">Summarizing...</div>
              </>
            ) : null}
          </div>
        )}

      </div>
      }
      <section className="bg-white dark:bg-gray-900 md:pl-20">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-5 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            {/* place-self-center */}
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Get the Summary of a youtube video</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Paste the YouTube video URL you want summarized.</p>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Contact Us
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex ">
            <Image className="rounded-md" src={WomanHeroImage} alt="mockup" />
          </div>
        </div>
      </section>

      <section id="about" className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image"/>
            <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image"/>
              <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">How it works</h2>
                <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">

                </p>
                <ul className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                  <li>1. Paste the YouTube video URL you want summarized.</li>
                  <li>2. Click the "Summarize" button.</li>
                  <li>3. Wait for the video to be summarized.</li>
                  <li>4. Read the summary!</li>
                </ul>
                <a href="#" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                  Get started
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
      </section>


      <Footer/>
      


        </>
       )
}

        export default Home