import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CgClose, CgCloseO } from "react-icons/cg";
import Button from 'react-bootstrap/Button';

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

const AlarmBlock = styled.div`
    width: 60%;
    padding 5%;
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

const TextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  position: relative;
  font-size: 0.9rem;
  align-items: center;
  justify-content: center;
  font-family: "HY그래픽";
`;

const CloseButtonBox = styled.div`
  position: relative;
  height: 10%;
`;

export default function AlarmBox ({alVisible, alarmText, alarmToggle, setAlarmText}) {
  const onClose = () => {
    alarmToggle(!alVisible);
    setAlarmText("");
  }

  if(alVisible === true) {
    return (
      <DarkBackground>
        <AlarmBlock>
          <TextBox>
            <Text><b>{alarmText}</b></Text>
            <CloseButtonBox><Button class="btn btn-info btn-sm btn-block" variant="secondary" size = "sm" type = "submit" onClick = {onClose}>닫기</Button></CloseButtonBox>
          </TextBox>
        </AlarmBlock>
      </DarkBackground>
    );
  }
  else
    return null;
};