import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard"; 
import "../App.css";

const categoryKeywords = {
  musikk: "concert",
  sport: "sports",
  teater: "theatre",
};

function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const keyword = categoryKeywords[slug] || slug;

    const fetchCategoryEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.REACT_APP_TM_API_KEY}&keyword=${encodeURIComponent(keyword)}&countryCode=NO`
        );

        const data = await response.json();

        if (data._embedded?.events) {
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
      <h1 className="page-title">{slug.toUpperCase()}</h1>

      {/* Her blir eventcard brukt for å hente ut bilde, navn, dato osv...*/}
      <div className="event-grid">
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
