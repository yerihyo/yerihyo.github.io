// frontend/app/tracker/CooldownTracker.tsx
'use client';

import React, { useState, useEffect } from 'react';
// HERO_DATA, Skill, Hero 인터페이스는 위 1번 섹션의 코드를 그대로 사용한다고 가정합니다.

interface Skill {
  id: string;
  name: string;
  cooldown: number; // 쿨타임 (초)
  type: 'Ability' | 'Ultimate' | 'Passive';
}

interface Hero {
  id: string;
  name: string;
  role: '탱커' | '딜러' | '지원가';
  skills: Skill[];
}

// 추적할 적팀 영웅 데이터
const HERO_DATA: Hero[] = [
  {
    id: 'doomfist', name: '둠피스트', role: '탱커',
    skills: [
      { id: 'power_block', name: '파워 블락', cooldown: 7, type: 'Ability' },
      { id: 'rocket_punch', name: '로켓 펀치', cooldown: 3, type: 'Ability' },
      { id: 'meteor_strike', name: '파멸의 일격', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'ana', name: '아나', role: '지원가',
    skills: [
      { id: 'sleep_dart', name: '수면총', cooldown: 15, type: 'Ability' },
      { id: 'biotic_grenade', name: '생체 수류탄', cooldown: 10, type: 'Ability' },
      { id: 'nano_boost', name: '나노 강화제', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'genji', name: '겐지', role: '딜러',
    skills: [
      { id: 'deflect', name: '튕겨내기', cooldown: 8, type: 'Ability' },
      { id: 'swift_strike', name: '질풍참', cooldown: 7, type: 'Ability' },
    ],
  },
];


// 쿨타임 상태의 타입: 키는 'heroId-skillId', 값은 쿨타임이 끝나는 시점 (ms)
type ActiveCooldowns = Record<string, number>;

// 남은 시간을 계산하여 표시할 문자열로 변환합니다.
const formatTime = (ms: number): string => {
  if (ms <= 0) return 'READY';
  const seconds = Math.ceil(ms / 1000);
  return `${seconds.toFixed(0)}s`;
};

export default function CooldownTracker() {
  const [activeCooldowns, setActiveCooldowns] = useState<ActiveCooldowns>({});
  // 화면 갱신을 위해 100ms마다 업데이트되는 상태
  const [currentTime, setCurrentTime] = useState(Date.now());

  // 100ms마다 시간을 갱신하여 타이머가 실시간으로 움직이게 합니다.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // 쿨타임을 시작하는 함수
  const startCooldown = (heroId: string, skillId: string, duration: number) => {
    const key = `${heroId}-${skillId}`;
    const endTime = currentTime + duration * 1000; // 현재 시간 + 쿨타임(초)

    setActiveCooldowns(prev => ({
      ...prev,
      [key]: endTime,
    }));
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-3">
        적 스킬 쿨타임 추적기
      </h1>

      <div className="space-y-8">
        {HERO_DATA.map((hero) => (
          <div key={hero.id} className="p-5 border border-gray-200 rounded-lg shadow-md bg-white">
            
            {/* 영웅 이름 및 역할 */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {hero.name} <span className="text-base font-medium text-gray-500 ml-2">({hero.role})</span>
            </h2>

            {/* 스킬 목록 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {hero.skills.map((skill) => {
                const key = `${hero.id}-${skill.id}`;
                const endTime = activeCooldowns[key] || 0;
                const remainingTimeMs = endTime - currentTime;
                const isCooling = remainingTimeMs > 0;
                
                // 궁극기(Ultimate)는 쿨타임 버튼이 아닌 별도 표시
                if (skill.type === 'Ultimate') {
                  return (
                    <div key={key} className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                      <p className="text-sm font-semibold text-red-700">궁극기</p>
                      <p className="text-lg font-bold text-red-900">{skill.name}</p>
                    </div>
                  );
                }

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (!isCooling) {
                        startCooldown(hero.id, skill.id, skill.cooldown);
                      }
                    }}
                    disabled={isCooling}
                    className={`
                      p-3 rounded-xl transition duration-150 transform hover:scale-[1.02] 
                      ${isCooling
                        ? 'bg-gray-700 text-white cursor-not-allowed shadow-inner'
                        : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                      }
                    `}
                  >
                    <p className="text-lg font-bold truncate">{skill.name}</p>
                    <p className="text-sm font-medium mt-1">
                      {isCooling 
                        ? formatTime(remainingTimeMs) 
                        : 'READY'
                      }
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}