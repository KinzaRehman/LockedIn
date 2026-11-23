import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { challenges, readChallengeSelection, saveChallengeSelection } from '../challenges/challenges';

export default function Challenges() {
  // The member layout supplies the userid so each account has its own saved progress.
  const { id: userId } = useOutletContext();
  const navigate = useNavigate();
  // Load the saved choices once, then let the user edit them locally until they save.
  const [current] = useState(() => readChallengeSelection(userId));
  const [selected, setSelected] = useState(current.selected);
  const [minutes, setMinutes] = useState(current.entries.reading?.minutes ?? '');
  const [error, setError] = useState('');

  // Add a checked challenge to the draft list or remove an unchecked one.
  function toggleChallenge(type, checked) {
    setSelected(previous => checked ? [...previous, type] : previous.filter(item => item !== type));
  }

  // Save the draft so the dashboard can read it when the user arrives.
  function saveSelection(event) {
    event.preventDefault();
    try {
      saveChallengeSelection(userId, selected, Number(minutes));
      navigate('/dashboard');
    } catch {
      setError('Your challenge selection could not be saved on this device.');
    }
  }

  return (
    <main className="page-outline">
      <h1>Challenge selection</h1>
      <form className="challenge-form" onSubmit={saveSelection}>
        <fieldset className="challenge-options">
          <legend>Choose the challenges you want to track</legend>
          {Object.entries(challenges).map(([type, challenge]) => (
            <label className="challenge-option" key={type}>
              <input type="checkbox" name="challenge" value={type} checked={selected.includes(type)}
                onChange={event => toggleChallenge(type, event.target.checked)} />
              <span><strong>{challenge.title}</strong><span>{challenge.description}</span></span>
            </label>
          ))}
        </fieldset>

        {/* Reading is the only challenge with a goal the user sets here. */}
        {selected.includes('reading') && (
          <label>
            Daily reading goal in minutes
            <input type="number" min="1" max="1440" step="1" required value={minutes}
              onChange={event => setMinutes(event.target.value)} />
          </label>
        )}
        {error && <p role="alert">{error}</p>}
        <button className="landing-button" type="submit">
          Save and continue
        </button>
      </form>
    </main>
  );
}
