const Counter = require('../models/Counter')

//Perform Updation of collection values
const UpdateCollection = async (data,CurrentValue) =>{
    if(data.ButtonValue === CurrentValue.ButtonValue){
        return 
    }
    await Counter.updateOne(data,{ButtonValue:CurrentValue.ButtonValue})
    .then((result)=>{
        console.log(result)
    })
    .catch((err)=>{if(err)throw err})
}

//Create new collections
const CreateCollection = async (req,res) =>{
    let buttonVal = req.body.values
    for (let i=0; i< buttonVal.length; i++){
        let CurrentValue = buttonVal[i]
        let data = await Counter.findOne({ButtonId:CurrentValue.ButtonId})
        if(data){
            UpdateCollection(data,CurrentValue)
        }else{
            let saveData = new Counter(CurrentValue)
            try{
                await saveData.save();
            }catch(err){
                throw err
            }
        }
    }
    res.status(200)
    res.send("Values Created")
}

module.exports = CreateCollection