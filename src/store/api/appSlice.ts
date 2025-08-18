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
        veryfyOtp: builder.mutation<any, { otp: Number }>({
            query: (otp) => ({
                method: "POST",
                url: "/app/verify_otp/",
                body: otp
            })
        }),
        createPayment: builder.mutation<any, { email: string }>({
            query: (email) => ({
                method: "POST",
                url: `/app/${email.email}/pay/`
            })
        })
    }),
});

// Hooks auto-generated ✅
export const { useSubmitNewFormMutation, useVeryfyOtpMutation, useCreatePaymentMutation } = appApi;