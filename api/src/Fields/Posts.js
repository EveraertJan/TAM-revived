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

    app.get('/posts/user/:subject', requiresLogin, async(req, res) => {
      pg.select(['users.first_name', 'users.last_name', 'posts.creator', 'posts.title', 'posts.created_at', 'posts.uuid']).table('posts').where({subject: req.params.subject}).leftJoin('users', 'users.uuid', 'posts.creator').then((data) => {
        console.log('done', data)
        res.status(200).send(data);
      }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
      })
    })

    app.get('/posts/:uuid', requiresLogin, async(req, res) => {
      pg.select(['users.first_name', 'users.last_name', 'posts.creator', 'posts.title', 'posts.created_at', 'posts.uuid']).table('posts').where({'posts.uuid': req.params.uuid}).leftJoin('users', 'users.uuid', 'posts.creator').then((data) => {
        res.status(200).send(data[0]);
      }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
      })
    })
  }
}

module.exports = Posts;
