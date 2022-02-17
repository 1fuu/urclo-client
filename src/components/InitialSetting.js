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
      const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setInput({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    }
    const [loc, setLoc] = useState("지역설정");
    const [subloc, setSubloc] = useState("");
    const onSelectLocation = (e) => {
      setLoc(e.target.value);
    }
    const onSelectSubLocation = (e) => {
      setSubloc(e.target.value);
    }
    const locType = {
      "지역설정" : ["세부지역"],
      "서울특별시" : [ "세부지역", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구" ],
      "경기도" : [ "세부지역", "수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구",
                  "고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군",
                  "양평군" ],
      "인천광역시" : [ "세부지역", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군" ],
      "강원도" : [ "세부지역", "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군" ],
      "충청북도" : [ "세부지역", "청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군" ],
      "충청남도" : [ "세부지역", "천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군" ],
      "대전광역시" : [ "세부지역", "대덕구", "동구", "서구", "유성구", "중구" ],
      "세종특별자치시" : [ "세종특별자치시" ],
      "전라북도" : [ "세부지역", "전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군" ],
      "전라남도" : [ "세부지역", "목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군" ],
      "광주광역시" : [ "세부지역", "광산구", "남구", "동구", "북구", "서구" ],
      "경상북도" : [ "세부지역", "포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군" ],
      "경상남도" : [ "세부지역", "창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군" ],
      "부산광역시" : [ "세부지역", "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군" ],
      "대구광역시" : [ "세부지역", "남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군" ],
      "울산광역시" : [ "세부지역", "남구", "동구", "북구", "중구", "울주군" ],
      "제주특별자치도" : [ "세부지역", "서귀포시", "제주시" ]
    }

    const onSubmit = async () => {
      try {
        await userAPI.initialSettingAPI({username, nickname: nick, location: loc+" "+subloc, height, weight, isFirstLogin: false});
        setLoggedInfo({username, nickname: nick, location: loc+" "+subloc, height, weight, isFirstLogin: false});
        setAlarmText(nick + "님 안녕하세요. 모든 준비가 끝났어요 !");
        alarmToggle(!alVisible);
      }
      catch(e) {
        setAlarmText("비어있는 항목이 있어요 !");
        alarmToggle(!alVisible);
      }
    };

    if(isFirstLogin === true)   {
        return (
            <DarkBackground>
                <InitialSettingBlock>
                    <MessageBlock><Message>처음 오셨군요 !</Message><Message>몇 가지 물어볼게 있어요.</Message></MessageBlock>
                    <NicknameBlock><Nickname type = "text" name = "nick" placeholder="닉네임을 정해주세요." value = {nick} onChange={onWrite} /></NicknameBlock>
                    <SizeBlock>
                      <Height type = "text" name = "height" placeholder="키가 얼마나 되시나요?" value = {height} onChange={onWrite} />
                      <Weight type = "text" name = "weight" placeholder="체중이 궁금해요" value = {weight} onChange={onWrite} />
                    </SizeBlock>
                    <LocationBlock>
                      
                        <Select onChange = {onSelectLocation} value={loc}>
                          <option value="지역설정">지역설정</option>
                          <option value="서울특별시">서울특별시</option><option value="경기도">경기도</option>
                          <option value="인천광역시">인천광역시</option><option value="강원도">강원도</option>
                          <option value="충청북도">충청북도</option><option value="충청남도">충청남도</option>
                          <option value="대전광역시">대전광역시</option><option value="세종특별자치시">세종특별자치시</option><option value="경기도">경기도</option>
                          <option value="전라북도">전라북도</option><option value="전라남도">전라남도</option>
                          <option value="광주광역시">광주광역시</option><option value="경상북도">경상북도</option>
                          <option value="경상남도">경상남도</option><option value="부산광역시">부산광역시</option>
                          <option value="대구광역시">대구광역시</option><option value="울산광역시">울산광역시</option>
                          <option value="제주특별자치도">제주특별자치도</option>
                        </Select>
                        <Select onChange = {onSelectSubLocation} value={subloc}>
                          {locType[loc].map((loc, index) => (
                            <option value = {loc} key = {index}>{loc}</option>
                          ))}
                        </Select>
                    </LocationBlock>
                    <Button variant="info" size = "sm" onClick = {onSubmit}>시작하기</Button>
                </InitialSettingBlock>
            </DarkBackground>
        );
    }
    else
        return null;
}

export default InitialSetting;