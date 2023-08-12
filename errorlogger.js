const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const path=require('path')



const createlogitem=(msg)=>{
    const dateTime=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    return `${uuid()}\t${dateTime}\t ${msg}\n` 
}
const savelogitem = (logItem) => {

    //checking whether the folder exists if it doesnt exist then create such directory

    if (!fs.existsSync(path.join(__dirname,'logs'))){
        fs.mkdir(path.join(__dirname,'logs'),(err)=>{
            if(err){
                console.log(err)
            }
        }
        )
    }
    fs.appendFile(path.join(__dirname,'logs','errorlog.txt'), logItem, (err) => {
        if (err) {
            console.log(err)
        }
    });
}
const log=(msg)=>savelogitem(createlogitem(msg))

module.exports={log}