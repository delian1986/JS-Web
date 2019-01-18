const url = require('url')
const path = require('path')
const fs = require('fs')
const database = require('../config/database')

module.exports = (req, res) => {
    req.pathname = req.pathname || req.parse(req.url).pathname

    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/viewAll.html'))

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('404 not found')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            let movies = database.movies.getAll()
            let content = '<div class="movie">'

            for (let movie of movies) {
                content +=
                    `<img class="moviePoster" src="${movie.moviePoster}>"`
            }
            content += '</div>'

            let html = data.toString().replace('{{replaceMe}}', content)
            res.write(html)
            res.end()
        })
    } else {
        return true
    }
}