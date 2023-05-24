import { useEffect, useState } from 'react';
import { firebase } from '../auth/firebase';  // Assuming you have a firebase.js file exporting your Firebase configurations

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    firebase.collection('memories').get().then((querySnapshot) => {
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
