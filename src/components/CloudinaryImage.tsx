import { useState, useEffect } from 'react';

interface CloudinaryImageProps {
  publicId: string;
  fallbackPath: string;
  alt: string;
  className?: string;
  transformation?: string;
  cloudName?: string;
}

/**
 * CloudinaryImage component that loads images from Cloudinary when online
 * and falls back to local images when offline or if Cloudinary fails.
 * 
 * @param publicId - The Cloudinary public_id (e.g., "hero_home")
 * @param fallbackPath - Local image path (e.g., "/landing/hero/home.png")
 * @param alt - Alt text for the image
 * @param className - Optional CSS classes
 * @param transformation - Optional Cloudinary transformation string (e.g., "w_1200,h_800,c_fill")
 * @param cloudName - Cloudinary cloud name (defaults to env variable or 'demo')
 */
export function CloudinaryImage({
  publicId,
  fallbackPath,
  alt,
  className = '',
  transformation = '',
  cloudName = (window as any).__ENV__?.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
}: CloudinaryImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallbackPath);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // Update online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setImageSrc(fallbackPath);
      return;
    }

    // If cloudName is 'demo', use fallback instead of trying Cloudinary
    if (cloudName === 'demo') {
      setImageSrc(fallbackPath);
      return;
    }

    // Build Cloudinary URL
    const transformationPath = transformation ? `${transformation}/` : '';
    const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationPath}${publicId}`;

    // Test if Cloudinary image is accessible
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(cloudinaryUrl);
    };
    
    img.onerror = () => {
      // Fallback to local image if Cloudinary fails
      console.warn(`Failed to load Cloudinary image: ${publicId}, using fallback: ${fallbackPath}`);
      setImageSrc(fallbackPath);
    };

    img.src = cloudinaryUrl;
  }, [publicId, fallbackPath, transformation, cloudName, isOnline]);

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className={className}
    />
  );
}

interface CloudinaryBackgroundImageProps {
  publicId: string;
  fallbackPath: string;
  className?: string;
  transformation?: string;
  cloudName?: string;
  children?: React.ReactNode;
}

/**
 * CloudinaryBackgroundImage component for use with background images
 * (e.g., in hero sections with absolute positioned divs).
 * 
 * @param publicId - The Cloudinary public_id (e.g., "hero_home")
 * @param fallbackPath - Local image path (e.g., "/landing/hero/home.png")
 * @param className - Optional CSS classes
 * @param transformation - Optional Cloudinary transformation string
 * @param cloudName - Cloudinary cloud name (defaults to env variable or 'demo')
 * @param children - Optional child elements
 */
export function CloudinaryBackgroundImage({
  publicId,
  fallbackPath,
  className = '',
  transformation = '',
  cloudName = (window as any).__ENV__?.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo',
  children
}: CloudinaryBackgroundImageProps) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>(fallbackPath);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setBackgroundUrl(fallbackPath);
      return;
    }

    // If cloudName is 'demo', use fallback instead of trying Cloudinary
    if (cloudName === 'demo') {
      setBackgroundUrl(fallbackPath);
      return;
    }

    const transformationPath = transformation ? `${transformation}/` : '';
    const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationPath}${publicId}`;

    const img = new Image();

    img.onload = () => {
      setBackgroundUrl(cloudinaryUrl);
    };

    img.onerror = () => {
      console.warn(`Failed to load Cloudinary image: ${publicId}, using fallback: ${fallbackPath}`);
      setBackgroundUrl(fallbackPath);
    };

    img.src = cloudinaryUrl;
  }, [publicId, fallbackPath, transformation, cloudName, isOnline]);

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
}
