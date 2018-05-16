const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')

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
      pg.insert(toInsert).table('users').then((data) => {
        res.status(200).send(data)
      })
    })

    app.get('/user/info', requiresLogin, async(req, res) => {

      res.send(200, req.user)
    })
  }
}

module.exports = Users;
