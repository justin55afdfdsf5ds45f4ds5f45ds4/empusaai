# Empusa AI

AI-powered content world.

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- TailwindCSS
- PostCSS & Autoprefixer
- Axios
- dotenv

## Folder Structure
```
/empusa-ai
  /src
    /app
      /api
        /generate
          route.ts
      /dashboard
        page.tsx
      /auth
        login.tsx
        register.tsx
      /profile
        page.tsx
      layout.tsx
      page.tsx
      globals.css
    /components
      Navbar.tsx
      LinkInput.tsx
      ImageResult.tsx
      PostCard.tsx
      Loader.tsx
    /lib
      scrapeContent.ts
      generateImages.ts
      generateText.ts
    /models
      userModel.ts
      postModel.ts
    /utils
      api.ts
      auth.ts
  .env
  package.json
  tailwind.config.ts
  postcss.config.ts
  tsconfig.json
  README.md
```

## Getting Started
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`

## Notes
- TailwindCSS is set up globally in `globals.css`.
- All files have boilerplate code. 