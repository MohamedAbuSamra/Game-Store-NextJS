import React, { useEffect, useState } from "react";
import { fetchCountries, fetchGeoCountry } from "../../api/countries";

interface Country {
  code: string;
  name: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (countryCode: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountriesAndDetect() {
      try {
        // Fetch countries from your API
        const apiCountries = await fetchCountries();
        setCountries(apiCountries);
        // Detect user country
        const country = await fetchGeoCountry();
        const found = apiCountries.find((c: Country) => c.code === country);
        if (found) {
          onChange(found.code);
        } else {
          onChange("JO"); // fallback to Jordan
        }
      } catch {
        onChange("JO");
      } finally {
        setLoading(false);
      }
    }
    fetchCountriesAndDetect();
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="country-select" className="font-semibold text-primary-700 dark:text-primary-200">Country:</label>
      <div className="relative">
        <select
          id="country-select"
          className="appearance-none px-3 py-2 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-secondary-900 text-primary-900 dark:text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 pr-8 shadow-sm"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={loading}
        >
          {countries.length > 0 && <option value="">🌍 All</option>}
          {countries.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-primary-400 dark:text-primary-200">
          ▼
        </span>
      </div>
      {loading && <span className="text-xs text-secondary-500 ml-2">Detecting...</span>}
    </div>
  );
} 