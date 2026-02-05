// Questions configuration for Super Bowl LX Prop Bets
// The 'column' field MUST match the exact column header in your Google Sheet

export const questions = [
  {
    id: "coin_toss",
    text: "What will be the result of the coin toss?",
    shortText: "Coin toss",
    options: ["Heads", "Tails"],
    points: 1,
    column: "What will be the result of the coin toss?",
    category: "game"
  },
  {
    id: "anthem_length",
    text: "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?",
    shortText: "Anthem length",
    options: ["Longer", "Shorter"],
    points: 1,
    column: "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?",
    category: "pregame"
  },
  {
    id: "two_point_conversion",
    text: "Will there be a successful two-point conversion?",
    shortText: "2-pt conversion",
    options: ["Yes", "No"],
    points: 1,
    column: "Will there be a successful two-point conversion?",
    category: "game"
  },
  {
    id: "first_five_minutes",
    text: "Will either team score in the first five minutes?",
    shortText: "First 5 min score",
    options: ["Yes", "No"],
    points: 1,
    column: "Will either team score in the first five minutes?",
    category: "game"
  },
  {
    id: "last_five_minutes",
    text: "Will either team score in the last five minutes?",
    shortText: "Last 5 min score",
    options: ["Yes", "No"],
    points: 1,
    column: "Will either team score in the last five minutes?",
    category: "game"
  },
  {
    id: "first_to_score",
    text: "Which team will score first?",
    shortText: "First to score",
    options: ["Seahawks", "Patriots"],
    points: 1,
    column: "Which team will score first?",
    category: "game"
  },
  {
    id: "maye_rushing_td",
    text: "Will Drake Maye score a rushing touchdown?",
    shortText: "Maye rushing TD",
    options: ["Yes", "No"],
    points: 1,
    column: "Will Drake Maye score a rushing touchdown?",
    category: "game"
  },
  {
    id: "first_catch",
    text: "Who will catch a pass first: Cooper Kupp or Jaxon Smith-Njigba?",
    shortText: "First catch",
    options: ["Cooper Kupp", "Jaxon Smith-Njigba"],
    points: 1,
    column: "Who will catch a pass first: Cooper Kupp or Jaxon Smith-Njigba?",
    category: "game"
  },
  {
    id: "qb_catch_pass",
    text: "Will any quarterback catch a pass?",
    shortText: "QB catches pass",
    options: ["Yes", "No"],
    points: 1,
    column: "Will any quarterback catch a pass?",
    category: "game"
  },
  {
    id: "qb_interception",
    text: "Which QB will throw an interception?",
    shortText: "QB interception",
    options: ["Sam Darnold only", "Drake Maye only", "Both", "Neither"],
    points: 1,
    column: "Which QB will throw an interception?",
    category: "game"
  },
  {
    id: "longest_fg",
    text: "Will the longest field goal be over or under 49.5 yards?",
    shortText: "Longest FG",
    options: ["Over", "Under"],
    points: 1,
    column: "Will the longest field goal be over or under 49.5 yards?",
    category: "game"
  },
  {
    id: "kneel_down",
    text: "Will the last play of the game be a kneel down?",
    shortText: "Last play kneel",
    options: ["Yes", "No"],
    points: 1,
    column: "Will the last play of the game be a kneel down?",
    category: "game"
  },
  {
    id: "score_tied",
    text: "Will the score ever be tied, other than 0-0?",
    shortText: "Score tied",
    options: ["Yes", "No"],
    points: 1,
    column: "Will the score ever be tied, other than 0-0?",
    category: "game"
  },
  {
    id: "largest_lead",
    text: "Over or under 13.5 points as the largest lead of the game?",
    shortText: "Largest lead",
    options: ["Over", "Under"],
    points: 1,
    column: "Over or under 13.5 points as the largest lead of the game by either team?",
    category: "game"
  },
  {
    id: "bad_bunny_songs",
    text: "How many songs will Bad Bunny perform during halftime? (Over/under 11.5)",
    shortText: "Bad Bunny songs",
    options: ["Over (12+)", "Under (11 or fewer)"],
    points: 1,
    column: "How many songs will Bad Bunny perform during halftime? (Over/under 11.5)",
    category: "halftime"
  },
  {
    id: "cardi_b_halftime",
    text: "Will Cardi B appear on stage during the halftime show?",
    shortText: "Cardi B halftime",
    options: ["Yes", "No"],
    points: 1,
    column: "Will Cardi B appear on stage during the halftime show?",
    category: "halftime"
  },
  {
    id: "first_guest",
    text: "Which guest will appear on stage with Bad Bunny first?",
    shortText: "First guest",
    options: ["Jhayco", "Daddy Yankee", "Rosalia", "Other/None"],
    points: 1,
    column: "Which guest will appear on stage with Bad Bunny first?",
    category: "halftime"
  },
  {
    id: "first_snack",
    text: "What snack brand will have a commercial air first (after kickoff)?",
    shortText: "First snack ad",
    options: ["Doritos", "Pringles", "Lay's", "Other"],
    points: 1,
    column: "What snack brand will have a commercial air first (after kickoff)?",
    category: "commercials"
  },
  {
    id: "first_beer",
    text: "Which beer will have a commercial first (after kickoff)?",
    shortText: "First beer ad",
    options: ["Bud Light", "Michelob Ultra", "Coors Light", "Other"],
    points: 1,
    column: "Which beer will have a commercial first (after kickoff)?",
    category: "commercials"
  },
  {
    id: "bear_basketball",
    text: "Will a bear (living, not stuffed) and/or a basketball appear in a Super Bowl commercial?",
    shortText: "Bear/basketball",
    options: ["Yes", "No"],
    points: 1,
    column: "Will a bear (living, not stuffed) and/or a basketball appear in a Super Bowl commercial?",
    category: "commercials"
  },
  {
    id: "kelce_manning",
    text: "Who will appear in a commercial first: A Kelce brother or a Manning brother?",
    shortText: "Kelce vs Manning",
    options: ["A Kelce brother", "A Manning brother"],
    points: 1,
    column: "Who will appear in a commercial first (after kickoff): A Kelce brother or a Manning brother?",
    category: "commercials"
  },
  {
    id: "mvp_position",
    text: "What will the position of the Super Bowl MVP be?",
    shortText: "MVP position",
    options: ["Quarterback", "Running Back", "Wide Receiver", "Defensive Player", "Other"],
    points: 1,
    column: "What will the position of the Super Bowl MVP be?",
    category: "game"
  },
  {
    id: "gatorade_color",
    text: "What color will the Gatorade be that's poured on the winning coach?",
    shortText: "Gatorade color",
    options: ["Orange", "Blue", "Yellow/Green/Lime", "Purple", "Clear/Water", "Red/Pink"],
    points: 1,
    column: "What color will the Gatorade be that's poured on the winning coach?",
    category: "postgame"
  }
];

// Tiebreaker question (not scored, used to break ties)
export const tiebreaker = {
  id: "total_points",
  text: "What will the total number of points be, for both teams, at the end of the game?",
  shortText: "Total points",
  column: "What will the total number of points be, for both teams, at the end of the game? (Tiebreaker)",
  type: "number"
};

// Category labels for grouping questions in the UI
export const categories = {
  pregame: { label: "Pre-Game", emoji: "🎤" },
  game: { label: "Game", emoji: "🏈" },
  halftime: { label: "Halftime", emoji: "🎵" },
  commercials: { label: "Commercials", emoji: "📺" },
  postgame: { label: "Post-Game", emoji: "🏆" }
};
