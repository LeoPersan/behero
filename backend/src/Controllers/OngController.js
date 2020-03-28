const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request,response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async show(request,response) {
        const {id} = request.params;
        const ong = await connection('ongs').select('*').where('id',id).first();
        return response.json(ong);
    },
    async store(request,response) {
        const {name, email, whatsapp, city, uf} = request.body;
        console.log({name, email, whatsapp, city, uf});
        const id = generateUniqueId();
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        return response.json({id});
    },
}