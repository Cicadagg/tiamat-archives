import React from 'react';
import './TextPercentComponent.css';

interface TextPercentComponentProps {
  text: string;
  Mapper?: React.FC<{ text: string }>;
}

export const TextPercentComponent: React.FC<TextPercentComponentProps> = ({ text, Mapper }) => {
  const splittedText = text.split("%");

  return (
    <div className='TextPercentComponent-wrapper'>
      <span>
        {splittedText.map((part, index) => (
          <React.Fragment key={index}>
            {Mapper ? <Mapper text={part} /> : part}
            {index < splittedText.length - 1 && <span className='perCent-special-font'>%</span>}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
};
