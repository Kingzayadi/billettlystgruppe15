import "./ArtistCard.css";

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      {artist.images?.[0]?.url && (
        //Viser bilde hvis det finnes og bruker da optional chaining for å unngå feil
        <img
          src={artist.images[0].url}
          alt={artist.name}
          className="artist-image"
        />
      )}
      {/* viser navn på artisten under: */}
      <h4>{artist.name}</h4>
       {/* viser sjanger hvis tilgjengelig (også med optional chaining) 
       kilde: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining*/}
      {artist.classifications?.[0]?.genre?.name && (
        <p>{artist.classifications[0].genre.name}</p>
      )}
    </div>
  );
}

export default ArtistCard;
