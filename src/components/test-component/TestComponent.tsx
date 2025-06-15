import React, { ChangeEvent, useState } from 'react';
import { SkillCoinDescription } from '../entity-full-info/skill-coin-description/SkillCoinDescription';

interface ITestComponentProps {}

export const TestComponent: React.FC<ITestComponentProps> = () => {
  const [description, setDescription] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <textarea style={ {
        marginTop:"30px",
        marginBottom:"50px",
        fontSize:"24px",
        fontWeight:"500",
      }} cols={130} rows={10} onChange={handleChange}></textarea>
      {
        description.split("|").map((desc,index)=>{
            return <div key={index} style={{width:"1100px",padding:"20px", backgroundColor:"#131319",marginBottom:"50px"}} >
            <SkillCoinDescription description={desc} />
        </div>
        })
      }
        
    </>
  );
};
