import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 140px;
  height: 40px;
  align-self: center;
  font-size: 16px;
  font-weight: 500;
  border-radius: 80px;
  border: none;
  box-shadow: 0 1px 10px 0 #00000033;
  background-color: #3fc1a7;
  color: white;
  :hover{
    opacity: 0.9;
    transform: scale(1.02);
    cursor: pointer;
  }
  margin: 0;
`

function Button({children}){
    return(
        <StyledButton>
            {children}
        </StyledButton>
    );
}

export default Button;