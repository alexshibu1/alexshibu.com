"use client";

// Google Maps embed - centered on downtown Toronto
// Coordinates: 43.6532, -79.3832 (downtown Toronto)
export default function CoffeeMap() {
  // Google Maps embed URL for downtown Toronto
  // Using the standard embed format with coordinates
  const lat = 43.6532;
  const lng = -79.3832;
  const zoom = 14;

  // Standard Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.5!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${zoom}!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca`;

  return (
    <div className="coffee-map-container">
      <iframe
        src={mapUrl}
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: "8px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Coffee Shops Map - Downtown Toronto"
      />
    </div>
  );
}
