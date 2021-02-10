import React, { useState,useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap/"
import styled from "@emotion/styled"

const MainNav = styled(Navbar)({
    marginBottom: "40px",
    boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)'
})


const NavBar = styled(Nav)({
    marginLeft: "90%",  
})

export default function AdminNavbar(props) {

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

   return (
    <MainNav bg="white" expand="lg">
        <Navbar.Collapse>
            <NavBar>
                <Nav.Link onClick={()=> {
                    setIslog(false)
                    window.location.replace("/")
                }}>Logout</Nav.Link>
            </NavBar>
        </Navbar.Collapse>
    </MainNav>
   )
}