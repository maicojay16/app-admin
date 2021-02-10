import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Form, Button, Container, Row, Col  } from "react-bootstrap/"
import axios from "axios"

require('dotenv').config({
  allowEmptyValues: true,
  path: '.'
})

const Content = styled.div({
  height: "100vh",
  minHeight: "100vh",
  backgroundColor: "#f1f1f1",
  display: "flex",
  alignItems: "center",
})

const LoginContainer = styled.div({
  boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)',
  backgroundColor: "#fff",
  width: "30%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "400px",
  margin: "0 auto",
  borderRadius: "20px"
})

const LoginButton = styled.button({
  width: "90%",
  margin: "10px auto 30px auto",
})

const Title = styled.h1({
  textAlign: "center",
  fontWeight: "600",
  letterSpacing: "1px",
  margin: "20px auto"
})

export default function Login(props) {

    // functions
    const [loginData, setLoginData] = useState({
      username:"",
      password:"", 
    })

    const [islog, setIslog] = useState(false);

    useEffect(()=> {
        const data = localStorage.getItem('islogin')
        if(data){
          setIslog(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
      localStorage.setItem('islogin', JSON.stringify(islog))
    })

    function handleLogin(){

      let baseUrl = process.env.REACT_APP_API_URL+"/login"
     
      const datapost = {
        username : loginData.username,
        password : loginData.password,
      }

      axios.post(baseUrl,datapost)
      .then(res=>{
          if (res.data.success===true) {
              // location.href = "/impact"
              setIslog(true)
              props.history.push("/clients")
          }
          else {
            alert(res.data.message)
            location.href = "/"
          }
      }).catch(error=>{
          alert("Error 34 "+error)
      })

    }

    return (
        <Content>
          <LoginContainer>
            <Container>
              <Form>
                <Col xs={12}>
                <Title>AppAdmin</Title>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" defaultValue={loginData.username}
                    onChange={
                      e => setLoginData({ ...loginData, username: e.target.value })
                    } required/>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" defaultValue={loginData.password}
                      onChange={
                        e => setLoginData({ ...loginData, password: e.target.value })
                      } required/>
                  </Form.Group>
                </Col>
                <Row>
                    <LoginButton value="Save" type="button" className="btn btn-outline-primary btn-md" 
                    onClick={ () => {
                      handleLogin()
                    }}>
                    Login</LoginButton>
                   
                </Row>
              </Form>
            </Container>
          </LoginContainer>
        </Content>
    );
}