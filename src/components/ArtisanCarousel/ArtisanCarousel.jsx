import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './ArtisanCarousel.module.css';

const ArtisanCarousel = ({ images = [] }) => {
  const ringRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default images if none provided
  const defaultImages = [
    'https://picsum.photos/id/32/600/400/',
    'https://picsum.photos/id/33/600/400/',
    'https://picsum.photos/id/34/600/400/',
    'https://picsum.photos/id/35/600/400/',
    'https://picsum.photos/id/36/600/400/',
    'https://picsum.photos/id/37/600/400/',
    'https://picsum.photos/id/38/600/400/',
    'https://picsum.photos/id/39/600/400/',
    'https://picsum.photos/id/40/600/400/',
    'https://picsum.photos/id/41/600/400/'
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!ringRef.current) return;

    // Calculate the rotation needed to center the current image
    const anglePerImage = 360 / displayImages.length;
    const targetRotation = 180 - (currentIndex * anglePerImage);

    // Animate the ring to the target rotation with smooth transition
    gsap.to(ringRef.current, {
      rotationY: targetRotation,
      duration: 0.8,
      ease: 'power2.out'
    });

  }, [currentIndex, displayImages.length]);

  useEffect(() => {
    if (!ringRef.current) return;

    // Set initial rotation
    gsap.set(ringRef.current, { rotationY: 180 });

    // Apply transforms to each image
    const imgs = ringRef.current.querySelectorAll(`.${styles.img}`);
    imgs.forEach((img, i) => {
      gsap.set(img, {
        rotateY: i * -(360 / displayImages.length),
        transformOrigin: '50% 50% 500px',
        z: -500,
        backgroundImage: `url(${displayImages[i] || `https://picsum.photos/id/${i + 32}/600/400/`})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backfaceVisibility: 'hidden',
        opacity: 1
      });
    });

  }, [displayImages]);

  return (
    <div className={styles.stage}>
      <div className={styles.container}>
        <div className={styles.ring} ref={ringRef}>
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={styles.img}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className={styles.navigation}>
        <button 
          className={styles.navButton} 
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <div className={styles.dots}>
          {displayImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className={styles.navButton} 
          onClick={goToNext}
          aria-label="Next image"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ArtisanCarousel; 