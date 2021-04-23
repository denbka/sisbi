<template>
    <div class="header">
        <div class="container">
            <nav>
                <NuxtLink
                v-for="item in menu"
                :to="`/${item.path}`"
                :key="item.path">
                    {{item.name}}
                </NuxtLink>
            </nav>
            <!-- <div
            v-loading="loading"
            v-if="loading"
            class="loading-stub">

            </div> -->
            <div class="handlers" v-if="!user">
                <NuxtLink
                to="/login">
                    <r-button
                    style="margin-right: 25px"
                    type="info">
                        Войти
                    </r-button>
                </NuxtLink>
                <NuxtLink
                type="primary"
                :to="`/register`">
                    <r-button>Зарегистрироваться</r-button>
                </NuxtLink>
            </div>
            <div
            class="user-menu"
            v-if="user">
                <el-select :value="user.email" class="nav-profile">
                    <el-option
                    style="position: absolute !important"
                    class="invisible"
                    :value="getFullname">
                        <i class="el-icon-user-solid"></i>
                        <span>{{getFullname}}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                    <el-option
                    v-for="item in menus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                        <nuxt-link
                        :to="`/applicant/${item.value}`"
                        class="select-link">
                            {{ item.label }}
                        </nuxt-link>
                    </el-option>
                </el-select>
                <nuxt-link to="/applicant/profile">
                    <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                    </el-avatar>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: false
            },
        },
        computed: {
            getFullname() {
                return `${this.user.email}`
            }
        },
        data() {
            return {
                value: null,
                menus: [
                    {
                        label: 'Поиск',
                        value: ''
                    },
                    {
                        label: 'Профиль',
                        value: 'profile'
                    },
                    {
                        label: 'Резюме',
                        value: 'resumes'
                    },
                    {
                        label: 'Избранные',
                        value: 'favorite'
                    },
                    {
                        label: 'Подписка',
                        value: 'subscription'
                    },
                    {
                        label: 'Отклики',
                        value: 'responses'
                    },
                ],
                menu: [
                    {
                        name: 'О нас',
                        path: 'about'
                    },
                    {
                        name: 'Контакты',
                        path: 'contacts'
                    },
                    {
                        name: 'Помощь',
                        path: 'faq'
                    },
                    {
                        name: 'Сотрудничество',
                        path: 'partnership'
                    },
                ],
            }
        },
    }
</script>

<style lang="sass" scoped>
    .header
        font-size: 18px
        height: 10vh
        z-index: 2
        border-bottom: 1px solid #E7E7E7
        .container
            margin-left: auto
            height: 100%
            width: 80%
            display: flex
            justify-content: space-between
            align-items: center
            margin-right: 50px
            nav
                width: 500px
                a
                    text-decoration: none
                    color: black
                    margin-right: 48px
                a:last-child
                    margin-right: 0
            .handlers
                // display: flex
            .user-menu
                display: flex
                align-items: center
            .loading-stub
                width: 200px
                height: 100%
        
</style>

<style>
    .invisible {
        position: absolute;
        top: -1000px
    }
</style>