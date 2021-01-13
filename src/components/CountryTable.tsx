import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ICountryInfo } from '../api/types';
import { RootState, useAppDispatch } from '../store';
import { deleteCountryItem, getCountryList } from '../store/countriesSlice';
import { sortBy } from '../store/sortSlice';

const Table = styled.table`
  thead {
    tr {
      height: 50px;
      border-bottom: 2px solid black;
    }
  }

  tbody {
    tr {
      height: 80px;

      &:nth-child(2n - 1) {
        background-color: #f1f2f6;
      }
    }
  }

  th {
    &:not(:last-child) {
      vertical-align: middle;
      font-weight: 500;
      font-size: 1.1rem;
      cursor: pointer;
      user-select: none;
      word-break: keep-all;

      &:hover {
        background-color: #f1f2f6;
      }
    }

    &:nth-child(5) {
      width: 90px;
    }
  }

  td {
    text-align: center;
    vertical-align: middle;
    padding: 0 20px;

    span {
      display: block;
    }
  }
`;

function sortData(
  data: ICountryInfo[],
  field: keyof ICountryInfo,
  isAscendingOrder: boolean
) {
  return [...data].sort((a, b) => {
    let A, B;
    if (field === 'callingCodes') {
      A = a.callingCodes[0].split(' ').join('');
      B = b.callingCodes[0].split(' ').join('');
    } else {
      A = a[field];
      B = b[field];
    }

    return isAscendingOrder ? A.localeCompare(B) : B.localeCompare(A);
  });
}

function CountryTable() {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.countries
  );
  const { sortField, isAscendingOrder } = useSelector(
    (state: RootState) => state.sort
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountryList());
  }, []);

  const onFieldClick = (field: keyof ICountryInfo) => {
    dispatch(sortBy(field));
  };

  const onDeleteButtonClick = (name: string) => {
    dispatch(deleteCountryItem(name));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error}</div>;
  if (!data) return <div>No Data.</div>;

  const sorted = sortData(data, sortField, isAscendingOrder);

  return (
    <Table>
      <thead>
        <tr>
          <th onClick={() => onFieldClick('name')}>
            이름 {sortField === 'name' && (isAscendingOrder ? '↑' : '↓')}
          </th>
          <th onClick={() => onFieldClick('alpha2Code')}>
            코드 {sortField === 'alpha2Code' && (isAscendingOrder ? '↑' : '↓')}
          </th>
          <th onClick={() => onFieldClick('region')}>
            대륙 {sortField === 'region' && (isAscendingOrder ? '↑' : '↓')}
          </th>
          <th onClick={() => onFieldClick('capital')}>
            수도 {sortField === 'capital' && (isAscendingOrder ? '↑' : '↓')}
          </th>
          <th onClick={() => onFieldClick('callingCodes')}>
            국가 전화번호{' '}
            {sortField === 'callingCodes' && (isAscendingOrder ? '↓' : '↑')}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((country) => (
          <tr key={country.name}>
            <td>{country.name}</td>
            <td>{country.alpha2Code}</td>
            <td>{country.region}</td>
            <td>{country.capital}</td>
            <td>
              {country.callingCodes.map((callingCode) => (
                <span key={callingCode}>{callingCode}</span>
              ))}
            </td>
            <td>
              <button onClick={() => onDeleteButtonClick(country.name)}>
                x
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CountryTable;
