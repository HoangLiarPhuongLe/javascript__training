//getElementById
const paragraph1= document.getElementById("para1");
// console.log(paragraph1);
console.log(paragraph1.textContent);

//querySelector
const h1Element= document.querySelector("h1");
console.log(h1Element);
console.log(h1Element.textContent);

const list=document.querySelector(".list");
console.log(list);

const listItem=document.querySelectorAll("ul > li");
// console.log(listItem);
listItem.forEach((item)=>{
    console.log(item);
});

//modifyingattributes
const img=document.querySelector("img");
console.log(img.hasAttribute('src'));
console.log(img.getAttribute('src'));
//img.removeAttribute('src');


//modifyingclasses
const div = document.querySelector('div');
// div.className= 'warning';

// const activeDiv = document.querySelector('.active');
// activeDiv.classList.add('hidden');  // Add the hidden class
//activeDiv.classList.remove('hidden');  // Remove the hidden class
//activeDiv.classList.toggle('hidden');  // Switch between hidden true and false
// activeDiv.classList.replace('active', 'warning'); // Replace active class with warning class



//modifyingstyles
div.setAttribute('style', 'text-align: center');
div.style.height = '100px';
div.style.width = '100px';
div.style.border = '2px solid black';
div.style.borderRadius = '50%';
div.style.display = 'flex';
div.style.justifyContent = 'center';
div.style.alignItems = 'center';
