
import React, { useState } from 'react';

function Upload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // TODO: Implement actual upload logic

    setLoading(false);
  };

  return (
    <div>
      <h1>Upload Memory</h1>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Tags" />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default Upload;
