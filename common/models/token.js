'use strict';

const Promise = require('bluebird')
const uuid = require('uuidv4')

const helper = require('../../server/modules/helper')

module.exports = function(Token) {
  Token.findByEmail = async (email) => {
    const conditions = {
      where: {
        email,
      },
    }

    return Token.findOne(conditions)
  }

  Token.doeItExistAlready = async (email) => {
    const existingEntry = await Token.findByEmail(email)

    return !helper.doWeNeedToGetTheEntry(existingEntry)
  }

  Token.generate = () => {
    return Promise.resolve(uuid())
  }

  Token.saveIt = async (email, token) => {
    const data = {
      email,
      token
    }

    return Token.create(data)
  }
}
