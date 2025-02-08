import {MongoClient, Db} from 'mongodb';

const uri = `mongodb://${process.env.MG_USER}:${process.env.MG_PASS}@${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_DB}?authSource=admin`;

interface user {
	user: string;
}


 export const mngzClient = new MongoClient(uri);

// Start the connection to DB
export async function connectMngz(): Promise<MongoClient>{

		await mngzClient.connect();
		console.log('Connected to Mongo');
		return mngzClient;
}

//Close Connection to Database
export async function closeMngz(client: MongoClient): Promise<void>{
	await mngzClient.close()
	console.log("Connection to database is terminated");
}

// Connect to database and perform operation by callback
export async function Mngz(callback: (client: MongoClient) => Promise<void>): Promise<void> {
	try {
		const client = await connectMngz();
		await callback(client);
	}
	catch(error: any){
		console.error('ERROR', error.message, error.code, error.stack);
	}
}

export async function createCollection(client: MongoClient): Promise<void>{
	try{
		const db: Db = mngzClient.db(process.env.MG_DB);
		await db.createCollection<user>('users');
		console.log('Created collection successfully');
		await closeMngz(client);
	}
	catch(error: any){
		console.error('ERROR', error.message, error.code);
	}
}

export async function insertOne(client: MongoClient, collection: string, document: any = {}): Promise<void>{
	const db: Db = client.db(process.env.MG_DB);
	const varCollection = db.collection(collection);
	await varCollection.insertOne(document);
	console.log('Document inserted successfully')
	await closeMngz(client);
}
