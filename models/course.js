const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    // хелпер функция
    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id,
        }
    }

    // редактирование курса
    static async update(course) {
        const courses = await Course.getAll()
        const idx = courses.findIndex((c) => c.id === course.id)
        courses[idx] = course

        // сохранение курса
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    // методы, который сохраняет данные в файле
    async save() {
        // необходимо преобразовать данные в json и сохранить в отдельный файл
        const courses = await Course.getAll()
            // Course.getAll() return промис с асинхронным кодом.
            // Теперь у нас есть js массив, куда мы должны добавить данные этого курса
        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    // для начала нужно получить все содержимое файла:
    static getAll() {
        // для того, чтобы сделать линейный вызов, используем промисы
        // типа getAll(). и что то еще
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (error, content) => {
                    if (error) {
                        reject(error)
                    } else {
                        // сейчас нам нужно передать контент из этой ф-ции:
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id) {
        // получаем все курсы
        const courses = await Course.getAll()
            // возвращаем курс айди который нам нужен
        return courses.find((c) => c.id === id)
    }
}

module.exports = Course