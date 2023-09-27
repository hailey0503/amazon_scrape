const dotenv = require('dotenv');
const express = require('express')
const axios = require('axios');

dotenv.config();//!!!

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;

app.use(express.json());

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true` //pass api key when we call the function

const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.get('/', (req, res)=> {
	res.send("Welcom to Amazon scrape API");
});

//get product details

app.get('/products/:productId', async (req, res) => {
	const { api_key } = res.query;
	console.log(req.params)
	const { productId } = req.params;
	console.log(productId)


	try {
		const response = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
		//console.log(response.data)
		res.json(response.data);
		console.log('data came')
		
	} catch (err) {
		res.json(err);
	}
})

//get product reviews
app.get('/products/:productId/reviewssss', async (req, res) => {
	const { api_key} = res.query;
	console.log(req.params)
	const { productId } = req.params;
	console.log(productId)


	try {
		const response = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
		//console.log(response.data)
		res.json(response.data);
		console.log('data came')
		
	} catch (err) {
		res.json(err);
	}
})

//get product offers
app.get('/products/:productId/offerssss', async (req, res) => {
	const { api_key} = res.query;
	console.log(req.params)
	const { productId } = req.params;
	console.log(productId)


	try {
		const response = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
		//console.log(response.data)
		res.json(response.data);
		console.log('data came')
		
	} catch (err) {
		res.json(err);
	}
})

//get search result
app.get('/search/:searchOuery', async (req, res) => {
	const { api_key} = res.query;
	console.log(req.params)
	const { searchQuery } = req.params;
	console.log(searchQuery)


	try {
		const response = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=/${searchQuery}`)
		console.log(response.data)
		res.json(response.data);
		console.log('data came')
		
	} catch (err) {
		res.json(err);
	}
})



app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)); //starting server: make server listen from specific port