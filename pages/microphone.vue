<template>
    <div class="wrapper">
        <bread-crumb></bread-crumb>
        <div class="micro-container">
            <svg class="microphone microphone--disabled" viewBox="-90 1 511 511.99899" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m332.464844 275.082031c0-8.429687-6.835938-15.265625-15.269532-15.265625-8.433593 0-15.269531 6.835938-15.269531 15.265625 0 74.6875-60.757812 135.445313-135.445312 135.445313-74.683594 0-135.441407-60.757813-135.441407-135.445313 0-8.429687-6.835937-15.265625-15.269531-15.265625-8.433593 0-15.269531 6.835938-15.269531 15.265625 0 86.378907 66.320312 157.539063 150.710938 165.273438v41.105469h-56.664063c-8.433594 0-15.269531 6.835937-15.269531 15.269531 0 8.433593 6.835937 15.269531 15.269531 15.269531h143.871094c8.429687 0 15.265625-6.835938 15.265625-15.269531 0-8.433594-6.835938-15.269531-15.265625-15.269531h-56.667969v-41.105469c84.394531-7.730469 150.714844-78.894531 150.714844-165.273438zm0 0"/><path d="m166.480469 372.851562c53.910156 0 97.769531-43.859374 97.769531-97.769531v-177.316406c0-53.90625-43.859375-97.765625-97.769531-97.765625-53.90625 0-97.765625 43.859375-97.765625 97.765625v177.316406c0 53.910157 43.859375 97.769531 97.765625 97.769531zm-67.230469-275.085937c0-37.070313 30.160156-67.226563 67.230469-67.226563 37.070312 0 67.230469 30.15625 67.230469 67.226563v177.316406c0 37.070313-30.160157 67.230469-67.230469 67.230469-37.070313 0-67.230469-30.160156-67.230469-67.230469zm0 0"/></svg>
            <svg class="microphone microphone--enabled" viewBox="-90 1 511 511.99899" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m332.464844 275.082031c0-8.429687-6.835938-15.265625-15.269532-15.265625-8.433593 0-15.269531 6.835938-15.269531 15.265625 0 74.6875-60.757812 135.445313-135.445312 135.445313-74.683594 0-135.441407-60.757813-135.441407-135.445313 0-8.429687-6.835937-15.265625-15.269531-15.265625-8.433593 0-15.269531 6.835938-15.269531 15.265625 0 86.378907 66.320312 157.539063 150.710938 165.273438v41.105469h-56.664063c-8.433594 0-15.269531 6.835937-15.269531 15.269531 0 8.433593 6.835937 15.269531 15.269531 15.269531h143.871094c8.429687 0 15.265625-6.835938 15.265625-15.269531 0-8.433594-6.835938-15.269531-15.265625-15.269531h-56.667969v-41.105469c84.394531-7.730469 150.714844-78.894531 150.714844-165.273438zm0 0"/><path d="m166.480469 372.851562c53.910156 0 97.769531-43.859374 97.769531-97.769531v-177.316406c0-53.90625-43.859375-97.765625-97.769531-97.765625-53.90625 0-97.765625 43.859375-97.765625 97.765625v177.316406c0 53.910157 43.859375 97.769531 97.765625 97.769531zm-67.230469-275.085937c0-37.070313 30.160156-67.226563 67.230469-67.226563 37.070312 0 67.230469 30.15625 67.230469 67.226563v177.316406c0 37.070313-30.160157 67.230469-67.230469 67.230469-37.070313 0-67.230469-30.160156-67.230469-67.230469zm0 0"/></svg>
        </div>
    </div>
</template>

<router>
    meta:
        name: 'Настройка микрофона'
</router>

<script>
import BreadCrumb from '@/ui/BreadCrumb'
export default {
    components: {
        BreadCrumb
    },
    data: () => ({
      chunks: [],
      stream: null,
      audioContext: null
    }),
    async mounted() {
        const chunks = []
        const constraints = {
            audio: true
        }
        // const handleDataAvailable = (event) => {
        //     console.log(event)
        //     chunks.push(event.data)
        // }
        // document.querySelector('.micro')
        // const stream = await navigator.mediaDevices.getUserMedia(constraints)
        // const audioContext = new AudioContext()
        // const analyser = audioContext.createAnalyser()
        // analyser.smoothingTimeConstant = 0.8
        // analyser.fftSize = 1024
        // const microphone = audioContext.createMediaStreamSource(stream)
        // const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)
        // const node = new AudioWorkletNode(audioContext)
        
        // console.log(node, '123-123')
        // microphone.connect(analyser)
        // analyser.connect(javascriptNode)
        // javascriptNode.connect(audioContext.destination)

        // console.log(this.audioContext)
    },
}
</script>

<style lang="sass" scoped>
    .wrapper
        flex-direction: column
        .micro-container
            width: 400px
            height: 400px
            position: relative
            .microphone
                width: 100%
                position: absolute
                &--disabled
                    fill: black
                &--enabled
                    fill: red
                    height: 100%
                    clip-path: inset(100% 50px 0px)
</style>