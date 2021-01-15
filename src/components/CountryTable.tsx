import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ICountryInfo } from '../api/types';
import { RootState, useAppDispatch } from '../store';
import { deleteCountryItem } from '../store/countriesSlice';
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

type Props = {
  countriesData: ICountryInfo[];
};

function CountryTable({ countriesData }: Props) {
  const { sortField, isAscendingOrder } = useSelector(
    (state: RootState) => state.sort
  );
  const dispatch = useAppDispatch();

  const onFieldClick = (field: keyof ICountryInfo) => {
    dispatch(sortBy(field));
  };

  const onDeleteButtonClick = (name: string) => {
    dispatch(deleteCountryItem(name));
  };

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
        {countriesData.map((country) => (
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
