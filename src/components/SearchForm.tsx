import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch } from '../store';
import { searchTerm } from '../store/searchSlice';

const Form = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: 50px;

  span {
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
  const { register, handleSubmit } = useForm<Input>();
  const dispatch = useAppDispatch();

  const onSubmit = ({ term }: Input) => {
    dispatch(searchTerm(term));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <span>검색</span>
      <SearchInput name="term" ref={register} />
    </Form>
  );
}

export default SearchForm;
