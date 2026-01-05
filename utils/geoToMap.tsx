export default function geoToMap(lat: number, lon: number, mapWidth: number, mapHeight: number) {
  const mapLatMin = -90,
    mapLatMax = 90;
  const mapLonMin = -180,
    mapLonMax = 180;

  const x = ((lon - mapLonMin) / (mapLonMax - mapLonMin)) * mapWidth;
  const y = ((mapLatMax - lat) / (mapLatMax - mapLatMin)) * mapHeight;

  return { x, y };
}
