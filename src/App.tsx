import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Auth from "./pages/Auth";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import EditSnippet from "./pages/EditSnippet";
import ViewSnippet from "./pages/ViewSnippet";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-snippets",
        element: <Dashboard />,
      },
      {
        path: "public",
        element: <Dashboard />,
      },
      {
        path: "favorites",
        element: <Dashboard />,
      },
      {
        path: "new",
        element: <EditSnippet />,
      },
      {
        path: "edit/:id",
        element: <EditSnippet />,
      },
      {
        path: "snippet/:id",
        element: <ViewSnippet />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
