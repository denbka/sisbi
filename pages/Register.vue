<template>
    <section-register
    @submit="submit"
    :mainForm="mainForm"
    :confirmForm="confirmForm"
    :additionalForm="additionalForm"
    :loading="loading"
    imgname="work-illustration"
    :step="step">
    </section-register>
</template>

<script>
import SectionRegister from '@/components/SectionRegister'
export default {
    components: {
        SectionRegister
    },
    data: () => ({
        mainForm: {
            phone: ''
        },
        confirmForm: {
            code: ''
        },
        additionalForm: {
            password: '',
            confirmPassword: ''
        },
        loading: false,
        step: 'enter'
    }),
    computed: {
        getRole() {
            return this.$cookiz.get('tempRole') === 'applicant' ? 'Worker' : 'Employer'
        }
    },
    methods: {
        async submit(step, form) {
            this.loading = true
            try {
                await this.$store.dispatch('register', {
                    step,
                    form: {...form, phone: this.mainForm.phone, role: this.getRole }
                })
                switch (step) {
                    case 'enter': {
                        this.step = 'confirm'
                        return
                    }
                    case 'confirm': {
                        this.step = 'additional'
                        return
                    }
                    default: {
                        this.$router.push('/worker')
                    }
                }
            } catch(e) {
                console.log(e)
                this.loading = false
            }
            finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>