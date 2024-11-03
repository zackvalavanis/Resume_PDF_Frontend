
import { useState } from 'react';
import { generatePDF } from './GeneratePDF';
import { generatePDF2 } from './GeneratePDF2';
import { generatePDF3 } from './GeneratePDF3';
import axios from 'axios';
import { useEffect } from 'react'


const ResumeGenerator = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [pdfUrl, setPdfUrl] = useState(null);
   const [ data, setData ] = useState(null);



   const getData = async () => { 
    setIsLoading(true);
    try { 
      const [ response1, response2, response3, response4, response5 ] = await Promise.all([
        axios.get('http://localhost:3000/capstones.json'), 
        axios.get('http://localhost:3000/skills.json'), 
        axios.get('http://localhost:3000/experiences.json'),
        axios.get('http://localhost:3000/educations.json'),
        axios.get('http://localhost:3000/students.json'),
      ]);
      const fetchedData = {
         first_name: response5.data[0].first_name,
         last_name: response5.data[0].last_name,
         contact_email: response1.data[0].name,
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
       setData(fetchedData); // Move this inside the try block
      } catch(error) { 
         console.log(error);
      } finally {
         setIsLoading(false); // Ensure loading is stopped even on error
      }
   };

 
   const handleGeneratePDF1 = async () => {
    if (!data) return; // Ensure data is set
    setIsLoading(true);
    try {
       const url = await generatePDF(data);
       setPdfUrl(url);  
    } catch (error) {
       console.error('Error generating PDF 1:', error);
    } finally {
       setIsLoading(false);
    }
  
   };

   const handleGeneratePDF2 = async () => {
    if (!data) return;
      setIsLoading(true);
      try {
        const url2 = await generatePDF2(data);
        setPdfUrl(url2); 
      } catch (error) { 
        console.error('Error generating PDF 2:', error);
      } finally { 
        setIsLoading(false);
      }
   };

   const handleGeneratePDF3 = async () => {
    if (!data) return;
    setIsLoading(true);
    try {
      const url3 = await generatePDF2(data);
      setPdfUrl(url3); 
    } catch (error) { 
      console.error('Error generating PDF 3:', error);
    } finally { 
      setIsLoading(false);
    }
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