import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from 'emotion-theming'
import Screen from "@screen"
import theme from "@theme"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <ThemeProvider theme={theme}>
        <Screen />
    </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById("root"));