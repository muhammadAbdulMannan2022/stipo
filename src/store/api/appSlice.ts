// src/services/appApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// for individual applicants
type IndividualForm = {
    role: string;
    name: string;
    email: string;
    gender: string;
    age: number;
    study_level: string;
    elite_athlete: string;
    municipality: string;
    sport: string;
    sport_name: string;
    education_level_option: string;
    education_level_other: string;
    purpose_of_funding: string;
};

// for organizations
type OrganizationForm = {
    role: string;
    name: string;
    email: string;
    organizationName: string;
};

// union type
export type SubmitForm = IndividualForm | OrganizationForm;


export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://personally-liberal-scorpion.ngrok-free.app",
        prepareHeaders: (headers, { endpoint }) => {
            const getEndpoints = ["getReview", "getFAQ"]
            if (getEndpoints.includes(endpoint)) {

                headers.set("ngrok-skip-browser-warning", "true")
            }
            return headers
        }

    }),
    endpoints: (builder) => ({
        submitNewForm: builder.mutation<any, SubmitForm>({
            query: (data) => ({
                url: "/app/apply/",
                method: "POST",
                body: data,
            }),
        }),

        veryfyOtp: builder.mutation<any, { otp: string, email: string }>({
            query: (data) => ({
                method: "POST",
                url: "/app/verify_otp/",
                body: data
            })
        }),
        createPayment: builder.mutation<any, { email: string, success_url: string, cancel_url: string }>({
            query: (data) => ({
                method: "POST",
                url: `/app/${data.email}/pay/`,
                body: { success_url: data.success_url, cancel_url: data.cancel_url }
            })
        }),
        generateData: builder.mutation<any, { application_token: string }>({
            query: data => ({
                method: "POST",
                url: "/app/generate_data/",
                body: data
            })
        }),
        goWithEmail: builder.mutation<any, { email: string }>({
            query: email => ({
                method: "POST",
                url: `/app/${email.email}/send_code/`
            })
        }),
        getReview: builder.query({
            query: () => "/app/review/"
        }),
        postReview: builder.mutation<any, { email: string, description: string, stars: number }>({
            query: (data) => ({
                method: "POST",
                url: "/app/review/",
                body: data
            })
        }),
        getFAQ: builder.query({
            query: () => `/app/faqs`
        })
    }),
});

// Hooks auto-generated ✅
export const { useSubmitNewFormMutation, useVeryfyOtpMutation, useCreatePaymentMutation, useGenerateDataMutation, useGoWithEmailMutation, useGetReviewQuery, usePostReviewMutation, useGetFAQQuery } = appApi;