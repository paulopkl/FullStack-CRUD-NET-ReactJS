import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { HomePage } from "@/pages/Home";
import { CreateDriverPage } from "@/pages/CreateDriver";
import { UpdateDriverPage } from "@/pages/UpdateDriver";
import { ViewDriverPage } from "./pages/ViewDriver";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "create-driver",
        element: <CreateDriverPage />,
    },
    {
        path: "view-driver/:driverId",
        element: <ViewDriverPage />,
    },
    {
        path: "update-driver/:driverId",
        element: <UpdateDriverPage />,
    },
]);

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
