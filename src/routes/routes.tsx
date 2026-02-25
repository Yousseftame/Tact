import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "../Layouts/MasterLayout/MasterLayout";
import NotFound from "../components/NotFound/NotFound";
import Home from "../pages/Home/Home";
import ThreeDProjects from "../pages/ThreeDProjects/ThreeDProjects";
import OnGroundProjects from "../pages/OnGroundProjects/OnGroundProjects";
import Transportation from "../pages/Transportation/Transportation";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    errorElement: <NotFound />,
    children: [
        { index: true, element: <Home /> },
      {path:"home", element: <Home/>  },
      { path: "ThreeDprojects", element: <ThreeDProjects /> },
      { path: "OnGroundProejcts", element: <OnGroundProjects /> },
      { path: "Transportation", element: <Transportation /> },
    ],
  },
]);
