import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from '../../hooks/useForm';
import axios from 'axios'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1d1d1d;
  display: flex;
  justify-content: center;
  align-items: center;
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

const SignupForm = styled.form`
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

const DescriptionInput = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  ::placeholder{
    text-align: center;
    line-height: 70px;
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
            <InternalDiv>
                <h2>Signup</h2>
                <SignupForm onSubmit={submitForm}>
                    <InputContainer>
                        <label htmlFor="type">Choose the type of user you want to Signup</label>
                        <select name="type" onChange={onChangeForm} value={form.type}>
                            <option value='NORMAL'>Normal</option>
                            <option value='SUBSCRIBER'>Subscriber (US$9.99)</option>
                            <option value='BAND'>Band</option>
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="name">Name:</label>
                        <Input type="text" onChange={onChangeForm} value={form.name} name="name" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="email">E-mail:</label>
                        <Input type="email" onChange={onChangeForm} value={form.email} name="email" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="nickname">Nickname:</label>
                        <Input type="text" onChange={onChangeForm} value={form.nickname} name="nickname" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="password">Password</label>
                        <Input type="password" onChange={onChangeForm} value={form.password} name="password" required />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <Input type="password" onChange={onChangeForm} value={form.confirmPassword} name="confirmPassword" required />
                    </InputContainer>
                    {form.type==='BAND' &&
                        <InputContainer>
                            <label htmlFor="description">Description</label>
                            <DescriptionInput value={form.description} onChange={onChangeForm} name="description" type="text"  required/>
                        </InputContainer>
                    }
                    {error && <ErrorText>{error}</ErrorText>}
                    <Button>Sign up</Button>
                </SignupForm>
            </InternalDiv>
        </Wrapper>
    );
}

export default Signup;