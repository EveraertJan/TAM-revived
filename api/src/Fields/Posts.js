const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')

class Posts {
  constructor(app) {
    this.assignFields = this.assignFields.bind(this);
  }

  assignFields(app, pg, passport) {
    
    app.post('/post/create', requiresLogin, async(req, res) => {
      console.log(req.body)
      const toInsert = req.body;
      toInsert['uuid'] = uuidV1()
      pg.insert(toInsert).table('posts').returning('uuid').then((data) => {
        res.status(200).send(data);
      }).catch((error) => {
        res.status(401).send()
      })
    })
  }
}

module.exports = Posts;
