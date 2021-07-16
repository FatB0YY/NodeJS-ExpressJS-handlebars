const { Router } = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()

router.post('/add', async(req, res) => {
    // получаем объект того курса, который нам необходимо добавить
    const course = await Course.getById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})

router.delete('/remove/:id', async(req, res) => {
    // нужно передать тот id, который мы хотим удалить в карточку
    const card = await Card.remove(req.params.id)
        // чтобы ответить клиенту с новыми данными
        // мы должны эту карточку отправить обратно в асинк режиме:
    res.status(200).json(card)
})

router.get('/', async(req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        isCard: true,
        title: 'Корзина',
        courses: card.courses,
        price: card.price,
    })
})

module.exports = router