  # Internship Job Application Tracker

  As a student, keeping track of Job Applications using spreadsheets is chaotic. Therefore, I created a full-stack Kanban-style job application tracker with an analytics dashboard, built with Next.js and TypeScript to help my job search easier.


🔗 [Live Demo](https://internship-job-application-tracker-r0pi9zido.vercel.app/)


## Features
- The Application Tracker uses a Kanban-style board using dnd-kit. So you can drag and drop cards to different columns and re-order the columns.
- You can add, edit and delete applications (CRUD)
- The tracker has searching and filtering capabilities. So you can look for and search for specific applications.
- Loading Skeletons for smooth experience.
- Responsive Design. Works on desktop and mobile

<p align="center">
<img src="https://media.giphy.com/media/h05608YvQAvLfVLjNC/giphy.gif" width="60%" />
</p>



- Analytics Board created using Rechart. Shows you progress of you job search.


<p align="center">
<img src="https://media.giphy.com/media/zqH5yE8ETsnT9ETRJs/giphy.gif" width="60%" />
</p>

- Authentication can be done with credentials or through google OAuth.
- Password reset in case the user forgets their password. However, this feature is not live as can't pay for the automation. So please don't forget your password. Or, log in with google. 


<p align="center">
<img src="https://media.giphy.com/media/FSozUwjdebIFvFJUTW/giphy.gif" width="60%" />
</p>


## Setup
Prerequisites

- Node.js 18+
- A Supabase project
- A Google OAuth app (for Google sign-in)
- A Resend account (for password reset emails)

### Installation

```ps
$ git clone https://github.com/tiffany707/Internship-Job-Application-Tracker

$ cd Internship-Job-Application-Tracker/my-app

$ npm install 
```
### Enviroment Variables
Create these in your .env.local

```ps
DATABASE_URL= #supabase
DIRECT_URL= #supabase

NEXTAUTH_SECRET= # Generate with: openssl rand -base64 32

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

RESEND_KEY=
```
### Running Locally
```ps
$ npm run dev
```
Open http://localhost:3000 in your browser.


## Disclaimer 
The password reset is not functional on the live demo. The email automation requires a paid domain therefore it is not set up. So it's recommended to sign in with google


## Tech Stack
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shaden/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Auth.js](https://img.shields.io/badge/auth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Resend](https://img.shields.io/badge/resend-000000?style=for-the-badge&logo=resend&logoColor=white)
![dnd-kit](https://img.shields.io/badge/dnd--kit-333333?style=for-the-badge&logo=react&logoColor=61DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)







