import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyparser from "body-parser";

const app = express();
const dir = dirname(fileURLToPath(import.meta.url));
const port = 3000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(dir));
let array;
function sortarray(req,res,next){
        //since i already used required in <input> i don't need to use if(text != NULL)
        const text = req.body["arraytext"];
        array = text.split(',').map(Number).filter(value => !isNaN(value));
        
        console.log("before sorting");
        console.log(array);
        array.sort((a, b) => a - b);
        
        console.log("after sorting");
        console.log(array);
    next();
}
app.use(sortarray);
app.get("/",(req,res)=>{
    res.sendFile(dir+"/index.html");
});

app.post("/sort",(req,res)=>{
    console.log(req.body);
    if(array.length>0)
    res.send(`the sorted array is : ${array}`);
    else
    res.send("enter the array");
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}.`);
});