const db = require('../db.js');

module.exports.createTodo = (event, context, callback) => {
  const { task } = JSON.parse(event.body);
  if (!task) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: `The property "task" is required`
      })
    });
  }

  db.todo
    .create({
      task
    })
    .then(todo =>
      callback(null, {
        statusCode: 200,
        todo: JSON.stringify({ todo })
      })
    )
    .catch(() =>
      callback(null, {
        statusCode: 500,
        todo: JSON.stringify({ error: 'There was an error creating your todo' })
      })
    );
  return null;
};
