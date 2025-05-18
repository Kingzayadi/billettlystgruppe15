import "./ArtistCard.css";

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      {artist.images?.[0]?.url && (
        <img
          src={artist.images[0].url}
          alt={artist.name}
          className="artist-image"
        />
      )}
      <h4>{artist.name}</h4>
      {artist.classifications?.[0]?.genre?.name && (
        <p>{artist.classifications[0].genre.name}</p>
      )}
    </div>
  );
}

export default ArtistCard;
