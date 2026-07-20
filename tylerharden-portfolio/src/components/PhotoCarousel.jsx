import { useState, useEffect } from 'react';

function PhotoCarousel({ photos, changeInterval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, changeInterval);

    return () => clearInterval(interval);
  }, [photos, changeInterval]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div className="relative w-full h-full mb-12">
      {/* 👆 NO ASPECT CLASS HERE - just let it stretch */}
      <img 
        src={currentPhoto.path} 
        alt={currentPhoto.alt} 
        className="w-full h-full object-cover rounded-2xl shadow-md transition-all duration-700 ease-in-out"
      />
      {/* 👆 ALWAYS h-full */}
      <div className="absolute bottom-4 left-4 bg-white/70 dark:bg-black/50 text-xs rounded-lg px-3 py-1 backdrop-blur-md">
        {currentPhoto.location} — {currentPhoto.credit}
      </div>
    </div>
  );
}

export default PhotoCarousel;