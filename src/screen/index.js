import React from "react";
import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes } from "../config/ProtectedRoutes"
import { Wrapper, Main } from "@atom"
import { AdminNavbar, Drawer } from "@molecule"
import ImpactNew from "@screen/NewImpact"
import Clients from "@screen/Clients"
import Login from "@screen/Login"

export default function Screen() {

  return (
    <Router>
        <Wrapper>
            <Main>
                <Switch>
                  <ProtectedRoutes exact path={"/clients"} component={Clients} />
                  <ProtectedRoutes exact path={"/new"} component={ImpactNew} />
                  <Redirect to={"/"} />
                </Switch>
            </Main>
            <Route exact path={"/"} component={Login}/>
        </Wrapper>
    </Router>
  );
}
