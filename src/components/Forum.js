import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { VscSquirrel } from "react-icons/vsc";
import Spinner from 'react-bootstrap/Spinner';

const ForumBlock = styled.div`
    flex: 1;
    padding: 10px 16px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

const TitleBlock = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    font-size: 0.7rem;
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

export default function Forum({loading, postList, pVisible, wVisible, postToggle, setCurrentPost}) {
    console.log(postList);
    if(loading === true && pVisible === false && wVisible === false) {
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
    else if(postList.length === 0) {
        return(
            <EmptyBlock>
                <EmptyIcon><VscSquirrel /></EmptyIcon>
                <EmptyMessage>게시판이 텅 비어있어요.</EmptyMessage>
            </EmptyBlock>
        );
    }
    else {
        return (
            <ForumBlock>
                <TitleBlock>
                </TitleBlock>
                {postList.map((post, index) => (
                <Post pID = {post.pID} title = {post.title} context = {post.context} writer = {post.writer} comments = {post.comments} pVisible = {pVisible} postToggle = {postToggle} setCurrentPost = {setCurrentPost} key = {index}/>
            ))}
            </ForumBlock>
        );
    }
};