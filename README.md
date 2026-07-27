# NEXT JS with Krishan!


### What is Next JS (nextjs.org)

- NextJS is an open source framework built on the top of React to build scalable full-stack applications.
- It blends frontend + backend in the same project
- Routes are configured via filesystem (foldes + files), no code based configuration or extra packages for routing is required.
- All the pages and components are server-side rendered.

---

### Creating First Next App
- you should have node js in your pc/laptop
 - you can visit `https://www.nextjs.org` for all the documentation
 - in your terminal use this command :
    `npx create-next-app@latest`
- navigate to the project you just made, and to start the project use `npm run dev`

![alt text](images/image.png)[this is the expected new Website]
---
## Two Different Approaches for building Next JS

### -> App Router / Page Router
- Pages Router is old way of using routing techniques and is a very stable way
- With Page Router, we build feature rich full stack apps with React
- App Router is new way as it was introduced in React13
- App Router is marked as stable, but still is relatively new and partially buggy.
- App Router supports modern Next and React features, and is said to be the future of NextJS  


---
### Core Concepts to Learn/Know for NextJS

- Routing, Pages and Components
- Fetching and Sending Data
- Styling, Images and Metadata

---
### Routing in Next JS : 
- To create a new route in NextJS Application, following steps needs to be followed: 

Step 01: Make a folder named of the route you want under the `app/` folder, for example: `app/about` 

Step 02: Make a `page.js` file inside the folder

Step 03: Write the desired output of the `/about` route in page.js


### Navigation 
- For Navigation, you can always use `<a></a>` tags, but it is not preferrable as it breaks the purpose of `SPA` by refreshing and loading a whole new page. 

- To solve this, we can use Link tag provided by "next/Link"

```
import Link from 'next/Link'

export default function Home() {
    <p>
        <Link href = "/awesome"> 
            Click me to go to Awesome 
        </Link>
    </p>
}
```

This will show you a paragraph, which when clicked will lead you to `http://localhost:3000/awesome` without refreshing the page, and thus maintaining `SPA`

---