// Assets
import './main.css';
import mainAudioMp3 from './main.mp3';
import mainBackground from '../../../assets/images/bg0.jpg';
import closeSVG from '../../../assets/svgs/close.svg';
import statusSVG from '../../../assets/svgs/status.svg';
import friendsSVG from '../../../assets/svgs/friends.svg';
import exitFullscreenSVG from '../../../assets/svgs/exitFullscreen.svg';
import enterFullscreenSVG from '../../../assets/svgs/enterFullscreen.svg';
// Library
import { useRef, useState, useEffect } from 'react';
import { enterFullscreen, exitFullscreen } from '../../../library/fullscreen';

const MainMenu = () => {
  const [scene, setScene] = useState<string>('main');
  const [isFS, setFS] = useState<boolean>(document.fullscreenElement !== null);
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
    document.addEventListener("fullscreenchange", fullscreenCallback);
    return document.removeEventListener("fullscreenchange", fullscreenCallback);
  }, [isFS]);

  return <>
    <audio ref={audioRef} src={mainAudioMp3} autoPlay={true} loop={true} />
    <img className="mainMenuBackground" src={mainBackground} />
    {
      scene === 'main' ? <>
        <div className="mainMenuContainer">
          <h1>Mythic Quest</h1>

          <div className="btn-grp1">
            <button onClick={() => setScene('game')}><p>Start Game</p></button>
            <button onClick={() => setScene('settings')}><p>Settings</p></button>
          </div>

          <div className="btn-grp2">
            <button onClick={() => setScene('status')}><img src={statusSVG} /></button>
            <button onClick={() => setScene('friends')}><img src={friendsSVG} /></button>
            <button onClick={() => { isFS ? exitFS() : enterFS() }}><img src={isFS ? exitFullscreenSVG : enterFullscreenSVG} /></button>
          </div>
        </div>
      </> : scene === 'status' ? <>
        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>
        </div>
      </> : scene === 'friends' ? <>
        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>
        </div>
      </> : scene === 'settings' ? <>
        <div className="mainMenuContainer2">
          <button className="closeMenuButton" onClick={() => setScene('main')}><img src={closeSVG} /></button>
          <div className="lowerMenuButtonsContainer">
            <button onClick={() => setScene('main')}>Accept</button>
            <button onClick={() => setScene('main')}>Cancel</button>
          </div>
        </div>
      </> : <>
      </>
    }
  </>
};

export default MainMenu;
