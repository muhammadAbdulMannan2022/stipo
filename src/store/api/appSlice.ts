// src/services/appApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://personally-liberal-scorpion.ngrok-free.app/",
    }),
    endpoints: (builder) => ({
        submitNewForm: builder.mutation<any, { role: string, name: string, email: string, gender: string, age: string | number, study_level: string, elite_athlete: string, municipality: string }>({
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
        })
    }),
});

// Hooks auto-generated ✅
export const { useSubmitNewFormMutation, useVeryfyOtpMutation, useCreatePaymentMutation, useGenerateDataMutation } = appApi;