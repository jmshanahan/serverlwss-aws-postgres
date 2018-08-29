const db = require('../db.js');

module.exports.deleteTodo = (event, context, callback) => {
  const { id } = event.pathParameters;
  db.todo
    .destroy({
      where: { id }
    })
    .then(numDeleted =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ numDeleted })
      })
    )
    .catch(() => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: `There was an error deleting todo with id: ${id}`
        })
      };
      callback(null, response);
    });
};
