const  App =require( './app.js')
const { ProcessVariablesCheckerUtil} =require( "./util/index.js")

const { name } = require('../package.json')

async function startServer () {
  ProcessVariablesCheckerUtil.check()

  await App.init()
  const app = App.app
  app.listen(App.port, () => {
    console.info(`${name} started:`)
    console.info(`\tPort: ${App.port}`)
    console.info(`\tStart date: ${(new Date()).toUTCString()} \n`)
  })
  return app
}

module.exports = startServer().catch(err => console.error(err.message))
