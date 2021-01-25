const db = require("../../database/connection");

module.exports = {
    get,
    add,
    getById,
    getBy
}

function get() {
    return db("users").select("id", "username").orderBy("id");
}

function getById(id) {
    return db("users").where("id", id).first();
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return getById(id);
}

function getBy(param) {
    return db("users").where(param).orderBy("id");
}