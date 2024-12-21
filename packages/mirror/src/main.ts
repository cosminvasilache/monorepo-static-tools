import './style.css';

// ================================================================

const e_video = document.querySelector('video')!;
const e_start = document.querySelector('#start')! as HTMLButtonElement;
const e_stop = document.querySelector('#stop')! as HTMLButtonElement;

// ================================================================

e_start.addEventListener('click', async () => {
  await startVideo(e_video);
  toggleButtonVisibility();
});
e_stop.addEventListener('click', () => {
  stopVideo(e_video);
  toggleButtonVisibility();
});

const isVideoActive = () => {
  if (
    e_video.srcObject instanceof MediaStream
    && e_video.srcObject.active
  ) {
    return true;
  }
  return false;
};

const toggleButtonVisibility = () => {
  if (isVideoActive()) {
    e_start.style.display = 'none';
    e_stop.style.display = 'initial';
    return;
  }

  e_start.style.display = 'initial';
  e_stop.style.display = 'none';
};

// ================================================================

const getVideoDevices = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = mediaDevices.filter(d => d.kind === 'videoinput');
  return videoDevices;
};

const startVideo = async (e_video: HTMLVideoElement) => {
  /**
   * pressing on the START button multiple times creates a leak
   * the if check is sync, but the creation and assignment of the streams is not
   * there needs to be a "lock" placed
   */
  if (
    e_video.srcObject instanceof MediaStream
    && e_video.srcObject.active
  ) {
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  e_video.srcObject = stream;
};

const stopVideo = (e_video: HTMLVideoElement) => {
  if (e_video.srcObject instanceof MediaStream) {
    const tracks = e_video.srcObject.getTracks();
    tracks
      .forEach((track) => {
        track.stop();
      });

    e_video.srcObject = null;
  }
};

// ================================================================

const main = async () => {
  e_start.style.display = 'none';
  e_stop.style.display = 'none';
  await startVideo(e_video);
  toggleButtonVisibility();

  // const videoDevices = await getVideoDevices();
  // console.log(videoDevices);
};
main();
