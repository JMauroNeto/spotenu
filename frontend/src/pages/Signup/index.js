import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import Button from '../../components/Button';
import Presentation from '../../components/Presentation';
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
  overflow-y: auto;
  padding: 16px 0;
  box-sizing: border-box;
`

const InternalDiv = styled.div`
  width: 40%;
  min-width: 300px;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #ffffff;
`

const SignupForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
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

const DescriptionInput = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  ::placeholder{
    text-align: center;
    line-height: 70px;
  }
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

function Signup(){
    const {form, changeFormValue} = useForm({name: '', email: '', password: '', confirmPassword:'', nickname: '', type: 'normal', description: ''});
    const [error, setError] = useState('');

    const onChangeForm = (event) => {
        const {name, value} = event.target;
    
        changeFormValue(name, value);
    }

    const submitForm = async (event) => {
        event.preventDefault();

        if(form.password===form.confirmPassword){
            try {
                const token = await axios.post("localhost:3300/user/signup", form);
                console.log(token);
            } catch (error) {
                // setError(error.response.data.message);
                console.log(error);
            }
        }
        else{
            setError("Passwords doesn't match")
        }
    }

    useEffect(()=>{
        console.log(form);
    }, [form])

    return(
        <Wrapper>
            <Presentation onlyIcon />
            <InternalDiv>
                <SignupForm onSubmit={submitForm}>
                    <InputContainer>
                        <label htmlFor="type">Escolha o tipo de cadastro:</label>
                        <select name="type" onChange={onChangeForm} value={form.type}>
                            <option value='NORMAL'>Normal</option>
                            <option value='SUBSCRIBER'>Assinante (US$9.99)</option>
                            <option value='BAND'>Banda</option>
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="name">Nome:</label>
                        <Input placeholder="Nome" type="text" onChange={onChangeForm} value={form.name} name="name" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="email">E-mail:</label>
                        <Input placeholder="E-mail" type="email" onChange={onChangeForm} value={form.email} name="email" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="nickname">Apelido:</label>
                        <Input placeholder="Apelido" type="text" onChange={onChangeForm} value={form.nickname} name="nickname" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="password">Senha</label>
                        <Input placeholder="Senha" type="password" onChange={onChangeForm} value={form.password} name="password" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <Input placeholder="Confirmar senha" type="password" onChange={onChangeForm} value={form.confirmPassword} name="confirmPassword" required />
                    </InputContainer>
                    {form.type==='BAND' &&
                        <InputContainer>
                            <label htmlFor="description">Descrição</label>
                            <DescriptionInput value={form.description} onChange={onChangeForm} name="description" type="text"  required/>
                        </InputContainer>
                    }
                    {error && <ErrorText>{error}</ErrorText>}
                    <Button>Sign up</Button>
                    <StyledLink to='/login'>
                        <p>Já tem cadastro? Clique para fazer login</p>
                    </StyledLink>
                </SignupForm>
            </InternalDiv>
        </Wrapper>
    );
}

export default Signup;