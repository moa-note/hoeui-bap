import type {NextConfig} from 'next';
const basePath=process.env.NEXT_PUBLIC_BASE_PATH??'/hoeui-bap';
process.env.NEXT_PUBLIC_BASE_PATH=basePath;
const config:NextConfig={output:'export',basePath,trailingSlash:true,poweredByHeader:false,images:{unoptimized:true}};
export default config;
