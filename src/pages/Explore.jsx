import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Explore() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const images = [
    { id: 'img1', src: '/students.jpg' },
    { id: 'img2', src: '/stu2.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu3.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu12.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu4.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu5.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu6.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu7.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu8.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu10.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu11.jpg', alt: "Student group 2" },
    { id: 'img2', src: '/stu9.jpg', alt: "Student group 2" },
    // Add all your images here...
  ];

  return (
    <div className="bg-background p-4">
      <h1 className='text-3xl font-bold text-indigo-700 text-center mt-5 mb5'>Explore, Our Students</h1>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((image) => (
            <div 
              key={image.id}
              className="flex-[0_0_90%] sm:flex-[0_0_55%] mx-2"
            >
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg"> {/* 16:9 aspect ratio container */}
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="absolute top-0 left-0 w-full h-full object-contain shadow-indigo-700"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons remain the same */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={scrollPrev} className="p-2 border-2 rounded-full left-4 bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary hover:scale-105 transition-transform">
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? 'bg-primary scale-125' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button onClick={scrollNext} className="p-2 border-2 rounded-full right-4 bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary hover:scale-105 transition-transform">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default Explore;