const mysql = require('mysql2/promise);
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../../.env')});

const pool = mysql.createPool {
	host: process.env.MS_HOST || 'localhost',
	user: process.env.MS_USER || 'root',
	password: process.env.MS_PASS ||'',
	database: process.env.MS_DB || 'nectarine',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

async function Mysql(query, values = []){
	try{
		const [rows] = await pool.execute(query, values);
		return rows;
	}
	catch(err){
		console.error('ERROR:', err.stack);
		throw err;
	}

}

async function closeSql(){
	await pool.end()
	console.log('MySQL connection terminated');
}

module.exports = { Mysql, closeSql };
