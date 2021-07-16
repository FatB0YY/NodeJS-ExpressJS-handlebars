const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    // res.status(200) по умолчанию
    // избавляем от строки ниже, т.к она нам больше не нужна
    // res.sendFile(path.join(__dirname, 'pages', 'index.html'))
    res.render('index', {
        // значение, которое будет подставляться в title
        title: 'Главная страница',
        // перемеенная для активного элемента в navbarн
        isHome: true,
    })
})

module.exports = router