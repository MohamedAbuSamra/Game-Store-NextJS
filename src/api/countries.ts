import axios from '../lib/axios';

export type Country = {
  code: string;
  name: string;
};

export const fetchCountries = async (): Promise<Country[]> => {
  const res = await axios.get('/countries');
  return res.data.map((c: any) => ({
    code: c.iso || c.code,
    name: c.name,
  }));
};

export const fetchGeoCountry = async (): Promise<string> => {
  const geoRes = await axios.get('https://get.geojs.io/v1/ip/geo.json');
  return geoRes.data.country_code;
};
