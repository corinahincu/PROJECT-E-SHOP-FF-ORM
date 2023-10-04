"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const api_js_1 = __importDefault(require("./product/api.js"));
const entities_js_1 = require("./product/entities.js");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const fastify = (0, fastify_1.default)({ logger: true });
const connection = await (0, typeorm_1.createConnection)({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '8929c',
    database: 'e_shop_ff_orm',
    entities: [entities_js_1.Product],
    synchronize: true,
    logging: true,
});
fastify.register(require('fastify-typeorm-plugin'), {
    connection,
});
fastify.register(api_js_1.default);
fastify.get('/', async (request, reply) => {
    reply.code(200).send({ status: 'active' });
    const productRepository = (0, typeorm_2.getRepository)(entities_js_1.Product);
    const products = await productRepository.createQueryBuilder('products').getMany();
    return products;
});
/* fastify.register(createProductRoute)
fastify.register(import('fastify-typeorm-plugin'), {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8929c',
  database: 'e_shop_ff_orm',
  entities: [Product,Money],
  synchronize: true,
  logging: true,
});

fastify.get('/', async (request,reply) =>{
  reply.code(200).send({ status:'active'})

  const products = await fastify.orm
    .getRepository(Product)
    .createQueryBuilder('products')
    .getMany()

    return products
}) */
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
