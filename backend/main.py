from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nba_api.stats.endpoints import leaguestandings, scoreboardv2, boxscoretraditionalv2
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development — use Vercel URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/standings")
def get_standings():
    standings = leaguestandings.LeagueStandings().get_dict()
    return standings

@app.get("/api/schedule")
def get_today_schedule():
    today = datetime.today().strftime('%m/%d/%Y')
    schedule = scoreboardv2.ScoreboardV2(game_date=today).get_dict()
    return schedule

@app.get("/api/boxscore/{game_id}")
def get_box_score(game_id: str):
    box = boxscoretraditionalv2.BoxScoreTraditionalV2(game_id=game_id).get_dict()
    return box
#uvicorn main:app --reload --port 8000
#python -m venv venv
#source venv/bin/activate  # or .\venv\Scripts\activate on Windows

#pip install fastapi uvicorn nba_api flask-cors
