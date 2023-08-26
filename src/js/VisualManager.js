export default class VisualManager {
    constructor(container) {
        this.container = container;
        this.timerId = null;
    }

    showPlayer(activeIcon) {
        const recording = document.querySelector('.recording');
        const saveMedia = document.createElement('button');
        saveMedia.classList.add('icon');
        saveMedia.classList.add('save-media');
        recording.append(saveMedia);

        const cancelMedia = document.createElement('button');
        cancelMedia.classList.add('icon');
        cancelMedia.classList.add('cancel-media');
        recording.append(cancelMedia);

        activeIcon.classList.add('highlight');
        const player = document.querySelector('.recording');
        player.classList.add('recording__active');

        const timer = document.querySelector('.timer');
        const start = new Date();
        this.timerId = setInterval(() => {
            const end = new Date();
            const res = new Date(end - start);
            timer.textContent = res.toLocaleTimeString().slice(3, 8);      
        }, 1000)      
        }

        hidePlayer() {
            const player = document.querySelector('.recording');
            player.classList.remove('recording__active');
            const activeIcon = document.querySelector('.highlight');
            activeIcon.classList.remove('highlight');
            const input = document.querySelector('.new-message-input');
            input.removeAttribute('readonly');
            const timer = document.querySelector('.timer');
            timer.textContent = '00:00';
            clearInterval(this.timerId);

            const icons = document.querySelectorAll('.icon');
            icons.forEach(el => el.remove());
        }

        createDashboard() {        
            const container = document.createElement('div');
            container.classList.add('container');
            this.container.appendChild(container);

            const decorPanel = document.createElement('div');
            decorPanel.classList.add('decorPanel');
            container.appendChild(decorPanel);
            for (let i = 0; i < 3; i++) {
                const cercle = document.createElement('span');
                cercle.classList.add('cercle');
                decorPanel.appendChild(cercle);
            }

            this.contentBox = document.createElement('div');
            this.contentBox.classList.add('contentBox');
            container.appendChild(this.contentBox);
        }
    
    showChat() {
        const blogwrap = document.createElement('div');
        blogwrap.classList.add('blog__wrap');
        this.contentBox.append(blogwrap);    

        const form = document.createElement('form');
        form.classList.add('form');
        blogwrap.append(form);

        const newMessageInput = document.createElement('input');
        newMessageInput.classList.add('new-message-input');
        newMessageInput.setAttribute('placeholder', 'Введите сообщение');
        form.append(newMessageInput);

        const microphone = document.createElement('div');
        microphone.classList.add('microphone');
        microphone.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewbox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>'
        form.append(microphone);

        const video = document.createElement('div');
        video.classList.add('video');
        video.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewbox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>'
        form.append(video);

        const recording = document.createElement('div');
        recording.classList.add('recording');    
        form.append(recording);

        const timer = document.createElement('div');
        timer.classList.add('timer');
        recording.append(timer);

        const sendButton = document.createElement('button');
        sendButton.classList.add('send-button');
        form.append(sendButton);

        const blogArea = document.createElement('div');
        blogArea.classList.add('blog__area');
        blogwrap.append(blogArea);
    }

    addPost(mes) {        
        const blogArea = document.querySelector('.blog__area');    

        const messageWrap = document.createElement('div');
        messageWrap.classList.add('message-wrap');

        const messageBody = document.createElement('div');
        messageBody.classList.add('message-body');
        
        const messageTitle = document.createElement('div');
        messageTitle.classList.add('message-title');
        messageTitle.textContent = mes.date.toLocaleString().slice(0, -3);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const messageText = document.createElement('div');
        messageText.textContent = mes.text;
        messageContent.append(messageText);

        if(mes.type) {
            let messageMedia;
            if(mes.type === 'audio') {
                messageMedia = document.createElement('audio');
                messageMedia.classList.add('audio-player');
            }
            if(mes.type === 'video') messageMedia = document.createElement('video');
            messageMedia.src = mes.media;
            messageMedia.setAttribute('controls', '');
            messageContent.append(messageMedia);
        }    

        const geolocation = document.createElement('div');
        geolocation.classList.add('message-geo');
        geolocation.classList.add('message-title');
        
        messageWrap.append(messageBody);      
        messageBody.append(messageTitle);
        messageBody.append(messageContent);
        messageBody.append(geolocation);

        blogArea.prepend(messageWrap);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            function (data) {
                const { latitude, longitude } = data.coords;
                const geolocation = messageBody.querySelector('.message-geo');
                geolocation.textContent = `[${latitude}, ${longitude}]`;
            },
            function (err) {
                console.log(err);
            },
            { enableHighAccuracy: true }
            )
        }
    }
}