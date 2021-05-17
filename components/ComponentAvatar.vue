<template>
    <div
    v-if="!avatar"
    class="avatar-container">
        <el-upload
        v-loading="loading"
        drag
        class="upload-photo"
        action="/posts/"
        :on-success="onSuccess"
        :on-progress="onProgress">
            <div class="info" v-if="!loading">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Перетащите фото или кликните для загрузки</div>
            </div>
        </el-upload>
    </div>
    <div
    v-else
    class="avatar-container">
        <img
        class="avatar"
        :src="`/${avatar}`">
        <div class="avatar-container__edit" @click="avatar = null">
            <span>Изменить</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        avatarSrc: {
            type: String,
            required: false
        }
    },
    data: () => ({
        fileList: [],
        avatar: null,
        loading: false,
    }),
    created() {
        this.avatar = this.avatarSrc
    },
    methods: {
        async onSuccess(res, file) {
            const data = new FormData()
            data.append('image', file.raw)
            data.append('format', file.raw.type.split('/')[1])
            try {
                const response = await this.$store.dispatch('saveEntity', {
                    entityName: '/profile/avatar',
                    method: 'post',
                    data,
                    inStore: false
                })
                this.avatar = response.avatar
            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        onProgress(file, fileList) {
            this.loading = true
        },
    }
}
</script>

<style lang="sass" scoped>
    .avatar-container
        border-radius: 50%
        width: 250px
        height: 250px
        background: #000
        position: relative
        overflow: hidden
        cursor: pointer
        img
            width: 100%
            height: 100%
            object-fit: contain
        &__edit
            opacity: 0
            display: flex
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            border-radius: 50%
            justify-content: center
            align-items: center
            background: rgba(0, 0, 0, 0.5)
            transition: .1s
            color: #fff
            &:hover
                opacity: 1
                
</style>