const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

// регестрируем роут
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')

const app = express()

// создаем конфигурацию handlebars
const hbs = exphbs.create({
    // основной лэйаут
    defaultLayout: 'main',
    // название extension, по умолчанию handlebars
    extname: 'hbs',
})

// теперь, чтобы зарегестрировать данный модуль как движок
// для рендеринга html страниц:
// первый - название движка
app.engine('hbs', hbs.engine) // регестрируем в express что есть такой движок
app.set('view engine', 'hbs') // мы его уже начинаем использовать
    // указываем вторым параметром название папки, где будут храниться наши шаблоны
app.set('views', 'pages')

// делаем папку public статической
app.use(express.static(path.join(__dirname, 'public')))

// первый арг - какой url обрабатываем
// next - продолжает выполнение других middleware'ов
// express сам добавляет хедеры
// app.get('/', (req, res, next) => {
//         // res.status(200) по умолчанию
//         // избавляем от строки ниже, т.к она нам больше не нужна
//         // res.sendFile(path.join(__dirname, 'pages', 'index.html'))
//         res.render('index', {
//             // значение, которое будет подставляться в title
//             title: 'Главная страница',
//             // перемеенная для активного элемента в navbarн
//             isHome: true,
//         })
//     })  <--- ЭТО МЫ ВЫНЕСЛИ В РОУТС !!!

// для того, чтобы обработать форму и не получить пустой объект:
// в nodeJS это прослушка события буффера и т.д
app.use(express.urlencoded({ extended: true }))

// также мы можем задавать префиксы
// это префиксы пути для роутов
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

// движки, чтобы динамически составлять html файлы:
// pugJS
//  EJS
// HandlebarsJS <- рассмотрим

//main.hbs, потому что указали в defaultLayouts