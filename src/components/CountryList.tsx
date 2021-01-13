import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, useAppDispatch } from '../store';
import { getCountryList } from '../store/countriesSlice';

function CountryList() {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.countries
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountryList());
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error}</div>;
  if (!data) return <div>No Data.</div>;

  return (
    <div>
      {data.map((country) => (
        <div key={country.name}>{country.name}</div>
      ))}
    </div>
  );
}

export default CountryList;
