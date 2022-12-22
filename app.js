const express=require('express')
const app = express()
var SHA256 = require("crypto-js/sha256");
app.get('/abc',(req,res)=>{
    res.status(200).send("hello abhi")
})
// let ar=[1,2,3]
// app.get('/checkval',(req,res)=>{
// let br=[...ar]
// br.push(5)
// res.status(200).send(br)
// })


// let arr=[
// {subject:"maths",mark:90,user:"user1"},
// {subject:"english",mark:100,user:"user2"},
// {subject:"english",mark:80,user:"user1"},
// {subject:"maths",mark:100,user:"user2"}
// ]
// let map_obj={...arr}
// arr.map((obj)=>{
//   if(map_obj[obj.user]){
//     if(map_obj[obj.user][obj.subject]){
//       map_obj[obj.user][obj.subject]= map_obj[obj.user][obj.subject]+obj.mark
//     }else{
//       map_obj[obj.user][obj.subject]=obj.mark
//     }
//   }else{
//     console.log("No")
//     map_obj[obj.user]={}
//     map_obj[obj.user][obj.subject]=obj.mark
//   }
// })

// console.log("map_obj",map_obj)

class CryptoBlock{
    constructor(index, timestamp, data, precedingHash=" "){
     this.index = index;
     this.timestamp = timestamp;
     this.data = data;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }   
}

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];
    }
    startGenesisBlock(){
        return new CryptoBlock(0,"01/01/2020","Initial Block in the Chain","0")
    }
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);        
    }
}
let smashingCoin = new CryptoBlockchain();

smashingCoin.addNewBlock(new CryptoBlock(1, "01/06/2020", {sender: "Iris Ljesnjanin", recipient: "Cosima Mielke", quantity: 50}));
// let newBlock={
    // index,
    // timestamp,
    // data,
    // precedingHash,
    // hash:somehash
// }
smashingCoin.addNewBlock(new CryptoBlock(2, "01/07/2020", {sender: "Vitaly Friedman", recipient: "Ricardo Gimenes", quantity: 100}) );
console.log(JSON.stringify(smashingCoin, null, 1));

app.listen(4000,()=>{
    console.log("server is running on 3000")
})


