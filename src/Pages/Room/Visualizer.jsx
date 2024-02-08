import React, {useState, useRef, useEffect} from 'react';
// import { AudioVisualizer } from 'react-audio-visualize';
import fs from 'fs';

const Visualizer = ({soundOne}) => {
    const [blob, setBlob] = useState();
    const visualizerRef = useRef(null)

    console.log(soundOne)

    function readFileAsBlob(filePath) {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => {
          if (error) {
            reject(error);
          } else {
            const blob = new Blob([data]);
            resolve(blob);
          }
        });
      });
    }

    
useEffect(()=>{
  console.log("useEffect Hit")
  if(soundOne){
    const filePath = `../${soundOne.sound}`;
    readFileAsBlob(filePath)
      .then(res => {
        console.log(".then hit")
        console.log(res)
        setBlob(res)
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setBlob(`../${soundOne.sound}`)
  }

},[soundOne])


    return(
        <div>
            {blob && (
                <AudioVisualizer
                ref={visualizerRef}
                blob={blob}
                width={500}
                height={75}
                barWidth={1}
                gap={0}
                barColor={'#000000'}
                />
            )}
        </div>
    )

}

export default Visualizer;