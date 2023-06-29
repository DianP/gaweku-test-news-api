# Gaweku Test - News API

This is an example of a simple news API using Express.js and Typescript for Gaweku Test.
Currently data output and features is limited.

## Installation

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in the values
3. Install dependencies using `npm install`
4. Start dev server by running `npm run dev`
5. To build the project, run `npm run build` and run the server using `npm start`

## API Documentation

| Endpoint    | Description  |
| ----------- | ------------ | 
| `GET /news` | Get news data on NewsAPI, and The New York Times' APIs. | 

## Query Parameters
| Parameter | Description | Example |
| --------- | ----------- | ------- |
| `provider` | Get the news by provider. *options:* `nytimes` `newsapi` `all`. *default:* `all` | `provider=nytimes` |
| `filter` | Choose to get latest news or popular news. *options:* `popular` `all`. *default:* `all` | `filter=popular` |
| `search` | Search news by keyword. *options:* `(string)`. Note: Search doesnt work if filter=popular | `search=corona` |
| `page` | Get the news by page. *options:* `(number)`. *default:* `1` | `page=2` |

### Example
```
http://localhost:1337/news?provider=nytimes&filter=all&search=corona&page=2
```

#### Output
```

	"status": "success",
	"code": 200,
	"data": [
		{
			"title": "Neighborhood Numbers: Corona",
			"description": "Demographic information for the Corona neighborhood.",
			"snippet": "Demographic information for the Corona neighborhood.",
			"source": "The New York Times",
			"author": "The New York Times Teams",
			"url": "https://www.nytimes.com/2013/09/05/nyregion/neighborhood-numbers-corona.html",
			"thumbnail": null,
			"publishedAt": "2013-09-05T02:17:29.000Z"
		},
		{
			"title": "‘Corona Cycleways’ Become the New Post-Confinement Commute",
			"description": "As European cities emerge from quarantines, bicycles are playing a central role in getting the work force moving again.",
			"snippet": "As European cities emerge from quarantines, bicycles are playing a central role in getting the work force moving again.",
			"source": "The New York Times",
			"author": "Liz Alderman",
			"url": "https://www.nytimes.com/2020/06/12/business/paris-bicycles-commute-coronavirus.html",
			"thumbnail": "https://static01.nytimes.com/images/2020/06/12/business/12virus-cycle-sub/12virus-cycle-sub-mediumThreeByTwo440-v2.jpg",
			"publishedAt": "2020-06-12T04:00:20.000Z"
		},
		{
			"title": "Love in the Time of Corona",
			"description": "Call me a romantic, but I don’t believe some rude little virus should get in the way of love, or, at least, in the way of dating. Whether you’re forced away from your longtime partner due to quarantine or you’ve just matched with your 10th Daniel on Hinge (just me?), this moment can be hard...",
			"snippet": "Call me a romantic, but I don’t believe some rude little virus should get in the way of love, or, at least, in the way of dating. Whether you’re forced away from your longtime partner due to quarantine or you’ve just matched with your 10th Daniel on Hinge (just me?), this moment can be hard...",
			"source": "Wirecutter",
			"author": "Wirecutter Teams",
			"url": "https://www.nytimes.com/wirecutter/blog/love-in-the-time-of-corona/",
			"thumbnail": "https://static01.nytimes.com/wp-content/uploads/2020/03/lovecorona-lowres-screen.jpg?auto=webp&width=440&crop=3:2",
			"publishedAt": "2020-03-20T00:00:00.000Z"
		},
		{
			"title": "Living In: Corona, Queens",
			"description": "Corona is not far from Manhattan by train and bus, and homes are comparatively affordable. It may be cacophonous, but beneath that lies the rich diversity of a New York City immigrant neighborhood.",
			"snippet": "Corona is not far from Manhattan by train and bus, and homes are comparatively affordable. It may be cacophonous, but beneath that lies the rich diversity of a New York City immigrant neighborhood.",
			"source": "The New York Times",
			"author": "The New York Times Teams",
			"url": "https://www.nytimes.com/slideshow/2009/02/11/realestate/20090215LIVINGIN_index.html",
			"thumbnail": null,
			"publishedAt": "2009-02-11T21:35:02.000Z"
		},
		{
			"title": "Trump’s Corona Coronation",
			"description": "“There won’t be a transfer, frankly. There will be a continuation.” How could the president makes his intentions any clearer?",
			"snippet": "“There won’t be a transfer, frankly. There will be a continuation.” How could the president makes his intentions any clearer?",
			"source": "The New York Times",
			"author": "Roger Cohen",
			"url": "https://www.nytimes.com/2020/09/25/opinion/trump-election-leave-office.html",
			"thumbnail": "https://static01.nytimes.com/images/2020/09/25/opinion/25cohenWeb/25cohenWeb-mediumThreeByTwo440.jpg",
			"publishedAt": "2020-09-25T20:22:23.000Z"
		},
		{
			"title": "Man Who Said, ‘If I Get Corona, I Get Corona,’ Apologizes",
			"description": "A beachgoer whose defiance of social distancing guidelines drew widespread attention said that he had not been “aware of the severity of my actions and comments.”",
			"snippet": "A beachgoer whose defiance of social distancing guidelines drew widespread attention said that he had not been “aware of the severity of my actions and comments.”",
			"source": "The New York Times",
			"author": "Aimee Ortiz",
			"url": "https://www.nytimes.com/2020/03/24/us/coronavirus-brady-sluder-spring-break.html",
			"thumbnail": "https://static01.nytimes.com/images/2020/03/24/multimedia/24xp-virus-springbreaker/merlin_170362518_f2ff6961-85cb-4d91-bade-4054eb3bad52-mediumThreeByTwo440.jpg",
			"publishedAt": "2020-03-24T23:32:54.000Z"
		},
		{
			"title": "A Corona, Please, and Don’t Hold the Lime",
			"description": "Every time a bartender in New York City puts a lime slice in that Corona with bare hands, he or she is breaking the law.",
			"snippet": "Every time a bartender in New York City puts a lime slice in that Corona with bare hands, he or she is breaking the law.",
			"source": "The New York Times",
			"author": "Michael Wilson",
			"url": "https://www.nytimes.com/2007/11/06/nyregion/06tongs.html",
			"thumbnail": null,
			"publishedAt": "2007-11-06T05:00:00.000Z"
		},
		{
			"title": "Michelle Corona and Rory McDermott",
			"description": "Michelle Marie Corona, a daughter of Deanna M. Corona and Dr. Joseph T. Corona of Chatham, N.J., was married last evening to Rory Patrick McDermott, a son of Carole and Thomas L. McDermott of New York. The Rev. George W. Rutler officiated at the Roman Catholic Church of Our Savior in New York.    Mrs. McDermott, 25, is the communications coordinator in the corporate communications department of Assurant, a financial services company in New York. She graduated from Georgetown University. Her father, an orthopedic surgeon, is a partner in the Summit Medical Group in New Jersey. Her mother is a freelance writer of preparation books for the general equivalency diploma test.  ",
			"snippet": "Michelle Marie Corona, a daughter of Deanna M. Corona and Dr. Joseph T. Corona of Chatham, N.J., was married last evening to Rory Patrick McDermott, a son of Carole and Thomas L. McDermott of New York. The Rev. George W. Rutler officiated at the Roman Catholic Church of Our Savior in New York.    Mrs. McDermott, 25, is the communications coordinator in the corporate communications department of Assurant, a financial services company in New York. She graduated from Georgetown University. Her father, an orthopedic surgeon, is a partner in the Summit Medical Group in New Jersey. Her mother is a freelance writer of preparation books for the general equivalency diploma test.  ",
			"source": "The New York Times",
			"author": "The New York Times Teams",
			"url": "https://www.nytimes.com/2005/05/22/fashion/weddings/michelle-corona-and-rory-mcdermott.html",
			"thumbnail": null,
			"publishedAt": "2005-05-22T05:00:00.000Z"
		},
		{
			"title": "Corona Heater Account",
			"description": "  The GLO-International Corporation has assigned Needham, Harper & Steers advertising responsibility for its Corona Portable Kerosene Heaters. The $2.5 million account, previously at Penny-Ohlmann-Neiman Inc., will be handled by the Dayton office of N.H.& S. It's estimated that 10 percent of the country's homes now have kerosene heaters.",
			"snippet": "  The GLO-International Corporation has assigned Needham, Harper & Steers advertising responsibility for its Corona Portable Kerosene Heaters. The $2.5 million account, previously at Penny-Ohlmann-Neiman Inc., will be handled by the Dayton office of N.H.& S. It's estimated that 10 percent of the country's homes now have kerosene heaters.",
			"source": "The New York Times",
			"author": "Philip H. Dougherty",
			"url": "https://www.nytimes.com/1982/10/28/business/advertising-corona-heater-account.html",
			"thumbnail": null,
			"publishedAt": "1982-10-28T05:00:00.000Z"
		},
		{
			"title": "Corona Strike Ends",
			"description": "LEAD: The brewery that makes Corona beer was back in operation today after workers ended a seven-week strike for higher wages. Officials at the Cerveceria Modelo S.A. de C.V. brewery said workers returned after a new union was formed. Negotiations between the company and the old union, representing 5,200 workers, failed to resolve the dispute.",
			"snippet": "LEAD: The brewery that makes Corona beer was back in operation today after workers ended a seven-week strike for higher wages. Officials at the Cerveceria Modelo S.A. de C.V. brewery said workers returned after a new union was formed. Negotiations between the company and the old union, representing 5,200 workers, failed to resolve the dispute.",
			"source": "The New York Times",
			"author": "Reuters",
			"url": "https://www.nytimes.com/1990/04/05/business/corona-strike-ends.html",
			"thumbnail": null,
			"publishedAt": "1990-04-05T05:00:00.000Z"
		}
	],
	"meta": {
		"totalResults": 2000,
		"page": 2,
		"pageCount": 200
	}
}
```