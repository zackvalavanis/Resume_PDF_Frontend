import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

function App() {
   const [isLoading, setIsLoading] = useState(false);

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

         // Step 2: Add Header Information
         addText(`${data.first_name} ${data.last_name}`, 50, yPosition, 24, rgb(0, 0.53, 0.71));
         yPosition -= 30;
         addText(`Email: ${data.contact_email} | Phone: ${data.phone_number}`, 50, yPosition, 12);
         yPosition -= 15;
         addText(`LinkedIn: ${data.linkedin_url}`, 50, yPosition, 12, rgb(0, 0, 0.7));
         yPosition -= 30;

         // Add separator line
         page.drawLine({
            start: { x: 50, y: yPosition },
            end: { x: width - 50, y: yPosition },
            thickness: 1,
            color: rgb(0.5, 0.5, 0.5),
         });
         yPosition -= 20;

         // Step 3: Add Bio Section
         addText("Professional Summary", 50, yPosition, 14, rgb(0, 0.53, 0.71));
         yPosition -= 20;
         addText("Professional Summary", 100, yPosition, 14, rgb(.03, 0.53, 0.71));
         yPosition -= 20;
         addText(data.short_bio, 50, yPosition, 12);
         yPosition -= 30;

         // Step 4: Add Experience Section
         addText("Experience", 50, yPosition, 14, rgb(0, 0.53, 0.71));
         yPosition -= 20;
         addText(`${data.experience.job_title} at ${data.experience.company_name}`, 50, yPosition, 12);
         yPosition -= 15;
         addText(`Dates: ${data.experience.start_date} to ${data.experience.end_date || "Present"}`, 50, yPosition, 12, rgb(0.5, 0.5, 0.5));
         yPosition -= 15;
         addText(data.experience.details, 50, yPosition, 12);
         yPosition -= 30;

         // Step 5: Add Education Section
         addText("Education", 50, yPosition, 14, rgb(0, 0.53, 0.71));
         yPosition -= 20;
         addText(`${data.education.degree}, ${data.education.university}`, 50, yPosition, 12);
         yPosition -= 15;
         addText(`Dates: ${data.education.start_date} to ${data.education.end_date}`, 50, yPosition, 12, rgb(0.5, 0.5, 0.5));
         yPosition -= 15;
         addText(data.education.details, 50, yPosition, 12);
         yPosition -= 40;

         // Step 6: Add Skills Section
         addText("Skills", 50, yPosition, 14, rgb(0, 0.53, 0.71));
         yPosition -= 20;
         addText(data.skills.join(", "), 50, yPosition, 12);
         yPosition -= 20;

         // Step 7: Serialize the PDF to bytes
         const pdfBytes = await pdfDoc.save();

         // Step 8: Trigger download in the browser
         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
         const link = document.createElement('a');
         link.href = URL.createObjectURL(blob);
         link.download = 'resume.pdf';
         link.click();
      } catch (error) {
         console.error('Error generating PDF:', error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
         <h1>PDF Resume Generator</h1>
         <button onClick={generatePDF} disabled={isLoading}>
            {isLoading ? 'Generating PDF...' : 'Download Resume PDF'}
         </button>
      </div>
   );
}

export default App;