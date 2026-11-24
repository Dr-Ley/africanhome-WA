import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enllttuprsrsivbnvmuo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/safaris/5-day-kenya-wildlife-safari", destination: "/safaris/5-day-lake-nakuru-naivasha-maasai-mara", permanent: true },
      { source: "/safaris/7-day-kenya-safari", destination: "/safaris", permanent: true },
      { source: "/safaris/8-day-kenya-tanzania-safari", destination: "/safaris/6-day-ngorongoro-serengeti-maasai-mara", permanent: true },
      { source: "/safaris/10-day-kenya-tanzania-safari", destination: "/safaris", permanent: true },
      { source: "/safaris/kenya-safari-diani-beach", destination: "/safaris/8-day-nakuru-mara-diani-beach-safari", permanent: true },
      { source: "/safaris/kenya-fly-in-safari", destination: "/fly-in-safaris", permanent: true },
      { source: "/safaris/kenya-photography-safari", destination: "/photography-safaris", permanent: true },
    ];
  },
};

export default nextConfig;
