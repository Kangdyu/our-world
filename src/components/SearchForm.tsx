import { useEffect } from 'react';
import { useForm } from 'react-hook-form/dist/index.ie11';
import styled from 'styled-components';
import { useAppDispatch } from '../store';
import { setSearchTerm, setSearchTermAsync } from '../store/searchSlice';

const Form = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: 50px;

  label {
    position: absolute;
    left: 20px;
    top: 18px;
    color: #aaa;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  padding-left: 60px;

  border: 2px solid black;
  border-radius: 50px;

  font: inherit;
  font-size: 1.2rem;
`;

type Input = {
  term: string;
};

function SearchForm() {
  const { register, handleSubmit, watch } = useForm<Input>();
  const term = watch('term', '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchTermAsync(term));
  }, [term, dispatch]);

  const onSubmit = ({ term }: Input) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="term">검색</label>
      <SearchInput id="term" name="term" ref={register} />
    </Form>
  );
}

export default SearchForm;
