import React, { Component } from 'react';
import Template from '../components/Template';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import HomeUIContainer from '../containers/HomeUIContainer';
import AddClothesContainer from '../containers/AddClothesContainer';
import WritePostContainer from '../containers/WritePostContainer';
import ClothesContainer from '../containers/ClothesContainer';
import PostDetailsContainer from '../containers/PostDetailsContainer';
import InitialSettingContainer from '../containers/InitialSettingContainer';
import MessageContainer from '../containers/MessageContainer';
import AlarmBoxContainer from '../containers/AlarmBoxContainer';

function Home() {
    return (
        <Template>
            <LoginContainer />
            <RegisterContainer />
            <HomeUIContainer />
            <AddClothesContainer />
            <WritePostContainer />
            <ClothesContainer />
            <PostDetailsContainer />
            <InitialSettingContainer />
            <MessageContainer />
            <AlarmBoxContainer />
        </Template>
    );
  }
  
  export default Home;