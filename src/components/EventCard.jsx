import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  const date = event.dates?.start?.localDate || "Ukjent dato";
  const venue = event._embedded?.venues?.[0];
  const location = venue?.city?.name || "Ukjent sted";
  const image = event.images?.[0]?.url || "";

  return (
    <div className="event-card">
      {image && (
        <img
          src={image}
          alt={event.name}
          className="event-image"
        />
      )}

      <div className="event-info">
        <h3>{event.name}</h3>
        <p><strong>Dato:</strong> {date}</p>
        <p><strong>Sted:</strong> {location}</p>
        <Link className="details-link" to={`/event/${event.id}`}>
          Se mer informasjon
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
