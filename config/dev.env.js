'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH:'"https://vue-course-api.hexschool.io"', //‘’單引號裡需再寫上雙引號“”
  CUSTOMPATH:'"vincechen"',
})
