import React, {useState } from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import { VscSquirrel } from "react-icons/vsc";
import Spinner from 'react-bootstrap/Spinner';

const ChatListBlock = styled.div`
  flex: 1;
  padding: 2%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const EmptyBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyMessage = styled.div`
  font-size: 0.9rem;
`;

const EmptyIcon = styled.div`
  font-size: 1.7rem;
`;

/*const ItemListForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stetch;
`;*/

const ChatListForm = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

function ChatList({username, loading, chatList, chatToggle, messageToggle, mVisible, crVisible, setCurrentChat}) {
  if(loading === true && mVisible === false) {
    return (
      <EmptyBlock>
           <Spinner
             as="span"
             animation="border"
             size="lg"
             role="status"
             aria-hidden="true"
             variant="secondary"
           />
      </EmptyBlock>
    )
  }
  else if(chatList.length === 0) {
    return(
      <EmptyBlock>
        <EmptyIcon><VscSquirrel /></EmptyIcon>
        <EmptyMessage>대화중인 사람이 없어요.</EmptyMessage>
      </EmptyBlock>
    );
  }
  else {
    return (
      <ChatListBlock>
            <ChatListForm>
            {chatList.map((chat, index) => (
                <Chat username = {username} imgname = {chat.imgname} key = {index} chatToggle = {chatToggle} crVisible = {crVisible} cID = {chat.cID} iID = {chat.iID} title = {chat.title} seller = {chat.seller} buyer = {chat.buyer} sellerNick = {chat.sellerNick} buyerNick = {chat.buyerNick} price = {chat.price} messages = {chat.messages} messageToggle = {messageToggle} mVisible = {mVisible} setCurrentChat = {setCurrentChat}/>
            ))}
          </ChatListForm>
      </ChatListBlock>
    );
  }
}

export default ChatList;