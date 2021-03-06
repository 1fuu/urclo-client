import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from 'react-bootstrap/Button';
import * as userAPI from '../lib/api/user';
import CloseButton from 'react-bootstrap/CloseButton';

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
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
`;

const InitialSettingBlock = styled.div`
    width: 75%;
    height: 75%;
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

const MessageBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 3%;
`;

const Message = styled.div`
  font-size: 0.9rem;
`;

const NicknameBlock = styled.div`
  position: relative;
  width: 88%;
  margin-bottom: 0%;
`;

const Nickname = styled.input`
  position: relative;
  margin-top: 10%;
  width: 100%;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const SizeBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 88%;
  margin-bottom: 5%;
`;

const Height = styled.input`
  position: relative;
  margin-top: 20%;
  width: 100%;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;


const Weight = styled.input`
  position: relative;
  margin-top: 5%;
  width: 100%;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const LocationBlock = styled.div`
  position: relative;
  width: 90%;
  margin-bottom: 10%;
`;

const Location = styled.div`
  position: relative;
  width: 100%;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const Select = styled.select`
  position: relative;
  padding: 6px;
  width: 48%;
  flex: 1;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 12px;
  margin-left: 1%;
`;



function InitialSetting({username, nickname, location, isFirstLogin, setLoggedInfo, alVisible, setAlarmText, alarmToggle}) {
    const [inputs, setInput] = useState({nick: "", height: "", weight: ""});
    const {nick, height, weight} = inputs;
    const onWrite = (e) => {
      const {value, name} = e.target; // ?????? e.target ?????? name ??? value ??? ??????
      setInput({
        ...inputs, // ????????? input ????????? ????????? ???
        [name]: value // name ?????? ?????? ?????? value ??? ??????
      });
    }
    const [loc, setLoc] = useState("????????????");
    const [subloc, setSubloc] = useState("");
    const onSelectLocation = (e) => {
      setLoc(e.target.value);
    }
    const onSelectSubLocation = (e) => {
      setSubloc(e.target.value);
    }
    const locType = {
      "????????????" : ["????????????"],
      "???????????????" : [ "????????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "????????????", "?????????", "?????????", "????????????", "?????????", "?????????", "?????????", "?????????", "?????????", "????????????", "?????????", "?????????", "?????????", "??????", "?????????" ],
      "?????????" : [ "????????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????????", "????????? ?????????", "????????? ?????????", "?????????", "?????????", "?????????", "????????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????? ????????????",
                  "????????? ????????????", "?????????", "?????????", "????????????", "?????????", "?????????", "?????????", "?????????", "?????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????",
                  "?????????" ],
      "???????????????" : [ "????????????", "?????????", "????????????", "?????????", "??????", "?????????", "??????", "?????????", "??????", "?????????", "?????????" ],
      "?????????" : [ "????????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "????????????" : [ "????????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "????????? ?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "????????????" : [ "????????????", "????????? ?????????", "????????? ?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "???????????????" : [ "????????????", "?????????", "??????", "??????", "?????????", "??????" ],
      "?????????????????????" : [ "?????????????????????" ],
      "????????????" : [ "????????????", "????????? ?????????", "????????? ?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "????????????" : [ "????????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "???????????????" : [ "????????????", "?????????", "??????", "??????", "??????", "??????" ],
      "????????????" : [ "????????????", "????????? ??????", "????????? ??????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "????????????" : [ "????????????", "????????? ?????????", "????????? ?????????", "????????? ???????????????", "????????? ???????????????", "????????? ?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????" ],
      "???????????????" : [ "????????????", "?????????", "?????????", "??????", "??????", "?????????", "????????????", "??????", "?????????", "?????????", "??????", "?????????", "?????????", "?????????", "??????", "????????????", "?????????" ],
      "???????????????" : [ "????????????", "??????", "?????????", "??????", "??????", "??????", "?????????", "??????", "?????????" ],
      "???????????????" : [ "????????????", "??????", "??????", "??????", "??????", "?????????" ],
      "?????????????????????" : [ "????????????", "????????????", "?????????" ]
    }

    const onSubmit = async () => {
      try {
        await userAPI.initialSettingAPI({username, nickname: nick, location: loc+" "+subloc, height, weight, isFirstLogin: false});
        setLoggedInfo({username, nickname: nick, location: loc+" "+subloc, height, weight, isFirstLogin: false});
        setAlarmText(nick + "??? ???????????????. ?????? ????????? ???????????? !");
        alarmToggle(!alVisible);
      }
      catch(e) {
        setAlarmText("???????????? ????????? ????????? !");
        alarmToggle(!alVisible);
      }
    };

    if(isFirstLogin === true)   {
        return (
            <DarkBackground>
                <InitialSettingBlock>
                    <MessageBlock><Message>?????? ???????????? !</Message><Message>??? ?????? ???????????? ?????????.</Message></MessageBlock>
                    <NicknameBlock><Nickname type = "text" name = "nick" placeholder="???????????? ???????????????." value = {nick} onChange={onWrite} /></NicknameBlock>
                    <SizeBlock>
                      <Height type = "text" name = "height" placeholder="?????? ????????? ?????????????" value = {height} onChange={onWrite} />
                      <Weight type = "text" name = "weight" placeholder="????????? ????????????" value = {weight} onChange={onWrite} />
                    </SizeBlock>
                    <LocationBlock>
                      
                        <Select onChange = {onSelectLocation} value={loc}>
                          <option value="????????????">????????????</option>
                          <option value="???????????????">???????????????</option><option value="?????????">?????????</option>
                          <option value="???????????????">???????????????</option><option value="?????????">?????????</option>
                          <option value="????????????">????????????</option><option value="????????????">????????????</option>
                          <option value="???????????????">???????????????</option><option value="?????????????????????">?????????????????????</option><option value="?????????">?????????</option>
                          <option value="????????????">????????????</option><option value="????????????">????????????</option>
                          <option value="???????????????">???????????????</option><option value="????????????">????????????</option>
                          <option value="????????????">????????????</option><option value="???????????????">???????????????</option>
                          <option value="???????????????">???????????????</option><option value="???????????????">???????????????</option>
                          <option value="?????????????????????">?????????????????????</option>
                        </Select>
                        <Select onChange = {onSelectSubLocation} value={subloc}>
                          {locType[loc].map((loc, index) => (
                            <option value = {loc} key = {index}>{loc}</option>
                          ))}
                        </Select>
                    </LocationBlock>
                    <Button variant="info" size = "sm" onClick = {onSubmit}>????????????</Button>
                </InitialSettingBlock>
            </DarkBackground>
        );
    }
    else
        return null;
}

export default InitialSetting;