<template>
    <page-landing v-if="!user"></page-landing>
    <page-resumes v-else></page-resumes>
</template>

<script>
import PageLanding from '@/components/employer/PageLanding'
import PageResumes from '@/components/employer/PageResumes'
import { mapState } from 'vuex'
export default {
    components: {
        PageLanding,
        PageResumes
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
    }
}
</script>