import { BrowserRouter } from "react-router"
import { AppRouter } from "./router"
import { Toaster } from "sonner"

export const App = () => {
  
  return (
    <BrowserRouter>  
      <AppRouter />
      <Toaster 
        richColors 
        
        // toastOptions={{
        //   classNames: {
        //     toast: "position-relative", 
        //     closeButton: "position-absolute top-0 end-0 translate-middle-y me-3"
        //   }
        // }}
        
      />
    </BrowserRouter>
  )
}