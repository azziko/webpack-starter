import "./styles/main.scss"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"

window.React = React

const root = ReactDOM.createRoot(
    document.getElementById('root')
)

root.render(<App />)