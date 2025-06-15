import React, { ChangeEvent, useEffect, useState } from 'react';
import { MDEventOption, Option } from '../mirror-dungeon/events/option/MDEventOption';

interface ITestComponentProps {}
const data:Option = {
  "gift_id":"some gift id",
  "options":{
      "option_name_1":{
          "check":{
              "glut":{
                  "function":">",
                  "value":2
              },
              "*":{
                  "function":"<=",
                  "value":8
              }
          },
          "check_passed":{
              "result":"E.G.O Gift #gift_2# Earned!"
          },
          "check_failed":{
              "result":"All Allies took 18 HP and SP damage!"
          }
      },
      "option_name_2":{
          "options":{
              "option_name_111":{
                "check":{
                  "glut":{
                      "function":">",
                      "value":2
                  },
                  "*":{
                      "function":"<=",
                      "value":8
                  }
                },
                "check_passed":{
                  "result":"E.G.O Gift #gift_2# Earned!",
                },
                "check_failed":{
                    "result":"All Allies took 18 HP and SP damage!"
                }
              }
          }
      }
  }
}
export const TestComponentMDOption: React.FC<ITestComponentProps> = () => {
  const [description, setDescription] = useState<Option|null>(null);
  const [text, setText] = useState<string>(JSON.stringify(data));
  useEffect(()=>{
    try{
      setDescription(data);
    }catch(e){
      setDescription(null);
    }
  },[])
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)

    try{
      const parsed = JSON.parse(e.target.value) as Option;
      setDescription(parsed);

    }catch(e){
      setDescription(null);

    }
  };

  return (
    <>
      <textarea style={ {
        marginTop:"30px",
        marginBottom:"50px",
        fontSize:"24px",
        fontWeight:"500",
      }} 
      value={text}
      cols={130} 
      rows={10} 
      onChange={handleChange}></textarea>
      {
        <div 
          style={{width:"1100px",padding:"20px", backgroundColor:"#131319",marginBottom:"50px"}} >
          { description && <MDEventOption option={description}></MDEventOption>}
        </div>
      }
        
    </>
  );
};
