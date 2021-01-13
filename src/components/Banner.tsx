import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;
  font-weight: 600;
`;

function Banner() {
  return <Container>Our World</Container>;
}

export default Banner;
