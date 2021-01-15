import Banner from './Banner';
import CountryAddForm from './CountryAddForm';
import SearchForm from './SearchForm';
import { useState } from 'react';
import styled from 'styled-components';
import Countries from './Countries';

const AddFormButton = styled.button<{ selected: boolean }>`
  width: 200px;
  height: 50px;

  display: block;
  margin: 0 auto;
  margin-bottom: 20px;

  border: none;
  border-radius: 25px;
  outline: none;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#27ae60' : '#2ecc71')};
  color: white;

  font: inherit;
`;

function Home() {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  return (
    <>
      <Banner />
      <AddFormButton
        onClick={() => setIsOpenAddForm(!isOpenAddForm)}
        selected={isOpenAddForm}
      >
        {!isOpenAddForm ? '+ 나라 추가하기' : '- 접기'}
      </AddFormButton>
      {isOpenAddForm && <CountryAddForm />}
      <SearchForm />
      <Countries />
    </>
  );
}

export default Home;
