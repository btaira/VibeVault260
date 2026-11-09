# VibeVault 260

VibeVault 260 is a Next.js app showcasing 260 AI project ideas from the Vibe coding community.
It helps you browse ideas by category, deep dive into prompts and stacks, and discover one randomly using a slot-machine-inspired surprise picker.

## What’s Inside

- 260 curated project ideas across 5 categories: SaaS, Creative, Utility, Social, and Deep Tech
- Filterable idea browser with category counts
- Surprise-me slot machine experience
- Deep dive modal for idea details and prompt inspiration
- Built with Next.js 16, React 19, Tailwind CSS, Framer Motion, and Zustand

## Pages

- `/` — Browse project ideas and use the surprise picker
- `/showcase` — Learn more about the app, view features, and find Docker deployment instructions

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- Docker (optional, if you want to build or run the app in a container)

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
npm start
```

## Docker

This repository already includes a multi-stage `Dockerfile`.
You can build and run the app in Docker with:

```bash
docker build -t vibevault-260 .
docker run --rm -p 3000:3000 vibevault-260
```

Then open `http://localhost:3000`.

### If you publish a Docker image

If you publish the image to Docker Hub or another registry, the pull command will look like:

```bash
docker pull <username>/vibevault-260:latest
```

Replace `<username>` with your Docker Hub account or registry namespace.

## Notes

- The app is currently a frontend-focused Next.js project.
- No extra backend services are required to browse the idea library and use the core UI.
- The Docker image is built from the included `Dockerfile` using Node 22 Alpine.

## License

Use, customize, and share the ideas as you like.
