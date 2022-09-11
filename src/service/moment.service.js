// 与数据库交互的函数抽离
const connection = require('../app/database');
class userervice {
  // async声明使函数成为异步函数,而异步函数当中可以使用await来等待返回Promise函数的结果的返回
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id) VALUE(?,?);`
    const [res] = await connection.execute(statement, [content, userId]);
    return res;
  }
  async getMomentById(id) {
    // 将新创建的连接表建立好后，直接限用户id进行查询
    const statement = `
    SELECT 
    m.id,m.content,m.createAt creatTime ,m.updateAt updateTime ,
        JSON_OBJECT('id',u.id , 'name' , u.name , 'avatarUrl',u.avatar_url) author,
       IF(COUNT(l.id),JSON_ARRAYAGG(
           JSON_OBJECT('id',l.id , 'name' , l.name)
        ),NULL) labels,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
         JSON_OBJECT('id',c.id , 'content' , c.content , 'commentId',c.comment_id,'createTime',c.createAt,
                     'user',JSON_OBJECT('id',cu.id , 'name' , cu.name, 'avatarUrl',cu.avatar_url)
         )),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
				 	 (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
        FROM moment m 
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON l.id = ml.label_id
        WHERE m.id = 6
        GROUP BY m.id;
    `
    // 左连接之后，我ON限定条件得来的另外表数据就可以被我随意使用了
    const [res] = await connection.execute(statement, [id]);
    return res;
  }
  async getMomentByList(offset, size) {
    const statement = `
    SELECT m.id,m.content,m.createAt creatTime ,m.updateAt updateTime ,
    JSON_OBJECT('id',u.id , 'name' , u.name) author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id ) commentCount,
		(SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images 
    FROM moment m LEFT JOIN user u ON m.user_id = u.id
    `;
    const [res] = await connection.execute(statement, [offset, size]);
    return res;
  }
  async update(momentId, content) {
    const statement = `UPDATE moment SET content=? WHERE id=?;`;
    const res = await connection.execute(statement, [content, momentId]);
    return res;
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id=?;`;
    const res = await connection.execute(statement, [momentId]);
    return res;
  }
  async isExitLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id	= ?;`
    const [res] = await connection.execute(statement, [momentId, labelId]);
    return Boolean(res[0]);
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?,?);`
    const [res] = await connection.execute(statement, [momentId, labelId]);
    return res;
  }
}
module.exports = new userervice();
