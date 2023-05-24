import React, { useEffect, useState } from 'react';
import { firestore } from '../auth/firebase';

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const db = firestore();
    db.collection('memories').get().then((querySnapshot) => {
      const memoriesData = [];
      querySnapshot.forEach((doc) => {
        memoriesData.push(doc.data());
      });
      setMemories(memoriesData);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMemories = memories.filter((memory) =>
    memory.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <input type="text" placeholder="Search by tag" onChange={handleSearch} />
      {filteredMemories.map((memory, index) => (
        <div key={index}>
          <h2>{memory.title}</h2>
          <img src={memory.photoUrl} alt={memory.title} />
          <p>{memory.description}</p>
          <p>Tags: {memory.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
