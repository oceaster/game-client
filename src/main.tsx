// Assets
import './main.css';
// Components
import MainMenu from './components/menus/main/main';
// Library
import Phaser from 'phaser';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const initialize = () => {
  // Select Intial Page Elements
  const initialHeader = document.querySelector("body>header") as HTMLElement;
  const initialLoadingSpinner = document.querySelector("#initialLoadingSpinner") as HTMLDivElement;
  const initialFooter = document.querySelector("body>footer") as HTMLElement;

  // Remove Initial Page Elements
  initialHeader.remove();
  initialLoadingSpinner.remove();
  initialFooter.remove()

  // Select Game Cavas Element
  const gameCanvasElement = document.querySelector("#gameCavas") as HTMLCanvasElement;

  // Configure Phaser
  return new Phaser.Game({
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    canvas: gameCanvasElement,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  });
}

const preload = () => {
};

const create = () => {
};

const update = () => {
};

const game = initialize();

createRoot(document.getElementById('ui-layer')!).render(
  <StrictMode>
    <MainMenu />
  </StrictMode>
);

