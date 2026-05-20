export default async (request) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json(
      { error: "Missing lat/lon" },
      { status: 400 }
    );
  }

  const api =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    "&current=temperature_2m,precipitation,rain,wind_speed_10m,surface_pressure" +
    "&timezone=Asia%2FBangkok" +
    "&wind_speed_unit=kmh";

  try {
    const res = await fetch(api);
    const data = await res.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return Response.json(
      { error: String(err) },
      { status: 500 }
    );
  }
};
