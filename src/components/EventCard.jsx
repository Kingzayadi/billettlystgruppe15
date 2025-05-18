import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img
      //bruker optional chaining for å være 100% sikker på at bildet finnes i dataen.
        src={event.images?.[0]?.url}
        alt={event.name}
        className="event-image"
      />
      <div className="event-info">
        <h3>{event.name}</h3>
        {/* viser navnet på stedet hvis det finnes */}
        <p>{event._embedded?.venues?.[0]?.name}</p>
        {/* navigerer til detaljer om arrangementet. kilde: https://reactrouter.com/en/main/components/link */}
        <Link to={`/event/${event.id}`} className="details-link">
          Se mer detaljer
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
