const connection = require('../app/database');
class Service {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES(?);`
    const [res] = await connection.execute(statement, [name]);
    return res;
  }
  async isExitsLabel(label) {
    const statement = `SELECT * FROM label WHERE name = ?`
    const [res] = await connection.execute(statement, [label]);
    return res[0];
  }
 
}

module.exports = new Service();
