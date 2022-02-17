import React from 'react';
import styled from 'styled-components';
import { GoNote} from "react-icons/go";
import { IoPersonCircleSharp } from "react-icons/io5";
import * as postAPI from '../lib/api/post';

const PostBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e9ecef;
`;

const Title = styled.div`
    flex: 1;
    font-size: 12px;
    cursor: pointer;
    margin-left: 3px;
`;
const Writer = styled.div`
    font-size: 11px;
`;

export default function Post({ pID, title, context, writer, comments, createdAt, pVisible, postToggle, setCurrentPost}) {
    const onTitle = async () => {
        //e.preventDefault();
        postToggle(!pVisible);
        const data = await postAPI.loadPostAPI({pID}); 
        setCurrentPost(data.data.pID, data.data.title, data.data.context, data.data.writer, data.data.comments, createdAt);
    };
    return (
        <PostBlock>
            <GoNote/> 
            <Title onClick = {onTitle}>{title}</Title>
            
            <Writer>{writer}</Writer>
            <IoPersonCircleSharp/>
            
        </PostBlock>
    );
}