<template>
    <footer class="footer">
        <div class="wrapper">
            <div class="footer-container">
                <div class="footer-container__desc">
                    <img src="/img/logo.svg" alt="логотип">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </p>
                </div>
                <div class="footer-container__about">
                    <div class="title">О нас</div>
                    <div class="items">
                        <nuxt-link to="#">Помощь</nuxt-link>
                        <nuxt-link to="#">Написать разработчикам</nuxt-link>
                        <nuxt-link to="#">Сотрудничество</nuxt-link>
                    </div>
                </div>
                <div class="footer-container__contacts">
                    <div class="title">Контакты</div>
                    <div class="items">
                        <div class="footer-container__contacts__item">
                            <i class="el-icon-location-outline"></i>
                            <span>г. Батайск, ул. Пупкина</span>
                        </div>
                        <div class="footer-container__contacts__item">
                            <i class="el-icon-message"></i>
                            <a href="mailto:contril@gmail.com?subject=Письмо с сайта">contril@gmail.com</a>
                        </div>
                        <div class="footer-container__contacts__item">
                            <i class="el-icon-phone"></i>
                            <a href="tel:+79514933223">+7(951)-493-32-23</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style lang="sass" scoped>
    .footer
        height: 500px
        background: #283646
        a, span, i
            color: #fff
            text-decoration: none
        a:hover
            text-decoration: underline
        .wrapper
            width: 100%
            padding: 50px
        .footer-container
            display: flex
            width: 100%
            justify-content: space-between
            .title
                display: flex
                height: 58px
                color: #fff
                font-weight: bold
                font-size: 18px
                align-items: center
            .items
                margin-top: 50px
                display: flex
                flex-direction: column
                line-height: 40px
            &__desc
                flex: 0.5
                p
                    margin-top: 50px
                    color: #fff
                    width: 60%
            &__about
                display: flex
                flex-direction: column
                flex: 0.3
            &__contacts
                flex: 0.2
                &__item:first-child
                    margin-bottom: 50px
</style>