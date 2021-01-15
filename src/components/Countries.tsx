import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getCountryList } from '../store/countriesSlice';
import { filterData, sortData } from '../utils/refineData';
import CountryTable from './CountryTable';

function Countries() {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.countries
  );
  const { sortField, isAscendingOrder } = useSelector(
    (state: RootState) => state.sort
  );
  const searchTerm = useSelector((state: RootState) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountryList());
  }, []);

  if (isLoading) return <div>데이터를 불러오는 중 ...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const filtered = searchTerm ? filterData(data, searchTerm) : data;
  const sorted = sortData(filtered, sortField, isAscendingOrder);

  if (sorted.length === 0) return <div>데이터가 없습니다.</div>;

  return <CountryTable countriesData={sorted} />;
}

export default Countries;
