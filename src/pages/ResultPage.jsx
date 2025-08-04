import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const ResultPage = () => {
  const { state } = useLocation();

  if (!state) return <div className="text-center text-red-500 mt-10">No data submitted.</div>;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo (replace with your actual logo)
    // doc.addImage(logo, 'PNG', 15, 10, 30, 30);
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147); // Indigo color
    doc.setFont('helvetica', 'bold');
    doc.text('Home Academy', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('Student Registration Details', 105, 30, { align: 'center' });
    
    // Divider line
    doc.setDrawColor(40, 53, 147);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Student details section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    let yPosition = 50;
    const leftColumnX = 20;
    const rightColumnX = 110;
    let currentX = leftColumnX;
    
    // Personal Information section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Information', leftColumnX, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const personalFields = ['name', 'email', 'age', 'gender', 'phone'];
    personalFields.forEach(field => {
      if (state[field]) {
        const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
        doc.text(`${label}:`, currentX, yPosition);
        doc.text(state[field].toString(), currentX + 40, yPosition);
        yPosition += 8;
        
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
          currentX = leftColumnX;
        }
        
        // Switch to right column after half of personal fields
        if (field === 'age' && currentX === leftColumnX) {
          currentX = rightColumnX;
          yPosition = 60;
        }
      }
    });
    
    // Reset position for next section
    yPosition += 10;
    currentX = leftColumnX;
    
    // Education Information section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education Information', leftColumnX, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const educationFields = ['education', 'englishGoal', 'learningStyle', 'level'];
    educationFields.forEach(field => {
      if (state[field]) {
        const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
        doc.text(`${label}:`, currentX, yPosition);
        doc.text(state[field].toString(), currentX + 40, yPosition);
        yPosition += 8;
        
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
          currentX = leftColumnX;
        }
      }
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for registering with Home Academy', 105, 280, { align: 'center' });
    doc.text('Contact: info@homeacademy.com | Phone: +1234567890', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`HomeAcademy_Registration_${state.name || 'Student'}.pdf`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg max-w-2xl w-full p-8 border border-indigo-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Home Academy</h2>
          <h3 className="text-xl text-gray-600">Student Registration Summary</h3>
          <div className="h-1 bg-indigo-200 w-32 mx-auto my-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-indigo-700 mb-3 pb-2 border-b border-indigo-100">Personal Information</h4>
            <ul className="space-y-2">
              {['name', 'email', 'age', 'gender', 'phone'].map(key => (
                state[key] && (
                  <li key={key} className="flex">
                    <span className="font-medium text-gray-700 w-32">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-gray-600">{state[key]}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-indigo-700 mb-3 pb-2 border-b border-indigo-100">Education Information</h4>
            <ul className="space-y-2">
              {['education', 'englishGoal', 'learningStyle', 'level'].map(key => (
                state[key] && (
                  <li key={key} className="flex">
                    <span className="font-medium text-gray-700 w-32">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-gray-600">{state[key]}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={generatePDF}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Save as PDF
          </button>
          
          <Link to="/" className="flex">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 w-full flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Clear Form
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;