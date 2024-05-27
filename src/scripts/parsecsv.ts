import fs from "fs";
import CsvReadableStream from 'csv-reader';
import { db } from "database";



 
export async function parseCsvAndInsert(path:string):Promise<void> {
   
    const inputStream = fs.createReadStream(path, 'utf8');
    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true,headerLine:0 }))
        .on('data', async function (row) {
           const item = {
             orderId:row[0],
             productId:row[1],
             customerId:row[2],
             productName:row[3],
             category:row[4],
             region:row[5],
             dateOfSale:row[6],
             quantity:row[7],
             unitPrice:row[8],
             discount:row[9],
             shippingCost:row[10],
             paymentMethod:row[11],
             customerName:row[12],
             customerEmail:row[13],
             customerAddress:row[14]
            }


           await db.transaction(async (t)=>{
             try {

                
                const customer = await t.table('customers').insert({
                    reference:item.customerId,
                    email:item.customerEmail,
                    name:item.customerEmail
                }).onConflict('reference').merge().returning('id').first()

                const category = await t.table('categories').insert({
                    name:item.category
                }).onConflict('name').merge().returning('id').first()

                const paymentMethod = await t.table('payment_methods').insert({
                    name:item.paymentMethod,
                }).onConflict('name').merge().returning('id').first()

                const region = await t.table('regions').insert({
                    name:item.paymentMethod,
                }).onConflict('name').merge().returning('id').first()


                const product = await t.table('products').insert({
                    reference :item.productId,
                    name:item.productName,
                    unit_price:item.unitPrice,
                    category_id:category.id                    
                }).onConflict('reference').merge().returning('id').first()

                const order = await t.table('orders').insert({
                    reference :item.orderId,
                    product_id:product.id,
                    customer_id:customer.id,
                    discount:item.discount,
                    shipping_cost:item.shippingCost,
                    payment_method_id:paymentMethod.id,
                    region:item.region          
                }).onConflict('reference').merge().returning('id').first()
                
             } catch (error) {
                t.rollback()
             }
           })
            
        })
        .on('end', function () {
            console.log('No more rows!');
    });
}


