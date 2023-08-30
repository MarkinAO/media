export default class PlayerManager {
    constructor(createMessage, visualManager) {
        this.manager = visualManager;
        this.createMessage = createMessage;
        this.flag = false;
    }

    async startVideoRecorder() {
        const videoRecord = document.querySelector(".save-media");
        const videoStop = document.querySelector(".cancel-media");
        const input = document.querySelector('.new-message-input');
        input.value = '';
        input.setAttribute('readonly', '');

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        const videoPlayerLive = document.querySelector('.video-player-live');
        console.log(videoPlayerLive)
        videoPlayerLive.srcObject = stream;

        videoPlayerLive.addEventListener("canplay", () => {
          videoPlayerLive.play();
        });
        
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        
        recorder.addEventListener("start", () => {
            console.log("start");
        });
        
        recorder.addEventListener("dataavailable", (event) => {
            chunks.push(event.data);
        });  
        
        function handler(fl = false) {      
            this.flag = fl;
            recorder.stop();
            stream.getTracks().forEach((track) => track.stop());
            const videoPlayerLive = document.querySelector('.video-player-live');
            videoPlayerLive && videoPlayerLive.remove();
        }
        handler = handler.bind(this);
        
        videoRecord.addEventListener("click", () => handler(true));
        videoStop.addEventListener("click", () => handler());

        recorder.addEventListener("stop", () => {
            const blob = new Blob(chunks);
            this.flag && this.createMessage('', URL.createObjectURL(blob), 'video');
            this.flag = false;
            this.manager.hidePlayer();
        });
        
        recorder.start();
    }
    
    async startAudioRecorder() {
        const audioRecord = document.querySelector(".save-media");
        const audioStop = document.querySelector(".cancel-media");
        const input = document.querySelector('.new-message-input');
        input.value = '';
        input.setAttribute('readonly', '');

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        
        recorder.addEventListener("start", () => {
            console.log("start");
        });
        
        recorder.addEventListener("dataavailable", (event) => {
            chunks.push(event.data);
        });  
        
        function handler(fl = false) {      
            this.flag = fl;
            recorder.stop();
            stream.getTracks().forEach((track) => track.stop());
        }
        handler = handler.bind(this);
        
        audioRecord.addEventListener("click", () => handler(true));
        audioStop.addEventListener("click", () => handler());

        recorder.addEventListener("stop", () => {
            const blob = new Blob(chunks);
            this.flag && this.createMessage('', URL.createObjectURL(blob), 'audio');
            this.flag = false;
            this.manager.hidePlayer();
        });
        
        recorder.start();
    }
}