import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ICountryInfo } from '../api/types';
import { useAppDispatch } from '../store';
import { createCountryItem } from '../store/countriesSlice';

const Form = styled.form`
  width: 100%;
  padding: 20px 0;
  margin-bottom: 20px;

  border-radius: 10px;
  background-color: #fafafa;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormRow = styled.div`
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;

  label {
    font-size: 0.9rem;
    margin-bottom: 5px;

    span {
      color: red;
    }
  }

  input {
    font: inherit;
  }
`;

const Error = styled.span`
  font-size: 0.9rem;
  color: red;
  margin: 10px 0;
`;

function CountryAddForm() {
  const [callingCodeCount, setCallingCodeCount] = useState(1);
  const { register, handleSubmit, errors } = useForm<ICountryInfo>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: ICountryInfo) => {
    dispatch(createCountryItem(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <label htmlFor="name">
          나라 이름 <span>*</span>
        </label>
        <input id="name" name="name" ref={register({ required: true })} />
        {errors.name && <Error>필수 입력 사항입니다.</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="alpha2Code">
          코드 <span>*</span>
        </label>
        <input
          id="alpha2Code"
          name="alpha2Code"
          ref={register({ required: true })}
        />
        {errors.alpha2Code && <Error>필수 입력 사항입니다.</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="region">대륙</label>
        <input id="region" name="region" ref={register} />
      </FormRow>

      <FormRow>
        <label htmlFor="capital">수도</label>
        <input id="capital" name="capital" ref={register} />
      </FormRow>

      <FormRow>
        <label htmlFor="callingCodes">국가 전화번호</label>
        {Array.from({ length: callingCodeCount }, (_, i) => i).map((count) => (
          <Fragment key={count}>
            <input
              id="callingCodes"
              name={`callingCodes[${count}]`}
              ref={register}
            />
            {count + 1 === callingCodeCount && (
              <button onClick={() => setCallingCodeCount(callingCodeCount + 1)}>
                +
              </button>
            )}
          </Fragment>
        ))}
      </FormRow>

      <input type="submit" />
    </Form>
  );
}

export default CountryAddForm;
