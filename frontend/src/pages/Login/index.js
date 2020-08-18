import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { useForm } from '../../hooks/useForm';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1d1d1d;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InternalDiv = styled.div`
  width: 40%;
  min-width: 300px;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  border: 2px solid #57b560;
  background-color: #111111;
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
`

const Input = styled.input`
  height: 32px;
  border: none;
  border: none;
  border-bottom: 2px solid #111111;
  font-size: 0.9em;
  background-color: #dddddd;
  :focus{
    outline: none;
    transition: 0.15s all;
    border-bottom: 2px solid #57b560;
    box-shadow: 0px 0px 3px  #57b560;
  }
`

const Button = styled.button`
  width: 60%;
  height: 40px;
  align-self: center;
  font-size: 16px;
  font-weight: 500;
  border-radius: 100px;
  border: none;
  background-color: #57b560;
  :hover{
    opacity: 0.9;
    transform: scale(1.04);
    cursor: pointer;
  }
  margin: 12px;
`

const ErrorText = styled.p`
  margin: 8px;
  color: #700000;
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
      <InternalDiv>
        <h2>Login</h2>
        <LoginForm onSubmit={submitForm}>
          <InputContainer>
            <label htmlFor="user">Nickname or e-mail:</label>
            <Input type="user" id="user" placeholder="Nickname or e-mail" value={form.user} name="user" onChange={onChangeForm} required />
          </InputContainer>
          <InputContainer>
            <label htmlFor="password">Password:</label>
            <Input type="password" id="password" placeholder="Password" value={form.password} name="password" onChange={onChangeForm} required />
          </InputContainer>
          {error && <ErrorText>{error}</ErrorText>}
          <Button>Enter</Button>
        </LoginForm>
      </InternalDiv>
    </Wrapper>
  );
}

export default Login;