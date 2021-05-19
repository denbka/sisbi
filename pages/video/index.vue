<template>
    <div class="wrapper">
        <bread-crumb></bread-crumb>
        <div class="video-select" v-if="!videoType">
            <r-button
            v-if="navigatorSupport === true"
            @click="videoType = 'record'">
                Записать видео
            </r-button>
            <el-upload
            v-loading="loading"
            drag
            class="upload-video"
            accept="video/mp4,video/x-m4v,video/*"
            action="/posts"
            :on-success="onSuccessVideo"
            :on-progress="onProgressVideo">
                <r-button>Загрузить готовое</r-button>
            </el-upload>
        </div>
        <div class="video-record" v-if="videoType === 'record' && navigatorSupport === true">
            <video-component
            @on-permission-denied="onPermissionDenied"
            @change-record="changeRecord"
            @save-video="saveVideo"
            :recordingState="recordingState"
            :isRecord="isRecord">
            </video-component>
            <div class="handlers" v-if="isRecord">
                <el-button v-if="recordingState !== 'recording'" type="info" class="bordering-button" @click="recordingState = 'recording'">
                    Начать запись
                </el-button>
                <el-button
                v-if="recordingState === 'recording'" type="info" class="bordering-button" @click="recordingState = 'stop'">
                    Остановить
                </el-button>
                <el-button
                v-if="recordingState === 'recording'" type="info" class="bordering-button" @click="recordingState = 'finish'">
                    Закончить запись
                </el-button>
            </div>
            <div class="handlers" v-else>
                <el-button type="info" class="bordering-button" @click="recordingState = 'reset'; posters = []">
                    Перезаписать
                </el-button>
            </div>
        </div>
        <div v-else-if="navigatorSupport === false && errorMessage" class="not-supporting">
            {{errorMessage}}
        </div>
        <div
        v-if="videoType === 'upload'"
        class="video-upload">
            <video-component
            :videoSrc="`/${uploadVideoSrc}`"
            :isRecord="false">
            </video-component>
        </div>
        <div
        v-if="posters.length"
        class="posters">
            <h3>Выбор превью для видео</h3>
            <el-carousel
            :loop="false"
            :autoplay="false"
            trigger="click">
                <el-carousel-item
                :key="poster.name"
                v-for="poster in posters">
                    <div class="img-container">
                        <img :src="`/${poster.path}`">
                        <div
                        @click="onChangePoster(poster)"
                        class="img-container__text">Выбрать</div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <el-upload
            v-loading="loading"
            drag
            accept="image/jpeg"
            class="upload-poster"
            action="/posts/"
            :on-success="onSuccess"
            :on-progress="onProgress">
                <div class="info" v-if="!loading">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Перетащите фото или кликните для загрузки</div>
                </div>
                <div class="el-upload__tip" slot="tip">Выберите свое фото для превью</div>
            </el-upload>
        </div>
        
    </div>
</template>

<router>
    meta:
        name: 'Запись видео'
</router>

<script>
import VideoComponent from '@/ui/Video'
import BreadCrumb from '@/ui/BreadCrumb'
export default {
    components: {
        VideoComponent,
        BreadCrumb
    },
    data: () => ({
        isRecord: true,
        recordingState: 'stop',
        formData: null,
        navigatorSupport: null,
        posters: [],
        loading: false,
        loadingVideo: false,
        videoType: null,
        uploadVideoSrc: null
    }),
    computed: {
        role() {
            return this.$store.state.role
        },
        getEntity() {
            return this.role === 'applicant' ? 'resumes' : 'vacancies'
        },
    },
    mounted() {
        this.navigatorSupport = !navigator.mediaDevices ? false : true
        this.errorMessage = this.navigatorSupport === false ?
        'Ваш браузер не поддерживает запись видео. Зайдите в приложение через ПК или другой браузер.'
        : null
    },
    methods: {
        onPermissionDenied() {
            this.navigatorSupport = false
            this.errorMessage = 'Доступ к камере запрещен. Разрешите доступ и перезагрузите страницу.'
        },
        changeRecord() {
            this.isRecord = !this.isRecord
        },
        async onSubmit() {
            const { entity_id } = this.$route.query
            try {
                this.$axios.setHeader('Content-Type', 'multipart/form-data', [
                'post'
                ])
                const response = await this.$axios.$post(`/api/v1/${this.getEntity}/${entity_id}/videos`, this.formData, {
                    Headers: {
                        'Content-type': 'multipart/form-data'
                    }
                })
                this.posters = response.posters
                return response
            } catch(e) {
                console.log(e)
            }
        },
        async saveVideo(file) {
            console.log(file)
            this.isRecord = !this.isRecord
            const formData = new FormData()
            formData.append('video', file)
            formData.append('format', 'mp4')
            this.formData = formData
            await this.onSubmit()
        },
        async onChangePoster(poster) {
            console.log(poster)
            try {
                const response = await this.$axios.$post(`/${this.getEntity}/${this.$route.query.entity_id}/posters/${poster.id}/select`)
                this.$router.push(`/${this.role}/${this.getEntity}`)
            } catch(e) {
                console.log(e)
            }
        },
        async onSuccess(res, file) {
            const data = new FormData()
            data.append('poster', file.raw)
            data.append('format', file.raw.type.split('/')[1])
            try {
                const response = await this.$axios.$post(`/${this.getEntity}/${this.$route.query.entity_id}/posters`, data, {
                    Headers: {
                        'Content-type': 'multipart/form-data'
                    }
                })
                this.posters = response.data
                this.$forceUpdate()
                console.log(response)
            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        onProgress(file, fileList) {
            this.loading = true
        },
        onProgressVideo(file, fileList) {
            this.loadingVideo = true
        },
        async onSuccessVideo(res, file) {
            console.log(file)
            const formData = new FormData()
            formData.append('video', file.raw)
            formData.append('format', 'mp4')
            this.formData = formData
            const response = await this.onSubmit()
            
            this.uploadVideoSrc = response.videos[0].path
            this.loadingVideo = false
            this.videoType = 'upload'
        }
    }
}
// http://localhost:3000/applicant/video?resume_id=80369d2c-114e-4d5a-8500-0d166a3c561c
</script>

<style lang="sass" scoped>
    .not-supporting
        text-align: center
        margin: 25px 0
    .wrapper
        flex-direction: column
        .video-select
            height: 50vh
            display: flex
            justify-content: center
            align-items: center
            button:first-child
                margin-right: 50px
        .handlers
            justify-content: center
            display: flex
            width: 100%
            margin-top: 25px
        .submit-button
            width: 250px
    .posters
        margin: 100px 0
        .img-container
            width: 100%
            height: 100%
            position: relative
            background: #000
            img
                width: 100%
                height: 100%
                object-fit: contain
                transform: rotateY(180deg)
            &__text
                cursor: pointer
                width: 100%
                height: 100%
                top: 0
                left: 0
                position: absolute
                opacity: 0
                color: #fff
                font-weight: bold
                display: flex
                align-items: center
                justify-content: center
                transition: .1s
                &:hover
                    opacity: 1
                    background: rgba(0, 0, 0, 0.2)
        .upload-poster
            width: 300px

    @media screen and (max-width: 768px)
        .wrapper
            .video-select
                height: 75vh
                display: flex
                flex-direction: column
                justify-content: center
                align-items: center
                button
                    width: 80%
                    margin: 0 !important
                button:first-child
                    margin-bottom: 50px !important
        .handlers
            flex-direction: column
            width: 80% !important
            margin: 0 auto
            .el-button
                margin: 10px 0
            .submit-button
                width: 100%
    @media screen and (max-width: 450px)
        .wrapper
            .video-select
                button
                    width: 100%
</style>