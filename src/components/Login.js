import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import * as AuthAPI from '../lib/api/auth';
import * as FileAPI from '../lib/api/file';
import * as ItemAPI from '../lib/api/item';
import storage from '../lib/storage';
import HomeUI from './HomeUI';
import { BiUser } from 'react-icons/bi';

const InputPositioner = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputForm = styled.div`
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items: center;
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
  margin: 2px;
`;

const MessageForm = styled.div`
  position: absolute;
  bottom: 30%;
  font-size: 12px;
  opacity: 100%;
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
  font-size: 1.5rem;
`;

function Login({onCreate, onLoginInputChange, username, password, rVisible, alVisible, setAlarmText, alarmToggle, onRegister, setLoggedInfo, setValidated, setItemList, logged, itemList}) {
      const [message, setMessage] = useState("");
      const [logine, setLogin] = useState(false);
      const onChange = e => {
        const { value, name } = e.target;
        if(name === "username") {
          onLoginInputChange({
            username: value,
            password,
          });
        }
        else {
          onLoginInputChange({
            username,
            password: value,
          });
        }
      };
    const onClick = (e) => {
        e.preventDefault();
        onRegister(!rVisible);
    };
    const login = async () => {
      try {
        const response = await AuthAPI.loginAPI({username, password});
        //storage.set('loggedInfo', response);
        setLoggedInfo(response.data);
        console.log(response.data);
        setValidated(true);
        const data = await ItemAPI.loadItemsAPI();
        setItemList(data.data.itemList);
        setLogin(true);
        setAlarmText("유어클로에 오신 걸 환영해요 ! 장터에 " + data.data.size + "개의 옷들이 올라와있으니 둘러보세요.");
        alarmToggle(!alVisible);
      } catch (e) {
        setAlarmText("정보가 일치하지 않아요 !");
        alarmToggle(!alVisible);
      }
    };
    const onLogin = (e) => {
      e.preventDefault();
      login();
    };
    if(logged === false)
      return (
        <InputPositioner>
            <form onSubmit = {onCreate}>
                <LogoForm><Logo><b>당신의 옷,</b></Logo><Logo><b>유어클로</b></Logo></LogoForm>
                <InputForm>
                    <BiUser/>
                    <Input type = "text" name = "username" placeholder="아이디" value = {username} onChange={onChange} />
                    <Input type = "password" name = "password" placeholder="비밀번호" value = {password} onChange={onChange} />      
                </InputForm>
                <ButtonBlock>
                    <Button class="btn btn-info btn-sm btn-block" variant="secondary" size = "sm" type = "submit" onClick = {onLogin}>들어가기</Button>
                </ButtonBlock>
                <ButtonBlock>
                    <Button class="btn btn-info btn-sm btn-block" variant="light" size = "sm" onClick = {onClick}>계정이 없어요 !</Button>
                </ButtonBlock>
            </form>
            <MessageForm>{message}</MessageForm>
        </InputPositioner>
    );
    else
        return null;
}

export default Login;