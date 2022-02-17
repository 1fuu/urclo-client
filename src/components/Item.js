import React, {useState} from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image'
import { BiMap } from "react-icons/bi";
import { IoPricetagOutline, IoShirtOutline } from "react-icons/io5";
import * as ItemAPI from '../lib/api/item';

const ItemBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 13.5%;
    margin-bottom: 3%;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 1.5%;
    cursor: pointer;
`;

const ImgBlock = styled.div`
    position: relative;
    width: 23%;
    height: 90%;
    margin-right: 2%;
`;

const DetailsBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
`;

const TitleBlock = styled.div`
    position: relative;
    height: 30%;
`;

const Title = styled.div`
    font-size: 0.9rem;
`;

const PriceBlock = styled.div`
    position: relative;

    height: 60%;
`;

const Price = styled.div`
    font-size: 0.75rem;
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


function Item({imgname, clothesToggle, cVisible, setCurrentItem, username, nickname, sellerID, sellerNick, type, iID, title, details, price, location, alVisible, alarmToggle, setAlarmText}) {
    const onClick = async () => {
        //e.preventDefault();
        try {
            const data = await ItemAPI.loadItemAPI({iID})
            setCurrentItem(data.data.iID, data.data.title, data.data.details, data.data.sellerID, data.data.sellerNick, data.data.location, data.data.type, data.data.price, data.data.imgname);
            clothesToggle(!cVisible);
        }
        catch (e) {
            setAlarmText("정보를 불러올 수 없습니다 ! 에러명: " + e);
            alarmToggle(!alVisible);
        }
    };
    const printedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return(
        <ItemBlock onClick = {onClick}>
            <ImgBlock>
                <Image src={"http://localhost:4000/api/file/load/"+imgname} width = "75" height = "70" rounded/>
            </ImgBlock>
            <DetailsBlock>
                <TitleBlock>
                    <Title><b>{title}</b></Title>
                </TitleBlock>
                <PriceBlock>
                    <Price>{printedPrice}원</Price>
                </PriceBlock>
                <LocationBlock>
                    <Location><BiMap fontSize="15px"/>{location}</Location>
                </LocationBlock>
            </DetailsBlock>
        </ItemBlock>
    );
}


export default Item;