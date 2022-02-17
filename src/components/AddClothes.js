import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from 'react-bootstrap/Button';
import { RiCloseCircleFill } from "react-icons/ri";
import * as fileAPI from '../lib/api/file';
import * as itemAPI from '../lib/api/item';
import * as kerasAPI from '../lib/api/keras';
import Spinner from 'react-bootstrap/Spinner';

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

const AddClothesBlock = styled.div`
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
  width: 70%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 8px;
`;

const Select = styled.select`
  position: relative;
  padding: 6px;
  flex: 1;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 12px;
  margin-left: 1%;
`;

const TitleBlock = styled.div`
  position: relative;
  width: 90%;
  margin-bottom: 3%;
`;

const DetailsBlock = styled.div`
  position: relative;
  width: 90%;
  height: 40%;
  margin-bottom: 3%;
`;

const PriceBlock = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  margin-bottom: 3%;
`;

const PrintedPriceBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1
  margin-bottom: 3%;
`;

const LocationBlock = styled.div`
  position: relative;
  width: 90%;
  margin-bottom: 3%;
`;

const Location = styled.input`
  position: relative;
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const UploadBlock = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  flex-direction: row;
  margin-bottom: 3%;
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

const Details = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const Price = styled.input`
  position: relative;
  width: 130%;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 15px;
`;

const PrintedPrice = styled.div`
  position: relative;
  padding: 3px;
  font-size: 14px;
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

const LoadingBlock = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  opacity: 0%;
  ${props => {
    if(props.loading === true)
      return `
        opacity: 100%;
      `;
  }}
`;

function AddClothes({username, nickname, alVisible, aVisible, loading, success, error, setAlarmText, alarmToggle, addClothesToggle, itemList, setItemList, location, height, weight, loadingStateChange}) {
    const [img, setImage] = useState(null);
    const [type, setType] = useState("종류선택");
    const [inputs, setInput] = useState({title: "", details: "", price: ""});
    const {title, details, price} = inputs;
    const onWrite = (e) => {
      const { value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setInput({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    }
    const onClose = () => {
        //e.preventDefault();
        setInput({
          title: "",
          details: "",
          price: ""
        });
        setImage(null);
        setType("");
        addClothesToggle(!aVisible);
        console.log(aVisible);
        console.log(itemList);
    };
    const onSubmit = async () => {
        //e.preventDefault();
        loadingStateChange(true, false, null);
        try {
          const formData = new FormData();
          formData.append('img', img);
          const response = await fileAPI.uploadAPI(formData);
          const filename = response.data;
          await itemAPI.newItemAPI({title, details, sellerID: String(username), sellerNick: String(nickname), location, type, price: String(price), height, weight, imgname: String(filename)});
          
          setTimeout( async () => {
            const data = await itemAPI.loadItemsAPI();
            setItemList(data.data.itemList);
          }, 500);    // 이미지 업로드되고 불러오는데 시간이 있어서 이렇게 안하면 엑박뜨는 거 같음.

          addClothesToggle(!aVisible);
          setInput({
            title: "",
            details: "",
            price: ""
          });
          setType("종류선택");
          loadingStateChange(false, true, null);
          setAlarmText("판매 글이 올려졌어요 ! 이제 다른 사람들이 볼 수 있어요.");
          alarmToggle(!alVisible);
        }
        catch (e) {
          loadingStateChange(false, false, e);
          setAlarmText("비어있는 항목이 있어요 !");
          alarmToggle(!alVisible);
        }
    };
    const onChange = async (e) => {
        setImage(e.target.files[0]);
        loadingStateChange(true, false, null);
        try {
          const formData = new FormData();
          formData.append('file', e.target.files[0]);
          const response = await kerasAPI.detectAPI(formData);
          setType(response.data.type);
          loadingStateChange(false, true, null);
          setAlarmText(response.data.type + "로 판단됩니다. 만약 아니라면 직접 설정해주세요 !");
          alarmToggle(!alVisible);
        }
        catch (e) {
          loadingStateChange(false, false, e);
          setAlarmText("서버가 응답하지 않습니다 ! 에러명: " + e);
          alarmToggle(!alVisible);
        }
    };
    const onSelect = async (e) => {
      setType(e.target.value);
    }
    const printedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if(aVisible === true)   {
        return (
            <DarkBackground>
                <AddClothesBlock>
                    <TitleBlock>
                      <Title type = "text" name = "title" placeholder="어떤 옷인가요?" value = {title} onChange={onWrite} />
                    </TitleBlock>
                    <DetailsBlock>
                      <Details type = "text" name = "details" placeholder="옷에 대한 설명을 해주세요." value = {details} onChange={onWrite} />
                    </DetailsBlock>
                    <PriceBlock>
                      <Price type = "text" name = "price" placeholder="얼마에 파실려구요?" value = {price} onChange={onWrite} />
                      <PrintedPriceBlock>
                        <PrintedPrice><b>{printedPrice}원</b></PrintedPrice>
                      </PrintedPriceBlock>
                    </PriceBlock>
                    <UploadBlock>
                      <Input type="file" capture="camera" accept="image/*" onChange = {onChange} />
                      <Select onChange = {onSelect} value={type}>
                        <option value="전체">선택안함</option>
                        <option value="상의">상의</option>
                        <option value="하의">하의</option>
                      </Select>
                    </UploadBlock>
                    <LocationBlock>
                      <Location type = "text" placeholder={location} value = {location}/>
                    </LocationBlock>
                      <Button variant="info" size = "sm" onClick = {onSubmit}>올리기</Button>
                </AddClothesBlock>
                <CloseButton><RiCloseCircleFill onClick = {onClose}/></CloseButton>
                <LoadingBlock loading = {loading}>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                </LoadingBlock>
            </DarkBackground>
        );
    }
    else
        return null;
}

export default AddClothes;