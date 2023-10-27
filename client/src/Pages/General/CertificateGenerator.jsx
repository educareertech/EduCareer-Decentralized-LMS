import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas to convert HTML to an image
import QRCodeGenerator from './QRGenerator';

function CertificateGenerator({ data }) {
    const pdfRef = useRef();
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const imageQuality = 1;

            // const dpi = 370; // Adjust as needed
            // const pdfWidth = canvas.width * 72 / dpi; // 72 DPI is the default PDF DPI
            // const pdfHeight = canvas.height * 72 / dpi;

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();


            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            //  // Extra    
             const scaleX = pdf / imgWidth;
             const scaleY = pdf / imgHeight;
             const scale = Math.min(scaleX, scaleY);

            // -------------------------
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            // pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio, 'FAST', imageQuality);
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * scale, imgHeight * scale, 'FAST', imageQuality);
            pdf.save('invoice.pdf');
        })
    }

    return (
        <>
            <div className="certificateTemp" ref={pdfRef}>
                <h1>Certificate of Achievement</h1>
                <p>This is to certify that</p>
                <h2>{data.applicantName}</h2>
                <p>has successfully completed the certificate of</p>
                <h3>{data.credentialName}</h3>
                <div className='QRDiv'>
                    <p className="date">{data.issuanceDate}</p>
                    {/* Include your QRCodeGenerator component here */}
                    <QRCodeGenerator data={data.claimData}></QRCodeGenerator>
                </div>
            </div>
            <div className='downloadPDFBtnDiv'>
                <button className="generalButton" onClick={downloadPDF}>Download PDF</button>
            </div>
        </>
    )

    // const generatePDF = () => {
    //     // Create a new jsPDF instance
    //     const doc = new jsPDF();

    //     // Use html2canvas to convert the certificate template to an image
    //     html2canvas(certificateRef.current).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');

    //         // Add the image to the PDF
    //         doc.addImage(imgData, 'PNG', 10, 10, 190, 130); // You can adjust the dimensions as needed

    //         // Save or download the PDF
    //         doc.save('certificate.pdf');
    //     });
    // };

    //   return (
    //     <div>
    //       <button onClick={generatePDF}>Generate Certificate</button>
    //       <div className="certificateTemp" ref={certificateRef}>
    //         <h1>Certificate of Achievement</h1>
    //         <p>This is to certify that</p>
    //         <h2>{applicantName}</h2>
    //         <p>has successfully completed the certificate of</p>
    //         <h3>{credentialName}</h3>
    //         <div className='QRDiv'>
    //           <p className="date">{issuanceDate}</p>
    //           {/* Include your QRCodeGenerator component here */}
    //         </div>
    //       </div>
    //     </div>
    //   );
}

export default CertificateGenerator;
