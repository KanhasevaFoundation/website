import React, { useEffect, useState } from "react";

const VideosAndImagesPage = () => {
    const [images, setImages] = useState([]);

    // Cloudinary API credentials (replace with your credentials)
    const cloudName = "dfq1dytmn";
    const apiKey = "875378632358295";
    const folderName = "Imagesgallery";
    const apiSecret = "NBwgUu8_SFSzDj2ZlpdE62o2Z3A" // Replace with your folder name

    // Function to fetch images from Cloudinary folder
    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/images'); // Call your backend endpoint
            const data = await response.json();
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
            {/* First Section: YouTube Shorts */}
           

            {/* Second Section: Cloudinary Images */}
            <section>
                <h2 className="text-2xl font-bold text-center my-4 text-sky-500 font-poppins">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mx-20">
                    {images.map((image, index) => (
                        <div key={index} className="aspect-w-1 aspect-h-1">
                            <img
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default VideosAndImagesPage;