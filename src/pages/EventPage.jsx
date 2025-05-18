import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  const artists = event?._embedded?.attractions || []; //D-KRAV: Henter ut artister fra event

  if (error) return <p style={{ color: "red" }}>Feil: {error}</p>;
  if (!event) return <p>Laster ned...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{event.name}</h1>
      {event.images && (
        <img
          src={event.images[0].url}
          alt={event.name}
          style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
        />
      )}
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

      {artists.length > 0 && ( //D-krav, Artistkort
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
