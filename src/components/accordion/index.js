/* eslint-disable no-shadow */
import React, { createContext, useContext, useState } from 'react';
import { Body, Container, Frame, Header, Inner, Item, Title } from './styles/accrodion';

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
    return (
        <Container {...restProps}>
            <Inner>{children}</Inner>
        </Container>
    );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
    const [toggleShow, setToggleShow] = useState(false);
    return (
        <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
            <Item {...restProps}>{children}</Item>
        </ToggleContext.Provider>
    );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
    const { toggleShow, setToggleShow } = useContext(ToggleContext);
    return (
        <Header onClick={() => setToggleShow((toggleShow) => !toggleShow)} {...restProps}>
            {children}
            {toggleShow ? (
                <img src="/images/icons/close-slim.png" alt="Close" />
            ) : (
                <img src="/images/icons/add.png" alt="Open" />
            )}
        </Header>
    );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
    const { toggleShow } = useContext(ToggleContext);

    return toggleShow ? <Body {...restProps}>{children}</Body> : null;
};
