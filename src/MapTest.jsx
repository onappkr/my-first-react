import React from 'react';

function MapTest() {
  const flowers = ['장미', '국화', '해바라기', '튤립'];
  return (
    <div>
      <ul>
        {flowers.map((flower, index) => (
          <li key={index}>나는 {flower}를 좋아해요.</li>
        ))}
      </ul>
    </div>
  );
}

export default MapTest;
