// frontend/app/layout.tsx

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* 1. Body 설정: 전체 화면 높이, 폰트/색상 설정, flex-col로 푸터를 바닥에 붙이기 위한 기본 세팅 */}
      <body className="bg-gray-50 text-gray-800 antialiased min-h-screen flex flex-col">
        
        {/* 2. 상단 네비게이션 바 (Header) */}
        <header className="bg-white shadow-md p-4 sticky top-0 z-10">
          {/* 중앙 정렬 컨테이너 (최대 너비 4xl) */}
          <nav className="max-w-4xl mx-auto flex justify-between items-center">
            {/* 로고 / 사이트 이름 */}
            <h1 className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 transition duration-150">
              <a href="/">yerihyo's Project</a>
            </h1>
            
            {/* 메뉴 링크 */}
            <div className="space-x-4 text-lg">
              <a href="/" className="hover:text-indigo-700 transition duration-150">홈</a>
              <a href="/given" className="hover:text-indigo-700 transition duration-150">아카이브</a>
              {/* 여기에 다른 메뉴를 추가하세요 (예: About) */}
            </div>
          </nav>
        </header>
        
        {/* 3. 메인 콘텐츠 영역 (Main) */}
        {/* flex-grow를 주어 남는 공간을 모두 차지하게 해 푸터를 아래로 밀어냅니다. */}
        <main className="flex-grow max-w-4xl mx-auto w-full p-4 md:p-8">
          {children} {/* 여기에 각 페이지(/page.tsx, /given/page.tsx)의 내용이 들어갑니다. */}
        </main>
        
        {/* 4. 푸터 (Footer) */}
        <footer className="w-full mt-auto p-4 border-t bg-gray-100 text-center text-sm text-gray-500">
          <div className="max-w-4xl mx-auto">
            © {new Date().getFullYear()} yerihyo. All rights reserved. Built with Next.js & Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}