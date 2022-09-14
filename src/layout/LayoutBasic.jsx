import React from "react";
import {  Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Header from "../components/Header/Header";




const LayoutBasic = () => {
  return (
    <>
    
    <Header/>

     <Container className="layout-basic">

     <Outlet/>

     </Container>


    </>
   
  )
}

export default LayoutBasic

