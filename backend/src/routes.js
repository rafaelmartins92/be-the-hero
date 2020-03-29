const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngCrontroller = require('./controllers/OngController')
const IncidentCrontroller = require('./controllers/IncidentController')
const ProfileCrontroller = require('./controllers/ProfileController')
const SessionCrontroller = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessionCrontroller.create)

routes.get('/ongs', OngCrontroller.index)

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngCrontroller.create)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), ProfileCrontroller.index)

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentCrontroller.index)

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(3),
    description: Joi.string().required(),
    value: Joi.number().required().min(2),
  })
}), IncidentCrontroller.create)

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}),IncidentCrontroller.delete)

module.exports = routes