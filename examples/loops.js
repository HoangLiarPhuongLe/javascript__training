//while
const list=["a","b","c"];
let i=0;
while(i<list.length){
    console.log("value of index:",list[i]);
    console.log("index",i);
    i++;
}

//for
const list2=["Hoang","Phuong", "Le"];
for(let y=0; y<list2.length; y++){
    console.log("value of index:",list2[y]);
    console.log("index",y);
}

//for... of
const list3=["e","f","j"];
for(const value of list3){
    console.log("value:",value);
}
