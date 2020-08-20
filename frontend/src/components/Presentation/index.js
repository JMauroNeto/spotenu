import React from 'react'
import styled from 'styled-components'
import {FaSpotify} from 'react-icons/fa'

const PresentationDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;

  div{
    display: flex;
    align-items: center;
    font-size: 4em;
  }

  div p{
    margin: 0 12px;
    font-weight: bold;
  }

  >p{
    font-size: 2em;
  }
`

function Presentation({onlyIcon}){
    return (
        <PresentationDiv>
            <div>
                <FaSpotify /><p>Spotenu</p>
            </div>
            {!onlyIcon && 
                <p>O seu gerenciador de playlists</p>
            }
        </PresentationDiv>
    );
}

export default Presentation;