import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard"; 
import "../App.css";

//brukt for å konvertere det til keywords med api-søk.
const categoryKeywords = {
  musikk: "concert",
  sport: "sports",
  teater: "theatre",
};

function CategoryPage() {
  const { slug } = useParams(); //brukt for å hente dynamisk kategori
  const [events, setEvents] = useState([]); //liste for events

  useEffect(() => {
    const keyword = categoryKeywords[slug] || slug; //for å hente riktig søkeord for API

    const fetchCategoryEvents = async () => {
      try {
        const response = await fetch(
          //skulle egentlig bruke CORS proxy men ble droppet.
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.REACT_APP_TM_API_KEY}&keyword=${encodeURIComponent(keyword)}&countryCode=NO`
        );

        const data = await response.json();

        //if kode hvis events ikke finnes i resultatet.
        if (data._embedded && data._embedded.events) {
          setEvents(data._embedded.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Feil med henting av kategori events:", error);
        setEvents([]);
      }
    };

    fetchCategoryEvents();
  }, [slug]);

  return (
    <main>
      {/* vises valgt kategori som overskrift */}
      <h1>{slug.toUpperCase()}</h1>
      {/* vises events eller feilmelding hvis det ikke finnes */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>Ingen arrangementer funnet</p>
        )}
      </div>
    </main>
  );
}

export default CategoryPage;
