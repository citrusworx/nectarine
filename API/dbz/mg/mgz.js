const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: (__dirname, '../../.env')});

const client = new MongoClient(process.env.MG_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


let db;

async function Mongo(){
	if(!db){
	await client.connect();
	db = client.db(process.env.MG_DB);
	console.log('Connected to Mongo database');
	}
	return db;
}

// Create special Mongo query statement
