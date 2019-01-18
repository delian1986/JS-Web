const fs = require('fs')
const path = require('path')
const url = require('url')

function getContentType(url) {
    switch (url.substr(url.indexOf('.'))) {
        case '.html': return 'text/html; charset=UTF-8'
        case '.gif': return 'image/gif'
        case '.css': return 'text/css; charset=UTF-8'
        case '.js': return 'application/javascript; charset=UTF-8'
        case '.ico': return 'image/x-icon'
        default: return 'text/plain; charset=UTF-8'
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`)
        )

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('Not Found')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            })
            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}