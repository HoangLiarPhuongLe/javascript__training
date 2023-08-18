const doSomething= new Promise(
    (resolve, reject)=>{
        let x=5;
        if (x===0){
            resolve("ok");
        } 
        else{
            reject("this error occured");
        }
    }
)
doSomething.then(
    value=>{
    console.log(value);
})
.catch(
    error=>{
        console.log(error);
    }
)
    
