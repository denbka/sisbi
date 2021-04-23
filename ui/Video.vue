<template>
    <div class="video-container">
        <input class="invisible" type="file" accept="video/*;capture=camcorder">
        <input class="invisible" type="file" accept="audio/*;capture=microphone">
        <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
        ref="player">
        </video>
        <div id="video-controls" class="controls" data-state="hidden">
            <div class="progress" ref="progress" @click="onChangeProgress">
                <span class="progress__bar" ref="progressBar"></span>
            </div>
            <div class="add-controls">
                <!-- <button @click="onStop" type="button" data-state="stop">Stop</button> -->
                <div class="volume-container">
                    <button class="mute" type="button" data-state="mute" @click="onMute">
                        <img src="/video/volume.svg">
                    </button>
                    <div class="volume" ref="volume" @click="onChangeVolume">
                        <span class="volume__bar" ref="volumeBar"></span>
                    </div>
                </div>
                
                <div class="add-controls--center">
                    <button type="button" class="arrow" @click="onRewind('left')">
                        <img src="/video/arrow-left.svg">
                    </button>
                    <button class="pause" @click="onPlayPause" type="button" data-state="play">
                        <img :src="`/video/${!isPause ? 'pause.svg' : 'play.svg'}`">
                    </button>
                    <button type="button" class="arrow" @click="onRewind('right')">
                        <img src="/video/arrow-right.svg">
                    </button>
                </div>
                <!-- <button type="button" data-state="volup">Vol+</button> -->
                <!-- <button @click="onFullScreen" class="fullscr" type="button" data-state="go-fullscreen">
                    <img src="/video/fullscr.svg">
                </button> -->
            </div>
        </div>
    </div>
</template>

<script>
        // :srcObject.prop="stream"

export default {
    data() {
        return {
            stream: null,
            recorder: null,
            chunks: [],
            isPause: true
        }
    },
    methods: {
        onPlayPause() {
            const video = this.$refs.player
            if (video.paused || video.ended) {
                video.play()
                this.isPause = false
            }
            else  {
                video.pause()
                this.isPause = true
            }
        },
        onStop() {
            this.recorder.stop()
            console.log(this.recorder.state)
            console.log("recorder stopped")
        },
        onFullScreen() {
            const { player } = this.$refs
            player.webkitRequestFullScreen()
        },
        onChangeProgress(e) {
            const { player, progress } = this.$refs
            const pos = (e.pageX - 130  - progress.offsetLeft) / 800; //TODO:доработать
            console.log(pos)
            player.currentTime = pos * player.duration;
        },
        onChangeVolume(e) {
            const { player, volumeBar } = this.$refs
            const checkVolume = e.offsetX * 3
            player.volume = checkVolume / 100
            volumeBar.style.width = checkVolume + '%'
        },
        onMute() {
            const { player, volumeBar } = this.$refs
            player.volume = 0
            volumeBar.style.width = 0 + '%'
        },
        onRewind(type) {
            const { player } = this.$refs
            const rewind = 10
            if (type === 'right') {
                if (player.currentTime + rewind <= player.duration) player.currentTime += rewind
                else {
                    player.currentTime = player.duration
                    this.isPause = true
                }
            }
            if (type === 'left') {
                if (player.currentTime - rewind >= 0) player.currentTime -= rewind
                else player.currentTime = 0
            }
            
        }
    },
    async mounted() {
        const { player, progress, progressBar, volumeBar } = this.$refs
        player.addEventListener('timeupdate', function() {
        // For mobile browsers, ensure that the progress element's max attribute is set
        // if (!progress.getAttribute('max')) progress.setAttribute('max', player.duration);
        progress.value = player.currentTime;
        progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
   		});
        progressBar.style.width = 0
        volumeBar.style.width = 0
        return
        const constraints = {
            audio: true,
            video: { width: 1280, height: 720 }
        }
        const handleDataAvailable = (event) => {
            this.chunks.push(event.data)
        }
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.recorder = new MediaRecorder(this.stream)
        this.recorder.ondataavailable = handleDataAvailable
        this.recorder.start()
        this.recorder.onstop = async e => {
            console.log('213 stopped')
            const blob = new Blob(this.chunks, { type: 'video/mp4' })
            console.log(blob)
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a')
            a.href = url
            a.download = '123.mp4'
            a.click()
        }
    }
}
</script>

<style lang="sass" scoped>
    .video-container
        position: relative
        height: 450px
        .controls
            width: 100%
            position: absolute
            bottom: 0
            .add-controls
                width: 90%
                display: flex
                justify-content: space-between
                margin: 15px auto
                &--center
                    display: flex
                    margin: 0 auto
            .fullscr
                // margin-left: auto
            .pause
                width: 50px
            .volume-container
                position: relative
                .mute
                    &:hover ~ .volume
                        opacity: 1
                .volume
                    opacity: 0
                    position: absolute
                    top: 30%
                    left: 100%
                    width: 100%
                    margin: 0 auto
                    display: block
                    cursor: pointer
                    // overflow: hidden
                    height: 4px
                    background: #fff
                    &__bar
                        display: block
                        position: relative
                        height: 100%
                        background: #F05F3F
                    &:hover
                        opacity: 1

                    
            .progress
                width: 90%
                margin: 0 auto
                display: block
                cursor: pointer
                // overflow: hidden
                height: 4px
                background: #fff
                &__bar
                    display: block
                    position: relative
                    height: 100%
                    background: #F05F3F
                    &::after
                        content: ''
                        position: absolute
                        right: 0
                        display: block
                        height: 12px
                        width: 4px
                        top: -4px
                        background: #F05F3F
    video
        width: 100%
        height: 100%
    button
        cursor: pointer
        background: transparent
        border: 0
        color: #fff
        img
            width: 20px
            height: 20px
            fill: #fff
</style>