import { useState, useEffect } from 'react';
import photosData from '../content/photos.json';
import PhotoCarousel from '../components/PhotoCarousel';
import Photo from '../components/Photo';

function Music() {
  const [musicPhotos, setMusicPhotos] = useState([]);
  const [mePhotos, setMePhotos] = useState([]);

  useEffect(() => {
    const livePhotosFiltered = photosData.filter(photo => photo.section === 'live');
    setMusicPhotos(livePhotosFiltered);
    const mePhotoFiltered = photosData.filter(photo => photo.section === 'me');
    setMePhotos(mePhotoFiltered);
  }, []);

  return (
    <section className="container mx-auto px-4">
      <div className="text-center space-y-16">

        {/* Me Photo + About Text */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <Photo
              photo={mePhotos[0]}
              lockAspectRatio={false}
              aspectRatio=""
              className="rounded-2xl shadow-md object-cover w-full h-auto max-w-[400px]"
            />
          </div>
          <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
            <p className="text-lg leading-relaxed">
              I create music under my solo name as well as with my band <strong>daste.</strong>. 
              Our music blends organic and electronic elements to craft atmospheric, thoughtful soundscapes. 
              We've toured internationally, released multiple albums, and continue to evolve our sound for audiences around the world.
            </p>
          </div>
        </div>

        {/* YouTube Video + Live Carousel */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* YouTube Video */}
          <div className="w-full md:w-2/3">
            <div className="relative w-full aspect-[16/9]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-md"
                src="https://www.youtube.com/embed/tS8d4XtT5oM"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Live Photo Carousel */}
          <div className="w-full md:w-1/3 flex">
            <div className="w-full flex justify-center items-center">
              <div className="w-full h-full aspect-square">
              <PhotoCarousel
                photos={musicPhotos}
                changeInterval={5000}
              />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Music;