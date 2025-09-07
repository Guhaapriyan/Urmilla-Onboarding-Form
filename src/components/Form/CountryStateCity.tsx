import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Select } from "antd";
import { Country, State, City, type ICountry, type IState } from "country-state-city";

interface CountryStateCityProps {
  control: any;
  countryValue?: string;
  stateValue?: string;
  cityValue?: string;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

export const CountryStateCity: React.FC<CountryStateCityProps> = ({
  control,
  countryValue,
  stateValue,
  cityValue,
  onCountryChange,
  onStateChange,
  onCityChange,
}) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const watchedCountry = useWatch({ control, name: "country" });
  const watchedState = useWatch({ control, name: "state" });
  const watchedCity = useWatch({ control, name: "city" });
  const currentCountry = watchedCountry || countryValue || "";
  const currentState = watchedState || stateValue || "";
  const currentCity = watchedCity || cityValue || "";

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (currentCountry) {
      const country = countries.find(c => c.name === currentCountry);
      if (country) {
        const countryStates = State.getStatesOfCountry(country.isoCode);
        setStates(countryStates);
        
        const stateIsValid = countryStates.some(s => s.name === currentState);
        if (!stateIsValid && currentState) {
          onStateChange("");
        }
        
        if (!stateIsValid && currentCity) {
          onCityChange("");
        }
      }
    } else {
      setStates([]);
      setCities([]);
      if (currentState) onStateChange("");
      if (currentCity) onCityChange("");
    }
  }, [currentCountry, countries, currentState, currentCity, onStateChange, onCityChange]);

  useEffect(() => {
    if (currentCountry && currentState) {
      const country = countries.find(c => c.name === currentCountry);
      if (country) {
        const state = State.getStatesOfCountry(country.isoCode).find(s => s.name === currentState);
        if (state) {
          const stateCities = City.getCitiesOfState(country.isoCode, state.isoCode);
          setCities(stateCities);

          const cityIsValid = stateCities.some(c => c.name === currentCity);
          if (!cityIsValid && currentCity) {
            onCityChange("");
          }
        }
      }
    } else {
      setCities([]);
      if (currentCity) onCityChange("");
    }
  }, [currentCountry, currentState, countries, currentCity, onCityChange]);

  return (
    <>
      {/* Country */}
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full">
            <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2 after:content-['*'] after:text-red-500 after:ml-1">
              Country
            </label>
            <Select
              {...field}
              placeholder="Select Country"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={countries.map(country => ({
                label: country.name,
                value: country.name,
              }))}
              onChange={(value) => {
                field.onChange(value);
                onCountryChange(value);
              }}
              status={error ? "error" : undefined}
              className={`w-full transition-all duration-200 ${error ? '[&_.ant-select-selector]:border-red-500' : ''}`}
              style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fadeIn">{error.message}</p>
            )}
          </div>
        )}
      />

      {/* State */}
      <Controller
        name="state"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full">
            <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2 after:content-['*'] after:text-red-500 after:ml-1">
              State
            </label>
            <Select
              {...field}
              placeholder="Select State"
              showSearch
              disabled={!countryValue}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={states.map(state => ({
                label: state.name,
                value: state.name,
              }))}
              onChange={(value) => {
                field.onChange(value);
                onStateChange(value);
              }}
              status={error ? "error" : undefined}
              className={`w-full transition-all duration-200 ${error ? '[&_.ant-select-selector]:border-red-500' : ''}`}
              style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fadeIn">{error.message}</p>
            )}
          </div>
        )}
      />

      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full">
            <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2 after:content-['*'] after:text-red-500 after:ml-1">
              City
            </label>
            <Select
              {...field}
              placeholder="Select City"
              showSearch
              disabled={!stateValue}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={cities.map(city => ({
                label: city.name,
                value: city.name,
              }))}
              onChange={(value) => {
                field.onChange(value);
                onCityChange(value);
              }}
              status={error ? "error" : undefined}
              className={`w-full transition-all duration-200 ${error ? '[&_.ant-select-selector]:border-red-500' : ''}`}
              style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fadeIn">{error.message}</p>
            )}
          </div>
        )}
      />
    </>
  );
};