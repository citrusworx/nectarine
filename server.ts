const express = require('express');
import {Request, Response} from 'express';
const jsyaml = require('js-yaml');
const dotenv = require('dotenv');
const fs = require('fs');
const { loadYAML, registerRoute, gensql } = require('./lib/util/util');
import {Pgsql} from './lib/dbz/pg/pgz';

dotenv.config()

const server = express();
const port = process.env.PORT || 3000;

interface SQLgen {
	  type: string;
	  action: string;
		table: string;
		updates: {
			column: string[];
			values: string[];
		};
		values: string;
}

server.get('/', async (req: Request, res: Response) => {
  const newUser: SQLgen = gensql('./lib/config/user/db/pg/user.yml', 'user', 'create', 'newUser');
  const values = newUser.updates.column.join(', ');
  const vars = newUser.updates.values.join(', ');
  const sql = `${newUser.type} ${newUser.action} ${newUser.table} (${values}) ${newUser.values} (${vars});`;

  console.log("VALUES:", values);
  console.log("VARS", vars);
  console.log("SQL: ", sql);

  try{

		const result = await Pgsql(sql, ['emailerator@gmail.com', 'myotherpassword', 'Dave']);
    res.send(
      `user inserted a row into ${newUser.table}`
    )
  }
  catch(error: any){
    console.log("DANGER: ", error.stack);
    (res as Response).status(500).send("Error in DB transaction");
  }

})

server.listen(port, () => {
  console.log('Server is running. Meeeooooooow')
})
