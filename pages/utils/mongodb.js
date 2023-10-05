import { MongoClient } from 'mongodb'

const uri = 'mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/'

export async function connectToDatabase() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = client.db()
  return { client, db }
}
