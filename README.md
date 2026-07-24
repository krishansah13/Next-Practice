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

- By Default : App Router
- NextJS will configure routes from `app/` folder
- to create a new route, just create a new folder under the `app/` folder say for now it is 'hello', and inside that you have to create `page.js`, so that the folder structure looks like `...app/hello/page.js`. Then you can go to the browser and type `http:localhost:3000/hello` to see your new route which works perfectly accordingly to the react code written in `page.js`
