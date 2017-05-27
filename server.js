const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

var pool = new pg.Pool({
    user: "postgres",
    password: "quentin",
    host: "localhost",
    port: 5432,
    database: "postgres",
    multipleStatments:true,
});
// Serve files from public folder. That's where all of our HTML, CSS and Angular JS are.
app.use(express.static('public'));
// This allows us to accept JSON bodies in POSTs and PUTs.
app.use(bodyParser.json());

// TODO Set up access to the database via a connection pool. You will then use
// the pool for the tasks below.


// GET /api/items - responds with an array of all items in the database.
// TODO Handle this URL with appropriate Database interaction.
app.get('/api/items', function(req, res){
  pool.query("SELECT * FROM shoppingcart; select sum(price * quantity) as total from shoppingcart").then(function(result){
    res.send(result.rows);
  }).catch (function(err){
    console.log(err);
  })
});
// app.get('/api/items', function(req, res){
//   pool.query("select sum(price * quantity) as poo from shoppingcart").then(function(result){
//     res.send(result.rows);
//   }).finally (function(err){
//     console.log(err);
//   })
// });

// POST /api/items - adds and item to the database. The items name and price
// are available as JSON from the request body.
// TODO Handle this URL with appropriate Database interaction.
app.post('/api/items', function(req, res) {
  var cart = req.body; // <-- Get the parsed JSON body
  var sql = "INSERT INTO shoppingcart(product, price, quantity) "+
  "VALUES ($1::text, $2::real, $3::smallint)";
  var values = [cart.product, cart.price, cart.quantity];
  pool.query(sql, values).then(function() {
      res.status(201); // 201 Created
      res.send("INSERTED");
  });
});
// app.put('/api/items/:id', function(req, res) {
//   var id = req.params.id;
//   // var sql = "update shoppingcart set quantity = 2 where id = $1::int", [id];
//   pool.query("update shoppingcart set quantity = 2 where id = $1::int", [id]).then(function() {
//     res.status(201); // 201 Created
//     res.send("INSERTED");
//   });
// });


// DELETE /api/items/{ID} - delete an item from the database. The item is
// selected via the {ID} part of the URL.
// TODO Handle this URL with appropriate Database interaction.
app.delete('/api/items/:id', function(req, res) {
    var id = req.params.id; // <-- This gets the :id part of the URL
    pool.query("DELETE FROM shoppingcart WHERE id = $1::int", [id]).then(function() {
        res.send("DELETED");
    }).catch(res);
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
