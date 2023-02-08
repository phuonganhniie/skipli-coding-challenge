import Form from './components/Form/Form';
import Search from './components/Search/Search';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Form/>,
    },
    {
      path: "/search",
      element:<Search/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
};

export default App;

