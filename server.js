const express = require('express');
const jsyaml = require('js-yaml');
const dotenv = require('dotenv');
const fs = require('fs');
const { loadYAML, registerRoute, gensql } = require('./util/util.js');
const pgsql = require('./dbz/pg/pgz.js');

dotenv.config()

const server = express();
const port = process.env.PORT || 3000;



server.get('/', async (req, res) => {
  const newUser = gensql('./config/user/db/pg/user.yml', 'user', 'create', 'newUser');
  const values = newUser.updates.column.join(', ');
  const vars = newUser.updates.values.join(', ');
  const sql = `${newUser.type} ${newUser.action} ${newUser.table} (${values}) ${newUser.values} (${vars});`;

  console.log("VALUES:", values);
  console.log("VARS", vars);
  console.log("SQL: ", sql);

  try{

    const result = await pgsql(sql, ['drewwinkles@gmail.com', 'mypassword', 'Drew']);
    console.log(pgsql(sql, ['drewwinkles@gmail.com', 'mypassword', 'Drew']));
    res.send(
      `user inserted a row into ${newUser.table}`
    )
  }
  catch(error){
    console.log("DANGER: ", error.stack);
    res.status(500).send("Error in DB transaction");
  }

})

server.listen(port, () => {
  console.log('Server is running. Meeeooooooow')
})
