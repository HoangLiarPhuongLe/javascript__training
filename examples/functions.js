function getData(){
    console.log("get Data");
}

getData();

const green="green";
function getColor(color){
    console.log("This is green");
}
getColor(green);


const black="black";
function getDescription(color, age){
    console.log("Print color:",color);
    if(age){
        console.log("Print age:",age);
    }
    else{
        console.log("Age undefined");
    }
}
getDescription(black);

//Return Functions
function getString(){
    return "bonjour";
}
let result=getString();
console.log("xin chao trong tieng phap la:",result);

function getInfor(){
    return ["Flavio",27];
}
let[name,age]=getInfor();
console.log("My name is:",name);
console.log("I'm",age);

//Nested Functions
function getString2(){
    return getString();
}
let result2=getString2();
console.log("Gia tri get string 2 tra ve la:",result2);

function getData2(){
    getData();
    return "hi";
}
let data= getData2();
console.log("Gia tri tra ve cua get data 2 la:",data);

