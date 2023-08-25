//Inline event handlers

//Function to modify the text content of the paragraph
const changeText=()=>{
    const p= document.querySelector('p');
    p.textContent="I changed because of an inline event handler.";
}

// Add event handler as a property of the button element
const button= document.querySelector("button");
// button.onclick=changeText;

//Add Event Listener
button.addEventListener('click',changeText);

// Test the key and code properties
document.addEventListener('keydown', event => {
	console.log('key: ' + event.key);
	console.log('code: ' + event.code);
});

//Event Object
// Pass an event through to a listener
document.addEventListener('keydown', event => {
	var element = document.querySelector('span');

	// Set variables for keydown codes
	var a = 'KeyA';
	var s = 'KeyS';
	var d = 'KeyD';
	var w = 'KeyW';

	// Set a direction for each code
	switch (event.code) {
		case a:
			element.textContent = 'Left';
			break;
		case s:
			element.textContent = 'Down';
			break;
		case d:
			element.textContent = 'Right';
			break;
		case w:
			element.textContent = 'Up';
			break;
	}
});

const section = document.querySelector('section');

// Print the selected target
section.addEventListener('click', event => {
	console.log(event.target);
});
