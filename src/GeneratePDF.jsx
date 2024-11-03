import { PDFDocument, rgb } from "pdf-lib";
export const generatePDF = async (data) => {
  try {
     const pdfDoc = await PDFDocument.create();
     const page = pdfDoc.addPage([600, 800]);
     const { width, height } = page.getSize();
     let yPosition = height - 40;

     const addText = (text, x, y, size = 12, color = rgb(0, 0, 0)) => {
        page.drawText(text, { x, y, size, color });
     };

     // Add Header Information
    //  addText(`${data.first_name} ${data.last_name}`, 50, yPosition, 24, rgb(0.0, 0.99, 0.99));
    //  page.drawText(`${data.first_name} ${data.last_name}`, {
    //   50,
    //   yPosition, 24,
    //   rgb(0.0, 0.99, 0.99)
    //   });
     yPosition -= 30;
     addText(`Email: ${data.contact_email} | Phone: ${data.phone_number}`, 50, yPosition, 12);
     yPosition -= 15;
     addText(`LinkedIn: ${data.linkedin_url}`, 50, yPosition, 12, rgb(0, 0, 0.7));
     yPosition -= 30;

     // Separator line
     page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: width - 50, y: yPosition },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
     });
     yPosition -= 20;

     // Add Bio Section
     addText("Professional Summary", 50, yPosition, 14, rgb(0, 0.53, 0.71));
     yPosition -= 20;
     addText(data.short_bio, 50, yPosition, 12);
     yPosition -= 30;

     // Add Experience Section
     addText("Experience", 50, yPosition, 14, rgb(0, 0.53, 0.71));
     yPosition -= 20;
     addText(`${data.experience.job_title} at ${data.experience.company_name}`, 50, yPosition, 12);
     yPosition -= 15;
     addText(`Dates: ${data.experience.start_date} to ${data.experience.end_date || "Present"}`, 50, yPosition, 12, rgb(0.5, 0.5, 0.5));
     yPosition -= 15;
     addText(data.experience.details, 50, yPosition, 12);
     yPosition -= 30;

     // Add Education Section
     addText("Education", 50, yPosition, 14, rgb(0, 0.53, 0.71));
     yPosition -= 20;
     addText(`${data.education.degree}, ${data.education.university}`, 50, yPosition, 12);
     yPosition -= 15;
     addText(`Dates: ${data.education.start_date} to ${data.education.end_date}`, 50, yPosition, 12, rgb(0.5, 0.5, 0.5));
     yPosition -= 15;
     addText(data.education.details, 50, yPosition, 12);
     yPosition -= 40;

     // Add Skills Section
     addText("Skills", 50, yPosition, 14, rgb(0, 0.53, 0.71));
     yPosition -= 20;
     addText(data.skills.join(", "), 50, yPosition, 12);
     yPosition -= 20;

     // Serialize the PDF to bytes
     const pdfBytes = await pdfDoc.save();

     // Create a Blob and return the URL
     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
     return URL.createObjectURL(blob);
  } catch (error) {
     console.error('Error generating PDF:', error);
     return null;
  }
};