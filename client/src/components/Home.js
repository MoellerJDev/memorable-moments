import React, { useEffect, useState } from 'react';
import { firestore } from '../auth/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const memoriesCollection = collection(firestore, 'memories');
      const querySnapshot = await getDocs(memoriesCollection);
      const memoriesData = querySnapshot.docs.map((doc) => doc.data());
      setMemories(memoriesData);
    };

    fetchData();
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
