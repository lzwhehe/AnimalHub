const connection = require('../app/database');

class CommentSerivice {
  // creat  - 插入数据
  async create(momentId, content, id) {
    const statement = `
    INSERT INTO comment (content, moment_id, user_id )
    VALUES (?,?,?);
    `;
    const [res] = await connection.execute(statement, [content, momentId, id]);
    return res;
  }
  async reply(momentId, content, id, commentId) {
    const statement = `
    INSERT INTO comment (content, moment_id, user_id, comment_id)
    VALUES (?,?,?,?);
    `;
    const [res] = await connection.execute(statement, [content, momentId, id, commentId]);
    return res;
  }
  async update(momentId, content) {
    const statement = `UPDATE comment SET content=? WHERE comment_id = ?;`;
    const res = await connection.execute(statement, [content, momentId]);
    return res;
  }
  async remove(momentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const res = await connection.execute(statement, [momentId]);
    return res;
  }
  async getCommentsByMomentId(momentId) {
    const statement = `
    SELECT
    m.id,m.content,m.comment_id commentId , m.createAt createTime,
    JSON_OBJECT('id',u.id , 'name',u.name) user
    FROM comment m
    left JOIN user u ON u.id = m.user_id
    WHERE moment_id = ?;
    `;
    const res = await connection.execute(statement, [momentId]);
    return res;
  }
}

module.exports = new CommentSerivice();
