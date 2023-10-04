import {FastifyInstance} from 'fastify'
import { getRepository } from 'typeorm'
import {Product} from './entities'
const createProductRoute = async (fastify: FastifyInstance) => {
  fastify.post('/products', async(request,reply) =>{
    try{
      const {id, name, price} = request.body as Product

      const product = new Product()
      product.id = id
      product.name = name
      product.price = price

      const productRepository = getRepository(Product)
      await productRepository.save(product)

      reply.status(201).send({ message: 'Product created successfully'})
    } catch(error){
      console.error('Error creating product:', error)
      reply.status(500).send({message: 'Internal server error'})
    }
  })
}

export default createProductRoute