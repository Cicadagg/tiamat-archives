import React from 'react';
import './FilterButtonGuides.css'


interface FilterButtonGuidesProps {
  isTypeActive: boolean;
  handleFilterChange: () => void;
  type: string;
  name: string;
}

export const FilterButtonTags: React.FC<FilterButtonGuidesProps> = ({
  isTypeActive,
  handleFilterChange,
  type,
  name
}) => {
  return (
    <button 
      className={`new-filter-button tag-button ${isTypeActive ? 'new-filter-button--active' : ''}`}
      onClick={handleFilterChange}
    >
      {name}
    </button>
  );
};