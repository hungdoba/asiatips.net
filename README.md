# Next.js Blog App

## Description

https://asiatips.net
Author: Do Ba Hung

## Installation

To run the app locally, follow these steps:

1. Clone this repository: `git clone https://github.com/hungdoba/asiatips.net.git`
2. Navigate to the project directory: `cd asiatips.net`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm run dev` or `yarn dev`
5. Access the app at `http://localhost:3000`

## Technologies Used

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Database: PostgreSQL (AWS RDS)
- Database Toolkit: Prisma
- Storage Service: AWS S3
- Deployment Environment: Ubuntu 20.04 (AWS EC2)
- Deployment Management: PM2 Ecosystem

## Folder Structure

```
nextjs-blog-app/
│
├── components/
│   ├── article/
│   ├── common/
│   ├── icons/
│   ├── layout/
│   ├── overview/
│   └── svg/
│
├── pages/
│   ├── [category]/
│   ├── api/
│   ├── gallery/
│   ├── markdown/
│   ├── tags/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── _404.tsx
│   ├── _500.tsx
│   ├── about.tsx
│   ├── contact.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── privacy.tsx
│   ├── search.tsx
│   └── sidemap.xml.tsx
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│   ├── locales/
│   └── ...{images file}
|
├── styles/
│   ├── globals.css
│   └── YouTube.module.css
|
├── ultils/
|
└── ...{other files}
```

## License

This project is licensed under the MIT.

## Contact

For any inquiries or support, feel free to contact hungdoba.hdb@gmail.com.
