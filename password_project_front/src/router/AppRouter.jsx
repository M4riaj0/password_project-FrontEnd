import { Navigate, Route, Routes } from "react-router"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { PassworRoutes } from "../password/routes/PassworRoutes"
import { useSelector } from "react-redux";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
    const  status  = useCheckAuth();

    return(


        <Routes>
            
            {
                (status === 'authenticated') 
                ? <Route path="/*" element={<PassworRoutes/>}/> 
                : <Route path="/auth/*" element={<AuthRoutes/>}/> /*login y registro */

            }

            <Route path="/*" element={<Navigate to='/auth/login'/>}/>
        </Routes>

        
    )
}
