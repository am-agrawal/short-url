# Short URL using Next.JS

To setup this project, follow below steps:

```
git clone https://github.com/am-agrawal/short-url.git
```
```
cd short-url
```
```
npm i
```
Add environment variables
- `DATABASE_URL` (Should support Prisma, I've used PostgreSQL, but you can use any other DBMS that's supported by Prisma)
- `NEXT_SHORT_URL_APP_NAME` (You can skip it)
```
npx prisma generate
```
```
npx prisma migrate dev
```

To run this application:

```
npm run dev
```
