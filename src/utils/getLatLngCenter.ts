function rad2degr(rad: number) {
  return (rad * 180) / Math.PI;
}
function degr2rad(degr: number) {
  return (degr * Math.PI) / 180;
}

/**
 * @return array with the center latitude longtitude pairs in
 *   degrees.
 */
export function getLatLngCenter(latLngInDegr: {lat: number; lng: number}[]) {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (var i = 0; i < latLngInDegr.length; i++) {
    const lat = degr2rad(latLngInDegr[i].lat);
    const lng = degr2rad(latLngInDegr[i].lng);

    sumX += Math.cos(lat) * Math.cos(lng);
    sumY += Math.cos(lat) * Math.sin(lng);
    sumZ += Math.sin(lat);
  }

  const avgX = sumX / latLngInDegr.length;
  const avgY = sumY / latLngInDegr.length;
  const avgZ = sumZ / latLngInDegr.length;

  const lng = Math.atan2(avgY, avgX);
  const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  const lat = Math.atan2(avgZ, hyp);

  return {lat: rad2degr(lat), lng: rad2degr(lng)};
}
