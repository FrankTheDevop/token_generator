'use strict'

const Promise = require('bluebird')

const logger = require('../../server/modules/getLogger')('token.js')

module.exports = function (System) {
  System.generateToken = async (email) => {
    const Token = System.app.models.Token

    if (await Token.doeItExistAlready(email)) {
      const currentEntry = await Token.findByEmail(email)
      logger.debug(`Returning the already existing token: ${currentEntry}`)
      return Promise.resolve(currentEntry.token)
    }

    const token = await Token.generate(email)
    logger.debug(`Generated new token: ${token}`)

    await Token.saveIt(email, token)
    return Promise.resolve(token)
  }
}
