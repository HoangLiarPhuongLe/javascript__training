//test asynchonous
console.log("before");
setTimeout(()=>{
    console.log("inside the function");
},2000)
console.log("after");

//callback
let sum=(a,b, callback)=>{
    let tong= a+b;
    setTimeout(()=>
    { callback(tong)
  },5000);
}

let printSum=(message) =>{
    console.log("check sum: 6+9 = ",message);
}
sum(6,9,printSum);





