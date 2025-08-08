import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FaFilePdf, FaHome, FaCheckCircle, FaUserGraduate, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const ResultPage = () => {
  const { state } = useLocation();

  if (!state) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-4">
        <FaCheckCircle className="text-red-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Registration Data Found</h2>
        <p className="text-gray-600 mb-6">Please complete the registration form first.</p>
        <Link to="/register" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
          Go to Registration
        </Link>
      </div>
    </div>
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add watermark
    doc.setFontSize(60);
    doc.setTextColor(240, 240, 240);
    doc.setFont('helvetica', 'bold');
    doc.text('HOME ACADEMY', 40, 140, { angle: 45 });
    
    // Reset styles for content
    doc.setTextColor(0, 0, 0);
    
    // Add header with logo
    doc.addImage('/home.png', 'PNG', 15, 10, 30, 30);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 53, 147);
    doc.text('Home Academy', 50, 25);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Student Registration Certificate', 50, 35);
    
    // Divider line
    doc.setDrawColor(40, 53, 147);
    doc.setLineWidth(0.5);
    doc.line(15, 40, 195, 40);
    
    // Main content
    let yPosition = 60;
    
    // Certificate text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    // Student name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 53, 147);
    doc.text(state.name || 'Student', 105, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Details section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully registered for our English language program with the following details:', 105, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Two column layout
    const leftColumnX = 30;
    const rightColumnX = 120;
    
    const renderField = (doc, x, y, label, value) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, x, y);
      doc.setFont('helvetica', 'normal');
      doc.text(value, x + 40, y);
    };
    
    // Personal Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Information', leftColumnX, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    const personalFields = [
      { label: 'Email', value: state.email },
      { label: 'Age', value: state.age },
      { label: 'Gender', value: state.gender },
      { label: 'Phone', value: state.phone }
    ];
    
    personalFields.forEach(field => {
      if (field.value) {
        renderField(doc, leftColumnX, yPosition, field.label, field.value);
        yPosition += 8;
      }
    });
    
    // Education Information
    yPosition += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education Information', rightColumnX, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    const educationFields = [
      { label: 'Education', value: state.education },
      { label: 'English Goal', value: state.englishGoal },
      { label: 'Learning Style', value: state.learningStyle },
      { label: 'Level', value: state.level }
    ];
    
    educationFields.forEach(field => {
      if (field.value) {
        renderField(doc, rightColumnX, yPosition, field.label, field.value);
        yPosition += 8;
      }
    });
    
    // Footer
    yPosition = 260;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing Home Academy for your English learning journey.', 105, yPosition, { align: 'center' });
    yPosition += 5;
    doc.text('Contact: homeacademy.lyari@gmail.com | Phone: 0332-3769179 / 0332-2449008', 105, yPosition, { align: 'center' });
    
    // Save the PDF
    doc.save(`HomeAcademy_Certificate_${state.name || 'Student'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-700 p-6 text-center relative">
            <div className="absolute top-4 left-4">
              <img src="/home.png" alt="Home Academy Logo" className="h-12" />
            </div>
            <h1 className="text-3xl font-bold text-white mt-4">Registration Confirmation</h1>
            <p className="text-indigo-200 mt-2">Your learning journey starts here</p>
          </div>
          
          {/* Content Section */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Student Profile Card */}
              <div className="bg-indigo-50 rounded-lg p-6 flex-1">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaUserGraduate className="text-indigo-600 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{state.name}</h2>
                    <p className="text-indigo-600">{state.email}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaBook className="text-indigo-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Course Level</p>
                      <p className="font-medium">{state.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaChalkboardTeacher className="text-indigo-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Learning Style</p>
                      <p className="font-medium">{state.learningStyle}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Personal Details</h3>
                    <div className="space-y-3">
                      {['age', 'gender', 'phone'].map(key => (
                        state[key] && (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="font-medium">{state[key]}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Education Details</h3>
                    <div className="space-y-3">
                      {['education', 'englishGoal'].map(key => (
                        state[key] && (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="font-medium text-right max-w-xs">{state[key]}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={generatePDF}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <FaFilePdf className="text-xl" />
                Download Certificate
              </button>
              
              <Link to="/" className="flex">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 w-full">
                  <FaHome />
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              Need help? Contact us at homeacademy.lyari@gmail.com or call 0332-3769179
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;