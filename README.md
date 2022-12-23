# Book-list Fullstack App

This is Buuttis full stack task as outlined in the pdf

## Build with
- React
- Next.js
- Tailwind CSS
- TypeScript
- Cypress
- Redis
- Material UI

## How to use
first fork the project with your preferred method
then install the dependencies

```bash
npm install
```
start the application by running:

```bash
npm run dev
```
then the application should be visible in localhost:3000

run the following while the app is running in the background to e2e test the application
```bash
npm test
```

### Other
Redis is running on redislabs with their free tier. Redis url is hidden in my env.local file so the application doesn't work right now.

If you encounter a connection error it probably is because the free tier has run out of connections so just restart the dev server and it should work. :)
