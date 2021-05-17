<template>
    <section class="how">
        <div class="wrapper">
            <div class="how-container">
                <h3 class="title">Как это работает</h3>
                <p class="desc">
                    Поиск и отбор талантов — основная задача для каждого бизнеса. <br>
                    Мы знаем, как сделать этот процесс простым и удобным.
                </p>
                <div class="content">
                    <div class="content__item">
                        <div class="content__item__block"></div>
                        <h4>Lorem impsum</h4>
                        <p>Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forwa.</p>
                    </div>
                    <div class="content__item">
                        <div class="content__item__block"></div>
                        <h4>Lorem impsum</h4>
                        <p>Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forwa.</p>
                    </div>
                    <div class="content__item">
                        <div class="content__item__block"></div>
                        <h4>Lorem impsum</h4>
                        <p>Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forwa.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="sass" scoped>
    .how
        margin: 100px 0
    .how-container
        width: 100%
        text-align: center
        display: flex
        flex-direction: column
        h3
            margin-bottom: 42px
        .desc
            margin-bottom: 47px
            margin-bottom: 75px
        .content
            display: flex
            width: 100%
            line-height: 40px
            &__item
                display: flex
                flex-direction: column
                align-items: center
                margin-right: 25px
                h4
                    font-size: 24px
                p
                    line-height: 30px
                    margin-top: 25px
                &__block
                    width: 50px
                    height: 50px
                    background: #62BEFC
                    margin-bottom: 15px
            &__item::last-child
                margin-right: 0
    @media screen and (max-width: 1024px)
        .how
            // margin-bottom: 100px
        .how-container
            .content
                align-items: center
                flex-direction: column
                &__item
                    margin: 0
                    max-width: 320px
                    margin-top: 50px
</style>