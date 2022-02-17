import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as ChatAPI from '../lib/api/chat';
import * as PostAPI from '../lib/api/post';
import * as ItemAPI from '../lib/api/item';
import { BsCardList, BsPencilSquare, BsBag } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const slideLeft = keyframes`
  from {
    transform: translateX(15px);
  }
  to {
    transform: translateX(0px);
  }
`;

const HeadBlock = styled.div`
    position: relative;
    width: 100%;
    height: 56px;
    background: #F6F6F6;
    display: flex;
    flex-direction: row;
    padding: 5%;
    border-radius: 16px 16px 0px 0px;
    
    .titleStyle {
        margin-left: 76px;
        font-size: 16px;
        color: #343a40;
    }
`;

const TitleBlock = styled.div`
    position: relative;
    font-family: "HY그래픽";
    font-size: 1.5rem;
`;

const MenuBlock = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideLeft};
    animation-fill-mode: forwards;
`;

const MenuButtonBlock = styled.div`
    position: relative;
    margin-left: 2.5%;
    cursor: pointer;
    font-size: 1.4rem;
    opacity: 80%;
    &:hover {
        opacity: 100%;
    }
    
`;

export default function Head({ username, crVisible, aVisible, fVisible, wVisible, loadingStateChange, chatToggle, forumToggle, addClothesToggle, writePostToggle, setPostList, setChatList, setItemList}) {
    const onAddClothes = () => {
        //e.preventDefault();
        if(fVisible === false)
            addClothesToggle(!aVisible);
        else if(fVisible === true)
            writePostToggle(!wVisible);
    };
    const onForum = async () => {
        //e.preventDefault();
        loadingStateChange(true, false, null);
        try {
            const data = await PostAPI.loadPostsAPI();
            forumToggle(!fVisible);

            setPostList(data.data.postList);
            loadingStateChange(false, true, null);
        }
        catch (e) {
            loadingStateChange(false, false, e);
            console.log(e);
        }
    };
    const onChat = async () => {
        loadingStateChange(true, false, null);
        if(crVisible) {
            try {
                const data = await ItemAPI.loadItemsAPI();
                chatToggle(!crVisible);
                console.log(data.data);
                setItemList(data.data.itemList);
                loadingStateChange(false, true, null);
            }
            catch (e) {
                console.log(e);
                loadingStateChange(false, false, e);
            }
        }
        else {
            try {
                const data = await ChatAPI.loadChatsAPI({username});
                chatToggle(!crVisible);
                console.log(data.data);
                setChatList(data.data.chatList);
                loadingStateChange(false, true, null);
            }
            catch (e) {
                console.log(e);
                loadingStateChange(false, false, e);
            }
        }
    }
    if(fVisible === false && crVisible === false) {
        return (
            <HeadBlock>
                <TitleBlock><b>마켓</b></TitleBlock>
                <MenuBlock>
                    <MenuButtonBlock>
                        <FaRegComments onClick = {onChat}/>
                    </MenuButtonBlock>
                    <MenuButtonBlock>
                        <BsCardList onClick = {onForum}/>
                    </MenuButtonBlock>
                    <MenuButtonBlock>
                        <BsPencilSquare onClick = {onAddClothes}/>
                    </MenuButtonBlock>
                </MenuBlock>
            </HeadBlock>
        );
    }
    else if(fVisible === true && crVisible === false) {
        return (
            <HeadBlock>
                <TitleBlock><b>포럼</b></TitleBlock>
                <MenuBlock>
                    <MenuButtonBlock>
                        <BsBag onClick = {onForum}/>
                    </MenuButtonBlock>
                    <MenuButtonBlock>
                        <BsPencilSquare onClick = {onAddClothes}/>
                    </MenuButtonBlock>
                </MenuBlock>
            </HeadBlock>
        );
    }
    else if(fVisible === false && crVisible === true) {
        return (
            <HeadBlock>
                <TitleBlock><b>채팅</b></TitleBlock>
                <MenuBlock>
                    <MenuButtonBlock>
                        <ImExit onClick = {onChat}/>
                    </MenuButtonBlock>
                </MenuBlock>
            </HeadBlock>
        );
    }
};