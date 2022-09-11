// 与数据库交互的函数抽离
const connection = require('../app/database');
class userervice {
  // async声明使函数成为异步函数,而异步函数当中可以使用await来等待返回Promise函数的结果的返回
  async create(user) {
    // 进行一次结构
    const { name, password } = user
    const statement = `INSERT INTO  user (name,password) VALUES(?,?);`;
    const res = await connection.execute(statement, [name, password]);
    // 将user存到数据库中
    return res[0];
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`;
    const [res] = await connection.execute(statement, [name]);
    return res;
  }
  async getImgById(id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`;
    const [res] = await connection.execute(statement, [id]);
    // res是一个对象数组，我想拿到的是图片的详情信息，所以得拿出来具体的详情对象
    return res[0];
  }
  async updateAvatarUrlById(avatarUrl, id) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`;
    const [res] = await connection.execute(statement, [avatarUrl, id]);
    // res是一个对象数组，我想拿到的是图片的详情信息，所以得拿出来具体的详情对象
    return res;
  }
}
module.exports = new userervice();
