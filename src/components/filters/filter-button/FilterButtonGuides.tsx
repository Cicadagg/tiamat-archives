import React from 'react';

interface FilterButtonGuidesProps {
  isTypeActive: boolean;
  handleFilterChange: () => void;
  type: string;
  name: string;
}

export const FilterButtonGuides: React.FC<FilterButtonGuidesProps> = ({
  isTypeActive,
  handleFilterChange,
  type,
  name
}) => {
  return (
    <button 
      className={`new-filter-button ${isTypeActive ? 'new-filter-button--active' : ''}`}
      onClick={handleFilterChange}
    >
      {name}
    </button>
  );
};