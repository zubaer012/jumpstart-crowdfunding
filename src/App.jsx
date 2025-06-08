import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./routes/Home";
import About from "./routes/About";
import Discover from "./routes/Discover";
import Manage from "./routes/Manage";
import ProjectPage from "./routes/ProjectPage";
import MakeProject from "./routes/MakeProject";
import EditProject from "./routes/EditProject";
import FundViewer from "./routes/FundViewer";
import BadRequest from "./components/BadRequest";

function App() {
  const router = createBrowserRouter([
    {
      element: <Menu />,
      children: [
        {
          index: true,
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/discover",
          element: <Discover />,
        },
        {
          path: "discover/:pid/:user_id/:project_life",
          element: <ProjectPage />,
        },
        {
          path: "/manage/edit/:pid",
          element: <EditProject />,
        },
        {
          path: "/manage",
          element: <Manage />,
        },
        {
          path: "/manage/funds/:pid/:projectTitle",
          element: <FundViewer />,
        },
        {
          path: "/start-project",
          element: <MakeProject />,
        },
        {
          path: "*",
          element: <BadRequest />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
