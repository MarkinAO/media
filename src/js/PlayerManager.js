import VisualManager from "./VisualManager";

export default class PlayerManager {
    constructor(createMessage) {
        this.manager = new VisualManager();
        this.createMessage = createMessage;
        this.flag = null;
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
            console.log('handler')
        }
        handler = handler.bind(this);
        
        videoRecord.addEventListener("click", () => handler(true));
        videoStop.addEventListener("click", handler);

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
            console.log('handler')
        }
        handler = handler.bind(this);
        
        audioRecord.addEventListener("click", () => handler(true));
        audioStop.addEventListener("click", handler);

        recorder.addEventListener("stop", () => {
            const blob = new Blob(chunks);
            this.flag && this.createMessage('', URL.createObjectURL(blob), 'audio');
            this.flag = false;
            this.manager.hidePlayer();
        });
        
        recorder.start();
    }
}