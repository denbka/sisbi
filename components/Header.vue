<template>
    <div class="header">
        <div class="mobile-header">
            <img
            class="mobile-header__burger"
            src="/icons/menu.svg"
            @click="drawer = !drawer">
            <span style="margin-left: 25px">{{routeName ? routeName : ''}}</span>
            <el-drawer
            size="300"
            :visible.sync="drawer"
            :withHeader="false"
            direction="ltr">
                <div class="drawer-container" v-if="!user">
                    <div class="info">
                        <img src="/icons/avatar.png" alt="">
                        <div class="handlers">
                            <NuxtLink
                            to="/login"
                            class="login">
                                Вход
                            </NuxtLink>
                            <NuxtLink
                            to="/register"
                            class="register">
                                и регистрация
                            </NuxtLink>
                        </div>
                    </div>
                    <nav>
                        <NuxtLink
                        active-class="nav-active"
                        v-for="item in menu"
                        :to="`/${item.path}`"
                        :key="item.path">
                            {{item.name}}
                        </NuxtLink>
                    </nav>
                </div>
                <div v-else class="drawer-container">
                    <div class="info">
                        <img src="/icons/avatar.png" alt="">
                        <span>{{getFullname}}</span>
                    </div>
                    <nuxt-link
                    v-if="role === 'employer'"
                    class="search__button"
                    to="/employer/vacancies/create">
                        Добавить вакансию
                    </nuxt-link>
                    <nuxt-link
                    v-if="role === 'applicant'"
                    class="search__button"
                    to="/applicant/resumes/create">
                        Добавить резюме
                    </nuxt-link>
                    <nuxt-link
                    exact
                    :key="item.value"
                    v-for="item in getMenu"
                    class="select-link"
                    active-class="nav-active"
                    :to="`/${role}/${item.value}`">
                        <img v-if="item.value.length" :src="`/icons/${item.value}.svg`">
                        <i v-else class="el-icon-search"></i>
                        <span>{{ item.label }}</span>
                    </nuxt-link>
                    <el-divider />
                    <button
                    class="logout-button"
                    @click="logout">
                        <img :src="`/icons/logout.svg`">
                        <span>Выйти из системы</span>
                    </button>
                </div>
            </el-drawer>
        </div>
        <div class="wrapper">
            <nav>
                <NuxtLink
                v-for="item in menu"
                :to="`/${item.path}`"
                :key="item.path">
                    {{item.name}}
                </NuxtLink>
            </nav>
            <div class="handlers" v-if="!user">
                <NuxtLink
                to="/login">
                    <r-button
                    class="headers-button"
                    style="margin-right: 25px; background: #F0EEFF"
                    type="info">
                        Войти
                    </r-button>
                </NuxtLink>
                <NuxtLink
                type="primary"
                :to="`/register`">
                    <r-button class="headers-button">Зарегистрироваться</r-button>
                </NuxtLink>
            </div>
            <div
            class="user-menu"
            v-if="user">
                <el-select :value="user.email" class="nav-profile" @change="onChange">
                    <el-option
                    style="position: absolute !important"
                    class="invisible"
                    :value="getFullname">
                        <i class="el-icon-user-solid"></i>
                        <span>{{getFullname}}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                    <el-option
                    v-for="item in getMenu"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                        <nuxt-link
                        active-class="nav-active"
                        exact
                        :to="`/${role}/${item.value}`"
                        class="select-link">
                            {{ item.label }}
                        </nuxt-link>
                    </el-option>
                    <el-divider></el-divider>
                    <el-option label="Выйти из системы" value="logout"></el-option>
                </el-select>
                <nuxt-link :to="`/${role}/profile`">
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
            routeName: {
                type: String,
                required: false
            }
        },
        computed: {
            getFullname() {
                return `${this.user.email}`
            },
            role() {
                return this.$store.state.role
            },
            getMenu() {
                return this.menus.filter(menu => menu.role === this.role || !menu.role)
            },
        },
        watch: {
            '$route'() {
                this.drawer = false
            }
        },
        methods: {
            async onChange(value) {
                if (value === 'logout') {
                    this.logout()
                }
            },
            async logout() {
                this.$router.push('/')
                await this.$store.dispatch('logout')
            }
        },
        data() {
            return {
                drawer: false,
                value: null,
                menus: [
                    {
                        label: 'Поиск',
                        value: '',
                    },
                    {
                        label: 'Профиль',
                        value: 'profile',
                    },
                    {
                        label: 'Мои резюме',
                        value: 'resumes',
                        role: 'applicant'
                    },
                    {
                        label: 'Мои вакансии',
                        value: 'vacancies',
                        role: 'employer'
                    },
                    {
                        label: 'Избранные',
                        value: 'favorites'
                    },
                    {
                        label: 'Подписка',
                        value: 'subs'
                    },
                    {
                        label: 'Отклики',
                        value: 'responses',
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
        display: flex
        align-items: center
        font-size: 18px
        min-height: 10vh
        z-index: 2
        border-bottom: 1px solid #E7E7E7
        .mobile-header
            display: none
            padding: 0 25px
            &__burger
                cursor: pointer
        .wrapper
            // margin-left: auto
            // height: 100%
            display: flex
            justify-content: space-between
            align-items: center
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

    .drawer-container
        display: flex
        flex-direction: column
        line-height: 40px
        margin-top: 50px
        nav
            padding: 0 25px
        .select-link
            display: flex
            align-items: center
            font-weight: bold
            font-size: 20px
            line-height: 60px
            padding: 0 25px
            &:hover
                background: rgba(68, 158, 255, 0.1)
                transition: none
            img
                margin-right: 15px
        .info
            display: flex
            flex-direction: column
            align-items: center
            margin: 0 25px
            span
                margin-top: 25px
            img
                width: 50%
            .handlers
                font-size: 24px
                margin: 25px 0 50px 0
                a
                    text-decoration: none
                    color: black
                    margin-bottom: 25px
                a:hover
                    text-decoration: underline
                .register
                    color: #193FF6
        nav
            display: flex
            flex-direction: column
            a
                text-decoration: none
                color: black
                margin-bottom: 25px
            a:last-child
                margin-bottom: 0
    .search__button
        margin: 25px
        width: auto
        height: 45px
        font-size: 16px
    .headers-button
        height: 50px
        padding: 0 40px
        font-size: 16px
    @media screen and (max-width: 500px)
        .search__button
            width: auto !important
    .logout-button
        background: transparent
        border: none
        cursor: pointer
        color: #363848
        font-weight: bold
        font-size: 20px
        padding: 0
        display: flex
        height: 60px
        align-items: center
        padding: 0 25px
        img
            margin-right: 15px
    .action-button
        height: 45px
        font-size: 16px
        margin: 30px auto
    
    .el-icon-search
        font-weight: bold
        color: #d8d8d8
        margin-right: 15px
        
    
    @media screen and (max-width: 1024px)
        .header
            min-height: 8vh
            .wrapper
                display: none
            .mobile-header
                display: flex
    @media screen and (max-width: 1366px)
        .headers-button
            padding: 0 25px
        nav
            a
                margin-right: 24px !important
</style>

<style>
    .invisible {
        position: absolute;
        top: -1000px
    }
</style>