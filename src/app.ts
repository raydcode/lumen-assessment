import express,{Request,Response} from 'express';
import cors  from 'cors';
import dotenv from 'dotenv';
import { parseCsvAndInsert } from './scripts';
import job from "node-cron"

dotenv.config({path:'.env'})

const app = express();

const PORT : unknown = Number(process.env.PORT) as number ;


app.use(cors());


job.schedule('* * 12', () => {
    parseCsvAndInsert('./data.csv');
});


app.get('/test',(req:Request,res:Response)=>{
    parseCsvAndInsert('./data.csv');
    res.send({
        message:"Parsing csv.."
    })
});


app.get('/',(req:Request,res:Response)=>{
    res.send({
        message:"Server Is up and Running"
    })
});

app.listen(PORT,()=>{
    console.log(`Server Listening on Port ${PORT}`)
})

