import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚨 1. 정적 HTML 파일을 생성하도록 export 모드를 설정
  output: 'export', 
  
  // 2. 정적 호스팅 환경에서 경로 일치를 위해 권장
  trailingSlash: true, 
  
  // 3. GitHub Pages는 root 경로(yerihyo.github.io/)에서 호스팅되므로 basePath는 비워둡니다.
  //    (만약 yerihyo.github.io/blog/ 와 같이 서브 경로에 배포할 경우 basePath를 설정합니다.)
  basePath: '',
};

export default nextConfig;
