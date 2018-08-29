const db = require('../db.js');

module.exports.updateTodo = (event, context, callback) => {
  const { id } = event.pathParameters;
  const body = JSON.parse(event.body);
  db.todo
    .update(body, { where: { id }, returning: true })
    .then(resArr => {
      const [, todoArr] = resArr;
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ todo: todoArr[0] })
      });
    })
    .catch(() => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: `There was an error updating todo with id: ${id}`
        })
      };
      callback(null, response);
    });
};
