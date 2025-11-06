import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import BlogPostPage from "./pages/BlogPost";
import { HelmetProvider } from "react-helmet-async";

function Layout() {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:slug", element: <BlogPostPage /> },
    ],
  },
]);

export default function App() {
  return <HelmetProvider><RouterProvider router={router} /></HelmetProvider>;
}
