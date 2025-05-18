import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";

function EventPage() {
   // dette henter id´er fra URL, /event/:id. kilde brukt: https://reactrouter.com/en/main/hooks/use-params
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //henter eventdata fra ticketmaster API. kilde som blir brukt er fra fetch og async/wait:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${process.env.REACT_APP_TM_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Feil ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvent();
  }, [id]);
  // dette under er da d-kravet som henter artister ut med _embedded.attractions. Kilde brukt: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2
  const artists = event?._embedded?.attractions || []; 

  if (error) return <p style={{ color: "red" }}>Feil: {error}</p>;
  if (!event) return <p>Laster ned...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{event.name}</h1>
      {event.images && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <img
          src={event.images[0].url}
          alt={event.name}
          style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
        />
      </div>      
      )}
      {/* vises informasjon med fallback hvis data mangler. bruker optional chaining her. */}
      <p>
        <strong>Sted:</strong>{" "}
        {event._embedded?.venues?.[0]?.name || "Ikke oppgitt"}
      </p>
      <p>
        <strong>Dato:</strong> {event.dates?.start?.localDate || "Ikke oppgitt"}
      </p>
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: "1rem", color: "blue" }}
      >
        Kjøp billetter
      </a>

      {/* D-krav som siser artistcard-komponenter hvis artister finnes for arrangamentene:*/}
      {artists.length > 0 && ( 
        <>
          <h2 style={{ marginTop: "2rem" }}>Artister</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </>
      )}

    </main>
  );
}

export default EventPage;
