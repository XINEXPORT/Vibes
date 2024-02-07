import {useState} from 'react'
import Sketch from 'react-p5';

const Room = (props) => {
    let particles = [];
    const num = 1000;
    const noiseScale = 0.01;
  
    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
  
      for (let i = 0; i < num; i++) {
        particles.push(p5.createVector(p5.random(p5.width), p5.random(p5.height)));
      }
  
      p5.draw = () => {
        p5.background(0, 8);
        p5.stroke(246,210,88);
  
        for (let i = 0; i < num; i++) {
          let part = particles[i];
  
          p5.point(part.x, part.y);
          let n = p5.noise(part.x * noiseScale, part.y * noiseScale);
          let a = p5.TAU * n;
          part.x += p5.cos(a);
          part.y += p5.sin(a);
  
          if (!onScreen(part, p5.width, p5.height)) {
            part.x = p5.random(p5.width);
            part.y = p5.random(p5.height);
          }
        }
      };
  
      const mouseReleased = () => {
        noiseScale(p5.millis());
      };
  
      function onScreen(v, width, height) {
        return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
      }
    };
  
    
    return (
      <div className="MainRoom">
          <Sketch setup={setup} />
      </div>
    );
  };
  

export default Room