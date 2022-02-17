import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import { RiCloseCircleFill } from "react-icons/ri";
import * as chatAPI from '../lib/api/chat';
import * as itemAPI from '../lib/api/item';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

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

const ClothesBlock = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
`;


const ImageBlock = styled.div`
  position: relative;
  width: 95%;
  outline: none;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column; 
  position: relative;
  width: 100%;
  padding: 12px 6px 0px 6px;
  outline: none;
  
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.div`
  font-size: 1rem;
  font-family: "HY그래픽";
`;

const Seller = styled.div`
  display: flex;
  flex-direction: row; 
  width: 100%;
  font-size: 0.7rem;
`;

const PriceBlock = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Price = styled.div`
  position: relative;
  font-size: 1rem;
`;

const DetailsBlock = styled.div`
  position: relative;
  width: 100%;
  padding: 3px;
  border-bottom: 1px solid #e9ecef;
  outline: none;
  font-size: 1rem;
`;

const Details = styled.div`
  font-size: 0.9rem;
  padding: 1%;
`;

const ContextBlock = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  padding: 2%;
  border-bottom: 1px solid #e9ecef;
  outline: none;
  font-size: 12px;
`;

const ChatButtonBlock = styled.div`
  position: absolute;
  display: flex;
  top: 6.5%;
  right: 80%;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
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

function Clothes({loggedInfo, cVisible, mVisible, clothesToggle, currentItem, messageToggle, setCurrentChat, setItemList, setCurrentItem, alVisible, setAlarmText, alarmToggle}) {
    const onClose = async (e) => {
        //e.preventDefault();
        //const data = await itemAPI.loadItemsAPI();
        //setItemList(data.data.itemList);
        clothesToggle(!cVisible);
        setCurrentItem(0, "", "", "", "", "", "", "", "");
        console.log(currentItem);
    };
    const onChatButton = async () => {
      const cID = await chatAPI.newChatAPI({ iID: currentItem.iID, title: currentItem.title, price: currentItem.price, imgname: currentItem.imgname, seller: currentItem.sellerID, buyer: loggedInfo.username, sellerNick: currentItem.sellerNick, buyerNick: loggedInfo.nickname}); 
      const data = await chatAPI.loadChatAPI({cID: cID.data.cID}); 
      setCurrentChat(data.data.cID, data.data.iID, data.data.title, data.data.price, data.data.imgname, data.data.seller, data.data.buyer, data.data.sellerNick, data.data.buyerNick, data.data.messages, data.data.createdAt);
      messageToggle(!mVisible);
      if(cID.data.isExist === false) {
        setAlarmText("채팅방이 생성되었어요 ! 홈 화면 우측 상단에 채팅버튼으로 대화중인 채팅방 목록을 확인할 수 있어요.");
        alarmToggle(!alVisible);
      }
     };
     const onDelete = async () => {
      await itemAPI.delItemAPI({iID: currentItem.iID});
      const data = await itemAPI.loadItemsAPI();
      setItemList(data.data.itemList);
      clothesToggle(!cVisible);
      setCurrentItem(0, "", "", "", "", "", "", "", "");
      setAlarmText("판매글이 삭제되었어요 !");
      alarmToggle(!alVisible);
     }
    const printedPrice = currentItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if(cVisible === true)   {
        if(currentItem.sellerID === loggedInfo.username)
        {
                return (
                  <DarkBackground>
                      
                      <ClothesBlock>
                        <ImageBlock>
                          <Image src={"http://localhost:4000/api/file/load/"+currentItem.imgname} width = "100%" height = "100%" rounded/>
                        </ImageBlock>
                        <TitleBlock>
                          <Title><b>{currentItem.title}</b></Title>
                          <Seller>{currentItem.location}에 있는 {currentItem.sellerNick}<PriceBlock><Price><b>{printedPrice}원</b></Price></PriceBlock></Seller>
                        </TitleBlock>
                        <DetailsBlock>
                          <Details>{currentItem.details}</Details>
                        </DetailsBlock>
                      </ClothesBlock>
                      <CloseButton><RiCloseCircleFill onClick = {onClose}/></CloseButton>
                      <ChatButtonBlock>
                        <DropdownButton size="sm" variant="light" title="…">
                            
                            <Dropdown.Item as="button" onClick = {onDelete}>삭제하기</Dropdown.Item>
                        </DropdownButton>
                      </ChatButtonBlock>
                  </DarkBackground>
              );
        }
        else {
                return (
                    <DarkBackground>
                        <ClothesBlock>   
                          <ImageBlock>
                            <Image src={"http://localhost:4000/api/file/load/"+currentItem.imgname} width = "100%" height = "100%" rounded/>
                          </ImageBlock>
                          <TitleBlock>
                            <Title><b>{currentItem.title}</b></Title>
                            <Seller>{currentItem.location}에 있는 {currentItem.sellerNick}
                            </Seller>
                            
                          </TitleBlock>
                          <DetailsBlock>
                            <Details>{currentItem.details}</Details>
                          </DetailsBlock>
                        </ClothesBlock>
                        <CloseButton><RiCloseCircleFill onClick = {onClose}/></CloseButton>
                        <ChatButtonBlock>
                                <DropdownButton size="sm" variant="light" title="…">
                                <Dropdown.Item as="button" onClick = {onChatButton}>대화하기</Dropdown.Item>
                              </DropdownButton>
                          </ChatButtonBlock>
                    </DarkBackground>
                );
          }
    }
    else
        return null;
}

export default Clothes;