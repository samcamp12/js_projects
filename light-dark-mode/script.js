const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');
// dark or light images
function imageMode(color){
	image1.src = `img/undraw_proud_coder_${color}.svg`;
	image2.src = `img/undraw_feeling_proud_${color}.svg`;
	image3.src = `img/undraw_conceptual_idea_${color}.svg`; // make a string template

}

// drak mode styles
function darkMode() {
	nav.style.background = 'rgb(0 0 0 / 50%)';
	textBox.style.background = 'rgb(255 255 255 / 50%)';
	toggleIcon.children[0].textContent = 'Dark Mode';
	toggleIcon.children[1].classList.remove('fa-sun');
	toggleIcon.children[1].classList.add('fa-moon'); //change the icon
	imageMode('dark');
}

function lightMode(){
	nav.style.background = 'rgb(255 255 255 / 50%)';
	textBox.style.background = 'rgb(0 0 0 / 50%)';
	toggleIcon.children[0].textContent = 'light Mode';
	toggleIcon.children[1].classList.remove('fa-moon');
	toggleIcon.children[1].classList.add('fa-sun'); //change the icon
	imageMode('light');
}

// switch theme dynamically
function switchTheme(event) {
	if (event.target.checked){
		document.documentElement.setAttribute('data-theme', 'dark'); // change the root element equal to dark
		localStorage.setItem('theme','dark'); // stored in local storage as key-value pair
		darkMode();
	}else{
		document.documentElement.setAttribute('data-theme','light'); // keep the original theme
		localStorage.setItem('theme','light');
		lightMode();
	}
}

toggleSwitch.addEventListener('change', switchTheme);

// check local storage for theme
const currentTheme = localStorage.getItem('theme'); // it will remember the setting, so the theme will not change after refershing
if (currentTheme){ // current them is not null
	document.documentElement.setAttribute('data-theme', currentTheme);
	if (currentTheme === 'dark'){
		toggleSwitch.checked = true;
		darkMode();
	}
}

