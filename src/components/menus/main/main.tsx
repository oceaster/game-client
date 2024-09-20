// Assets
import './main.css';
import mainAudioMp3 from './main.mp3';
import mainBackground from '../../../assets/images/bg0.jpg';

import closeSVG from '../../../assets/svgs/close.svg';
import statusSVG from '../../../assets/svgs/status.svg';
import friendsSVG from '../../../assets/svgs/friends.svg';
import audioOnSVG from '../../../assets/svgs/audioOn.svg';
import audioOffSVG from '../../../assets/svgs/audioOff.svg';
import exitFullscreenSVG from '../../../assets/svgs/exitFullscreen.svg';
import enterFullscreenSVG from '../../../assets/svgs/enterFullscreen.svg';

import errorSVG from '../../../assets/svgs/error.svg';
import spinnerSVG from '../../../assets/svgs/spinner.svg';
import noConnectionSVG from '../../../assets/svgs/noConnection.svg';

import CharacterCreator from './cc';

// Components
import { VolumeSlider } from './slider';

// Library
import { useRef, useState, useEffect } from 'react';
import { enterFullscreen, exitFullscreen } from '../../../library/fullscreen';


const MainMenu = () => {
  const [scene, setScene] = useState<string>('main');
  const [isFS, setFS] = useState<boolean>(document.fullscreenElement !== null);
  const [isAudioEnabled, setAudioEnabled] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const exitFS = () => {
    exitFullscreen();
    setFS(false);
  };

  const enterFS = () => {
    enterFullscreen();
    setFS(true);
  }

  useEffect(() => {
    const fullscreenCallback = (event: any) => {
      console.log(event);
      setFS(document.fullscreenElement !== null);
    };

    if (isAudioEnabled && audioRef.current !== null) {
      audioRef.current.play();
    } else if (!isAudioEnabled && audioRef.current !== null) {
      audioRef.current.pause();
    }

    if (!isAudioEnabled && !audioRef.current?.paused) {
      setAudioEnabled(true);
    }

    document.addEventListener("fullscreenchange", fullscreenCallback);
    return document.removeEventListener("fullscreenchange", fullscreenCallback);
  }, [isFS, isAudioEnabled, audioRef.current]);

  return <div className="viewContainer">
    <audio ref={audioRef} src={mainAudioMp3} autoPlay={true} loop={true} />
    <img className="mainMenuBackground" src={mainBackground} />
    {

      scene === 'main' ? <>

        <div className="mainMenuContainer">
          <h1>TITLE</h1>
          <h2>SubTitle</h2>

          <div className="btn-grp1">
            <button onClick={() => setScene('start')}><p>Start Game</p></button>
            <button onClick={() => setScene('settings')}><p>Settings</p></button>
          </div>

          <div className="btn-grp2">
            <button onClick={() => setScene('status')}><img src={statusSVG} /></button>
            <button onClick={() => setScene('friends')}><img src={friendsSVG} /></button>
            <button onClick={() => { setAudioEnabled(!isAudioEnabled) }}><img src={isAudioEnabled ? audioOnSVG : audioOffSVG} /></button>
            <button onClick={() => { isFS ? exitFS() : enterFS() }}><img src={isFS ? exitFullscreenSVG : enterFullscreenSVG} /></button>
          </div>
        </div>

      </> : scene === 'start' ? <>

        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>
          <CharacterCreator />
        </div>

      </> : scene === 'status' ? <>
        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>
          <NoConnectionError />
        </div>

      </> : scene === 'friends' ? <>

        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>
          <NoConnectionError />
        </div>

      </> : scene === 'settings' ? <>

        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>

          <div className="menuContent">
            <h2 style={{ fontSize: '28px' }}>Sound</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '24px',
              borderTop: '1px solid #AAA',
              borderBottom: '1px solid #AAA',
            }}>
              <h2>Music</h2>
              <VolumeSlider />
              <h2>Effects</h2>
              <VolumeSlider />
              <h2>Ambience</h2>
              <VolumeSlider />
            </div>
          </div>
          <div className="lowerMenuButtonsContainer">
            <button onClick={() => setScene('main')}>Accept</button>
            <button onClick={() => setScene('main')}>Cancel</button>
          </div>
        </div>

      </> : <>
      </>
    }
  </div>
};

const NoConnectionError = () => {
  return <div id="noServerStatusErrorContainer">
    <img src={noConnectionSVG} />
    <img src={errorSVG} />
  </div>
}

export default MainMenu;
