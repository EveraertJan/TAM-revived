const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const uuidV1 = require('uuid/v1');
const jwt = require('jwt-simple');

const md5 = require('md5');

const session = require('express-session')
const fileUpload = require('express-fileupload');

const passport = require('passport');
const LocalStrategy = require('passport-local')
const app = express();
const server = http.Server(app);
const PORT = 3000;

const retryKnex = require('./Utils/RetryKnex.js');

const Users = require('./Fields/User')


const secret = 'XXX'


class App {

  constructor(opts) {

      const pg = require('knex')({
      client: 'pg',
      version: '9.6',
      connection: process.env.PG_CONNECTION_STRING,
      searchPath: ['knex', 'public']
    });

    this.pg = pg;
    this.start = this.start.bind(this);

    this.hasSetup = false;

    this.app = express();
    this.s = http.Server(this.app);

  }

  async start() {

    const _this = this;

    app.use(cors({credentials: false, origin: '*'}))

    app.use(cookieParser('keyboard cat'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      //cookie: { secure: true } remove this line for HTTP connection
    }));
    app.use(passport.initialize());
    app.use(passport.session());



    passport.use(new LocalStrategy((email, password, cb) => {
      this.pg.select(['email', 'password', 'uuid', 'first_name', 'last_name']).table('users').where({email: email }).then((result) => {
        if(result.length > 0) {
          if(result[0].password === md5(password)){
            const first = result[0];
            cb(null, jwt.encode({ id: first.uuid, email: first.email, first_name: first.first_name, last_name: first.last_name }, secret))
          } else {
            console.log('no match')
            cb(null, false);
          }
         } else {
          console.log('no result')
           cb(null, false)
         }
      }).catch((error) => {
        console.log('db error', error)
        cb(null, false)
      })
    }))
    passport.serializeUser((user, done) => {
      console.log(user.id)
      const sessionUser = jwt.encode({ id: user.id, email: user.email }, secret);
      done(null, sessionUser)
    })

    passport.deserializeUser((id, cb) => {
      console.log('deserialising', id)
      const user = jwt.decode(id, secret)
      this.pg.select('*').table('users').where({uuid: id.uuid}).then((results) => {
        cb(null, results[0])
      })
    })




    app.use('/uploads', express.static('/tam/uploads'))


    new Users().assignFields(app, this.pg, passport);


    server.listen(3000, () => {
      console.log(`server up and listening on ${PORT}`)
    })


    return await retryKnex(async () => {
      await _this.pg
        .raw('select 1+1 as result')
        .then(function(resolve, reject) {
          if (!_this.hasSetup) {
            _this.initialiseTables(_this.pg);
            return true;
          }
        })
        .catch((error) => {
          console.log('- error:', error);
          setTimeout(retryKnex(), 5000);
        });
    });

  }

  async initialiseTables(pg) {
    
    await pg.schema.hasTable('users').then(async (exists) => {
      if (!exists)
        await pg.schema
          .createTable('users', function(table) {
            table.increments();
            table.uuid('uuid');
            table.string('email');
            table.string('password');
            table.string('first_name');
            table.string('last_name');
            table.string('date_of_birth');
            table.boolean('has_read_terms');
            table.timestamps(true, true);
          })
          .then(function() {
            console.log('created table Users');
          });
    });
    this.hasSetup = true;
  }
}


new App().start();
