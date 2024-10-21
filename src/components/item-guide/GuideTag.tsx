import React from 'react';
import '../filters/filter-button/FilterButtonGuides.css'


interface GuideTagProps {
  name: string;
}

export const GuideTag: React.FC<GuideTagProps> = ({
  name
}) => {
  return (
    <button 
      className={`new-filter-button tag-button`}
    >
      {name}
    </button>
  );
};