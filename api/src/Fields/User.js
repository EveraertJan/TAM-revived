const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')
const fs = require("fs");
const jwt = require('jwt-simple');
const secret = 'XXX'

class Users {
  constructor(app) {
    this.assignFields = this.assignFields.bind(this);
  }

  assignFields(app, pg, passport) {
    
    app.post('/user/login', passport.authenticate('local', {session: true}), async(req, res) => {
      console.log(req.user,'thus authenticated')
      res.send(req.user);
    })
    app.post('/user/logout', async(req, res) => {
      console.log('logged out')
      res.send(200);
    })
    app.post('/user/register', async(req, res) => {
      const toInsert = req.body;
      toInsert['uuid'] = uuidV1()
      await pg.insert(toInsert).table('users').then((data) => {
        res.status(200).send(data)
      })
    })

    app.post('/user/createChild', requiresLogin, async(req, res) => {
      const toInsert = req.body;
      toInsert['uuid'] = uuidV1()
      await pg.insert(toInsert).table('users').returning('uuid').then(async (data) => {
        const newUUID = uuidV1()
        const rel = {
          childID: data[0],
          parentID: req.user.id,
          uuid: newUUID
        }
        fs.mkdir('/tam/uploads/' + newUUID);
        await pg.insert(rel).table('relations').then((data) => {
          res.status(200).send(data)
        }).catch((error) => {
          res.status(400).send(error)
        })
      }).catch((error) => {
        res.status(400).send(error)
      })
    })

    app.get('/user/info', requiresLogin, async(req, res) => {
      console.log(req.user)
      res.status(200).send(req.user)
    })

    app.get('/user/renewinfo', requiresLogin, async(req, res) => {
      console.log('renewInfo of', req.user)

      await pg.select(['users.email', 'users.password', 'users.uuid', 'users.first_name', 'users.last_name', 'relations.childID']).table('users').where('users.email', req.user.email).leftJoin('relations', 'users.uuid', 'relations.parentID').then(async (result) => {
        const first = result[0]
        await pg.select(['users.first_name', 'users.last_name', 'users.uuid']).table('relations').where('relations.parentID', first.uuid).leftJoin('users', 'relations.childID', 'users.uuid').then((data) => {
          res.status(200).send({
            user: { id: first.uuid, email: first.email, first_name: first.first_name, last_name: first.last_name, relations: data },
            header: jwt.encode({ id: first.uuid, email: first.email, first_name: first.first_name, last_name: first.last_name, relations: data }, secret)
          })
        })
      }).catch((error) => {
        console.log('db error', error)
        res.status(400).send(error)
      })
      await pg.select(['users.first_name', 'users.last_name', 'users.uuid']).table('relations').where('relations.parentID', req.user.uuid).leftJoin('users', 'relations.childID', 'users.uuid').then((data) => {
        res.status(200).send(data)
      }).catch((error) => {
        res.status(401).send(error)
      })
    })

    app.get('/user/info/:userID', requiresLogin, async(req, res) => {
      await pg.select(['first_name', 'last_name', 'uuid', 'date_of_birth']).table('users').where({uuid: req.params.userID}).then((data) => {
        res.status(200).send(data[0])
      }).catch((error) => {
        res.status(401).send(error)
      })
    })
  }
}

module.exports = Users;
