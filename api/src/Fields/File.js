const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')
const fs = require("fs");
        

class File {
  constructor(app) {
    this.assignFields = this.assignFields.bind(this);
  }

  assignFields(app, pg, passport) {

    app.post('/file/upload', requiresLogin, async(req, res, next) => {  
      if (!req.files) {
        return res.status(400).send('No files were uploaded.');
      }
      let sampleFile = req.files.file;
      console.log(req.user)
      sampleFile.mv(`/tam/uploads/${req.user.id}/${req.files.file.name}` , async (err) => {
        if (err) {
          console.log(err)
          if(err.code === 'ENOENT') {
            console.log(req.user.id)
            fs.mkdir('/tam/uploads/' + req.user.id);
          }
          return res.status(500).send(err);
        }
        const file = {
          type: 'IMG',
          url: `/uploads/${req.user.id}/${req.files.file.name}`,
          uuid: uuidV1()
        }
        await pg.insert(file).table('media').returning('*').then(async (data) => {
          res.status(200).send(data[0])
        }).catch((error) => {
          console.log(error)
          res.status(400)
        })
      })
    })
    
  }


}

module.exports = File;