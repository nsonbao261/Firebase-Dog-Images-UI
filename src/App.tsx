import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Login, Signup } from "./pages"
import { ProtectedRoute } from "./routes"
import { BreedProvider } from "./contexts/BreedContext"
import { ToastContainer } from "react-toastify"


const App = () => {
    return (
        <BreedProvider>
            <ToastContainer
                position="top-right"
                closeOnClick={true}
                autoClose={500} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </BreedProvider>
    )
}

export default App
