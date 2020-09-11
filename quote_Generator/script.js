
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading() {	
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// hide loading
function complete(){
	if(!loader.hidden){
		quoteContainer.hidden = false;
		loader.hidden = true;
		
	}
}

// get quote from API
async function getQuote(){
	loading();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/'// a proxy to enable the link
	const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
	try{
		const response = await fetch(proxyUrl + apiUrl);// will not be set until the fatch completed	
		const data = await response.json(); // will not be set until reponse has been changed to jason format
		// if author is blank, add 'unknown'
		if(data.quoteAuthor === ""){
			authorText.innerText = "Unknown";
		}else{
			authorText.innerText = data.quoteAuthor;// from json
		}
		// reduce font for long quotes
		if(data.quoteText.length > 120){
			quoteText.classList.add('long-quote');// add class of quoteText. Note the css code
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;
		// stop loader, show the quote
		complete();
	}catch(error){
		getQuote();
		console.log('whoops, no quote', error)
	}
}

function tweetQuote(){
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; // twitter query
	// this is a backstick sign
	window.open(twitterUrl, '_blank')
}
// eventlistener
newQuoteBtn.addEventListener('click', getQuote);
twitterbtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
