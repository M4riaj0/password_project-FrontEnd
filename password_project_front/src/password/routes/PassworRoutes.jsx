import { Navigate, Route, Routes } from "react-router"
import { PasswordPage } from "../pages/PasswordPage"


export const PassworRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PasswordPage/>} />
        <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
