const { Client } = require('pg');


// Agnostic query function
async function Pgsql(query, values = []){
	const client = new Client({
		user: process.env.PG_USER,
		host: process.env.PG_HOST,
		password: process.env.PG_PASS,
		database: process.env.PG_DB,
		port: process.env.PG_PORT
	});

	try {
			await client.connect();
			const dbNameResult = await client.query('SELECT current_database();');
			console.log('Connected to database:', dbNameResult.rows[0].current_database);

			const result = await client.query(query, values);
			return result.rows;
	}
	catch(err){
			console.error('ERROR: ', err.stack);
			throw err;
	}
	finally {
		await client.end()
	}


}

module.exports = Pgsql;
