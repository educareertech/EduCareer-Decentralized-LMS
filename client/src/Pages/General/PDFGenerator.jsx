import React from 'react';
import jsPDF from 'jspdf';
import QRCodeGenerator from './QRGenerator';

// Your HTML certificate template as a string
// <div style="display:flex; flex-direction:column; align-Items:start; justify-content:start; font-family: Arial, sans-serif; width: 40vw; max-width: 40vw; border: 1px solid #ccc; padding: 5px; background-color: #fff;">
//     <div style="text-align: center; width: 60%;">
//         <h5 style="color: #0066cc; font-size: 10px;">Certificate of Completion</h5>
//     </div>
//     <div style="text-align:center; width: 60%; center; margin-top: 10px;">
//         <p style="font-size: 5px;">This is to certify that</p>
//         <h5 style="font-size: 8px; color: blue;">Mr. ${certificateData.studentName}</h5>
//         <p style="font-size: 5px;">has successfully completed the course in</p>
//         <h5 style="font-size: 8px; color: #333;">${certificateData.courseName}</h5>
//         <div style="display: flex; width: 20vw; justify-content: space-between; align-items: center; padding: 0 2vw;">
//             <p style="font-size: 8px; color: #666;">on ${certificateData.issueDate}</p>
//             <!-- Add your QR code image here -->
//             <QRCodeGenerator style={{ textAlign: 'center', backgroundColor: "red" }} data={"Hello Salamalaikum"}></QRCodeGenerator>
//         </div>
//     </div>
// </div>

function CertificateGenerator() {
    const certificateData = {
        did: '0x44ef743c505f71f58780f550781684217c03a1eb4319901df89033f3d334bd61',
        
    };

    const certificateTemplate = `
    <html>
    <body>
    <div style="display:flex; flex-direction:column; align-items:center; tex-align: center; color:green; width: 24vw; center; margin-top: 40px;">
            <p style="font-size: 5px;">This is your Unique Decentralized Identifier (Did)</p>
            <p style="font-size: 5px;">Keep it safe, so you can use it while loging in any EduCareer Platform</p>
            <h5 style="font-size: 5px; color: blue;">${certificateData.did}</h5>
            
        </div>
    </body>
    </html>
    `;

    const generatePDF = () => {
        const doc = new jsPDF();

        // Convert HTML template string to DOM element
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = certificateTemplate;

        // Render the HTML template to the PDF
        doc.html(htmlElement, {
            callback: function (pdf) {
                pdf.save('certificate.pdf');
            },
        });
    };


    return (
        <div>
            <button className='generalButton' onClick={generatePDF}>Generate Certificate</button>
            <div style={{ fontFamily: 'Arial, sans-serif', width: '70vw', maxWidth: '70vw', border: '1px solid #ccc', padding: '5px', backgroundColor: '#fff' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h2 style={{ color: '#0066cc', fontSize: '18px', marginLeft: '50px' }}>Certificate of Completion</h2>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontSize: '10px' }}>This is to certify that</p>
                    <h3 style={{ fontSize: '16px', color: 'blue' }}>{certificateData.studentName}</h3>
                    <p style={{ fontSize: '10px' }}>has successfully completed the course in</p>
                    <h4 style={{ fontSize: '14px', color: '#333' }}>{certificateData.courseName}</h4>
                    <div style={{ display: "flex", width: "100%", backgroundColor: "red", justifyContent: "space-between", alignItems: "center", padding: "0 2vw" }}>
                        <p style={{ fontSize: '12px', color: '#666' }}>on {certificateData.issueDate}</p>
                        <QRCodeGenerator style={{ textAlign: 'center', backgroundColor: "red" }} data={"Hello Salamalaikum"}></QRCodeGenerator>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CertificateGenerator;
