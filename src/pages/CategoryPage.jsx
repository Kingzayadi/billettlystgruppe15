import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <h1>{slug.toUpperCase()}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} style={{ width: "200px", padding: "10px", boxShadow: "0 0 5px #ccc" }}>
              <img
                src={event.images?.[0]?.url}
                alt={event.name}
                style={{ width: "100%", height: "auto" }}
              />
              <h3>{event.name}</h3>
              <Link to={`/event/${event.id}`}>Se mer detaljer</Link>
            </div>
          ))
        ) : (
          <p>Ingen arrangementer funnet</p>
        )}
      </div>
    </main>
  );
}

export default CategoryPage;
