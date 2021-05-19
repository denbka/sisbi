<template>
    <div class="footer__contacts__contact">
        <div class="footer__contacts__contact--header">
            <span>Связаться</span>
            <!-- <i class="el-icon-phone"></i> -->
        </div>
        <div
        class="footer__contacts__contact--contacts"
        v-if="
        (!isAuth && tempRole === 'applicant')
        || (isAuth && role === 'applicant')
        || (isAuth && role === 'employer' && data.fullData && data.fullData.status === 'accepted')
        ">
            <span
            @click="onOpenContacts(isAuth ? role : tempRole)"
            v-if="!contacts"
            class="footer__contacts__contact--contacts--show-contacts">
                Показать контакты
            </span>
            <div
            v-else
            class="footer__contacts__contact--contacts--showed-contacts">
                <div
                v-if="contacts.phone"
                class="footer__contacts__contact--contacts--showed-contacts__item">
                    <i class="el-icon-phone"></i>
                    <span>{{contacts.phone}}</span>
                </div>
                <div
                v-if="contacts.email"
                class="footer__contacts__contact--contacts--showed-contacts__item">
                    <i class="el-icon-message"></i>
                    <span>{{contacts.email}}</span>
                </div>
            </div>
        </div>
        <!-- {{`${isAuth}, ${role}, ${!!data.fullData}`}} -->
        <div
        class="footer__contacts__contact--contacts"
        v-if="isAuth && role === 'employer' && (!data.fullData || (data.fullData && data.fullData.status !== 'accepted'))"
        style="font-size: 14px">
            {{data.fullData.status !== 'rejected' ? `Контакты будут доступны после принятия приглашения` : 'Ваш отклик был отклонен. Контакты закрыты'}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        role: {
            type: String,
            required: true
        },
        onOpenContacts: {
            type: Function,
            required: true
        },
        contacts: {
            type: Object,
            required: false
        },
        data: {
            type: Object,
            required: true
        },
        tempRole: {
            type: String,
            required: false
        },
        isAuth: {
            type: Boolean,
            required: true
        },
        errorContacts: {
            type: Boolean,
            required: false
        }
    }
}
</script>

<style lang="sass" scoped>
    .footer
        margin-top: 20px
        display: flex
        &__description
            flex: 0.7
            margin-right: 20px
            &--info
                display: flex
                flex-direction: column
                border-bottom: 1px solid #cfcfcf
                padding-bottom: 10px
                margin-bottom: 20px
                &__item
                    line-height: 38px
                    display: flex
                    margin-right: 25px
                    justify-content: space-between
                    span:first-child
                        color: #636363
                    span:last-child
                        font-weight: bold
            p
                color: #787878
        &__contacts
            flex: 0.3
            display: flex
            flex-direction: column
            &__contact
                flex: 0.7
                background: #F3F3F3
                margin-bottom: 20px
                border-radius: 8px
                &--header
                    margin: 0 10px
                    color: #636363
                    padding: 10px 0
                    border-bottom: 1px solid #cfcfcf
                    display: flex
                    justify-content: space-between
                    align-items: center
                &--contacts
                    padding: 10px
                    &--show-contacts
                        cursor: pointer
                    &--showed-contacts
                        color: #797979
                        i
                            font-weight: bold
                            margin-right: 5px
            &__handlers
                flex: 0.3
                display: flex
                flex-direction: column
                &--not-auth
                    display: flex
                    button
                        width: 100%
                        margin: 0
                    button:last-child
                        margin-top: 10px
    .card__on-response-button
        color: #fff
    @media screen and (max-width: 900px)
        .card-form
            width: auto
            .footer
                flex-direction: column
                height: auto !important
                padding-bottom: 25px
                &__description
                    flex: 0
                    margin-bottom: 25px
                    &--info
                        flex-direction: column
                        width: 100%
                        &__item
                            width: 100%

</style>