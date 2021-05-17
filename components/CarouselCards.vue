<template>
    <div class="carousel-wrapper">
        <div v-if="items.data.length > 0">
            <el-carousel
            ref="carousel"
            indicator-position="none"
            :loop="false"
            :autoplay="false"
            trigger="click"
            arrow="never"
            class="carousel">
                <el-carousel-item
                v-for="(item, key) in items.data"
                :key="item.id"
                :name="`${key}`">
                    <component-card
                    :tooltips="tooltips"
                    :statusVisible="false"
                    :data="item">
                    </component-card>
                </el-carousel-item>
            </el-carousel>
            <div class="carousel-wrapper__handlers">
                <button
                :disabled="arrowLeftDisabled"
                @click="setActiveItem('-')">
                    <i class="el-icon-arrow-left"></i>
                </button>
                <button
                :disabled="arrowRightDisabled"
                @click="setActiveItem('+')">
                    <i class="el-icon-arrow-right"></i>
                </button>
            </div>
        </div>
        <Stub :role="role" v-else>
            <span>Вы еще не добавили вакансию</span>
            <nuxt-link to="vacancies/create">Добавить</nuxt-link>
        </Stub>
    </div>
</template>

<script>
import Stub from '@/components/applicant/Stub'
import ComponentCard from '@/components/ComponentCard'
export default {
    components: {
        ComponentCard,
        Stub
    },
    data: () => ({
        initialIndex: 0,
        arrowLeftDisabled: false,
        arrowRightDisabled: false
    }),
    mounted() {
        this.checkDisabled()
    },
    watch: {
        initialIndex() {
            this.checkDisabled()
        }
    },
    methods: {
        checkDisabled() {
            this.arrowLeftDisabled = this.initialIndex === 0 ? true : false
            this.arrowRightDisabled = this.initialIndex === this.items.data.length - 1 ? true : false
        },
        setActiveItem(type) {
            if (type === '+') {
                this.initialIndex++
            }
            if (type === '-') {
                this.initialIndex--
            }
            this.getResponses()
        },
        async getResponses() {
            try {
                const response = await this.$axios.$get('/profile/responses', {
                    params: {
                        resume_id: this.items.data[this.initialIndex].id
                    }
                })
                this.$store.commit('SET_ITEMS', {
                    entityName: 'responses',
                    response
                })
                this.$refs.carousel.setActiveItem(this.initialIndex)
            } catch(e) {
                console.log(e)
            }
        }
    },
    props: {
        items: {
            type: Object,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        tooltips: {
            type: Array,
            required: false,
            default: []
        }
    },
}
</script>

<style lang="sass" scoped>
    .carousel-wrapper
        margin-bottom: 75px
        &__handlers
            text-align: center
            margin-top: 25px
            button
                font-size: 18px
                height: 40px
                width: 40px
                border-radius: 50px
                border: none
                color: #fff
                cursor: pointer
            button:first-child
                margin-right: 50px
            button:disabled
                cursor: not-allowed
                background: #f1f1f1

</style>