import React, { useState } from 'react';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      fetch('https://api.imgur.com/3/image/', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Image URL: ', data.data.link);
            // Store the image URL or use it as needed
          } else {
            console.error('Upload failed');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };
  

  return (
    <div>
      <h1>Photo Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PhotoUpload;
