import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/v1/:path*", // What your frontend calls
  //       destination:
  //         "https://nearby-stevana-yosephshemelesbirru-43fccccb.koyeb.app/api/v1/:path*", // Correct backend endpoint
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/v1/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
