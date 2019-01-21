import styled from 'styled-components';

const StyledMovieContainer = styled.section`
  width: 342px;
  flex: 0 1 0;
  margin: 0 10px 10px 0;

  & > h2 {
    position: absolute;
    width: 342px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.4);
  }

  & > .img {
    width: 342px;
    height: 513px;

    & > img {
      object-fit: fill;

      width: 342px;
      height: 513px;
    }
  }
`;

export default { StyledMovieContainer };
