import React from 'react';
import { Creator } from './Creator'


export function Page () { 

    const handleDownload = async () => {
      await Creator(); // Call the PDF creation function
    };
  return ( 
    <div>
      <h1>
        Download Your PDF Below: 
      </h1>
      <button onClick={handleDownload}>Download</button>
    </div>
  )
}