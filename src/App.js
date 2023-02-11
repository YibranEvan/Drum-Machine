import React from "react";
import { render } from "react-dom";
import { useState, useEffect } from "react";

const audioClips = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const Pad =({ clip, volume, setDisplay }) => {
  const [color, setColor] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };


  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setColor(true);
    setTimeout(() => setColor(false), 100);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setDisplay(() => clip.id + "")
  };


  return (
    <>
    <div onClick={playSound}
      id="drum-machine"
      className={`drum-pad ${color && "pad-color"}`}>
      <audio className="clip" id={clip.keyTrigger}src={clip.url}/>
      {clip.keyTrigger}
    </div>
    </>
  )
};

const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [display, setDisplay] = useState("");

  return (
    <>
      <div>
        <div id="drum-machine" className="container">
            <div id="padDisplay" className="prevent-select">
              {audioClips.map((clip) => (
                <Pad key={clip.id} clip={clip} volume={volume} setDisplay={setDisplay}/>
              ))}
            </div>
            <div id="control-panel">
                <div id="powerSwitch">
                    <p>Power</p>
                      <label className="switch" >
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                      </label>
                </div>
                <div className="display-box">
                <div id="display">{display}</div>
                </div>
                <div id="volume">Volume</div>
                  <input 
                  type="range" 
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e) => setVolume(e.target.value)}
                  value={volume}
                  className="volume-slider"
                  ></input>
                <div id="bank">
                  <p>Bank</p>
                  <label className="switch" >
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                  </label>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}


const App = () => {

  return (
    <>
    <div>
        <DrumMachine/>
    </div>
    </>
  )
}

render(<App />, document.getElementById("root"));