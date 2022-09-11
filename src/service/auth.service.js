const connection = require('../app/database');

// 将用户身份验证单独抽离出来作为一个模块
class AuthService {
  async check(tableName, id, userId) {
    // 进行查询操作
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [res] = await connection.execute(statement, [id, userId]);
    return Boolean(res[0]);
  }
}

module.exports = new AuthService();
