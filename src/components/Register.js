import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from 'react-bootstrap/Button';
import * as AuthAPI from '../lib/api/auth';
import { BiUserPlus } from 'react-icons/bi';
import Spinner from 'react-bootstrap/Spinner'

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0px);
  }
`;

const DarkBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
`;

const RegisterBlock = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 16px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
`;

const InputPositioner = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
`;

const InputForm = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    position: relative;
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    outline: none;
    font-size: 15px;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 1px;
`;

const LogoForm = styled.div`
  position: relative;
  margin-bottom: 10%;
  border-radius: 4px;
  display:flex
  flex-direction: column;
`;

const Logo = styled.div`
  position: relative;
  color: black;
  font-family: "HY그래픽";
  font-size: 1.1rem;
`;



function Register({username, password, loading, success, error, rVisible, onRegister, onRegisterInputChange, onRegisterStateChange, alVisible, setAlarmText, alarmToggle}) {
  const createAccount = async () => {
    onRegisterStateChange(true, false, null);
      try {
        console.log(username, password);
        await AuthAPI.registerAPI({username, password});
        onRegisterStateChange(false, true, null);
        onRegister(!rVisible);
        onRegisterInputChange("", "");
        setAlarmText("계정을 생성했어요 !");
        alarmToggle(!alVisible);
      } catch (e) {
        onRegisterStateChange(false, false, e);
        setAlarmText("이미 누군가 사용 중이거나 올바르지 않은 형식이에요 !");
        alarmToggle(!alVisible);
      }
    };
    const onClick = (e) => {
      e.preventDefault();
      createAccount();
    };
    const onCancel = (e) => {
      e.preventDefault();
      onRegister(!rVisible);
      onRegisterInputChange("", "");
  };
    const onChange = e => {
      const { value, name } = e.target;
      if(name === "username") {
        onRegisterInputChange({
          username: value,
          password,
        });
      }
      else {
        onRegisterInputChange({
          username,
          password: value,
        });
      }
    };
    if (!rVisible) return null;
    if(loading === false) {
      return (
          <DarkBackground>
              <RegisterBlock>
                  <InputPositioner>
                    <LogoForm><Logo><b>회원가입</b></Logo></LogoForm>
                    <InputForm>
                      <BiUserPlus fontSize="20px"/>
                      <Input name = "username" type = "text" placeholder="아이디" value = {username} onChange = {onChange} />
                      <Input name = "password" type = "password" placeholder="비밀번호" value = {password} onChange = {onChange} />
                    </InputForm>
                    <ButtonBlock>
                      <Button variant = "secondary" size = "sm" onClick={onClick}>계정 만들기</Button>
                    </ButtonBlock>
                    <ButtonBlock>
                      <Button variant = "light" size = "sm" onClick={onCancel}>돌아가기</Button>
                    </ButtonBlock>
                  </InputPositioner>
              </RegisterBlock>
          </DarkBackground>
      );
    }
    else if(loading === true) {
      return (
          <DarkBackground>
              <RegisterBlock>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </RegisterBlock>
          </DarkBackground>
      );
    }
    else {
      return null;
    }
}

export default Register;