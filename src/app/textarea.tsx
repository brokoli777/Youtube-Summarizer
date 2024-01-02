'use client';

import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// const ModernTextArea = (props:any) => {
//   const [text, setText] = useState('Copy this text');

//   const handleCopy = () => {
//     Handle copy action, if needed
//     console.log('Text copied to clipboard');
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
//       <textarea
//         className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <div className="flex justify-end mt-2">
//         <CopyToClipboard text={text} onCopy={handleCopy}>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
//             Copy to Clipboard
//           </button>
//         </CopyToClipboard>
//       </div>
//     </div>
//   );
// };

const ModernTextArea = (props:any) => {

    console.log("props: "+props.text)

    const [copied, setCopied] = useState(false)
  
    const handleCopy = () => {
      // Handle copy action, if needed
      console.log('Text copied to clipboard');
    };
  
    return (
      <>
      <div className="flex flex-col text-black dark:text-white flex-grow">
        <div className="flex flex-row justify-between">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary Text</label>
            <CopyToClipboard text={props.text} onCopy={() => setCopied(!copied)}>
            <button className="flex flex-row">
                    <span className='text-sm pr-1'>{copied ? "Copied!": "Copy"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                    {/* {copied ? "Copied!": "Copy"} */}
                </button>
            </CopyToClipboard>
        </div>
        <textarea defaultValue={props.text} id="message" rows={15} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
        

      

        

         
        {/* {copied && <div className="text-green-500">Copied!</div>} */}
      </>
    );
  };

export default ModernTextArea;
