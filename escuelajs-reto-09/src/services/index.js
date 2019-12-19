const { productsMock } = require('../utils/mocks');
const MongoLib = require('./../lib/mongo')

class ProductService {
  constructor(){
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }
  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection)
    return products || [];
  }

  async createProduct({product}){
    const productCreated = await this.mongoDB.create(this.collection,product)
    return productCreated
  }
}

module.exports = ProductService;
