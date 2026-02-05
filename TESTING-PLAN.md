# Testing Plan: Super Bowl LX Prop Bets Leaderboard

This document outlines how to test the leaderboard before, during, and after the game.

---

## Pre-Deployment Testing

### 1. Local Development Testing

```bash
cd super-bowl-props
npm install
npm run dev
```

Open http://localhost:5173/super-bowl-props/ in your browser.

**Checklist:**
- [ ] Page loads without console errors
- [ ] Demo data displays (since Google Sheet isn't published yet)
- [ ] Leaderboard shows 3 mock participants sorted by score
- [ ] Clicking a participant expands their question breakdown
- [ ] Progress bar shows "0/24 Questions Answered"
- [ ] All styling looks correct (dark theme, gold highlights)

### 2. Test Scoring Logic

Edit `src/data/correctAnswers.json` to add some test answers:

```json
{
  "coin_toss": "Heads",
  "anthem_length": "Shorter",
  "first_five_minutes": "Yes"
}
```

Save and verify:
- [ ] Progress bar updates to "3/24 Questions Answered"
- [ ] Scores recalculate correctly
- [ ] Correct answers show green checkmarks
- [ ] Incorrect answers show red X marks
- [ ] Leaderboard re-sorts based on new scores

### 3. Test Mobile Responsiveness

Use browser dev tools (F12 → toggle device toolbar) to test:
- [ ] iPhone SE (375px wide) - everything visible and tappable
- [ ] iPhone 12 Pro (390px) - layout looks good
- [ ] iPad (768px) - additional info columns appear
- [ ] Desktop (1200px+) - full layout with breathing room

---

## Google Sheet Integration Testing

### Step 1: Publish Your Google Sheet

1. Open your sheet: https://docs.google.com/spreadsheets/d/1zBOgiOEEHohUDK4GvdhjRC-nQljfB94hPptFrPv_Mv4/edit
2. Go to **File → Share → Publish to web**
3. Select **Entire Document** and **Comma-separated values (.csv)**
4. Click **Publish**
5. Copy the URL (it should look like your sheet URL but with `/pub?output=csv` at the end)

### Step 2: Verify Column Names Match

The app expects these exact column names (from Google Forms → Sheet):

| Expected Column | Check |
|-----------------|-------|
| `What will be the result of the coin toss?` | [ ] |
| `Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?` | [ ] |
| `Will there be a successful two-point conversion?` | [ ] |
| ... (all 24 questions + tiebreaker) | [ ] |

**If columns don't match:** Edit `src/data/questions.js` and update the `column` field for each question to match your actual sheet headers.

### Step 3: Test Live Data

After publishing the sheet:
- [ ] Refresh the app - should automatically load real data
- [ ] "Using demo data" warning should disappear
- [ ] All participants from your form appear
- [ ] Names display correctly
- [ ] Picks load for each participant

---

## Game Day Testing (Before Kickoff)

### 1. Final Data Check

- [ ] All expected participants have submitted picks
- [ ] No duplicate entries (check Google Sheet)
- [ ] Tiebreaker values are numbers (not text)

### 2. Answers File Ready

Verify `src/data/correctAnswers.json` has all questions set to `null`:

```bash
grep -c "null" src/data/correctAnswers.json
# Should output: 25 (24 questions + tiebreaker)
```

### 3. Deployment Verification

- [ ] Push to GitHub
- [ ] GitHub Actions workflow runs successfully
- [ ] Site is live at `https://yourusername.github.io/super-bowl-props/`
- [ ] Share URL with friends/family
- [ ] Test on someone else's phone to verify it loads

---

## During-Game Testing

### Workflow for Each Answer Update

1. **Event happens** (e.g., coin toss is Heads)
2. **Edit correctAnswers.json:**
   ```json
   {
     "coin_toss": "Heads",
     ...
   }
   ```
3. **Save file**
4. **Commit and push:**
   ```bash
   git add src/data/correctAnswers.json
   git commit -m "coin toss: Heads"
   git push
   ```
5. **Wait ~1-2 minutes** for GitHub Pages to rebuild
6. **Verify:**
   - [ ] Progress bar incremented
   - [ ] Scores updated
   - [ ] Leaderboard re-sorted if needed

### Quick Answer Reference

Use these exact strings in `correctAnswers.json`:

| Question ID | Possible Values |
|-------------|-----------------|
| `coin_toss` | `"Heads"` or `"Tails"` |
| `anthem_length` | `"Longer"` or `"Shorter"` |
| `two_point_conversion` | `"Yes"` or `"No"` |
| `first_five_minutes` | `"Yes"` or `"No"` |
| `last_five_minutes` | `"Yes"` or `"No"` |
| `first_to_score` | `"Seahawks"` or `"Patriots"` |
| `maye_rushing_td` | `"Yes"` or `"No"` |
| `first_catch` | `"Cooper Kupp"` or `"Jaxon Smith-Njigba"` |
| `qb_catch_pass` | `"Yes"` or `"No"` |
| `qb_interception` | `"Sam Darnold only"`, `"Drake Maye only"`, `"Both"`, or `"Neither"` |
| `longest_fg` | `"Over"` or `"Under"` |
| `kneel_down` | `"Yes"` or `"No"` |
| `score_tied` | `"Yes"` or `"No"` |
| `largest_lead` | `"Over"` or `"Under"` |
| `bad_bunny_songs` | `"Over (12+)"` or `"Under (11 or fewer)"` |
| `cardi_b_halftime` | `"Yes"` or `"No"` |
| `first_guest` | `"Jhayco"`, `"Daddy Yankee"`, `"Rosalia"`, or `"Other/None"` |
| `first_snack` | `"Doritos"`, `"Pringles"`, `"Lay's"`, or `"Other"` |
| `first_beer` | `"Bud Light"`, `"Michelob Ultra"`, `"Coors Light"`, or `"Other"` |
| `bear_basketball` | `"Yes"` or `"No"` |
| `kelce_manning` | `"A Kelce brother"` or `"Peyton Manning"` |
| `mvp_position` | `"Quarterback"`, `"Running Back"`, `"Wide Receiver"`, `"Defensive Player"`, or `"Other"` |
| `cardi_b_screen_time` | `"Over (4+)"` or `"Under (3 or fewer)"` |
| `gatorade_color` | `"Orange"`, `"Blue"`, `"Yellow/Green/Lime"`, `"Purple"`, `"Clear/Water"`, or `"Red/Pink"` |
| `total_points` | A number like `45` |

---

## Post-Game Testing

### Final Verification

- [ ] All 24 questions have answers (no `null` values except maybe total_points)
- [ ] Tiebreaker correctly breaks ties (closest to actual total wins)
- [ ] Final leaderboard is accurate
- [ ] Winner celebration looks good (gold shimmer effect)

### Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Scores not updating | Check JSON syntax (missing comma, quote) |
| Wrong person in lead | Verify answer strings match exactly (case-sensitive) |
| "Using demo data" still showing | Sheet not published or wrong URL in fetchPicks.js |
| Page not updating after push | GitHub Actions still running, wait 2 min |
| CORS error in console | Sheet must be published to web, not just shared |

---

## Emergency Procedures

### If GitHub Pages Goes Down

1. Run locally: `npm run dev`
2. Share your local IP with family (they need to be on same network)

### If You Make a Wrong Answer Entry

1. Edit `correctAnswers.json` with the correct value
2. Commit and push immediately
3. Scores will automatically recalculate

### If Someone Submitted Twice

1. In Google Sheets, delete the duplicate row
2. Refresh the leaderboard (auto-refreshes every 60 seconds, or click "Refresh now")

---

## Testing Timeline

| When | What to Test |
|------|--------------|
| **1 week before** | Local development, mock data, styling |
| **3 days before** | Google Sheet publishing, real data loading |
| **1 day before** | Full deployment to GitHub Pages, share URL |
| **Game day morning** | Verify all picks loaded, answers reset to null |
| **During game** | Each answer update workflow |
| **Post-game** | Final tiebreaker, winner announcement |

---

Good luck! 🏈
