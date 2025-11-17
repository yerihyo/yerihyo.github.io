// frontend/app/tracker/page.tsx
import CooldownTracker from './CooldownTracker';

// Next.js Server Component (Wrapper)
export default function TrackerPage() {
  return (
    // 레이아웃이 설정한 중앙 컨테이너 안에 쿨타임 추적기를 배치합니다.
    <CooldownTracker />
  );
}