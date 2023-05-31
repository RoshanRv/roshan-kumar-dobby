import { useState } from "react"
import Upload from "./components/Upload"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom"
import Header from "./components/Header"
import Home from "./screens/Home"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"

function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
