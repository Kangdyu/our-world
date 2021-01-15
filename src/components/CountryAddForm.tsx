import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ICountryInfo } from '../api/types';
import { RootState, useAppDispatch } from '../store';
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
    width: 200px;
    font: inherit;
  }
`;

const Text = styled.span`
  font-size: 0.9rem;
  color: red;
  margin-bottom: 10px;
`;

const ErrorText = styled(Text)`
  color: red;
`;

const SuccessText = styled(Text)`
  color: #2ecc71;
`;

type SubmitState = {
  type: 'success' | 'error';
  message: string;
};

function CountryAddForm() {
  const { register, handleSubmit, errors, reset } = useForm<ICountryInfo>();
  const [submitState, setSubmitState] = useState<SubmitState | null>(null);

  const { data: countriesData } = useSelector(
    (state: RootState) => state.countries
  );
  const dispatch = useAppDispatch();

  const [callingCodeCount, setCallingCodeCount] = useState(1);

  const onSubmit = (formData: ICountryInfo) => {
    if (!countriesData) return;

    const { name } = formData;
    const checkDuplicate = countriesData.find(
      (country) => country.name === name
    );
    if (checkDuplicate) {
      setSubmitState({ type: 'error', message: '이미 존재하는 나라입니다.' });
    } else {
      setSubmitState({
        type: 'success',
        message: `'${name}' 나라가 등록되었습니다.`,
      });
      reset();
      dispatch(createCountryItem(formData));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {submitState?.type === 'error' && (
        <ErrorText>{submitState.message}</ErrorText>
      )}
      {submitState?.type === 'success' && (
        <SuccessText>{submitState.message}</SuccessText>
      )}

      <FormRow>
        <label htmlFor="name">
          나라 이름 <span>*</span>
        </label>
        <input
          id="name"
          name="name"
          ref={register({
            required: { value: true, message: '필수 입력 사항입니다.' },
          })}
        />
      </FormRow>
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

      <FormRow>
        <label htmlFor="alpha2Code">
          코드 <span>*</span>
        </label>
        <input
          id="alpha2Code"
          name="alpha2Code"
          ref={register({
            required: {
              value: true,
              message: '필수 입력 사항입니다.',
            },
            pattern: {
              value: /^[A-Z]{2}$/,
              message: '영어 대문자 2개로 이루어진 값이어야합니다. ex) KR',
            },
          })}
        />
      </FormRow>
      {errors.alpha2Code && <ErrorText>{errors.alpha2Code.message}</ErrorText>}

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

      <input type="submit" value="등록" />
    </Form>
  );
}

export default CountryAddForm;
