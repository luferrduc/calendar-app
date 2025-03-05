import { LoginPage } from "@/auth/pages/LoginPage"
import { CalendarPage } from "@/calendar/pages/CalendarPage"
import { Navigate, Route, Routes } from "react-router"

// TODO: crear rutas publicas y privadas

type AuthStatus = 'authenticated' | 'not-authenticated';

export const AppRouter = () => {
  const authStatus: AuthStatus  = 'authenticated'
  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
        ? <Route path="/auth/*" element={<LoginPage />}/>
        : <Route path="/*" element={<CalendarPage />}/>
      }
      
        <Route path="/*" element={<Navigate to="/auth/login"/>}/>
    </Routes>
  )
}