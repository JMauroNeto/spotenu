import React from 'react';
import styled from 'styled-components'
import {FaSpotify} from 'react-icons/fa'

const DivApp = styled.div`
  color: white;
  text-align: center;
  background-color: black;
  height: 100vh;
  box-sizing: border-box;
`

const Titulo = styled.p`
  display: inline;
  margin: 0 12px;
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-size: 2em;
`

function Home(){
  
    return (
      <DivApp>
        <Header>
          <FaSpotify /><Titulo>Spotenu</Titulo>
        </Header>
      </DivApp>
    );
}

export default Home;