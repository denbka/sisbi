<template>
    <div class="wrapper" v-if="navigatorSupport === true">
        <bread-crumb></bread-crumb>
        <video-component
        @change-record="changeRecord"
        @save-video="saveVideo"
        :recordingState="recordingState"
        :isRecord="isRecord">
        </video-component>
        <div class="handlers" v-if="isRecord">
            <el-button type="info" class="bordering-button" @click="recordingState = 'recording'">
                Начать запись
            </el-button>
            <el-button type="info" class="bordering-button" @click="recordingState = 'stop'">
                Остановить
            </el-button>
            <el-button type="info" class="bordering-button" @click="recordingState = 'finish'">
                Закончить запись
            </el-button>
        </div>
        <div class="handlers" v-else>
            <el-button type="info" class="bordering-button" @click="recordingState = 'reset'">
                Перезаписать
            </el-button>
        </div>
        <div class="handlers">
            <el-button
            size="large"
            type="primary"
            class="submit-button"
            @click="onSubmit">
                Продолжить
            </el-button>
        </div>
    </div>
    <div v-else-if="navigatorSupport === false" class="not-supporting">
        Ваш браузер не поддерживает запись видео. Зайдите в приложение через ПК или другой браузер.
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
        navigatorSupport: null
    }),
    computed: {
        role() {
            return this.$store.state.role
        },
        getEntity() {
            return this.role === 'applicant' ? 'resumes' : 'vacancies'
        }
    },
    mounted() {
        this.navigatorSupport = !navigator.mediaDevices ? false : true
    },
    methods: {
        changeRecord() {
            this.isRecord = !this.isRecord
        },
        async onSubmit() {
            const { entity_id } = this.$route.query
            try {
                this.$axios.setHeader('Content-Type', 'multipart/form-data', [
                'post'
                ])
                const response = await this.$axios.$post(`/${this.getEntity}/${entity_id}/video`, this.formData, {
                    Headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }
                )
            } catch(e) {
                console.log(e)
            }
        },
        saveVideo(file) {
            console.log(file)
            this.isRecord = !this.isRecord
            const formData = new FormData()
            formData.append('video', file)
            formData.append('format', 'mp4')
            this.formData = formData
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
        .handlers
            display: flex
            width: 100%
            margin-top: 25px
        .submit-button
            width: 250px
    @media screen and (max-width: 768px)
        .handlers
            flex-direction: column
            width: 80% !important
            margin: 0 auto
            .el-button
                margin: 10px 0
            .submit-button
                width: 100%
</style>