import { createBrowserRouter , RouterProvider, useNavigate} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/Tranfermoney";
import { Homepage } from "./pages/Homepage";


function App() {
  const router = createBrowserRouter([
      {
          path: '/',
          element: <Homepage/>
      },
      {
          path: '/signup',
          element: <Signup />,
          errorElement: <div> not found</div>
      },
      {
          path: '/signin',
          element: <Signin />
      },
      {
          path: "/dashboard",
          element: <Dashboard />
      },
      {
          path: "/send",
          element: <SendMoney />
      }
  ]);

  return (
      <>
          <RouterProvider router={router}></RouterProvider>
      </>
  );
}

export default App;