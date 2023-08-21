const getData=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
        resolve("some data"),2000);
    })
}

//use Promise
getData().then(data1=>{
    console.log("Use Promise:",data1);
})

const doSomething=async()=>{
    const data= await getData()
    console.log("Use Async, Await:",data);
}
doSomething();
