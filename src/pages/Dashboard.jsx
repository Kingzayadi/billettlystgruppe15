import { useState } from "react";
import EventCard from "../components/EventCard";
import "./Dashboard.css";

function Dashboard() {
  // her bruker jeg react useState-hook til enkel formtilstand og innlogging
  //kilde brukt: https://react.dev/reference/react/useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //hardkodet den delen som viser lagrede arrangementer etter innlogging, blir løst uten backend eller lagring som blir lagret lokalt.
  const savedEvents = [
    {
      id: "Z698xZb_Z16vbf7834",
      name: "Midgardsblot Metal Festival",
      images: [
        {
          url: "https://example.com/midgardsblot.jpg",
        },
      ],
      _embedded: {
        venues: [{ name: "Borre, Vestfold" }],
      },
    },
  ];

  //en form for innlogging med bare e-post og passord som kan bli fylles ut:
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <main className="dashboard">
      <h1>Logg inn</h1>

      {isLoggedIn ? (
        <div>
          <p>Velkommen, {email}!</p>
          <p>Dine lagrede arrangementer og billetthistorie:</p>

          <div className="event-grid">
            {savedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            E-post:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Passord:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Logg inn</button>
        </form>
      )}
    </main>
  );
}

export default Dashboard;
