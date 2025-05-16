import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

function Home() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.REACT_APP_TM_API_KEY}&countryCode=NO&keyword=rock&size=12`
        );

        if (!response.ok) {
          throw new Error(`Feil ved henting: ${response.status}`);
        }

        const data = await response.json();

        if (data._embedded?.events) {
          setEvents(data._embedded.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main>
      <h1>Festivaler</h1>
      {error && <p style={{ color: "red" }}>Feil: {error}</p>}

      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event-card" key={event.id}>
              <img
                src={event.images?.[0]?.url}
                alt={event.name}
                className="event-image"
              />
              <h3>{event.name}</h3>
              <Link to={`/event/${event.id}`}>Se detaljer</Link>
            </div>
          ))
        ) : (
          <p>Ingen festivaler funnet.</p>
        )}
      </div>
    </main>
  );
}

export default Home;
