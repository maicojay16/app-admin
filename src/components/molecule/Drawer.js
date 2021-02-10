import React from "react";
import styled from "@emotion/styled";
import { BackgroundImg } from "@assets/img/"
import { Link } from "react-router-dom";

const DrawerContainer = styled.div(({ theme }) => ({
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: "260px",
    display: "block",
    zIndex: 1,
    fontWeight: 200,
    backgroundSize: "cover",
    backgroundPosition: "50%",
    boxShadow: theme.shadows.default,
    color: theme.colors.default,
    '&::before': {
        content: `''`,
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: "#303c54",
        opacity: .7,
    }
}))

const DrawerBackground = styled.div({
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%",
    display: "block",
    top: 0,
    left: 0,
    backgroundSize: "cover",
    backgroundPosition: "50%",
    backgroundImage: `url(${BackgroundImg})`,
    opacity: 0.2
})

const DrawerHeader = styled.div({
    position: "relative",
    zIndex: 4,
    padding: "12px 30px",
    borderBottom: "1px solid hsla(0,0%,100%,.2)",
    textAlign: "center"
})

const Logo = styled.a({
    fontWeight: 400,
    lineHeight: "30px",
    fontSize: "18px",
    webkitFontSmoothing: "antialiased",
    fontFamily: "Roboto,Helvetica Neue,Arial,sans-serif",
    letterSpacing: "2px"
})

const DrawerWrapper = styled.div({
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: 4,
    paddingBottom: "30px"
})

const DrawerUl = styled.ul({
    marginTop: "20px",
    padding: "10px 20px"
})

const DrawerLi = styled.li({
    listStyleType: "none",
    padding: "10px 0"
    
})

const DrawerLink = styled(Link)({
    textTransform: "capitalize",
    color: "#ccc",
    fontWeight: 600,
    fontSize: "12px",
    letterSpacing: "1px",
    display: "block",
    padding: "10px 20px",
    textDecoration: "none !important",
    '&:hover': {
        backgroundColor: "#575757",
        borderRadius: "5px",
        color: "#fff",
    }
})

export default function Drawer() {
    return (
       <DrawerContainer>
           <DrawerBackground/>
           <DrawerHeader>
               <Logo>AppAdmin</Logo>
           </DrawerHeader>
           <DrawerWrapper>
               <DrawerUl>
                   <DrawerLi><DrawerLink to="/impact">Impact</DrawerLink></DrawerLi>
                   <DrawerLi><DrawerLink to="/sponsors">Sponsors</DrawerLink></DrawerLi>
                   <DrawerLi><DrawerLink to="/customlinks">CustomLinks</DrawerLink></DrawerLi>
                   <DrawerLi><DrawerLink to="/caremindrbutton">CAREMINDR Button</DrawerLink></DrawerLi>
               </DrawerUl>
           </DrawerWrapper>
       </DrawerContainer>
    );
}