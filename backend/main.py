import requests_cache
from fastapi import FastAPI
from itertools import groupby
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from nba_api.stats.endpoints import leaguestandings, scheduleleaguev2, LeagueLeaders, PlayerIndex
from nba_api.stats.static import players, teams
from dotenv import load_dotenv
import nba_api.library.http as http
import requests
from requests.exceptions import Timeout, ConnectionError, HTTPError, ConnectTimeout
import mlbstatsapi
import ipinfo
import os

load_dotenv()

FOOTBALL_DATA_URL = os.getenv("FOOTBALL_DATA_BASE_URL")
API_KEY = os.getenv("FOOTBALL_DATA_APIKEY")
IPINFO_TOKEN = os.getenv("IPINFO_API_KEY")
IPINFO_URL = os.getenv("IPINFO_BASE_URL")
# Cache setup
session = requests_cache.CachedSession(
    'cache', 
    expire_after=86400, 
    include_get_headers=True
)

http._session = session
requests.get = session.get
app = FastAPI()

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = ipinfo.getHandlerAsync(IPINFO_TOKEN)
@app.get("/api/ipinfo")
async def get_ip():
    # url = f"{IPINFO_URL}?token={IPINFO_TOKEN}"
    details =  await handler.getDetails()
    # response = session.get(url)
    # print(response.json())
    ipinfo = {
        "city": details.city,
        "region": details.region,
        "country": details.country,
        "latitude": details.latitude,
        "longitude": details.longitude,
    }
    # print(details.get("latitude"))
    
    return VercelResponse(
        {
            'ok': True,
            'error': None,
            'data': ipinfo
        },
        status=200,
        headers={"Cache-Control": "s-maxage=300"}
    )

# get nba
@app.get("/api/NBA/schedules")
def get_season_schedule():
    try:
        current_year = datetime.now().year
        next_year = current_year - 2000 + 1
        season_year = f"{current_year}-{next_year}"
        
        schedules = scheduleleaguev2.ScheduleLeagueV2(season=season_year)
        games = schedules.season_games.get_dict()
        
        headers = games['headers']
        data = games['data']
        
        # Convert to list of dicts
        games_list = []
        for row in data:
            game = dict(zip(headers, row))

            # filter game
            filtered_game = {
                "gameId": game.get('gameId'),
                "gameDate": game.get('gameDate'),
                "gameStatus": game.get('gameStatusText'),
                # "gameStatusText": game.get('gameStatusText'),
                "gameLabel": game.get('gameLabel'),
                "homeTeam_name": game.get('homeTeam_teamName'),
                "homeTeam_id": game.get('homeTeam_teamId'),
                "awayTeam_name": game.get('awayTeam_teamName'),
                "awayTeam_id": game.get('awayTeam_teamId'),
                "homeTeam_score": game.get('homeTeam_score'),
                "awayTeam_score": game.get('awayTeam_score'),
                "gameTimeUTC": game.get('gameTimeUTC')
            }
            games_list.append(filtered_game)
        # Filter preseason only
        # games_list = [g for g in games_list if g['gameLabel'].lower() == 'preseason']
        
        # Sort by date (required for groupby to work!)
        # games_list.sort(key=lambda x: x['gameDate'])
        
        # Group by gameDate
        result = []
        for date, games_group in groupby(games_list, key=lambda x: x['gameDate']):
            result.append({
                'date': date,
                'gamesList': list(games_group)
            })
        
        return {
            "ok": True,
            "error": None,
            "data": result
        }   
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

@app.get("/api/NBA/standings")
def get_standings():
    try:
        results = leaguestandings.LeagueStandings()
        standings = results.standings.get_dict()

        headers = standings["headers"]
        data = standings["data"]
    
        standing_list = []
        for row in data:
            team = dict(zip(headers, row))
            standing_list.append(team)

        grouped = { 'east': [], 'west': []}
        for team in standing_list:
            conference = team.get('Conference').lower()
            filtered_team_records = {
                "team_name": team.get('TeamName'),
                "team_id": team.get('TeamID'),
                "wins": team.get('WINS'),
                "losses": team.get('LOSSES'),
                "winpct": team.get('WinPCT'),
                "home": team.get('HOME'),
                "road": team.get('ROAD'),
                "lastTen": team.get('L10'),
                "conference": team.get('Conference').lower(),
                "conferenceGamesBack": team.get('ConferenceGamesBack'),
                "consferenceRecord": team.get('ConferenceRecord'),
                "currentStreak": team.get('strCurrentStreak'),
            }
            if conference == 'east':
                grouped['east'].append(filtered_team_records)
            elif conference == 'west':
                grouped['west'].append(filtered_team_records)

        def get_conf_record(team):
            record = team.get('ConferenceRecord', '0-0')
            try:
                wins, losses = map(int, record.split('-'))
                return wins / (wins + losses)
            except:
                return 0

        grouped['east'] = sorted(grouped['east'], key=get_conf_record, reverse=True)
        grouped['west'] = sorted(grouped['west'], key=get_conf_record, reverse=True)

        return {
            "ok": True,
            "error":None,
            "data": grouped
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

@app.get("/api/NBA/players")
def get_players():
    # session.cache.clear()
    # url = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2026"
    # url = "https://api.sportsdata.io/v3/nba/scores/json/AllTeams"
    # url = "https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic"
    # headers = {
    #     'Ocp-Apim-Subscription-Key': {SPORTSDATA_APIKEY},
    # }
    # res = session.get(url, headers=headers)
    # data = res.json()
    # print(data)
    # return data
    try:
        current_year = datetime.now().year
        next_year = current_year - 2000 + 1
        season_year = f"{current_year}-{next_year}"
        
        # get league leaders to build players to show
        league_leaders = LeagueLeaders(season=season_year).get_normalized_dict()

        # get player position to be included for final players build
        players_index = PlayerIndex(season=season_year).get_normalized_dict()

        # build players to show
        league_leaders_index = []
        for player in players_index["PlayerIndex"]:
            for leader in league_leaders["LeagueLeaders"][:50]:
                if leader["PLAYER_ID"] == player["PERSON_ID"]:
                    player_data_filtered = {
                        "player_id": player["PERSON_ID"],
                        "player_name": f"{player["PLAYER_FIRST_NAME"]} {player["PLAYER_LAST_NAME"]}",
                        "player_position": player["POSITION"],
                        "player_rank": leader["RANK"],
                        "team_id": player["TEAM_ID"],
                        "team_name": player["TEAM_NAME"]
                    }
                    league_leaders_index.append(player_data_filtered)
    
        league_leaders_index.sort(key=lambda x: x["player_rank"])
        
        return {
            "ok": True,
            "error": None,
            "data": league_leaders_index 
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

# get mlb
@app.get('/api/MLB/standings')
def get_mlb_standings():
    try:
        current_year = datetime.now().year
        mlb = mlbstatsapi.Mlb()
        # the result is an instance of mlbstatsapi and not an object/dict
        #  so we have to use dot notation to access properties
        mlb_standings = mlb.get_standings(league_id="103,104",season=current_year)

        mlb_teams = mlb.get_teams(sport_id=1)

        mlb_leagues_standings = {
            'american_league': [], 
            'national_league': []
        }

        for team in mlb_teams: 
            league_name = team.league.name
            league_id = team.league.id
            division_name = team.division.name
            division_id = team.division.id

            filtered_team = {
                "team_name": team.name,
                "league_name": league_name,
                "league_id": league_id,
                "division_name": division_name,
                "division_id": division_id,
                "club_name": team.clubname,
                "team_id": team.id,
                "season": team.season,
            }

            for div in mlb_standings:
                if div.division.id == division_id:
                    for t in div.teamrecords:
                        if team.id == t.team.id:
                            filtered_team["league_rank"] = t.leaguerank
                            filtered_team["conferenceGamesBack"] = t.leaguegamesback
                            filtered_team["wins"] = t.leaguerecord["wins"]
                            filtered_team["losses"] = t.leaguerecord["losses"]
                            filtered_team["winpct"] = t.leaguerecord["pct"]
                            filtered_team["ties"] = t.leaguerecord["ties"]
                            filtered_team["currentStreak"] = t.streak.streakcode
                            
                            for lr in t.records["leaguerecords"]:
                                if lr["league"]["id"] == 103:
                                    filtered_team["americanLeagueRecord"] = f"{lr["wins"]}-{lr["losses"]}"
                                if lr["league"]["id"] ==  104:
                                    filtered_team["nationalLeagueRecord"] = f"{lr["wins"]}-{lr["losses"]}"

                            for ovr in t.records["overallrecords"]:
                                if ovr["type"] == "home":
                                    filtered_team["home"] = f"{ovr["wins"]}-{ovr["losses"]}"
                                elif ovr["type"] == "away":
                                    filtered_team["road"] = f"{ovr["wins"]}-{ovr["losses"]}"

                            for sr in t.records["splitrecords"]:
                                if sr["type"] == "lastTen":
                                    filtered_team["lastTen"] = f"{sr["wins"]}-{sr["losses"]}"

            if league_name == 'American League':
                mlb_leagues_standings["american_league"].append(filtered_team)
            elif league_name == 'National League':
                mlb_leagues_standings["national_league"].append(filtered_team)

        mlb_leagues_standings["american_league"].sort(key=lambda x: int(x["league_rank"]))
        mlb_leagues_standings["national_league"].sort(key=lambda x: int(x["league_rank"]))
        
        return {
            "ok": True,
            "error": None,
            "data": mlb_leagues_standings
        }

    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

@app.get('/api/MLB/schedules')
def get_season_schedule():
    try:
        current_date = datetime.now().date()
        current_year_season = datetime.now().year
        next_year_season = current_year_season + 1
    
        mlb = mlbstatsapi.Mlb()
        # current/previous season
        mlb_current_year_season = mlb.get_season(season_id=current_year_season)
        start_date_current = mlb_current_year_season.seasonstartdate
        end_date_current = mlb_current_year_season.seasonenddate

        # upcoming/next season
        mlb_next_year_season = mlb.get_season(season_id=next_year_season)
        start_date_next = mlb_next_year_season.seasonstartdate
        end_date_next = mlb_next_year_season.seasonenddate

        mlb_schedule = None

        # if season ended we want to show the last played games
        if datetime.now().timestamp() >= datetime.strptime(end_date_current, "%Y-%m-%d").timestamp():
            # if current date is > next season start, we get the current date schedules
            if datetime.now().timestamp() >= datetime.strptime(start_date_next, "%Y-%m-%d").timestamp():
                startdate = datetime.now().date() - timedelta(days=10)
                enddate = datetime.now().date() + timedelta(days=10)
                mlb_schedule = mlb.get_schedule(start_date=startdate, end_date=enddate)
            else:
                startdate = datetime.strptime(end_date_current, "%Y-%m-%d").date() - timedelta(days=10)
                mlb_schedule = mlb.get_schedule(start_date=startdate, end_date=end_date_current)
        # season hasn't ended yet, we can normally query using the date today as base   
        elif datetime.now().timestamp() < datetime.strptime(end_date_current, "%Y-%m-%d").timestamp():
            startdate = datetime.now().date() - timedelta(days=10)
            enddate = datetime.now().date() + timedelta(days=10)
            mlb_schedule = mlb.get_schedule(start_date=startdate, end_date=enddate)

        # mlb_teams = mlb.get_teams(sport_id=1)

        schedules = []
        # create an array of games per date
        for date in mlb_schedule.dates:
            game_day = date.date
            game_list = []
            # map the props of the game appended to list
            for game in date.games:
                filtered_game = {
                    "gameId": game.gameguid,
                    "gameDate": game.gamedate,
                    "gamepk": game.gamepk,
                    "gameStatus": game.status.detailedstate,
                    "gameLabel": game.seriesdescription,
                    "homeTeam_name": game.teams.home.team.name,
                    "homeTeam_id": game.teams.home.team.id,
                    "awayTeam_name": game.teams.away.team.name,
                    "awayTeam_id": game.teams.away.team.id,
                    "homeTeam_score": game.teams.home.score,
                    "awayTeam_score": game.teams.away.score,
                    "homeTeam_seriesRecord": game.teams.home.leaguerecord,
                    "awayTeam_seriesRecord": game.teams.away.leaguerecord
                }
                game_list.append(filtered_game)

            schedules.append({
                "date": game_day,
                "gamesList": game_list
            })
        # sort using the date
        schedules.sort(key=lambda x: x["date"])
        
        return {
            "ok": True,
            "error": None,
            "data": schedules
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

# create our own ranking based on stats and allstar vote
@app.get('/api/MLB/players')
def get_mlb_players():
    try:
        current_date = datetime.now().date()
        current_year_season = datetime.now().year
        next_year_season = current_year_season + 1

        mlb = mlbstatsapi.Mlb()
        # fetch players to query for player team
        players_list = mlb.get_people(sport_id=1,season=current_year_season)
        # fetch team for player team and team id
        teams_list = mlb.get_teams(sport_id=1,season=current_year_season)

        # players = statsapi.league_leaders(leaderCategories='avg',statGroup='hitting',limit=30)
        # mlbstatsapi doesn't provide allstar endpoints. need to create own request using the base url
        url_al = f"https://statsapi.mlb.com/api/v1/league/103/allStarFinalVote?season={current_year_season}"
        url_nl = f"https://statsapi.mlb.com/api/v1/league/104/allStarFinalVote?season={current_year_season}"
        allstar_al = session.get(url_al).json()
        allstar_nl = session.get(url_nl).json()
        
        def create_allstar_list(list):
            result = []
            for i in range(len(list)):
                team_id = None
                # get player team id
                for p in players_list:
                    if p.id == list[i]["id"]:
                        team_id = p.currentteam["id"]
                        break
                    
                team_name = None
                team_clubname = None
                # get player team name/clubname
                for team in teams_list:
                    if team_id == team.id:
                        team_clubname = team.clubname
                        team_name = team.name
                        break
                filtered_player_data = {
                    "player_name": list[i]["fullName"],
                    "player_id": list[i]["id"],
                    "player_position": list[i]["primaryPosition"]["name"],
                    "player_batside": list[i]["batSide"],
                    "player_pitchhand": list[i]["pitchHand"],
                    "team_name": team_name,
                    "team_clubname": team_clubname,
                    "team_id": team_id,
                }

                result.append(filtered_player_data)

            return result

        allstar_nl_list  =  allstar_nl["people"]
        allstar_al_list  =  allstar_al["people"]
        result_nl = create_allstar_list(allstar_nl_list)
        result_al = create_allstar_list(allstar_al_list)

        playerlist = []
        result_nl_copy = result_nl.copy()
        result_al_copy = result_al.copy()
        for i in range(34):
            if i % 2 == 0:
                for player in result_nl_copy:
                    playerlist.append(player)
                    result_nl_copy.remove(player)
                    break
            else:
                for player in result_al_copy:
                    playerlist.append(player)
                    result_al_copy.remove(player)
                    break
                
        return {
            "ok": True,
            "error": None,
            "data": playerlist
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }
 
# get soccer from footbal-api
# premier league england id = 39
# laliga spain id = 140
# UCL id = 2
# world cup = 1

# get football from football-data.org
# premier league id = 2021
# la liga id
# bundesliga id
# serie a id
# league 1 id
@app.get('/api/SOCCER/schedules')
def get_soccer_schedules():
    try:
        current_year = datetime.now().year
        PL_ID = 2021
        url = f"{FOOTBALL_DATA_URL}/competitions/{PL_ID}/matches"
        params = {
            "season": current_year
        }
        headers ={
            "X-Auth-Token": API_KEY
        }

        response = session.get(url, headers=headers, params=params)
        response = response.json()
        
        schedules = []
        games_list = []
        for match in response["matches"]:
            label = match.get('stage').split('_')
            label = " ".join(label).title()
            date = match.get("utcDate").split('T')[0]
            timeUTC = match.get("utcDate").split('T')[1][0:-1]

            filtered_game_data = {
                "gameId": match.get("id"),
                "gameDate": date,
                "gameStatus": match.get("status"),
                "gameLabel": label,
                "homeTeam_name": match.get("homeTeam")["shortName"],
                "homeTeam_id": match.get("homeTeam")["id"],
                "homeTeam_crest": match.get("homeTeam")["crest"],
                "homeTeam_score": match.get("score")["fullTime"]["home"],
                "awayTeam_name": match.get("awayTeam")["shortName"],
                "awayTeam_id": match.get("awayTeam")["id"],
                "awayTeam_crest": match.get("awayTeam")["crest"],
                "awayTeam_score": match.get("score")["fullTime"]["away"],
                "gameTimeUTC": timeUTC,
            }
            
            games_list.append(filtered_game_data)
        for date, group_games in groupby(games_list, key=lambda x: x["gameDate"]):
            schedules.append({
                "date": date,
                "gamesList": list(group_games)
            })
        return {
            "ok": True,
            "error": None,
            "data": schedules
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

@app.get('/api/SOCCER/standings')
def get_standings():
    try:
        current_year = datetime.now().year
        PL_ID = 2021
        url = f"{FOOTBALL_DATA_URL}/competitions/{PL_ID}/standings"
        params = {
            "season": current_year
        }
        headers ={
            "X-Auth-Token": API_KEY
        }
        
        response = session.get(url,headers=headers, params=params)
        response = response.json()
    
        standings_list = []

        for team in response["standings"][0]["table"]:
            filtered_team_data = {
                "team_name": team.get("team")["name"],
                "team_clubname": team.get("team")["shortName"],
                "team_id": team.get("team")["id"],
                "team_crest": team.get("team")["crest"],
                "ties": team.get("draw"),
                "wins": team.get("won"),
                "losses": team.get("lost"),
                "league_rank": team.get("position"),
                "winpct": None,
                "last_five": team.get('form'),
                "goal_difference": team.get('goalDifference'),
                "points": team.get('points'),
                "goals_total": team.get('goalsFor'),
                "goals_against": team.get('goalsAgainst'),
                "league_name": response['competition']["name"],
                "league_id": response['competition']["id"],
                "league_crest": response['competition']["emblem"],
                "season": response['filters']["season"]
            }
            standings_list.append(filtered_team_data)

        return {
            "ok": True,
            "error": None,
            "data": standings_list
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

# https://media.api-sports.io/football/players/{player_id}.png for player photo
@app.get('/api/SOCCER/players')
def get_players():
    try:
        current_year=datetime.now().year
        # pre-selected league/competition. later, implement a selectable dropdown for different competitions
        PL_ID = 2021
        url = f"{FOOTBALL_DATA_URL}/competitions/{PL_ID}/scorers"
        params = {
            "season": current_year,
            "limit": 20
        }
        headers ={
            "X-Auth-Token": API_KEY
        }

        response = session.get(url,headers=headers, params=params)
        response = response.json()
        
        playerlist = []

        for p in response["scorers"]:
            filtered_player_data ={
                "player_name": f"{p["player"].get("name")}".strip(),
                "player_id": p["player"].get("id"),
                "player_position": p["player"].get("section"),
                "team_name": p["team"].get("name"),
                "team_clubname": p["team"].get("shortName"),
                "team_id": p["team"].get("id"),
                "team_crest": p["team"].get("crest")
            }
            playerlist.append(filtered_player_data)

        return {
            "ok": True,
            "error": None,
            "data": playerlist
        }
    
    except Timeout:
        return {
            "ok": False,
            "data": None,
            "error": "Request timed out."
        }
    except ConnectionError:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection error."
        }
    except ConnectTimeout:
        return {
            "ok": False,
            "data": None,
            "error": "Network connection timeout."
        }
    except HTTPError as e:
        return {
            "ok": False,
            "data": None,
            "error": f"HTTP error {e.response.status_code}."
        }
    except Exception as e:
        return {
            "ok": False,
            "data": None,
            "error": str(e)
        }

#uvicorn main:app --reload --port 8000
#python -m venv venv
#source venv/bin/activate  # or .\venv\Scripts\activate on Windows

#pip install fastapi uvicorn nba_api flask-cors