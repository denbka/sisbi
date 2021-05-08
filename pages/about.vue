<template>
    <div class="about">
        <div class="wrapper">
            <img
            src="/img/about.svg"
            class="bg-image">
            <section class="about">
                <h3 class="title">
                    О нас
                </h3>
                <p class="description">
                    Сервер Сисби нацелен на предоставление и подбор кандидатов
                    специально для вас. При помощи виде о форматаСервер Сисби нацелен на предоставление и подбор кандидатов
                    специально для вас. При помощи видео форматаСервер Сисби нацелен на предоставление и подбор кандидатов
                    специально для вас. При помощи видео формата
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
            </section>
        </div>
    </div>
</template>

<router>
    meta:
        name: 'О нас'
</router>

<style lang="sass" scoped>

    @media screen and (min-width: 500px)
        img
            width: 500px
            align-self: center

    @media screen and (min-width: 768px)
        .wrapper
            max-width: 768px

    @media screen and (min-width: 1024px)
        .wrapper
            .title
                font-size: 40px !important
            .description
                line-height: 40px !important
                font-size: 20px
            .content
                &__item
                    h4
                        font-size: 32px
                    p
                        font-size: 20px
    
    .about
        margin: 30px 0
        .wrapper
            flex-direction: column
            .title
                margin: 70px 0 50px 0
                font-size: 28px
                text-align: center
            .description
                line-height: 30px
        .content
            margin-top: 100px
            &__item
                display: flex
                flex-direction: column
                align-items: center
                margin-top: 50px
                text-align: center
                p
                    width: 80%
                &__block
                    width: 50px
                    height: 50px
                    background: #62BEFC
                    margin-bottom: 15px
                h4
                    margin: 20px 0 10px 0
            
</style>