/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    },
    auth: {
        enableMultiFactorAuth: true,
    },
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
};
import {
    createVanillaExtractPlugin
} from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
