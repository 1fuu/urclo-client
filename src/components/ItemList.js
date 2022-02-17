import React, {useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Item from './Item';
import * as ItemAPI from '../lib/api/item';
import Button from 'react-bootstrap/Button';
import { VscSquirrel } from "react-icons/vsc";
import { HiOutlineAdjustments } from "react-icons/hi";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';

const ItemListBlock = styled.div`
  flex: 1;
  padding: 2%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
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

const ItemListForm = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const AdjustBlock = styled.div`
  position: absolute;
  bottom: 1%;
  right: 5%;
  font-size: 2rem;
  cursor: pointer;
  opacity: 80%;
  &:hover {
    opacity: 100%
  }
`;

const AdjustBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  bottom: 0%;
  border-radius: 16px 16px;
  background: rgba(0, 0, 0, 0.2);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const AdjustScreen = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 5%;
  width: 100%;
  height: 17%;
  bottom: 0%;
  left: 0%;
  background: white;
  border-radius: 6px 6px 16px 16px;
  box-shadow: 0 -10px 8px 0 rgba(0, 0, 0, 0.04);
  animation-duration: 0.75s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const FilterButtonBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

function ItemList({username, height, weight, loading, itemList, setItemList, clothesToggle, aVisible, cVisible, alVisible, setAlarmText, alarmToggle, setCurrentItem, loadingStateChange}) {
  const [filterValue, setFilterValue] = useState('1');
  const filters = [
    { name: '전체', value: '1' },
    { name: '상의', value: '2' },
    { name: '하의', value: '3' },
    { name: '체형분석', value: '4' },
    { name: '내가 올린 글', value: '5' }
    
  ];
  
  useEffect( async () => {
      //loadingStateChange(true, false, null);
      try {
            if(filters[filterValue-1].name === '체형분석')  {
              console.log(height);
              console.log(weight);
              const data = await ItemAPI.loadItemsByBMI({height, weight});
              setItemList(data.data.itemList.filter(item => item.sellerID !== username));
            }
            else {
              const data = await ItemAPI.loadItemsAPI();
              if(filters[filterValue-1].name === '전체') setItemList(data.data.itemList)
              else if(filters[filterValue-1].name === '내가 올린 글') setItemList(data.data.itemList.filter( item => item.sellerID === username ));
              else setItemList(data.data.itemList.filter( item => item.type === filters[filterValue-1].name ));
              //loadingStateChange(false, true, null);
            }
          }
      catch (e) {
          console.log(e);
          setAlarmText("에러가 발생했습니다 ! 에러명: " + e);
          alarmToggle(!alVisible);
          //loadingStateChange(false, false, e);
      }
  }, [filterValue]);
  
  const [adjust, adjustToggle] = useState(false);
  const onAdjustButton = () => {
    adjustToggle(!adjust);
  };
  if(loading === true && cVisible === false && aVisible === false) {
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
  else if(itemList.length === 0 && adjust === false) {
    return(
      <EmptyBlock>
        <EmptyIcon><VscSquirrel /></EmptyIcon>
        <EmptyMessage>장터가 텅 비어있어요.</EmptyMessage>
        <AdjustBlock><HiOutlineAdjustments onClick = {onAdjustButton}/></AdjustBlock>
      </EmptyBlock>
    );
  }
  else if(itemList.length === 0 && adjust === true) {
    return(
      <EmptyBlock>
        <EmptyIcon><VscSquirrel /></EmptyIcon>
        <EmptyMessage>장터가 텅 비어있어요.</EmptyMessage>
        <AdjustBackground></AdjustBackground>
          <AdjustScreen>
          <FilterButtonBlock>
            <ButtonGroup>
              {filters.map((filter, index) => (
                (filterValue === filter.value)?<Button key = {index} disabled = {true} size = "sm" variant="secondary">{filter.name}</Button>:<Button value = {filter.value} size = "sm" variant="secondary" onClick = {(e) => {setFilterValue(e.target.value)}}>{filter.name}</Button>
              ))}
            </ButtonGroup>
          </FilterButtonBlock>
          </AdjustScreen>
          <AdjustBlock><HiOutlineAdjustments onClick = {onAdjustButton}/></AdjustBlock>
      </EmptyBlock>
    );
  }
  else if(itemList.length !== 0 && adjust === false){
    return (
      <ItemListBlock>
            <ItemListForm>
            {itemList.map((item, index) => (
                <Item imgname = {item.imgname} key = {index} clothesToggle = {clothesToggle} cVisible = {cVisible} type = {item.type} iID = {item.iID} title = {item.title} details = {item.details} sellerID = {item.sellerID} sellerNick = {item.sellerNick} price = {item.price} location = {item.location} setCurrentItem = {setCurrentItem} alVisible = {alVisible} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle}/>
            ))}
          </ItemListForm>
          
          <AdjustBlock><HiOutlineAdjustments onClick = {onAdjustButton}/></AdjustBlock>
      </ItemListBlock>
    );
  }
  else if(itemList.length !== 0 && adjust === true){
    return (
      <ItemListBlock>
            <ItemListForm>
            {itemList.map((item, index) => (
                <Item imgname = {item.imgname} key = {index} clothesToggle = {clothesToggle} cVisible = {cVisible} type = {item.type} iID = {item.iID} title = {item.title} details = {item.details} sellerID = {item.sellerID} sellerNick = {item.sellerNick} price = {item.price} location = {item.location} setCurrentItem = {setCurrentItem} alVisible = {alVisible} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle}/>
            ))}
          </ItemListForm>
          <AdjustBackground></AdjustBackground>
          <AdjustScreen>
          <FilterButtonBlock>
            <ButtonGroup>
              {filters.map((filter, index) => (
                (filterValue === filter.value)?<Button key = {index} disabled = {true} size = "sm" variant="secondary">{filter.name}</Button>:<Button value = {filter.value} size = "sm" variant="secondary" onClick = {(e) => {setFilterValue(e.target.value)}}>{filter.name}</Button>
              ))}
            </ButtonGroup>
          </FilterButtonBlock>        
          </AdjustScreen>
          <AdjustBlock><HiOutlineAdjustments onClick = {onAdjustButton}/></AdjustBlock>
          
      </ItemListBlock>
    );
  }
}

export default ItemList;