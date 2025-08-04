import React from "react";
import TeacherCarousel from "../components/TeacherCarousel";

const teachers = [
  { 
    image: "st1.jpg",
  },
  { 
    image: "st2.jpg",
  },
  
  { 
    id: "4",
    image: "st4.jpg",
  },
  { 
    id: "5",
    image: "st5.jpg",
  },
  { 
   
    image: "st6.jpg",
  },
   { 
   
    image: "st7.jpg",
  },
   { 
   
    image: "st8.jpg",
  },
   { 
   
    image: "st9.jpg",
  },
   { 
   
    image: "st10.jpg",
  },
   { 
   
    image: "st11.jpg",
  },
  { 
   
    image: "st12.jpg",
  },
   { 
   
    image: "st13.jpg",
  },
   { 
   
    image: "st14.jpg",
  },
    { 
   
    image: "st15.jpg",
  },
   { 
   
    image: "st16.jpg",
  },
];

const Student = () => {
  return (
    <div className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-black">
          Meet Our Students 
        </h2>
        <TeacherCarousel 
          teachers={teachers} 
          cardsPerView={4} 
        />
      </div>
    </div>
  );
};

export default Student;