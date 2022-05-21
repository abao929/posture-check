import { text } from 'node:stream/consumers';
import React, { useEffect, useState } from 'react';
import './App.css';
import Strobe from './Strobe';
import './strobe.scss';

function App() {
  const NUM_AUDIOS: number = 5;
  const FIVE_MINS: number = 60000 * 5;
  const [audioEnabled, setAudioEnabled] = useState<Boolean>(false);
  const [flashEnabled, setFlashEnabled] = useState<Boolean>(false);

  const playAudio = (i: number) => {
    console.log(`play audio ${i}`);
    let audio: HTMLAudioElement = new Audio(
      require(`./sounds/sound${i + 1}.wav`)
    );
    audio.play();
  };

  const flash = (i: number) => {
    let textElement: HTMLElement | null = document.querySelector('#strobe');
    if (textElement) {
      textElement.textContent = 'what the fuck';
      textElement.classList.remove('stopped');
      console.log('should be removed');
      console.log(textElement.classList);
      textElement.classList.add('stopped');
      console.log(textElement.classList);
    }
    console.log(`flash ${i}`);
  };

  const postureAlert = () => {
    let i: number = Math.floor(Math.random() * NUM_AUDIOS);
    if (audioEnabled) playAudio(i);
    // if (flashEnabled) flash(i);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      postureAlert();
    }, FIVE_MINS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      <div className={`title ${flashEnabled ? 'strobe' : ''}`}>
        SIT UP STRAIGHT
      </div>
      <div className="text">
        {!audioEnabled &&
          !flashEnabled &&
          'If neither are enabled nothing will happen lol'}
      </div>
      <div className="buttons-container">
        <div className="button-group">
          <div className="text">
            Audio is currently {audioEnabled ? 'enabled' : 'disabled'}
          </div>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="button"
          >
            Click to Toggle Audio
          </button>
        </div>
        <div className="button-group">
          <div className="text">
            Flashing is currently {flashEnabled ? 'enabled' : 'disabled'}
          </div>
          <button
            onClick={() => setFlashEnabled(!flashEnabled)}
            className="button"
          >
            Click to Toggle Flashing
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
