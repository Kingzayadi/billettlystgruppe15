import { useEffect, useState } from "react";
import "./Home.css";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [missing, setMissing] = useState([]);
  const apiKey = process.env.REACT_APP_TM_API_KEY;

  useEffect(() => {
    const fetchFestivalEvents = async () => {
      const names = ["Roskilde", "Midgardsblot", "Alive Festival", "Heartland"];
      const results = [];
      const notFound = [];

      for (const name of names) {
        try {
          const response = await fetch(
            `https://corsproxy.io/?https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=NO&keyword=${encodeURIComponent(name)}`
          );
          const data = await response.json();

          if (data._embedded?.events?.length > 0) {
            results.push(data._embedded.events[0]);
          } else {
            console.warn(`Fant ikke event for: ${name}`);
            notFound.push(name);
          }
        } catch (err) {
          console.error(`Feil ved henting av ${name}:`, err);
          notFound.push(name);
        }
      }

      setEvents(results);
      setMissing(notFound);
    };

    fetchFestivalEvents();
  }, [apiKey]);

  return (
    <main>
      <h1>Festivaler</h1>

      {missing.length > 0 && (
        <p style={{ color: "orange" }}>
          Fant ikke følgende festivaler: {missing.join(", ")}
        </p>
      )}

      <div className="event-grid">
      {events.length > 0 ? (
  events.map((event) => (
    <EventCard key={event.id} event={event} />
  ))
) : (
  <p>Laster inn festivaler...</p>
)}

      </div>
    </main>
  );
}

export default Home;
