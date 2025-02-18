import { Router } from 'express'
import { adaptRoute } from '../adapters/express/espress-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login-factory'
import { makeSignUpController } from '../factories/controllers/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
