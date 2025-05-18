import { useEffect, useState } from "react";
import "./Home.css";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [missing, setMissing] = useState([]);
  const apiKey = process.env.REACT_APP_TM_API_KEY;

  useEffect(() => {
    const fetchFestivalEvents = async () => {
      // Liste over festivaler som skal vises. Her har jeg brukt andre navn siden det ikke kom opp på de 4 som lo i eksamenteksten for å vise at jeg vet hva den oppgaven går ut over
      // Ligger mer forklaring i rapportdokumentet.
      const names = ["Roskilde", "Midgardsblot", "Alive Festival", "Heartland"];
      const results = [];
      const notFound = [];

      for (const name of names) {
        try {
          //Dette er en ekstern kilde jeg har brukt. Jeg brukte da corsproxy.io for å unngå CORS problemer med API.
          const response = await fetch(
            `https://corsproxy.io/?https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=NO&keyword=${encodeURIComponent(name)}`
          );
          const data = await response.json();

          //det blir hentet første arrangament her som matcher da navnet
          if (data._embedded?.events?.length > 0) {
            results.push(data._embedded.events[0]);
          } else {
            console.warn(`Fant ikke event for: ${name}`);
            notFound.push(name);
          }
        } catch (err) {
          //feilmelding hvis det skjer et problem med fetch
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
      <h1 style={{ textAlign: "center" }}>Festivaler</h1>

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
