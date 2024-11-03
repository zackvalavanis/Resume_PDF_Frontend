import React from 'react';
import { Creator } from './Creator';

export function Page() {
  const handleDownload = async () => {
    try {
      await Creator(); // Call the PDF creation function
      console.log('PDF generated and downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h1>Download Your PDF Below:</h1>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
