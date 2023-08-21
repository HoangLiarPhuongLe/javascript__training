const doSomething= new Promise(
    (resolve, reject)=>{
        let x=0;
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
    
const promiseExp=()=>{
    return new Promise((resolve,reject)=>{
        // resolve("get some data")
        reject("something wrongs");
    });
}

promiseExp().then(data=>{
    console.log(data);
})
.catch(error=>{
    console.log(error);
})

const promiseExp1=()=>{
    return new Promise((resolve,reject)=>{
        resolve({
            name: "Le Hoang",
            company: "AgilityIO"
        })
    });
}

promiseExp1().then(data1=>{
    console.log(data1);
})

const promiseExp2=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("promise exp 2");
        },1000)
    });
}

console.log(1);

promiseExp2().then(data2=>{
    console.log(data2);
})

console.log(2);