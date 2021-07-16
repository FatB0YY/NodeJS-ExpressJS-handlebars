const path = require('path')
const fs = require('fs')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'card.json')

// создаем модель корзины
class Card {
    static async add(course) {
        // дальше нужно получить всю корзину и посмотреть что в ней находится
        const card = await Card.fetch()

        const idx = card.courses.findIndex((c) => c.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            // курс уже есть
            candidate.count++
                card.courses[idx] = candidate
        } else {
            // нужно добавить
            course.count = 1
            card.courses.push(course)
        }
        card.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex((c) => c.id === id)
        const course = card.courses[idx]

        if (course.count === 1) {
            // удалить
            card.courses = card.courses.filter((c) => c.id !== id)
        } else {
            // изменить количество
            card.courses[idx].count--
        }

        card.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    // будет получать данные из корзины
    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (error, content) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card