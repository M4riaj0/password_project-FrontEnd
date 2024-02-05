import { Route, Routes } from "react-router"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { PassworRoutes } from "../password/routes/PassworRoutes"

export const AppRouter = () => {
    return(
        <Routes>
            {/* login y registro*/}
            <Route path="/auth/*" element={<AuthRoutes/>} />

            {/* Password App */}
            <Route path="/*" element={<PassworRoutes/>} />
        </Routes>
    )
}
