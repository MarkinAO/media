import Modal from "./Modal";
import VisualManager from "./VisualManager";
import PlayerManager from "./PlayerManager";

export default class Chat {
  constructor(container) {
    this.contentBox = null;
    this.user = null;
    this.modal = new Modal();
    this.manager = new VisualManager(container);
    this.player = new PlayerManager(this.createMessage);
  }

  init() {
    this.manager.createDashboard();
    this.manager.showChat();   
    this.subscribeOnEvents();
  }

  subscribeOnEvents() {
    const sendForm = document.querySelector('.form');
    sendForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = sendForm.querySelector('.new-message-input').value;
      this.createMessage(message);      
      e.target.reset();
    })

    const audio = document.querySelector('.microphone');    
    audio.addEventListener('click', () => {
      this.manager.showPlayer(audio);
      this.player.startAudioRecorder();
    })

    const video = document.querySelector('.video');
    video.addEventListener('click', () => {
      this.manager.showPlayer(video);
      this.player.startVideoRecorder();
    })
  }

  createMessage(message, media, type) {    
    const msg = {
      date: new Date, 
      text: message,
      media,
      type
    }
    if(message || media) {
      this.manager.addPost(msg);
    }
  }
}