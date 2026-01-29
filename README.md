# Anime Streaming (Next.js + App Router)

Minimal example with dynamic routes for anime details and episode watching, Tailwind CSS styling, and simple components.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your MongoDB URI and other configuration values.
   See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed MongoDB Atlas setup instructions.

3. Run dev server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Database Setup

This application uses **MongoDB** with **Mongoose ODM** for data persistence.

### Quick Setup:
1. Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster and database user
3. Get your connection string
4. Add it to `.env.local` as `MONGODB_URI`

For detailed step-by-step instructions, see [MONGODB_SETUP.md](MONGODB_SETUP.md).

## Structure

```
src/
  app/
    anime/[id]/page.tsx
    watch/[animeId]/[episodeId]/page.tsx
  components/
    AnimeCard.tsx
    VideoPlayer.tsx
    WatchlistButton.tsx
  data/
    anime.json
  styles/
    globals.css
```

## Notes

- Update `src/app/layout.tsx` to import `src/styles/globals.css`.
- Replace sample video URLs and images with your own assets.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
