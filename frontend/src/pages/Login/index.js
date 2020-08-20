import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from '../../hooks/useForm';
import Presentation from '../../components/Presentation';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(200deg,#cc6aa5,#3e91cc,#2dcca7);
  background-size: 600% 100%;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  justify-content: center;
`

const InternalDiv = styled.div`
  margin: 40px 0;
  width: 40%;
  min-width: 300px;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  color: #ffffff;
`

const LoginForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;

  :last-of-type{
    margin: 0 0 30px;
  }
`

const Input = styled.input`
  height: 32px;
  border: none;
  border-bottom: 1px solid #3fc1a7;
  font-size: 0.9em;
  background: none;
  :focus{
    outline: none;
    transition: 0.15s all;
  }
  :invalid{
    outline: none;
    border: none;
    border-bottom: 1px solid #ff5c5c;
    box-shadow: none;
  }
`

const ErrorText = styled.p`
  text-align: center;
  margin: 24px;
  color: #ff5c5c;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin: 24px 0;

  p{
    margin: 0;
  }
`

function Login() {
  const {form, changeFormValue} = useForm({user: '', password: ''});
  const [error, setError] = useState('');

  const onChangeForm = (event) => {
    const {name, value} = event.target;

    changeFormValue(name, value);
  }

  const submitForm = async (event) =>{
    event.preventDefault();
    try {
        const token = await axios.post("localhost:3300/user/login", form);
        console.log(token);
    } catch (error) {
        // setError(error.response.data.message);
        console.log(error);
    }
  }

  return (
    <Wrapper>
      <Presentation onlyIcon />
      <InternalDiv>
        <LoginForm onSubmit={submitForm}>
          <InputContainer>
            <label htmlFor="user">Apelido ou E-mail:</label>
            <Input autoFocus={true} type="user" id="user" placeholder="Apelido ou E-mail:" value={form.user} name="user" onChange={onChangeForm} required />
          </InputContainer>
          <InputContainer>
            <label htmlFor="password">Senha:</label>
            <Input type="password" id="password" placeholder="Senha" value={form.password} name="password" onChange={onChangeForm} required />
          </InputContainer>
          {error && <ErrorText>{error}</ErrorText>}
          <Button>Entrar</Button>
        </LoginForm>
        <StyledLink to='/signup'>
          <p>Clique aqui para se cadastrar</p>
        </StyledLink>
      </InternalDiv>
    </Wrapper>
  );
}

export default Login;