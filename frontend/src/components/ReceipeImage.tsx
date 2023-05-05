import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';

const RecipeImage: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const placeholderImageUrl = '/api/placeholder';
  const authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVXUW1lbDlEWWFwN0FEWTVhUEhueSJ9.eyJpc3MiOiJodHRwczovL2Rldi0xMXZyNndjMy5hdXRoMC5jb20vIiwic3ViIjoiV1JjUVFvN1JOZDVQMGRSdHhYaHFkd3VKWlJ3YnNkcVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlYXBpLmRyaWxsY2hhbi5uZXQiLCJpYXQiOjE2ODI4MTE3NjEsImV4cCI6MTY4NTQwMzc2MSwiYXpwIjoiV1JjUVFvN1JOZDVQMGRSdHhYaHFkd3VKWlJ3YnNkcVYiLCJzY29wZSI6InJlYWQ6bWVzc2FnZXMgcmVhZDpyZWNpcGVzIHdyaXRlOmRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.YzXrax4l5NSvGdi6Cy-y9nxDn4auOIa9QM4c_nc4c8qGzVKfmcr2yT07rATdlyec193c_JNNmwG2_bu9gBsmVcT6aqpkL4xhWoRnldaM35tprh7GdWMqi3uemSjj-3H-Ba7WlZT8PLGrT84fXRScdSWgfHvoN_OAOjtctH7Psk0kRkVeUJenHFXY66M37p0s9UZUUQkXSqJ-xju1E74qZi3NxLCGllqjbW0rWgclWWq_NQcFBG3rw1TbBzB9LUOAjTqalX35l73a6gMMEpKylz9vtCyjOoLNFR9hWAkHqG1xrLsbvPjrAWCvQjutozqmy4TZVHk-0lTtVyLhvOcAZQ'; // Replace with your actual authentication token

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(placeholderImageUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
  }, [placeholderImageUrl, authToken]);

  return (
    <div>
      {imageSrc && <Image loading="lazy" src={imageSrc} alt="Placeholder" className='image'/>}
    </div>
  );
}

export default RecipeImage;
