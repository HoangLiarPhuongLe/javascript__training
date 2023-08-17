let getData=()=>{
    console.log("get Data");
}
getData();

//single statement
const single=()=>console.log("hi");
single();

const numbers=(one,two)=>console.log(one,two);
numbers(1,2);

//Return Arrow Function
const string=()=>"test";
const result=string();
console.log("gia tri cua string la:",result);

//default parameters
const getInfor=(color="black",age=2)=>{
    console.log("mau sac:",color);
    console.log("tuoi:",age);
}
getInfor();

//nested functions
const getData2=()=>{
    getData();
}
getData2();