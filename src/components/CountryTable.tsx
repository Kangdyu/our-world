import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, useAppDispatch } from '../store';
import { getCountryList } from '../store/countriesSlice';

const Table = styled.table`
  width: 100%;

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
    vertical-align: middle;
    font-weight: 500;
    font-size: 1.1rem;
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

function CountryTable() {
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
    <Table>
      <thead>
        <tr>
          <th>이름</th>
          <th>코드</th>
          <th>대륙</th>
          <th>수도</th>
          <th>국가 전화번호</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((country) => (
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
              <button>x</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CountryTable;
