const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')

class Settings {
  constructor(app) {
    this.assignFields = this.assignFields.bind(this);
  }

  assignFields(app, pg, passport) {
    
    app.get('/user/writers/:uuid', requiresLogin, async(req, res) => {
      console.log(req.params)
      await pg.select(['users.first_name', 'users.last_name', 'users.email', 'users.uuid', 'relations.role']).table('relations').where({childID: req.params.uuid}).leftJoin('users', 'users.uuid', 'relations.parentID').then((data) => {
        res.status(200).send(data)
      }).catch((error) => {
        console.log(error);
        res.status(400).send(error)
      })
    })

    app.post('/user/writers', requiresLogin, async(req, res) => {
      console.log(req.body)
      await pg.select('uuid').table('users').where({email: req.body.email}).then(async (user) => {
        if(user.length === 0) {
          const newUser = {
            first_name: 'unset',
            last_name: 'unset',
            email: req.body.email,
            uuid: uuidV1()
          }
          await pg.insert(newUser).table('users').then(async (result)=> {
            const newRel = {
              childID: req.body.childID,
              parentID: newUser['uuid'],
              role: req.body.role,
              uuid: uuidV1()
            }
            await pg.insert(newRel).table('relations').then((toSend) => {
              res.status(200).send({uuid: req.body.childID})
            })
          })
        }
        else {
          const newRel = {
            parentID: user[0].uuid,
            childID: req.body.childID,
            role: req.body.role,
            uuid: uuidV1()
          }
          await pg.insert(newRel).table('relations').then((result) => {
            res.status(200).send(result)
          })
        }
      })
    })
  }
}

module.exports = Settings;
