import React from 'react';
import styled, { keyframes } from 'styled-components';
import Head from './Head';
import ItemList from './ItemList';
import ChatList from './ChatList';
import Forum from './Forum';

/*const slideLeft = keyframes`
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0px);
  }
  animation-duration: 0.50s;
    animation-timing-function: ease-out;
    animation-name: ${slideLeft};
    animation-fill-mode: forwards;
`;*/

const HomeBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 16px;
`;

export default function HomeUI({ username, height, weight, logged, aVisible, wVisible, crVisible, addClothesToggle, writePostToggle, itemList, postList, chatList, clothesToggle, forumToggle, postToggle, chatToggle, messageToggle, mVisible, cVisible, fVisible, pVisible, success, loading, error, loadingStateChange, setCurrentItem, setCurrentPost, setPostList, setItemList, setCurrentChat, setChatList, alVisible, alarmToggle, setAlarmText}) {
    if(logged === true && fVisible === false && crVisible === false) {
      return (
          <HomeBlock>
              <Head username = {username} crVisible = {crVisible} chatToggle = {chatToggle} setChatList = {setChatList} setCurrentChat = {setCurrentChat} aVisible = {aVisible} wVisible = {wVisible} fVisible = {fVisible} forumToggle = {forumToggle} addClothesToggle = {addClothesToggle} writePostToggle = {writePostToggle} setPostList = {setPostList} setItemList = {setItemList} loadingStateChange = {loadingStateChange}/>
              <ItemList username = {username} height = {height} weight = {weight} itemList = {itemList} clothesToggle = {clothesToggle} aVisible = {aVisible} cVisible = {cVisible} setCurrentItem = {setCurrentItem} setItemList = {setItemList} loading = {loading} loadingStateChange = {loadingStateChange} alarmToggle = {alarmToggle} setAlarmText = {setAlarmText} alVisible = {alVisible} />
          </HomeBlock>
      );
    }
    else if(logged === true && fVisible === true && crVisible === false) {
      return (
          <HomeBlock>
              <Head username = {username} crVisible = {crVisible} chatToggle = {chatToggle} setChatList = {setChatList} setCurrentChat = {setCurrentChat} aVisible = {aVisible} wVisible = {wVisible} fVisible = {fVisible} forumToggle = {forumToggle} addClothesToggle = {addClothesToggle} writePostToggle = {writePostToggle} setPostList = {setPostList} setItemList = {setItemList} loadingStateChange = {loadingStateChange}/>
              <Forum postList = {postList} wVisible = {wVisible} pVisible = {pVisible} postToggle = {postToggle} setCurrentPost = {setCurrentPost} loading = {loading}/>
          </HomeBlock>
      );
    }
    else if(logged === true && fVisible === false && crVisible === true){
      return (
        <HomeBlock>
              <Head username = {username} crVisible = {crVisible} chatToggle = {chatToggle} setChatList = {setChatList} setCurrentChat = {setCurrentChat} aVisible = {aVisible} wVisible = {wVisible} fVisible = {fVisible} forumToggle = {forumToggle} addClothesToggle = {addClothesToggle} writePostToggle = {writePostToggle} setPostList = {setPostList} setItemList = {setItemList} loadingStateChange = {loadingStateChange}/>
              <ChatList username = {username} chatList = {chatList} crVisible = {crVisible} chatToggle = {chatToggle} messageToggle = {messageToggle} mVisible = {mVisible} setCurrentChat = {setCurrentChat} loading = {loading} alVisible = {alVisible} alarmToggle = {alarmToggle} setAlarmText = {setAlarmText}/>
        </HomeBlock>
      )
    }
      return null;
};