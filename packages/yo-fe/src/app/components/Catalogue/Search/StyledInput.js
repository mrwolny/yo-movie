import styled from 'styled-components';

const StyledInput = styled.input`
  background: #fff;
  color: #0077FF;
  width: 40%;
  border: 0;
  padding: 12px 12px;
  height: 32px;
  font-size: 18px;
  font-weight: 400;
  border-bottom: 1px solid #2ecc71;
  margin-bottom: 12px;

  transition: all 0.75s ease;

  &:hover {
    background: blue;
    opacity: 0.3;
  }

  &:focus {
    width: 80%;
    background: none;
    outline: none;
    color: tomato;
    opacity: 0.7;

     & + span {
      color: #0077FF;
    }
  }
`;

export default StyledInput;
