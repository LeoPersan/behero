const connection = require('../database/connection');

module.exports = {
    async store(request,response) {
        const {id} = request.body;
        const ong = await connection('ongs').select('*').where('id',id).first();
        return response.json(ong);
    }
}