function Footer() {
    return (
      <footer style={{ textAlign: "center", marginTop: "3rem", padding: "1rem 0", fontSize: "0.9rem", color: "#555" }}>
        {/*attribution til ticketmaster API */}
        Data hentet fra{" "}
        <a href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer">
          Ticketmaster API
        </a>
      </footer>
    );
  }
  
  export default Footer;
  