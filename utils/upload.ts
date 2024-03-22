export const uploadImage = async (file: File): Promise<string | false> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async function () {
      const imageData = reader.result;

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageData }),
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        resolve(data.imageURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        reject(null);
      }
    };
  });
};
