export const isFullscreen = () => document.fullscreenElement != null;

export const enterFullscreen = () => {
  const body = document.querySelector('body') as HTMLBodyElement;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.mozRequestFullScreen) { // Firefox
    body.mozRequestFullScreen();
  } else if (body.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) { // IE/Edge
    body.msRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE11
    document.msExitFullscreen();
  }
}
