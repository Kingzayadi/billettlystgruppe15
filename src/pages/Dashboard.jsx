import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <main className="dashboard">
      <h1>Side</h1>

      {isLoggedIn ? (
        <div>
          <p>Velkommen{email}!</p>
          <p>Her kan du se dine lagrede arrangementer og tidligere kjøp av billetter.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            E-post:
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Passord:
            <input
              type="Password"
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
