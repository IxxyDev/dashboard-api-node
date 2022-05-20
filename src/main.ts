import { App } from './app'

const bootstrap = async () => {
  const app = new App()
  await app.init()
}

bootstrap()
