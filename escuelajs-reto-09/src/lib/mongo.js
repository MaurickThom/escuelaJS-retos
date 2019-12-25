const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@reto-09-escuelajs-bgsv7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
class MongoLib {
  constructor() {
    this.dbName = DB_NAME;
    this.client = this.connect();
  }

  // connect() {
  //   // if (!MongoLib.connection) {
  //   //   MongoLib.connection = new Promise((resolve, reject) => {
  //   //     this.client.connect(err => {
  //   //       if (err) {
  //   //         reject(err);
  //   //       }
  //   //       console.log('Connected succesfully to mongo');
  //   //       resolve(this.client.db(this.dbName));
  //   //     });
  //   //   });
  //   // }
  //   // return MongoLib.connection;
  //   return new Promise((resolve, reject) => {
  //     this.client.connect(error => {
  //       console.log('entre');
  //       if (error) {
  //         return reject(error);
  //       }

  //       // debug("Connected succesfully to mongo");
  //       return resolve(this.client.db(this.dbName));
  //     });
  //   });
  // }
  connect(){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(MONGO_URI,{
            useNewUrlParser:true,
            poolSize:5,
            useUnifiedTopology: true
        },
        (err,client)=>{
            if(err) return reject(err)
            if(!client)
                return reject('An error ocurred when connecting to mongo')
            return resolve(client.db(this.dbName))
        }
        )
    })
}
  create(collection,data){
    return this.client.then(db=>{
      return db.collection(collection,data).insertOne(data)
    }).then(result=>result.insertedId)
  }
  getAll(collection){
    return this.client.then(db=>{
      return db.collection(collection).find().toArray()
    })
  }
  getById(collection,id){
    return this.client.then(db=>{
      return db.collection(collection).find({_id:ObjectId(id)}).toArray()
    })
  }
  update(collection,id,data){
    return this.client.then(db=>{
      return db
        .collection(collection)
        .updateOne(
            { _id:ObjectId(id) },
            { $set:data },
            { upsert: true }
        )
        .then(result=>result.upsertedId || id)
    })
  }
  delete(collection,id){
    return this.client.then(db=>{
      return db.collection(collection).deleteOne({ _id:ObjectId(id) }).then(()=>id)
    })
  }
}

module.exports = MongoLib;
