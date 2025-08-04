import React from "react";
import TeacherCarousel from "../components/TeacherCarousel";

const teachers = [
  { 
    image: "sir1.jpg",
  },
  { 
    image: "sir2.jpg",
  },
  { 
    
    image: "sir3.jpg",
  },
  { 
    id: "4",
    image: "sir4.jpg",
  },
  { 
    id: "5",
    image: "sir5.jpg",
  },
  { 
    id: "5",
    image: "te1.jpg",
  },
   { 
    id: "5",
    image: "te2.jpg",
  },
   { 
    id: "5",
    image: "te3.jpg",
  },
  { 
    id: "5",
    image: "te4.jpg",
  },
  { 
    id: "5",
    image: "te6.jpg",
  },
  { 
   
    image: "silver.jpg",
  },
];

const Teacher = () => {
  return (
    <div className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Meet Our Dedicated Teachers
        </h2>
        <TeacherCarousel 
          teachers={teachers} 
          cardsPerView={4} 
        />
      </div>
    </div>
  );
};

export default Teacher;