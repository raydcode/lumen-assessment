import knex from "knex";
import dotenv from "dotenv"
dotenv.config({path:'.env'})




export const db = knex({
    client: 'pg',
    connection: {
      host: process.env['DB_HOST'],
      port:Number( process.env['DB_PORT']),
      user: process.env['DB_USER'],
      database: process.env['DB_NAME'],
      password: process.env['DB_PASSWORD'],
    },
  })


  