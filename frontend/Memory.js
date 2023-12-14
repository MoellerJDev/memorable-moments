import React from 'react';

function Memory({ memory }) {
  return (
    <div>
      <h3>{memory.title}</h3>
      <p>{memory.description}</p>
      <p>Tags: {memory.tags}</p>
    </div>
  );
}

export default Memory;