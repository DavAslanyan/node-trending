const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const { CORS, PORT } = require('./config/variables.config')

const RedisStorage = require('./storage/redis-db.storage')

const Api = require('./api')

const { ErrorHandlerMiddleware } = require('./middleware')

class App {
  /**
   * @constructor
   */
  constructor () {
    this.app = express()
    this.port = PORT
  }

  /**
   * @returns {Promise<void>}
   * @description Initialize the App.
   */
  async init () {
    try {
      this._setCors()
      this._setRequestParser()
      App._initializeStorage()
      this._initializeApi()
      this._setErrorHandler()
    } catch (error) {
      throw new Error(error)
    }
  }


  /**
   * @private
   * @description Set Cross-origin resource sharing.
   *  Reflect any request that is coming from an origin ending with one specified in configs.
   */
  _setCors () {
    this.app.use(cors({
      origin: CORS.ORIGIN,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1
    }))
  }

  _setRequestParser () {
    this.app.use(bodyParser.json({ limit: '1mb' }))
  }

  /**
   * @private
   * @description Initialize storage.
   */
  static _initializeStorage () {
    RedisStorage.init()
  }

  /**
   * @private
   * @description Initialize API.
   */
  _initializeApi () {
    this.app.use(Api)
  }

  /**
   * @private
   * @description General error handler.
   */
  _setErrorHandler () {
    this.app.use(ErrorHandlerMiddleware.init)
  }
}

module.exports = new App()
