import React from 'react';
import styled from 'styled-components'
import Presentation from '../../components/Presentation';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Wrapper = styled.div`
  padding: 0 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(200deg,#cc6aa5,#3e91cc,#2dcca7);
  background-size: 600% 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

function Home(){
  
    return (
      <Wrapper>
        <Presentation />
        <ButtonContainer>
          <Link to='/login'>
            <Button>Entrar</Button>
          </Link>
          <Link to='/signup'>
            <Button>Criar conta</Button>
          </Link>
        </ButtonContainer>
      </Wrapper>
    );
}

export default Home;