# ServiceWorker for Glitch

This is a "Make your application load instantly & work offline with ServiceWorker" template code for your glitch app.

ServiceWorker is a new web standard that makes your web app work offline (and more).
It is starting to get [wider support](https://jakearchibald.github.io/isserviceworkerready/) in major browsers.

If you are confused about what it is after watching bazzilion videos on YouTube, me too! I [tried to explain in pictures here](http://kosamari.com/notes/Service-Worker-what-are-you).

## What do I do with this ?

**Making a website & want to make it load instantly & offline?**

- Remix this app & put your html/js/css code into `/public` directory
- Open `sw.js` and update files you want to cache in `URLS` variable
- **Update `CACHE_NAME` variable** every time you want to update contents cached in user's browser  
  (Don't forget this! I often forget it & get frustrated that my cache does't update)

**Want to know how to use ServiceWorker ?**

- check out the script tag in `index.html` (at the bottom) & `sw.js`

### File Structure

#### front-end

- public/index.html : Your webpage! **At the bottom of the file you can find how ServiceWorker is installed.**
- public/style.css : Stylesheet for your webpage !
- public/app.js : Some application code (javascript) for your webpage!
- public/sw.js : **ServiceWorker code. This file defines what should ServiceWorkder do when the browser requests resoources from server.**

#### back-end

- package.json : It usually has some info about the app
- README.md : This file.
- server.js : This is super minimal http server I wrote.  
  (You can ignore what's inside of server.js if you are only making frontend application in `/public` directory.)
