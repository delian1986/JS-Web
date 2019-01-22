const Tag = require('../models/TagSchema').model('Tag')
const formidable = require('formidable')


module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err)
        res.writeHead(500);
        res.end("something went wrong");
      }
      Tag.create({
        name:fields.tagName
      }).then(()=>{
        res.end('saved')

      }).catch(err)
      {throw new Error(`${err}`)}

      
    })

    // Tag.create({
    //   name,
    //   images:[]
    // })

  } else {
    return true
  }
}
