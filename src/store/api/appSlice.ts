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
  language: string;
  include_municipality_filter: boolean;
};

// for organizations
type OrganizationForm = {
  role: string;
  name: string;
  email: string;
  organizationName: string;
  language: string;
  organizationId: string;
  include_municipality_filter: boolean;
};

// union type
export type SubmitForm = IndividualForm | OrganizationForm;

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.stipendieportalen.se",
    // baseUrl: "https://abd8-103-159-73-203.ngrok-free.app",
    prepareHeaders: (headers: any, { endpoint }: any) => {
      const getEndpoints = ["getReview", "getFAQ"];
      if (getEndpoints.includes(endpoint)) {
        headers.set("ngrok-skip-browser-warning", "true");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitNewForm: builder.mutation<any, SubmitForm>({
      query: (data) => ({
        url: "/app/apply/",
        method: "POST",
        body: data,
      }),
    }),

    veryfyOtp: builder.mutation<any, { otp: string; email: string }>({
      query: (data) => ({
        method: "POST",
        url: "/app/verify_otp/",
        body: data,
      }),
    }),
    createPayment: builder.mutation<
      any,
      {
        email: string;
        success_url: string;
        cancel_url: string;
        pay_type: string;
        coupon: string | undefined;
      }
    >({
      query: (data) => ({
        method: "POST",
        url: `/app/${data.email}/${data.pay_type}/pay/`,
        body: {
          success_url: data.success_url,
          cancel_url: data.cancel_url,
          coupon_code: data.coupon,
        },
      }),
    }),
    generateData: builder.mutation<any, { application_token: string }>({
      query: (data) => ({
        method: "POST",
        url: "/app/generate_data/",
        body: data,
      }),
    }),
    chackAndGet: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/app/get_generated_result/",
        body: data,
      }),
    }),
    goWithEmail: builder.mutation<any, { email: string; language: string }>({
      query: (data) => ({
        method: "POST",
        url: `/app/${data.email}/send_code/`,
        body: { language: data.language },
      }),
    }),
    getReview: builder.query({
      query: () => "/app/review/",
    }),
    postReview: builder.mutation<
      any,
      { email: string; description: string; stars: number }
    >({
      query: (data) => ({
        method: "POST",
        url: "/app/review/",
        body: data,
      }),
    }),
    getFAQ: builder.query({
      query: () => `/app/faqs`,
    }),
    submitContactForm: builder.mutation<
      any,
      {
        name: string;
        email: string;
        message_body: string;
        token?: string | null;
      }
    >({
      query: (data) => ({
        method: "POST",
        url: "/app/contact/",
        body: data,
      }),
    }),
    verifyCaptcha: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/app/api/verify-captcha/",
        body: data,
      }),
    }),
  }),
});

// Hooks auto-generated ✅
export const {
  useSubmitNewFormMutation,
  useVeryfyOtpMutation,
  useCreatePaymentMutation,
  useGenerateDataMutation,
  useGoWithEmailMutation,
  useGetReviewQuery,
  usePostReviewMutation,
  useGetFAQQuery,
  useChackAndGetMutation,
  useSubmitContactFormMutation,
  useVerifyCaptchaMutation,
} = appApi;
