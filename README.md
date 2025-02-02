# GUC Empty Room Finder

Website to help GUC students find empty rooms on campus by scraping the available schedule data on the student portal.

Feel free to copy this and make your own version or open a PR since I will not be maintaining it beyond my own needs.

## Features
- List empty rooms within a slot time frame
- List a schedule for a room
- Find nearest empty room (To be implemented)

## Data accuracy
Data may not be accurate for the following reasons
- The schedule page for some courses is broken so it can not be scraped
- The rooms stored in the database are the rooms found on the schedules, if a room was never used before it will not be in the database.
- Room schedules might change according to uni staff which will not be reflected on the system
- I might need to rerun the scraper


## Tech stack 
- Frontend: NextJS, TailwindCSS
- Backend: tRPC, Prisma
- Database: PostgreSQL (hosted on Neon) 
- Scraping: Puppeteer
- Cron Jobs: GitHub Actions (To be implemented)


## Folder structure
```
guc-empty-room-finder/
├── prisma/                   # Prisma schema and migrations
├── scraper/                  # Scraper script and functions
│   ├── db.ts                 # Functions to interact with database
│   ├── index.ts              # File to run the scraper
│   ├── scraper.ts            # Driver code for the scraper
│   ├── selectors.ts          # CSS selectors for scraping
│   └── ...
├── src/                      # Next.js app
│   ├── app/                  # Frontend
│   │   ├── _components/      # Logic components for the app
│   │   │   └── ...
│   │   ├── api/              # tRPC x Nextjs API setup
│   │   └── ...
│   ├── components/ui/        # Atomic UI components
│   ├── hooks/
│   │   ├── useDetectData.ts  # Hook to detect Day and Slot time from device
│   │   └── useMediaQuery     # Hook to detect if a media query is true
│   ├── lib/                  # Shared types, mappers, consts and etc
│   │   └── ...
│   ├── server/               # BE using tRPC
│   │   └── ...
│   ├── trpc /                # tRPC setup
│   │   └── ...
│   ├── styles/               # Tailwind CSS styles
│   │   └── ...
│   └── ...
```


## Getting Started

### Prerequisites

- Node.js: Ensure you have Node.js installed (v18 or higher).
- Bun: Install Bun as your package manager.
- PostgreSQL: Set up a PostgreSQL database (e.g., using Neon).
- Environment Variables: Create a .env file matching .env.example and the types in src/env.js

### Installation

1. Clone the repo
    ```bash
    git clone https://github.com/your-username/guc-empty-room-finder.git
    cd guc-empty-room-finder
    ```
2. Install packages
    ```bash
    bun install
    ```
3. Setup database
    ```bash
    bun db:generate
    ```
4. Run the scraper
    ```bash
    bun scrape
    ```
5. Run the App
    ```bash
    bun dev
    ```
