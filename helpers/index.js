export const formItems = [
    {
        title: 'Имя',
        id: 'first_name',
    },
    {
        title: 'Фамилия',
        id: 'second_name',
    },
    {
        title: 'Компания',
        id: 'company'
    },
    {
        title: 'Email',
        id: 'email',
    },
    {
        title: 'Пароль',
        id: 'password',
    },
    {
        title: 'Номер телефона',
        id: 'phone',
    },
    {
        title: 'Пол',
        id: 'gender',
    },
    {
        title: 'Адрес',
        id: 'address',
    },
    {
        title: 'Дата рождения',
        id: 'bdate',
    },
]

const crypto = require('crypto')

export const generateID = () => {
  return crypto.randomBytes(8).toString('hex')
}