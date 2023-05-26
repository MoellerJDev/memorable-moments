import React, { useEffect, useState } from 'react';
import { firestore } from '../auth/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    <Container maxWidth="md">
      <TextField
        fullWidth
        placeholder="Search by tag"
        onChange={handleSearch}
        margin="normal"
      />
      <Grid container spacing={3}>
        {filteredMemories.map((memory, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {memory.title}
                </Typography>
                <Box component="img" src={memory.photoUrl} alt={memory.title} />
                <Typography variant="body2" color="text.secondary">
                  {memory.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tags: {memory.tags.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
