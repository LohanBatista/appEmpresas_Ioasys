export const distance = (lat_inicial, long_inicial, lat_final, long_final) => {
  let d2r = 0.017453292519943295769236;

  let dlong = (long_final - long_inicial) * d2r;
  let dlat = (lat_final - lat_inicial) * d2r;

  let temp_sin = Math.sin(dlat / 2.0);
  let temp_cos = Math.cos(lat_inicial * d2r);
  let temp_sin2 = Math.sin(dlong / 2.0);

  let a = temp_sin * temp_sin + temp_cos * temp_cos * (temp_sin2 * temp_sin2);
  let c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));

  let val = 6368.1 * c;

  let value = val.toFixed(1);

  if (val < 1) {
    const a = value * 1000;
    return { label: a + 'm', rawValue: a };
  } else {
    return { label: value + 'km', rawValue: value };
  }
};
