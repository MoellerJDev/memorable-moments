
import React, { useState, useEffect } from 'react';
import Memory from './Memory';

function Home() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    // Simulated data fetching
    setMemories([
      { id: 1, title: 'Memory One', description: 'Description One', tags: 'tag1, tag2' },
      { id: 2, title: 'Memory Two', description: 'Description Two', tags: 'tag3, tag4' },
    ]);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {memories.map(memory => <Memory key={memory.id} memory={memory} />)}
    </div>
  );
}

export default Home;
