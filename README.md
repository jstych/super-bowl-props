# Super Bowl LX Prop Bets Leaderboard 🏈

A live leaderboard for tracking Super Bowl prop bet picks among friends and family.

## Features

- **Live scoring** — Update answers during the game and watch scores change
- **Mobile-friendly** — Works great on phones (your friends will check during the game!)
- **Auto-refresh** — Pulls new data every 60 seconds
- **Tiebreaker support** — Total points guess breaks ties
- **Expandable details** — Click any player to see their full breakdown

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173/super-bowl-props/

## How It Works

1. **Google Form** collects picks from participants
2. **Google Sheet** stores the responses (published as CSV)
3. **This app** fetches the CSV and calculates scores
4. **You update** `src/data/correctAnswers.json` as the game happens
5. **GitHub Pages** auto-deploys when you push changes

## Game Day Workflow

1. Edit `src/data/correctAnswers.json`:
   ```json
   {
     "coin_toss": "Heads",
     ...
   }
   ```

2. Commit and push:
   ```bash
   git add . && git commit -m "coin toss: Heads" && git push
   ```

3. Wait ~1-2 minutes for GitHub Pages to rebuild

4. Leaderboard updates automatically!

## Configuration

### Change the Google Sheet URL

Edit `src/utils/fetchPicks.js` and update `SHEET_URL`:

```javascript
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID';
```

### Change the GitHub Pages base path

Edit `vite.config.js` and update `base`:

```javascript
base: '/your-repo-name/',
```

## Deploying to GitHub Pages

1. Create a new GitHub repo
2. Push this code to the `main` branch
3. Go to Settings → Pages → Source: GitHub Actions
4. The workflow in `.github/workflows/deploy.yml` handles the rest

Your site will be live at: `https://yourusername.github.io/super-bowl-props/`

## File Structure

```
src/
├── data/
│   ├── questions.js         # Question definitions (edit if form changes)
│   └── correctAnswers.json  # YOU EDIT THIS DURING THE GAME
├── utils/
│   ├── fetchPicks.js        # Fetches CSV from Google Sheets
│   └── calculateScores.js   # Scoring logic
└── components/
    ├── Header.jsx           # Title and live indicator
    ├── Leaderboard.jsx      # Main leaderboard display
    └── PlayerCard.jsx       # Expanded player details
```

## Troubleshooting

**"Using demo data" won't go away**
- Make sure your Google Sheet is published to web (File → Share → Publish to web)
- Check that the URL in `fetchPicks.js` matches your published sheet

**Scores seem wrong**
- Check that answer strings in `correctAnswers.json` match exactly (case-sensitive)
- See the answer reference in `TESTING-PLAN.md`

**Changes not appearing on live site**
- GitHub Actions takes 1-2 minutes to rebuild
- Check the Actions tab in your repo for build status

## License

MIT — Have fun! 🏈
