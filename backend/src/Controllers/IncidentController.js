const connection = require('../database/connection');

module.exports = {
    async index(request,response) {
        const page = request.query.page ? request.query.page : 1;
        const perParge = 5;
        const incidents = await connection('ongs')
                                .limit(perParge)
                                .offset((page-1)*perParge)
                                .join('incidents','ongs.id','incidents.ong_id');
        const [count] = await connection('incidents')
                            .join('ongs','ongs.id','incidents.ong_id')
                            .count();
        response.setHeader('X-Total-Count',count['count(*)']);
        return response.json(incidents);
    },
    async show(request,response) {
        const {id} = request.params;
        const ong = await connection('incidents').select('*').where('id',id).first();
        return response.json(ong);
    },
    async store(request,response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        const [incident] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value
        });
        return response.json({incident});
    },
    async update(request,response) {
        const {title, description, value} = request.body;
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        let incident = await connection('incidents').update({
            title,
            description,
            value
        }).where('id',id).where('ong_id',ong_id);
        if (incident == 0) {
            return response.status(401).json({error:'No Authorization!'});
        }
        incident = await connection('incidents')
                                .where('id',id)
                                .where('ong_id',ong_id)
                                .select('*')
                                .first();
        return response.json(incident);
    },
    async delete(request,response) {
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents')
                                .where('id',id)
                                .where('ong_id',ong_id)
                                .delete();
        if (incident == 0) {
            return response.status(401).json({error:'No Authorization!'});
        }
        return response.status(202).json();
    },
}