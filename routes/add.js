const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'pages', 'add.html'))
    // мы указываем только это, потому что по умолчанию мы это все указали сверху
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    })
})

// работаем с POST запросами
router.post('/', async(req, res) => {
    // console.log(req.body) // то, что отправляем
    const course = new Course(req.body.title, req.body.price, req.body.img)
    await course.save()
        // после того как добавили, делаем редирект на страницу всех курсов
    res.redirect('/courses')
})

module.exports = router