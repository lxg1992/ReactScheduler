import {useState} from 'react';

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {    
    setMode(mode);
    if(replace){
      setHistory(prev => ([...prev].slice(0,-1)))
    }
    setHistory(prev => ([...prev, mode]));
  }

  const back = () => {
    history.pop();
    setMode(history[history.length-1]);    
  }
  return {
    mode,
    transition,
    back
  }
}
 

