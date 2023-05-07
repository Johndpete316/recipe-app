import React, { useState, useEffect } from 'react';

interface RecipeImageProps {
  token: string;
}


const RecipeImage: React.FC<RecipeImageProps> = ({ token }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const placeholderImageUrl = '/api/placeholder';
  // this is a placeholder token, replace with your actual token

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(placeholderImageUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const imageBlob = await response.blob();
        const localImageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(localImageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchImage();
  }, [placeholderImageUrl, token]);

  return (
    <div>
      {imageSrc && (
        <img
          loading="lazy"
          src={imageSrc}
          alt="Placeholder"
          className="w-full h-auto object-cover"
        />
      )}
    </div>

  );
}

export default RecipeImage;
