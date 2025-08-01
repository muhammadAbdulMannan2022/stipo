import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/landing/Home";
import PrivacyPolicyPage from "../pages/Policy/PrivacyPolicyPage";
import ContactUsPage from "../pages/contactUs/ContactUs";
import FlowLayout from "../pages/FlowLayout/FlowLayout";
import EmailInputCard from "../components/steps/step1";
import BasicInformationForm from "../components/steps/step2";
import VerificationCodeInput from "../components/steps/OtpStep";
import Success from "../components/steps/Success";
import AnalysisResultFailureCard from "../components/steps/NotFoundStep";
import PaymentConfirmedCard from "../components/steps/PaymentFinalStep";
import GiveReviewForm from "../components/steps/GiveReview";


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
            },
            {
                path: "/start",
                element: <FlowLayout />,
                children: [
                    {
                        path: "",
                        element: <EmailInputCard />
                    },
                    {
                        path: "2",
                        element: <BasicInformationForm />
                    },
                    {
                        path: "otp",
                        element: <VerificationCodeInput />
                    },
                    {
                        path: "success",
                        element: <Success />
                    },
                    {
                        path: "notfound",
                        element: <AnalysisResultFailureCard />
                    },
                    {
                        path: "paymentSuccess",
                        element: <PaymentConfirmedCard />
                    }, {
                        path: "review",
                        element: <GiveReviewForm />
                    }
                ]
            }
        ]
    }
])
export default router