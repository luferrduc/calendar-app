import { BrowserRouter } from "react-router"
import { AppRouter } from "./router"
import { Toaster } from "sonner"
import { Provider } from "react-redux"
import { store } from "./store"

export const App = () => {
  
  return (
    <BrowserRouter>  
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  )
}