import React, { useState } from 'react';

const SortButton = ({ setSortOrder }) => {
  const [order, setOrder] = useState('low');

  const toggleSortOrder = () => {
    const newSortOrder = order === 'low' ? 'high' : 'low';
    setOrder(newSortOrder);
    // Map 'low' and 'high' to 'asc' and 'desc' respectively for backend sorting
    setSortOrder(newSortOrder === 'low' ? 'asc' : 'desc');
  };

  return (
    <div className='sort'>
      <button onClick={toggleSortOrder} className='sortBtn'>
        {order === 'low' ? 'Sort High to Low' : 'Sort Low to High'}
      </button>
    </div>
  );
};

export default SortButton;