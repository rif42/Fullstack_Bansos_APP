# Bansos CRUD app

This is a full stack CRUD app that allows admins to create bansos (government allowance) and allows people to verify their entry.

## Tech Stack

### Frontend

I use the newest React with Vite.  
Why React? because i want to get better at it while also refreshing my knowledge about the newest module versions like react router
Why Vite? its new, its fast, its easy.

### Backend

I'm completely new on backend and this is my first backend and fullstack project. I use NodeJS with Express for this app.
Why NodeJS and Express? Because its the most popular and its written in Javascript. After using it for awhile, its quite simple and easy to use too.

### Database

The good ol MySQL. I used Laragon (version Full 6, the newest) to install it. Its very easy and painless to use.

## Installation

This app is divided by two folders. client for frontend, server for backend. As you have already seen, the frontend uses React while the backend uses NodeJS

1. go into client folder using cmd (cd client)
2. npm i
3. npm run dev
4. open a new terminal
5. go into server folder using cmd (cd server)
6. npm i
7. npm run start

re check the configs:

-   backend port should be 3001
-   frontend port should be 3000

8. open laragon
9. right click on the app, go to SQL, make sure its version 8.0.30
10. my backend doesnt use password for the database, so make sure your database dont have any password. or add password and alter the backend files by yourself
11. in laragon app, click start
12. wait until services started, then click terminal
13. type 'mysql -u root' (remember, no password)
14. in the database terminal, type 'create database [insert database name]'
15. 'use [database name]'
16. open queries.sql in client/src folder
17. build the tables, copy paste all the queries inside queries.sql into the database terminal
18. your app is ready to use
