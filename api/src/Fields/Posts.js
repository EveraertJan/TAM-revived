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
      await pg.insert(toInsert).table('posts').returning('uuid').then((data) => {
        res.status(200).send(data);
      }).catch((error) => {
        res.status(401).send()
      })
    })


    app.post('/post/add/:uuid', requiresLogin, async(req, res) => {
      console.log(req.body)
      const toInsert = req.body;
      toInsert['uuid'] = uuidV1()
      await pg.insert(toInsert).table('postParts').returning('uuid').then((data) => {
        res.status(200).send(data);
      }).catch((error) => {
        res.status(402).send()
      })
    })
    //posts/update/header

    app.post('/post/update/header', requiresLogin, async(req, res) => {
      console.log(req.body)
      await pg.update({media: req.body.imageUuid}).table('posts').where({uuid: req.body.postUuid}).returning('uuid').then((data) => {
        res.status(200).send(data);
      }).catch((error) => {
        res.status(402).send()
      })
    })

    app.get('/posts/user/:subject', requiresLogin, async(req, res) => {
      await pg.select(['users.first_name', 'users.last_name', 'posts.creator', 'posts.title', 'posts.created_at', 'posts.uuid', 'media.url']).table('posts').where({subject: req.params.subject}).leftJoin('users', 'users.uuid', 'posts.creator').leftJoin('media', 'posts.media', 'media.uuid').then((data) => {
        console.log('done', data)
        res.status(200).send(data);
      }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
      })
    })

    app.get('/posts/:uuid', requiresLogin, async(req, res) => {
      await pg.select(['users.first_name', 'users.last_name', 'posts.creator', 'posts.title', 'posts.created_at', 'posts.uuid', 'media.url']).table('posts').where({'posts.uuid': req.params.uuid}).leftJoin('users', 'users.uuid', 'posts.creator').leftJoin('media', 'posts.media', 'media.uuid').then(async (data) => {
        console.log(data)
        const post = data[0];
        await pg.select(['postParts.content', 'postParts.type', 'users.uuid', 'users.first_name', 'users.last_name']).table('postParts').where('postParts.postID', post.uuid).leftJoin('users', 'users.uuid', 'postParts.creator').then((data) => {
          
          data.forEach(async (item, key) => {
            if(item.type === 'IMAGE') {
              await pg.select('url').table('media').where({ uuid: item.content }).then((url) => {
                item['url'] = url[0].url;
              })
            }
            data[key] = item
          })
          console.log('sending')
          post['parts'] = data;
          res.status(200).send(post);
        }).catch((error) => {
          res.status(400).send(error)
        })
      }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
      })
    })
  }
}

module.exports = Posts;
