import React, { useState } from 'react';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Perform the upload logic using the selected file
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
