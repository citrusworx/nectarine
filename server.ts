const express = require('express');
import {Request, Response} from 'express';
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const { gensql } = require('./lib/util/util');
import {Pgsql} from './lib/dbz/pg/pgz';
import {Mysql, closeSql, pool} from './lib/dbz/ms/msqlz';
import {Mngz, connectMngz, createCollection, insertOne} from './lib/dbz/mg/mgz';
import { mapInsert, getValues, mapGetter } from './lib/util/msqlUtil';


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
	clause: string;
	statement:
	{
		column: string[];
		values: string[];
		operator: string;
	};
}


server.get('/goat', async(req: Request, res: Response) => {
	connectMngz();
	Mngz(async (mngzClient) => {

		await insertOne(mngzClient, 'users',
		{
			name: "nerd",
			email: "nerd@mail.com",
			created_at: new Date()
		})});
		res.send(
			`MONGO INSERTION COMPLETE`
		)
});

server.get('/:id/:param/:value', async (req: Request, res: Response) => {
	const getUserByName: SQLgen = gensql(process.env.userYAML, 'user', 'get', 'user');
	const {id, param, value} = req.params;
	console.log("NEW USER: ", getUserByName);
	const sql = `${getUserByName.type} ${id} ${getUserByName.action} ${getUserByName.table} ${getUserByName.clause} ${param} ${getUserByName.statement.operator}"${value}";`;
	console.log(sql);
	const db = pool;
	// GET ROWS
	const [rows] = await db.execute(sql, [value]);
	res.json(rows);
});


server.get('/', async (req: Request, res: Response) => {
	const newUser: SQLgen = gensql(process.env.userYAML, 'user', 'get', 'user');
	// Vales utility function?
	const vals = getValues(newUser);
	// MySQL specific utility function that maps the ? placeholder correctly
	const mappedVars = mapGetter(newUser);

	const sql = `${newUser.type} ${newUser.action} ${newUser.table} (${vals}) ${newUser.values} ${mappedVars} ;`;

	console.log("VALUES:", vals);
	console.log("VARS", mappedVars);
	console.log("SQL: ", sql);

	try{
		const result = await Mysql(sql, ['igor@gmail.com', 'tuesdaymuseday', 'Igor']);
		res.send(
			`Row inserted a db into ${newUser.table}`
	)
		closeSql();
	}
	catch(error: any){
		console.log("DANGER: ", error.code, error.message, error.stack);
		(res as Response).status(500).send("Error in DB transaction");
	}

})


server.listen(port, () => {
	console.log('Server is running. Meeeooooooow')
})
