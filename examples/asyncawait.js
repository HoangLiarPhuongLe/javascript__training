const getData=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
        resolve("some data"),2000);
    })
}

const doSomething=async()=>{
    const data= await getData()
    console.log(data);
}
doSomething();
