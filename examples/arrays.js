//length of array
const a=[1,2,3];
console.log("length:",a.length);
console.log(a);

//add an item to array
a.push(4);
console.log("push from end:",a);
a.unshift(0);
console.log("push from beginning",a);

//remove an item to array
a.pop();
console.log("remove from end:",a);
a.shift();
console.log("remove from beginning:",a);

//find an item from array
console.log("find item:",a.find(e=>e>2));

const b=a.includes(4);
console.log("check item:",b);

//join two or more arrays

const c=[4,5,6];
const d=a.concat(c);
console.log("use concat:",d);

const e=[...a,...c];
console.log("use spread operator:",e);