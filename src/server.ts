import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

bootstrap()
