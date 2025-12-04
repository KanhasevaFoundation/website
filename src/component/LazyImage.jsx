import { useState } from 'react';

const LazyImage = ({ src, alt, className = '', placeholderClass = '', imgProps = {} }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className={`absolute inset-0 animate-pulse bg-gray-200 ${placeholderClass}`} />
      )}
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover ${loaded ? '' : 'opacity-0'}`}
          {...imgProps}
        />
      )}
      {errored && (
        <div className={`absolute inset-0 bg-gray-300 flex items-center justify-center ${placeholderClass}`}>
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
