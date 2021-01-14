import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ICountryInfo } from '../api/types';
import { RootState, useAppDispatch } from '../store';
import { deleteCountryItem, getCountryList } from '../store/countriesSlice';
import { sortBy } from '../store/sortSlice';

const Table = styled.table`
  margin-bottom: 100px;

  thead {
    tr {
      height: 50px;
      border-bottom: 2px solid #bbb;
    }
  }

  tbody {
    tr {
      height: 80px;
      border-bottom: 1px solid #f1f2f3;

      &:nth-child(2n - 1) {
        background-color: #fafafa;
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

function filterData(data: ICountryInfo[], searchTerm: string) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return data.filter((country) => {
    if (
      country.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.alpha2Code.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.region.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.capital.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.callingCodes.find((callingCode) =>
        callingCode.includes(searchTerm)
      )
    )
      return true;
  });
}

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
  const searchTerm = useSelector((state: RootState) => state.search);
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

  if (isLoading) return <div>데이터를 불러오는 중 ...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const filtered = searchTerm ? filterData(data, searchTerm) : data;
  const sorted = sortData(filtered, sortField, isAscendingOrder);

  if (sorted.length === 0) return <div>데이터가 없습니다.</div>;

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
            {sortField === 'callingCodes' && (isAscendingOrder ? '↑' : '↓')}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((country) => (
          <tr key={country.name}>
            <td width="320">{country.name}</td>
            <td width="70">{country.alpha2Code}</td>
            <td width="110">{country.region}</td>
            <td width="150">{country.capital}</td>
            <td width="90">
              {country.callingCodes.map((callingCode) => (
                <span key={callingCode}>{callingCode}</span>
              ))}
            </td>
            <td width="60">
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
