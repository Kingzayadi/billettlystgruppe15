import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img
        src={event.images?.[0]?.url}
        alt={event.name}
        className="event-image"
      />
      <div className="event-info">
        <h3>{event.name}</h3>
        <p>{event._embedded?.venues?.[0]?.name}</p>
        <Link to={`/event/${event.id}`} className="details-link">
          Se mer detaljer
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
