import React from 'react';
import styled from 'styled-components';

const TemplateBlock = styled.div`
    position: relative;
    width: 342px;
    height: 624px;

    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 32px auto 32px auto;
  
`;

export default function Template( {children, ...rest} ) {
    return (
        <TemplateBlock>{children}</TemplateBlock>
    );
};