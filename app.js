const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const db = mongoose.connect('mongodb://localhost/mymAPI');

const app = express();
const appRouter = express.Router();
const port = process.env.PORT || 3000;

const User = require('./models/userModel');

app.use(bodyParser.urlencoded({ extended: true }));

appRouter.route('/users')
  .post((req, response) => {
    const user = new User(req.body);
  })
  .get((request, response) => {
    const { query } = request;
    User.find(query, (err, users) => {
      if (err) {
        return response.send(err);
      }
      return response.json(users);
    });
  });

appRouter.route('/users/:userId')
  .get((request, response) => {
    User.findById(request.params.userId, (err, user) => {
      if (err) {
        return response.send(err);
      }
      response.status = 400;
      return response.json(user);
    });
  });


app.use('/api', appRouter);
app.get('/', (req, res) => {
  res.send('welcome to my API');
});

app.listen(port, () => {
  console.log(`Running in port${port}`);
});
