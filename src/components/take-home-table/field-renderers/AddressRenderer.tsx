import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

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
