# Front End Project Assignment: Noble Stay booking application - Front end

## Project description
My final assignment project in the Front End Project-course at the Front End Developer programme. 

In this project, we were first tasked with a group assignment to create an idea for a bnb-styled booking service with a specific niche. After coming up with an idea and doing some research with the main stakeholders, each group presented their idea, design and interactive prototype in Figma.
Following the presentations, each student had the task of creating a full-stack application based on the design of their group’s prototype.

This is the frontend part of the project, which is the web application interface that the user can interact with. To make the front end part I used Javascript, React, Vite and Context API, and to create components and do styling I used ShadCn and Tailwind. The user can browse different castle listings, read more about each castle, create an account and log in, place bookings and even create their own listings on the profile page. They can also update or delete their created listings if they wish.

This was a big project to handle, but I did manage to make the front end and back end parts work as intended in time. It was a fun challenge to create a full backend and also focus on the design of the front end, since it can be difficult to balance both. A lot of code was reused from my back-end development assignment, since I also used React, Express, MongoDb and Mongoose in that project.

## Installation
To launch the website, first make sure that you have NodeJs installed. 

Clone the backend repository: `https://github.com/veraaa99/noble-stay-backend.git` or download it as a zip-file and unpack it.<br/>

Clone the frontend repository: `https://github.com/veraaa99/noble-stay-frontend.git` or download it as a zip-file and unpack it.<br/>

In your backend repository, create an `.env` file and add the necessary environment variables to the document. Or add them to the `.env-example` file, and change the `"dev": "nodemon --env-file=.env src/server.js"`
script to `"dev": "nodemon --env-file=.env.example src/server.js"` in the `package.json` file.

Open the repositories separately in eg. your development environment and open up a terminal in each project.<br/>In the terminal of the backend project, run the `npm run dev` command to start the server.<br/>Then, In the frontend terminal, run `npm run dev`. Finally, launch the `localhost`-link in your desired browser.

## Usage & features
Use the nav bar on top to navigate between the site’s different pages.

To create an account, click on “login/sign up” in the navbar menu. Create a new account, or sign in if you already have an account. You will then be able to book and create new castle listings.

On the home screen, you can choose to browse various listings of castles to visit. Or, you can search for castles based on location, dates, number of guests and other various filters in the search bar.
After choosing your search options and clicking “Search”, you’re taken to a search results page with listings that match your chosen search options. You can also view all available castle by clicking on “All castles” in the nav bar.

When you click on a castle card, you will be taken to a details page. From here, you can read more about the castle. If you want to place a booking, fill in dates, a room and number of guests. Press the Reserve button. You will be directed to a page with a booking summary. If you’re logged in, choose a payment option (you will not be cheraged). Ig you’re not logged in, log in or create an account before continuing. Afer choosing a payment option and pressing the Book-button, you will be taken to a Booking Confirmed page, showing you the details of your placed booking. Click the Back to start-button to return to the home page.

To view your profile, click on My bookings in the navbar. Here, you can view your account details (email and phone number), your bookings and create your own listing via the form at the bottom. FIll in all the fields and press the Submit listing-button to create a new listing. Your created listings will be listed under the “My listings” header. 
To edit one of your listings, press the edit listing-button on your chosen listing, make your changes and press the update listing-button. To delete a listing, press the delete listing-button on the listing.

## Credits
The default images used in the placeholder listings in this project are taken from Unsplash.com and Pexels.com , and do not belong to me.
The following sources are credited:

Christer Lässman on Unsplash.com
https://unsplash.com/photos/a-large-stone-building-sitting-next-to-a-body-of-water-5AG4PXEgMvE 

Triztic Photography on Unsplash.com
https://unsplash.com/photos/an-aerial-view-of-a-castle-on-a-small-island-9lX8QBvwpyM 

Roger Suen on Unsplash.com
https://unsplash.com/photos/a-historic-castle-with-formal-gardens-on-a-sunny-day-2R3wQmGooKg 

Rasmus Andersen on Pexels.com
https://www.pexels.com/photo/red-brick-castle-in-landskrona-sweden-31599512/ 
wim de mont on Pexels.com
https://www.pexels.com/photo/scenic-view-of-kalmar-castle-in-sweden-33396540/ 

Riku Keto on Pexels.com
https://www.pexels.com/photo/hame-castle-in-hameenlinna-finland-21728660/ 

Joseph Gonzalez on Unsplash.com
https://unsplash.com/photos/man-wearing-white-v-neck-shirt-iFgRcqHznqg 

I want to thank my teacher for the feedback and help during the project, as it helped me a lot. This task has been a great way for me to manage an entire fullstack project, and learn how to create a website based on a design. It has been a challenging project but also a very fun and rewarding experience!
