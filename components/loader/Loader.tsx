'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './loader.css';

const loaderImages = [
  '/loader/img1.png',
  '/loader/img2.png',
  '/loader/img3.png',
  '/loader/img4.png',
  '/loader/img1.png',
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [loadingDone, setLoadingDone] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Reduced minimum animation time
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeReached(true);
    }, 20); // Reduced from 50ms to 20ms
    return () => clearTimeout(timer);
  }, []);

  // Optimized image loading with timeout
  useEffect(() => {
    const images = Array.from(document.images);
    if (images.length === 0) {
      setAllImagesLoaded(true);
      return;
    }

    let loaded = 0;
    const timeoutId = setTimeout(() => {
      setAllImagesLoaded(true);
    }, 3000); // 3 second timeout

    const checkDone = () => {
      loaded++;
      if (loaded === images.length) {
        setAllImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkDone();
      } else {
        img.addEventListener('load', checkDone, { once: true });
        img.addEventListener('error', checkDone, { once: true });
      }
    });

    return () => {
      clearTimeout(timeoutId);
      images.forEach((img) => {
        img.removeEventListener('load', checkDone);
        img.removeEventListener('error', checkDone);
      });
    };
  }, []);

  // Once both conditions are met, hide loader
  useEffect(() => {
    if (minTimeReached && allImagesLoaded) {
      setLoadingDone(true);
      onComplete();
    }
  }, [minTimeReached, allImagesLoaded, onComplete]);

  if (loadingDone) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#fcf1ee] flex flex-col items-center justify-center space-y-4">
      <p className="text-black text-2xl font-bold">Welcome!</p>
      <div className="w-[80px] h-[80px] overflow-hidden relative">
        <div className="flex animate-train">
          {loaderImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Loader ${index}`}
              width={80}
              height={80}
              loading="eager"
              className="object-contain"
              unoptimized
            />
          ))}
        </div>
      </div>
    </div>
  );
}
