// 예: app/page.tsx에서 빌드 시점 데이터 페칭
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 빌드 시점에만 실행되어 정적 HTML에 데이터를 삽입합니다.
const getPosts = () => {
  const postsDirectory = path.join(process.cwd(), 'docs', '_posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  // 모든 Markdown 파일을 읽고 파싱하여 정적 데이터로 사용
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      // ...
    };
  });
  return posts;
};

export default function Home() {
  const posts = getPosts();
  return (
    <div>
      {posts?.map(post => {
        return <div>{post.title}</div> 
      })}
      {/* ...posts.map으로 블로그 글 목록 표시 */}
    </div>
  );
}