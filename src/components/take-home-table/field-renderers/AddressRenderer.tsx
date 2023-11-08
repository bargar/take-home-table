import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

/**
 * Given a street address and longitude and latitude, show the former as a human-friendly link to Google Maps based
 * on the latter.
 * @param item
 * @constructor
 */
const AddressRenderer: TakeHomeRenderer = ({ item }) => {
  const {
    address,
    city,
    state,
    coordinates: { lat, lng },
  } = item.address;
  const googleMapsUrl = `http://maps.google.com/maps?z=5&t=m&q=loc:${lat},${lng}`;
  return (
    <a href={googleMapsUrl} title="Open in Google Maps" target="map">
      {address}
      <br />
      {city}, {state}
    </a>
  );
};

export default AddressRenderer;
