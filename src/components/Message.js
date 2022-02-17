import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { RiCloseCircleFill } from "react-icons/ri";
import * as chatAPI from '../lib/api/chat';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';

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

const MessageBlock = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 16px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
`;


const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #dee2e6;
  border-radius: 0px 0px 10px 10px;
  margin-top: -1px;
  font-size: 1.0rem;
`;

const InputBox = styled.div`
  position: relative;  
  width: 95%;
  height: 10%;
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  position: relative;
  height: 55%;
  display: flex;
  flex-direction: row;
`;

const CloseButtonBox = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
`;

const TitleBox = styled.div`
  position: relative;
  width: 95%;
  height: 7%;
  border: 1px solid #dee2e6;
  border-radius: 10px 10px 0px 0px;
  font-size: 1.5rem;
`;

const MessageBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 95%;
  height: 70%;
  border: 1px solid #dee2e6;
  margin-top: -1px
`;

const TextBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  ${props => {
    if(props.sender === props.nickname)
      return `
        justify-content: flex-end;
      `;
  }}
  width: 100%;
  margin-top: 1.5%;
`;

const Text = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 10px 10px;
  padding: 2%;
  background-color: #EFFBFB;
  font-size: 0.8rem;
  font-family: "HY그래픽";
`;

const CloseButton = styled.div`
    position: absolute;
    top: 2%;
    right: 3%;
    cursor: pointer;
    font-size: 1.8rem;
    opacity: 100%;
    &:hover {
    opacity: 70%;
    display: initial;
}
`;

export default function Message({setChatList, setCurrentChat, addChatMessage, loggedInfo, mVisible, messageToggle, currentChat, alVisible, setAlarmText, alarmToggle}) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [text, setText] = useState("");
  const [socket, setSocket] = useState()
  useEffect(() => {
    if(socket) socket.close();
    setSocket(io('http://localhost:4000'));
    return () => {
      if(socket) socket.close();
    }
  }, []);       // 일단 걍 접속 후 렌더링 되자마자 소켓 생성

  useEffect(() => {
    if(socket && currentChat.cID !== 0) {
      socket.off();
      socket.emit('join', { cID: currentChat.cID });
      socket.on('receiveMSG', ({username, text}) => {
        console.log("메세지 전송받음");
        addChatMessage(username, text, "");
        scrollToBottom();
      })
    }
  }, [currentChat.cID]);    // 채팅방 입장시 join과 리스너 생성

  /*useEffect(() => {
    if(socket && currentChat.cID !== 0) {
      socket.off();
      socket.emit('join', { cID: currentChat.cID });
      socket.on('receiveMSG', ({username, text}) => {
        console.log("메세지 전송받음");
        addChatMessage(username, text, "");
        scrollToBottom();
      })
    }
  }, [socket]);    // 소켓이 사라졌다가 다시 연결되어도 리스너 생성
*/

  useEffect(() => {
    if(mVisible === true) {
      setTimeout( () => {
        scrollToBottom();
      }, 150);
    }
  }, [mVisible]);

  const onClose = async () => { 
    const data = await chatAPI.loadChatsAPI({username: loggedInfo.username});
    setChatList(data.data.chatList);
    setCurrentChat(0, 0, "", "", "", "", "", "", "", [], "");
    messageToggle(!mVisible);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await chatAPI.addMessageAPI({ cID: currentChat.cID, username: loggedInfo.nickname, text});
      if(socket) socket.emit('sendMSG', { cID: currentChat.cID, username: loggedInfo.nickname, text });
      else  addChatMessage(loggedInfo.nickname, text, "");  
      setText("");
    }
    catch (e) {
      setAlarmText("메세지를 입력해주세요. 에러명: " + e);
      alarmToggle(!alVisible);
    }
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  if(mVisible === true)   {
      return (
            <DarkBackground>
                <MessageBlock>
                    <TitleBox>{loggedInfo.nickname === currentChat.sellerNick ? currentChat.buyerNick : currentChat.sellerNick}와의 대화</TitleBox>
                      <MessageBox>
                        {currentChat.messages.map((msg, index) => (
                            <TextBox key = {index} sender = {msg.username} nickname = {loggedInfo.nickname}>
                              <Text><b>{msg.username}: {msg.text}</b></Text>
                            </TextBox>
                        ))}
                      <div ref={messagesEndRef} />
                    </MessageBox>
                      <InputBox>
                        <form>
                        <Input type = "text" placeholder="상대방에게 보낼 메세지" name = "text" value = {text} onChange={onChange} />
                        <ButtonBox>
                          <CloseButtonBox></CloseButtonBox>
                          <Button class="btn btn-info btn-sm btn-block" variant="secondary" size = "sm" type = "submit" onClick = {onSubmit}>전송</Button>
                        </ButtonBox>
                        </form>
                      </InputBox>       
                </MessageBlock>
                <CloseButton><RiCloseCircleFill onClick = {onClose}/></CloseButton>
            </DarkBackground>
      );
  }
  else
      return null;
}