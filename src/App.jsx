
import { useState } from 'react';
import { generatePDF } from './GeneratePDF';
import { generatePDF2 } from './GeneratePDF2';
import { generatePDF3 } from './GeneratePDF3';
import axios from 'axios';
import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const ResumeGenerator = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [pdfUrl, setPdfUrl] = useState(null);


   const getData = async () => { 
    try { 
      const [ response1, response2, response3, response4, response5 ] = await Promise.all([
        axios.get('http://localhost:3000/capstones.json'), 
        axios.get('http://localhost:3000/skills.json'), 
        axios.get('http://localhost:3000/experiences.json'),
        axios.get('http://localhost:3000/educations.json'),
        axios.get('http://localhost:3000/students.json'),
      ]);
        console.log(response1.data);
        console.log(response2.data);
        console.log(response3.data);
        console.log(response4.data);
        console.log(response5.data);
    } catch(error) { 
      console.log(error)
    }
  }

   const generatePDF = async () => {
      setIsLoading(true);

      try {
         // Sample Data (Replace this with fetched data if needed)
         const data = {
            first_name: "Pepper",
            last_name: "Potts",
            contact_email: "Pepper.Potts@gmail.com",
            phone_number: "+1 555 555 5555",
            short_bio: "Bilingual (Spanish/English) Director of Business Systems offering expertise in business systems, high-level strategic planning, and operations.",
            linkedin_url: "linkedin.com/in/pepper-pots",
            experience: {
               job_title: "Director, Systems & Tools",
               company_name: "Stark Industries",
               start_date: "2021-10-01",
               end_date: null,
               details: "Oversaw all business systems, ensuring efficiency and integration."
            },
            education: {
               degree: "Bachelor of Arts in Information Technology",
               university: "Clayton State University",
               start_date: "2019-09-08",
               end_date: "2021-04-30",
               details: "Graduated with honors."
            },
            skills: ["Leadership", "Strategic Planning", "Project Management"],
         };

         // Step 1: Create a new PDF document
         const pdfDoc = await PDFDocument.create();
         const page = pdfDoc.addPage([600, 800]); 
         const { width, height } = page.getSize();
         let yPosition = height - 40; 

         // Function to add text with styling
         const addText = (text, x, y, size = 12, color = rgb(0, 0, 0)) => {
            page.drawText(text, { x, y, size, color });
         };

   const data = {
      first_name: "Pepper",
      last_name: "Potts",
      contact_email: "Pepper.Potts@gmail.com",
      phone_number: "+1 555 555 5555",
      short_bio: "Bilingual (Spanish/English) Director of Business Systems offering expertise in business systems, high-level strategic planning, and operations.",
      linkedin_url: "linkedin.com/in/pepper-pots",
      experience: {
         job_title: "Director, Systems & Tools",
         company_name: "Stark Industries",
         start_date: "2021-10-01",
         end_date: null,
         details: "Oversaw all business systems, ensuring efficiency and integration."
      },
      education: {
         degree: "Bachelor of Arts in Information Technology",
         university: "Clayton State University",
         start_date: "2019-09-08",
         end_date: "2021-04-30",
         details: "Graduated with honors."
      },
      skills: ["Leadership", "Strategic Planning", "Project Management"],
   };

   const handleGeneratePDF1 = async () => {
      setIsLoading(true);
      const url = await generatePDF(data);
      setPdfUrl(url);  
      setIsLoading(false);
  
   };

   const handleGeneratePDF2 = async () => {
      setIsLoading(true);
      const url2 = await generatePDF2(data);
      setPdfUrl(url2);  
      setIsLoading(false);
   };

   const handleGeneratePDF3 = async () => {
    setIsLoading(true);
    const url2 = await generatePDF3(data);
    setPdfUrl(url2);  
    setIsLoading(false);
 };

   const handleDownloadPDF = () => {
      if (pdfUrl) {
         const link = document.createElement('a');
         link.href = pdfUrl;
         link.download = 'resume.pdf';
         link.click();
      }
   };

   return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
         <h1>PDF Resume Generator</h1>
         <button onClick={ () => {handleGeneratePDF1(), getData()}} disabled={isLoading}>
            {isLoading ? 'Generating PDF...' : 'Generate PDF 1'}
         </button>
         <button onClick={ () => {handleGeneratePDF2(), getData()}} disabled={isLoading}>
            {isLoading ? 'Generating PDF...' : 'Generate PDF 2'}
         </button>
         <button onClick={ () => {handleGeneratePDF3(), getData()}} disabled={isLoading}>
            {isLoading ? 'Generating PDF...' : 'Generate PDF 3'}
         </button>
         
         {pdfUrl && (
            <div style={{ marginTop: '20px' }}>
               <h2>PDF Preview</h2>
               <iframe src={pdfUrl} width="1200" height="1600" title="PDF Preview"></iframe>
               <button onClick={handleDownloadPDF} style={{ marginTop: '10px' }}>
                  Download PDF
               </button>
            </div>
         )}
      </div>
   );
};

export default ResumeGenerator;