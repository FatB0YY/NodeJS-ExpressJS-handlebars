const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async(req, res) => {
    // получаем все курсы
    const courses = await Course.getAll()

    // res.sendFile(path.join(__dirname, 'pages', 'add.html'))
    // мы указываем только это, потому что по умолчанию мы это все указали сверху
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses,
    })
})

// редактирование курсов
router.get('/:id/edit', async(req, res) => {
        // у нас будет некий query параметр,
        // который будет отвечать за то, что мы можем
        // редактировать данный курс
        if (!req.query.allow) {
            return res.redirect('/')
        }
        // нам нужно получить курс
        const course = await Course.getById(req.params.id)

        // возвращаем данную страницу
        res.render('course-edit', {
            title: `Редактировать ${course.title}`,
            course,
        })
    })
    // обрабатываем кнопку редактирование при нажатии
router.post('/edit', async(req, res) => {
    // req.body содержит все новые данные
    await Course.update(req.body)
    res.redirect('/courses')
})

// нажатие на кнопку курсов и открытие с уникальным айди
router.get('/:id', async(req, res) => {
    // для начала нам нужно получить тот объект
    // на сонове айди который получаем.
    // req.paramsвернет параметры в согласованном маршруте. Если ваш маршрут / user /: id и вы делаете запрос к / user / 5 - req.paramsдаст{id: "5"}
    const course = await Course.getById(req.params.id)

    // страница курсов рендер
    res.render('course', {
        // для того, чтобы вынести это все в отдельный layout:
        // т.е у нас будет отдельная страница для каждого курса
        layout: 'empty',
        title: `Курс ${course.title}`,
        course,
    })
})

module.exports = router