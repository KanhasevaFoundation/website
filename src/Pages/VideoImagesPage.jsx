import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { api } from '../apiClient';
import LazyImage from '../component/LazyImage';

const VideosAndImagesPage = () => {
    const [images, setImages] = useState([]);

    
    // Function to fetch images from Cloudinary folder
    const fetchImages = async () => {
        try {
            const response = await api.get('/api/images');
            const data = response.data;
            if (data) {
                // Shuffle the images
                const shuffledImages = data.sort(() => Math.random() - 0.5);
                setImages(shuffledImages.slice(0, 8)); // Display only 8 images
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Fetch images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div >
            <Helmet>
              <title>Gallery – Kanhaseva</title>
              <meta name="description" content="Browse photos from cow feeding, meal sharing, and seva activities." />
              <link rel="canonical" href="https://kanhasevain.vercel.app/gallery" />
              <meta property="og:title" content="Gallery – Kanhaseva" />
              <meta property="og:description" content="Photos from ongoing seva activities." />
              <meta property="og:url" content="https://kanhasevain.vercel.app/gallery" />
              <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            {/* First Section: YouTube Shorts */}
           

            {/* Second Section: Cloudinary Images */}
            <section>
                <h2 className="text-2xl font-bold text-center my-4 text-sky-500 font-poppins">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mx-20">
                    {images.map((image, index) => (
                        <div key={index} className="aspect-w-1 aspect-h-1">
                            <LazyImage
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full rounded-lg shadow-lg"
                                placeholderClass="rounded-lg"
                              />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default VideosAndImagesPage;
