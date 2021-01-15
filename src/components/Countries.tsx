import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getCountryList } from '../store/countriesSlice';
import { filterData, sortData } from '../utils/refineData';
import CountryTable from './CountryTable';

const DATA_LOAD_RATIO = 20;

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

  const [dataLoadCount, setDataLoadCount] = useState(DATA_LOAD_RATIO);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !data) return;

      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollEnd = scrollHeight - clientHeight;

      if (window.scrollY === scrollEnd) {
        let next = dataLoadCount + DATA_LOAD_RATIO;
        if (next > data.length) next = data.length;
        setDataLoadCount(next);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, data, dataLoadCount]);

  if (isLoading) return <div>데이터를 불러오는 중 ...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const filtered = searchTerm ? filterData(data, searchTerm) : data;
  const sorted = sortData(filtered, sortField, isAscendingOrder);
  const refinedData = sorted.slice(0, dataLoadCount);

  if (refinedData.length === 0) return <div>데이터가 없습니다.</div>;

  return <CountryTable countriesData={refinedData} />;
}

export default Countries;
