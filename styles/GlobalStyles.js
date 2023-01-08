import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
        background-color:#2A2D34;
        color:white;
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    * {
        box-sizing: border-box;
    }
    :root{
        --black:#2A2D34;
        --yellow:#FFA436;
        --blue:#5FB3B7;
    }
`;

export default GlobalStyles;
