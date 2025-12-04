import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { api } from '../apiClient';
import LazyImage from '../component/LazyImage';

const Gallery = () => {
    const [images, setImages] = useState([]);

    
    // Function to fetch images from Cloudinary folder
    const fetchImages = async () => {
        try {
            const response = await api.get('/api/images');
            const data = response.data;
            if (data) {
                const shuffledImages = data.sort(() => Math.random() - 0.5);
                setImages(shuffledImages.slice(0, 8));
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
        <section>
                <Helmet>
                  <title>Gallery – Kanhaseva</title>
                  <meta name="description" content="Photos from cow feeding, meals served, and seva moments." />
                  <link rel="canonical" href="https://kanhasevain.vercel.app/gallery" />
                  <meta property="og:title" content="Gallery – Kanhaseva" />
                  <meta property="og:description" content="Explore seva activities in pictures." />
                  <meta property="og:url" content="https://kanhasevain.vercel.app/gallery" />
                  <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
                  <meta name="twitter:card" content="summary_large_image" />
                </Helmet>
                <h3 className="text-2xl flex justify-center font-bold text-sky-900 mb-6">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-5 mx-20">
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
    );
};

export default Gallery;
