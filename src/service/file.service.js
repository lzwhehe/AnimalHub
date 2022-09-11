const connection = require('../app/database');

class FileService {
  async saveAvataInfo(mimetype, filename, size, id) {
    const statement = ` 
    INSERT INTO avatar (mimetype, filename, size,user_id )
    VALUES (?,?,?,?);`;
    const [res] = await connection.execute(statement, [mimetype, filename, size, id]);
    return res;
  }
  async createFile(filename, mimetype, size, id, momentId) {
    const statement = ` 
    INSERT INTO file (filename, mimetype, size, user_id, moment_id )
    VALUES (?,?,?,?,?);`;
    const [res] = await connection.execute(statement, [filename, mimetype, size, id, momentId]);
    return res;
  }
  async getFileByFileName(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?`
    const [res] = await connection.execute(statement, [filename]);
    return res;
  }
}

module.exports = new FileService();
