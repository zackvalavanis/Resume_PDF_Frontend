import { PDFDocument } from 'pdf-lib';

export async function Creator() {
  // Wait for PDFDocument to be created
  const pdfDoc = await PDFDocument.create();

  // Get the resume data
  const resumes = [
    {
      id: 1,
      first_name: "Pepper",
      last_name: "Potts",
      contact_email: "Pepper.Potts@gmail.com",
      phone_number: "+1 555 555 5555",
      short_bio: "Bilingual (Spanish/English) Director of Business Systems offering expertise in business systems, high-level strategic planning, and operations...",
      linkedin_url: "linkedin.com/in/pepper-pots",
      twitter_handle: "ppotts",
      website_url: "http://www.pepperpotts.com",
      resume_url: "http://pepperpotts.resume.com",
      github_url: "https://github.com/ppotts",
      profile_image: "https://myphoto.com/ppotts",
      experience: {
        student_id: 12345,
        start_date: "2021-10-01",
        end_date: null,
        job_title: "Director, Systems & Tools",
        company_name: "Stark Industries",
        details: "dummy details",
      },
      education: {
        student_id: 12345,
        start_date: "2019-09-08",
        end_date: "2021-04-30",
        degree: "Bachelor of Arts in Information Technology",
        university: "Clayton State University",
        details: "Did a whole bunch of learning",
      },
      skills: [],
      capstone: {
        student_id: 12345,
        name: "shopping_cart",
      },
    }
  ];

  const { first_name, last_name, job_title, company_name, contact_email } = resumes[0];

  // Add a page to the PDF
  const page = pdfDoc.addPage([550, 750]);

  // Draw dynamic text on the page using data from the resume
  page.drawText(`Name: ${first_name} ${last_name}`, { x: 50, y: 700, size: 20 });
  page.drawText(`Job Title: ${job_title}`, { x: 50, y: 670, size: 15 });
  page.drawText(`Company: ${company_name}`, { x: 50, y: 650, size: 15 });
  page.drawText(`Contact Email: ${contact_email}`, { x: 50, y: 630, size: 15 });

  // Finalize and save the PDF
  const pdfBytes = await pdfDoc.save();

  // Create a Blob and download the PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'resume.pdf';
  link.click();
}
