import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/landing/Home";
import PrivacyPolicyPage from "../pages/Policy/PrivacyPolicyPage";
import ContactUsPage from "../pages/contactUs/ContactUs";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/privacy",
                element: <PrivacyPolicyPage />
            },
            {
                path: "/contact",
                element: <ContactUsPage />
            }
        ]
    }
])
export default router