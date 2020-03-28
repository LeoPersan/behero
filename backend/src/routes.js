const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi}  = require('celebrate');

const OngController = require('./Controllers/OngController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');
const IncidentController = require('./Controllers/IncidentController');

routes.post('/sessions',SessionController.store);

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}),ProfileController.index);

routes.get('/ongs',OngController.index);
routes.get('/ongs/:id',OngController.show);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(100000000).max(9999999999999),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),OngController.store);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.index);
routes.get('/incidents/:id',IncidentController.show);
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}),IncidentController.store);
routes.put('/incidents/:id',IncidentController.update);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentController.delete);

module.exports = routes;