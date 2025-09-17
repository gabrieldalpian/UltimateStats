import React, { useState } from 'react';
import './index.css';
import astonVilla from './assets/Aston_Villa_FC_new_crest.svg.png';
import afcBournemouth from './assets/AFC_Bournemouth_(2013).svg.png';
import arsenal from './assets/Arsenal_FC.svg.png';
import brentford from './assets/Brentford_FC_crest.svg.png';
import brighton from './assets/Brighton_and_Hove_Albion_FC_crest.svg.png';
import everton from './assets/Everton_FC_logo.svg.png';
import southampton from './assets/FC_Southampton.svg.png';
import fulham from './assets/Fulham_FC_(shield).svg.png';
import ipswich from './assets/Ipswich_Town.svg.png';
import leicester from './assets/Leicester_City_crest.svg.png';
import liverpool from './assets/Liverpool_FC.svg.png';
import luton from './assets/Luton_Town_logo.svg.png';
import manCity from './assets/Manchester_City_FC_badge.svg.png';
import manUnited from './assets/Manchester_United_FC_crest.svg.png';
import newcastle from './assets/Newcastle_United_Logo.svg.png';
import nottingham from './assets/Nottingham_Forest_F.C._logo.svg.png';
import sheffield from './assets/Sheffield_United_FC_logo.svg.png';
import tottenham from './assets/Tottenham_Hotspur.svg.png';
import westHam from './assets/West_Ham_United_FC_logo.svg.png';
import wolves from './assets/Wolverhampton_Wanderers_FC_crest.svg.png';
import chelsea from './assets/chelsea-fc-logo-png_seeklogo-188885.png';
import CrystalPalace from './assets/Crystal_Palace_FC_logo_(2022).svg.png';

const teamLogos = [
  { name: 'AFC Bournemouth', src: afcBournemouth },
  { name: 'Arsenal', src: arsenal },
  { name: 'Aston Villa', src: astonVilla },
  { name: 'Brentford', src: brentford },
  { name: 'Brighton & Hove Albion', src: brighton },
  { name: 'Everton', src: everton },
  { name: 'Southampton', src: southampton },
  { name: 'Fulham', src: fulham },
  { name: 'Ipswich Town', src: ipswich },
  { name: 'Leicester City', src: leicester },
  { name: 'Liverpool', src: liverpool },
  { name: 'Luton Town', src: luton },
  { name: 'Manchester City', src: manCity },
  { name: 'Manchester United', src: manUnited },
  { name: 'Newcastle United', src: newcastle },
  { name: 'Nottingham Forest', src: nottingham },
  { name: 'Sheffield United', src: sheffield },
  { name: 'Tottenham Hotspur', src: tottenham },
  { name: 'West Ham United', src: westHam },
  { name: 'Wolverhampton Wanderers', src: wolves },
  { name: 'Chelsea', src: chelsea },
  { name: 'Crystal Palace', src: CrystalPalace },
];

const half = Math.ceil(teamLogos.length / 2);
const topClubs = teamLogos.slice(0, half);
const bottomClubs = teamLogos.slice(half);

function TeamLogos() {
  return (
    <div className="team-logos-wrapper">
      <div className="team-row">
        {topClubs.map((team, i) => (
          <img
            key={i}
            src={team.src}
            alt={team.name}
            title={team.name}
            style={{ width: 80, height: 60, objectFit: 'contain' }}
          />
        ))}
      </div>
      <div className="team-row">
        {bottomClubs.map((team, i) => (
          <img
            key={i}
            src={team.src}
            alt={team.name}
            title={team.name}
            style={{ width: 80, height: 60, objectFit: 'contain' }}
          />
        ))}
      </div>
    </div>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="logos-top">
        <TeamLogos />
      </div>

      <div className="landing-content">
        <h1 className="landing-title">Welcome to Ultimate Stats!</h1>
        <p className="landing-subtitle">Find players by name, nationality, team, or position.</p>

        <button className="get-started-btn" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function MainPage() {
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const countryMap = {
    Brazil: 'BRA',
    England: 'ENG',
    France: 'FRA',
    Germany: 'GER',
    Spain: 'ESP',
    Portugal: 'POR',
    Argentina: 'ARG',
    Italy: 'ITA',
    Netherlands: 'NED',
    Belgium: 'BEL',
    UnitedStates: 'USA',
    Uruguay: 'URU',
    Croatia: 'CRO',
    Denmark: 'DEN',
    Sweden: 'SWE',
    Norway: 'NOR',
    Nigeria: 'NGA',
    Senegal: 'SEN',
    Japan: 'JPN',
    SouthKorea: 'KOR',
    Australia: 'AUS',
    Canada: 'CAN',
  };

  const positionss = {
    Goalkeeper: 'GK',
    Defender: 'DF',
    Midfielder: 'MF',
    Forward: 'FW',
  };

  const teamOptions = [
    'Arsenal', 'Aston Villa', 'AFC Bournemouth', 'Brentford',
    'Brighton & Hove Albion', 'Everton', 'Fulham', 'Ipswich Town',
    'Leicester City', 'Liverpool', 'Luton Town', 'Manchester City',
    'Manchester United', 'Newcastle United', 'Nottingham Forest',
    'Sheffield United', 'Southampton', 'Tottenham Hotspur',
    'West Ham United', 'Wolverhampton Wanderers', 'Chelsea', 'Crystal Palace',
  ];

  const positionOptions = ['FW', 'MF', 'DF', 'GK'];

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setSearchTriggered(true);

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (nationality) params.append('nation', nationality);
    if (team) params.append('team', team);
    if (position) params.append('position', position);

    fetch(`https://ultimatestats-2.onrender.com/api/v1/player?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setPlayers(data);
      })
      .catch(() => {
        setError('Failed to fetch players. Please try again later.');
        setPlayers([]);
      })
      .finally(() => setLoading(false));
  };

  const shouldShowResults = searchTriggered || error || loading;

  return (
    <div className="main-container">
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="nationality">Nationality</label>
          <select
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="dropdown"
          >
            <option value="">All Nationalities</option>
            {Object.entries(countryMap).map(([countryName, code]) => (
              <option key={code} value={code}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="team">Team</label>
          <select
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="dropdown"
          >
            <option value="">All teams</option>
            {teamOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="position">Position</label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="dropdown"
          >
            <option value="">All positions</option>
            {Object.entries(positionss).map(([positionss, code]) => (
              <option key={positionss} value={code}>
                {positionss}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="search-btn" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {shouldShowResults && (
        <div className="players-results">
          {error && <p className="error-message">{error}</p>}
          {!error && !loading && players.length === 0 && <p>No players found</p>}
          {!error && players.length > 0 && (
            <ul>
              {players.map((player, i) => {
                // Fallback for missing or empty team name
                const teamName = player.team && player.team.trim() !== '' ? player.team : 'Unknown Team';
                return (
                  <li key={player.name || i}>
                    <strong>{player.name.charAt(0).toUpperCase() + player.name.slice(1)}</strong> — {player.nation} — {teamName} — {player.pos}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [isLanding, setIsLanding] = useState(true);

  const handleGetStarted = () => {
    setIsLanding(false);
  };

  return (
    <>
      {isLanding ? <LandingPage onGetStarted={handleGetStarted} /> : <MainPage />}
    </>
  );
}

export default App;
