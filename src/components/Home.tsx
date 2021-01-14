import CountryTable from './CountryTable';
import Banner from './Banner';
import CountryAddForm from './CountryAddForm';
import SearchForm from './SearchForm';

function Home() {
  return (
    <>
      <Banner />
      <SearchForm />
      <CountryAddForm />
      <CountryTable />
    </>
  );
}

export default Home;
