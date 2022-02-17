import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { RiCloseCircleFill } from "react-icons/ri";
import * as postAPI from '../lib/api/post';
import Button from 'react-bootstrap/Button';
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

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

const PostDetailsBlock = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    border-radius: 16px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
`;


const TitleBlock = styled.div`
  position: relative;
  width: 100%;
  padding: 12px 6px 0px 6px;
  outline: none;
  font-size: 16px;
`;

const WriterBlock = styled.div`
  position: relative;
  width: 100%;
  padding: 3px;
  border-bottom: 1px solid #e9ecef;
  outline: none;
  font-size: 11px;
`;

const ContextBlock = styled.div`
  position: relative;
  width: 100%;
  padding: 2% 2% 10% 2%;
  border-bottom: 1px solid #e9ecef;
  outline: none;
  font-size: 12px;
`;

const CommentsBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2%;
`;

const Comment = styled.div`
  position: relative;
  width: 100%;
  font-size: 12px;
  border-bottom: 1px solid #e9ecef;
`;

const MenuBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 3px;
  border-bottom: 1px solid #e9ecef;
  outline: none;
  font-size: 10px;
`;

const DeleteBlock = styled.div`
  position: relative;
  cursor: pointer;
  margin-left: 3%;
`;

const EditBlock = styled.div`
  position: relative;
  cursor: pointer;
  margin-left: 3%;
`;

const ThumbsBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const ThumbsButtonBlock = styled.div`
  position: relative;
  margin-right: 5%;
  cursor: pointer;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #dee2e6;
  border-radius: 0px 0px 10px 10px;
  margin-top: -1px;
  font-size: 1.0rem;
`;

const InputBox = styled.div`
  position: relative;  
  width: 95%;
  height: 10%;
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  position: relative;
  height: 55%;
  display: flex;
  flex-direction: row;
`;

const CloseButtonBox = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
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

export default function PostDetails({loggedInfo, alVisible, pVisible, postToggle, currentPost, setCurrentPost, setPostList, alarmToggle, setAlarmText}) {
  const [text, setText] = useState("");
  const onClose = async () => {
    const data = await postAPI.loadPostsAPI();
    setPostList(data.data.postList);
    setText("");
    postToggle(!pVisible);
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onComment = async (e) => {
    e.preventDefault();
    try {
      await postAPI.newCommentAPI({pID: currentPost.pID, writer: loggedInfo.nickname, text: text});
      setText("");
      setAlarmText("댓글이 작성되었습니다 !");
      alarmToggle(!alVisible);
    }
    catch (e) {
      setAlarmText("오류가 발생했습니다 ! 에러명: " + e);
      alarmToggle(!alVisible);
    }
    const data = await postAPI.loadPostAPI({pID: currentPost.pID}); 
    setCurrentPost(data.data.pID, data.data.title, data.data.context, data.data.writer, data.data.comments, data.data.createdAt);
  }
  const onDelete = async () => {
    if(currentPost.writer === loggedInfo.nickname) {
      try {
        await postAPI.delPostAPI({pID: currentPost.pID});
        setCurrentPost(0, "", "", "", [], "");
        const data = await postAPI.loadPostsAPI();
        setPostList(data.data.postList);
        postToggle(!pVisible);
        setAlarmText("게시글이 삭제되었습니다 !");
        alarmToggle(!alVisible);
      }
      catch(e) {
        setAlarmText("오류가 발생했습니다 ! 에러명: " + e);
        alarmToggle(!alVisible);
      }
    }
    else {
      setAlarmText("자신이 작성한 글만 삭제할 수 있어요 !");
      alarmToggle(!alVisible);
    }
  }
  if(pVisible === true)   {
      return (
            <DarkBackground>
                <PostDetailsBlock>
                    <TitleBlock>{currentPost.title}</TitleBlock>
                    <WriterBlock>
                      Writed by {currentPost.writer} at {currentPost.createdAt}
                    </WriterBlock>
                    <ContextBlock>{currentPost.context}</ContextBlock>
                    <ThumbsBlock>
                      <ThumbsButtonBlock><FiThumbsUp/></ThumbsButtonBlock>
                      <ThumbsButtonBlock><FiThumbsDown/></ThumbsButtonBlock>
                    </ThumbsBlock>
                    <MenuBlock>
                      
                      <DeleteBlock onClick = {onDelete}>삭제</DeleteBlock>
                    </MenuBlock>
                    <CommentsBlock>
                        {currentPost.comments.map((cmt, index) => (
                            <Comment key = {index}>
                              {cmt.writer}: {cmt.text}
                            </Comment>
                        ))}
                    </CommentsBlock>
                    <InputBox>
                      <form>
                      <Input type = "text" placeholder="내용" value = {text} onChange={onChange} />
                      <ButtonBox>
                        <CloseButtonBox></CloseButtonBox>
                        <Button class="btn btn-info btn-sm btn-block" variant="secondary" size = "sm" type = "submit" onClick = {onComment}>쓰기</Button>
                      </ButtonBox>
                      </form>
                    </InputBox> 
                </PostDetailsBlock>
                <CloseButton><RiCloseCircleFill onClick = {onClose}/></CloseButton>
            </DarkBackground>
      );
  }
  else
      return null;
}