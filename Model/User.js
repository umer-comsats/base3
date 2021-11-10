const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

class User {
    table = "users";

    async create(user) {
        const [id] = await db(this.table).insert(user);

        return id;
    }

    find(id){
        return db(this.table).where({id});
    }

    edit(id, post) {
        return db(this.table).where({id: id}).update(post);
    }

    all(){
        return db(this.table);
    }

    delete(id) {
        return db(this.table).where({id: id}).del()
    }
}

module.exports = User;