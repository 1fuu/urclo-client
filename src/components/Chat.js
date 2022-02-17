import React, {useState} from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image'
import * as ChatAPI from '../lib/api/chat';
import { BiMap } from "react-icons/bi";
import { IoPricetagOutline, IoShirtOutline } from "react-icons/io5";
import { AlarmToggle, SetAlarmText } from '../redux/modules/home';
//import io from 'socket.io-client';
//let socket;

const ItemBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 11%;
    margin-left: 3px;
    margin-bottom: 3%;
    border-bottom: 1px solid #e9ecef;
    cursor: pointer;
`;

const ImgBlock = styled.div`
    position: relative;
    width: 18.5%;
    height: 98%;
    margin-right: 2%;
`;

const DetailsBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const TitleBlock = styled.div`
    position: relative;
    height: 30%;
`;

const Title = styled.div`
    font-size: 0.75rem;
    
`;

const PriceBlock = styled.div`
    position: relative;

    height: 30%;
`;

const Price = styled.div`
    font-size: 0.9rem;
`;

const LocationBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex: 1;
`;

const Location = styled.div`
    font-size: 0.7rem;
`;


function Chat({username, imgname, cID, iID, mVisible, messageToggle, setCurrentChat, seller, buyer, sellerNick, buyerNick, title, price, createdAt, messages, alVisible, setAlarmText, alarmToggle}) {
    const onClick = async () => {
        //e.preventDefault();
        try {
            const data = await ChatAPI.loadChatAPI({cID}); 
            setCurrentChat(data.data.cID, data.data.iID, data.data.title, data.data.price, data.data.imgname, data.data.seller, data.data.buyer, data.data.sellerNick, data.data.buyerNick, data.data.messages, data.data.createdAt);
            messageToggle(!mVisible);
        }
        catch (e) {
            setAlarmText("정보를 불러올 수 업습니다 ! 에러명: " + e);
            AlarmToggle(!alVisible);
        }
        /*socket = io('http://localhost:4000');
        socket.emit('join', { cID }, (error) => {
            if (error) {
              console.log("에러가 발생했습니다.");
            }
        })*/
    };
    return(
        <ItemBlock onClick = {onClick}>
            <ImgBlock>
                <Image src={"http://localhost:4000/api/file/load/"+imgname} width = "60" height = "57" rounded/>
            </ImgBlock>
            <DetailsBlock>
                <PriceBlock>
                    <Price><b>{username === seller ? buyerNick : sellerNick}와의 대화</b></Price>
                </PriceBlock>
                <TitleBlock>
                    <Title>{title}</Title>
                </TitleBlock>
            </DetailsBlock>
        </ItemBlock>
    );
}


export default Chat;