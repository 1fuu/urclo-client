import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from 'react-bootstrap/Button';
import * as postAPI from '../lib/api/post';
import { RiCloseCircleFill } from "react-icons/ri";

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

const WritePostBlock = styled.div`
    width: 90%;
    height: 90%;
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

const TitleBlock = styled.div`
  position: relative;
  width: 95%;
  margin-bottom: 3%;
  height: 10%;
  border-bottom: 1px solid #e9ecef;
`;

const ContextBlock = styled.div`
  position: relative;
  width: 95%;
  height: 80%;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.input`
  position: relative;
  margin-top: 10%;
  width: 100%;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const Context = styled.input`
  position: relative;
  width: 100%;
  height: 70%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
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

function WritePost({username, nickname, wVisible, writePostToggle, setPostList}) {
  const [inputs, setInput] = useState({title: "", context: ""});
  const {title, context} = inputs;
  const onClose = () => {
    setInput({
      title: "",
      context: ""
    });
    writePostToggle(!wVisible);
  };
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInput({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }
  const onSubmit = async () => {
    console.log(title);
    console.log(context);
    console.log(username);
    await postAPI.newPostAPI({title, context, writer: String(nickname)});
    const data = await postAPI.loadPostsAPI();
    setPostList(data.data.postList);
    writePostToggle(!wVisible);
    setInput({
      title: "",
      context: ""
    });
  }
    if(wVisible === true)   {
        return (
            <DarkBackground>
                <WritePostBlock>
                  <TitleBlock>
                    <Title type = "text" name = "title" placeholder="제목" value = {title} onChange={onChange} />
                  </TitleBlock>
                  <ContextBlock>
                    <Context type = "text" name = "context" placeholder="본문" value = {context} onChange={onChange} />
                  </ContextBlock>
                  <Button variant="info" size = "sm" onClick = {onSubmit}>작성</Button>
                  <CloseButton onClick = {onClose}/>
                </WritePostBlock>
                <CloseButton><RiCloseCircleFill onClick = {onClose}/></CloseButton>
            </DarkBackground>
        );
    }
    else
        return null;
}

export default WritePost;