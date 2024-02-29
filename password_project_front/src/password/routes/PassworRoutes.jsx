import { Navigate, Route, Routes } from "react-router"
import { PasswordPage } from "../pages/PasswordPage"


export const PassworRoutes = () => {
  return (
    <Routes>
        <Route path='my-passwords' element={<PasswordPage/>}/> 
        <Route path='/*' element={<Navigate to='my-passwords'/>}/>
    </Routes>
  )
}
