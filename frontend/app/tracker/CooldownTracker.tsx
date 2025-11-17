// frontend/app/tracker/CooldownTracker.tsx (쿨타임 0초 스킬만 필터링)

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_HERO_DATA, Hero, Skill } from '@/data/hero-data'; 

// ====================================================================
// 1. 타이머 유틸리티 함수
// ====================================================================

type ActiveTimestamps = Record<string, number>;

const formatSecondsElapsed = (ms: number): string => {
  if (ms < 0) return '0s';
  const seconds = Math.floor(ms / 1000); 
  return `${seconds}s`;
};

const formatTime = (ms: number, isUltimate: boolean): string => {
  if (isUltimate) {
    if (ms <= 0) return 'READY';
    return formatSecondsElapsed(ms);
  }
  if (ms <= 0) return 'READY';
  const seconds = Math.ceil(ms / 1000);
  return `${seconds.toFixed(0)}s`;
};

// ====================================================================
// 2. 메인 컴포넌트
// ====================================================================

export default function CooldownTracker() {
  const [activeTimestamps, setActiveTimestamps] = useState<ActiveTimestamps>({});
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [selectedHeroIds, setSelectedHeroIds] = useState<string[]>([]); 
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null); 
  
  const [isHeroSelectorOpen, setIsHeroSelectorOpen] = useState(false);
  const [isGameStartInfoOpen, setIsGameStartInfoOpen] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (warningMessage) {
      const timer = setTimeout(() => {
        setWarningMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  const selectedHeroes = useMemo(() => {
    return ALL_HERO_DATA.filter(hero => selectedHeroIds.includes(hero.id));
  }, [selectedHeroIds]);

  const groupedAndSortedHeroes = useMemo(() => {
    const roles: ('탱커' | '딜러' | '지원가')[] = ['탱커', '딜러', '지원가'];
    const groups: Record<string, Hero[]> = { '탱커': [], '딜러': [], '지원가': [] };

    ALL_HERO_DATA.forEach(hero => {
        groups[hero.role].push(hero);
    });

    roles.forEach(role => {
        if (role === '탱커') {
            const dva = groups[role].find(h => h.name === 'D.Va');
            const otherTanks = groups[role].filter(h => h.name !== 'D.Va');
            
            otherTanks.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
            
            groups[role] = dva ? [dva, ...otherTanks] : otherTanks;

        } else {
            groups[role].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
        }
    });

    return groups;
  }, []);


  const handleGameStart = () => {
    const now = Date.now();
    setGameStartTime(now); 
    
    const newTimestamps: ActiveTimestamps = { ...activeTimestamps };
    selectedHeroes.forEach(hero => {
        hero.skills.forEach(skill => {
            if (skill.type === 'Ultimate') {
                const key = `${hero.id}-${skill.id}`;
                newTimestamps[key] = now; 
            }
        });
    });

    Object.keys(newTimestamps).forEach(key => {
        const skillId = key.split('-')[1];
        const isUltimateKey = selectedHeroes.some(h => h.skills.some(s => s.id === skillId && s.type === 'Ultimate'));
        if (!isUltimateKey) {
            delete newTimestamps[key];
        }
    });

    setActiveTimestamps(newTimestamps);
    setWarningMessage('✅ 게임 타이머가 재시작/초기화 되었습니다.');
  };

  const toggleHeroSelection = (heroId: string) => {
    setSelectedHeroIds(prevIds => {
      if (prevIds.includes(heroId)) {
        const newTimestamps = { ...activeTimestamps };
        ALL_HERO_DATA.find(h => h.id === heroId)?.skills.forEach(s => {
          delete newTimestamps[`${heroId}-${s.id}`];
        });
        setActiveTimestamps(newTimestamps);
        return prevIds.filter(id => id !== heroId);
      } else {
        if (prevIds.length >= 6) {
          setWarningMessage('🚨 적팀 영웅은 최대 6명까지만 선택할 수 있습니다.');
          return prevIds;
        }
        return [...prevIds, heroId];
      }
    });
  };

  const startCooldown = (heroId: string, skillId: string, duration: number) => {
    const key = `${heroId}-${skillId}`;
    const endTime = currentTime + duration * 1000;
    setActiveTimestamps(prev => ({
      ...prev,
      [key]: endTime, 
    }));
  };

  const recordUltimateUse = (heroId: string, skillId: string) => {
    const key = `${heroId}-${skillId}`;
    setActiveTimestamps(prev => ({
      ...prev,
      [key]: currentTime, 
    }));
  };

  const isUltimateUsed = (heroId: string, skillId: string): boolean => {
    const key = `${heroId}-${skillId}`;
    if (gameStartTime && activeTimestamps[key] && activeTimestamps[key] >= gameStartTime) {
      return true;
    }
    return false;
  };

  return (
    <div className="p-2 text-xs md:text-sm">
      <h1 className="text-xl font-extrabold text-indigo-700 mb-3 border-b pb-2 sm:text-2xl">
        쿨타임 추적기 (모바일 최적화)
      </h1>
      
      {warningMessage && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 p-2 bg-red-100 border border-red-500 text-red-700 rounded-lg shadow-xl text-xs">
          <p className="font-semibold">{warningMessage}</p>
        </div>
      )}

      {/* ===================================================
        게임 시작 버튼 및 상태 표시
      =================================================== */}
      <div className="mb-3 p-3 border border-green-200 rounded-lg bg-green-50 shadow-sm">
        <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-green-800 sm:text-lg">
                상태: 
                <span className={`ml-1 ${gameStartTime ? 'text-green-600' : 'text-red-500'}`}>
                    {gameStartTime ? '진행 중' : '대기'}
                </span>
            </h2>
            <button
                onClick={handleGameStart}
                onMouseDown={() => setIsGameStartInfoOpen(true)}
                onMouseUp={() => setIsGameStartInfoOpen(false)}
                onTouchStart={() => setIsGameStartInfoOpen(true)}
                onTouchEnd={() => setIsGameStartInfoOpen(false)}
                className="px-3 py-1 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-green-600 transition duration-150 text-xs sm:text-sm"
            >
                {gameStartTime ? '재시작' : '게임 시작'}
            </button>
        </div>
        
        {isGameStartInfoOpen && (
          <p className="text-xs text-gray-600 mt-1 border-t border-green-200 pt-1">
            시작 버튼을 누르면 모든 궁극기 타이머가 0부터 카운트됩니다.
          </p>
        )}
      </div>

      {/* ===================================================
        영웅 선택 UI (아코디언, 역할군별 정렬)
      =================================================== */}
      <div className="mb-3 border border-indigo-300 rounded-lg shadow-sm">
        <button 
          className="w-full p-2 bg-indigo-200 hover:bg-indigo-300 transition duration-150 rounded-t-lg flex justify-between items-center text-indigo-900 font-bold text-sm"
          onClick={() => setIsHeroSelectorOpen(!isHeroSelectorOpen)}
        >
          <span>
            적팀 영웅 선택 ({selectedHeroIds.length} / 6)
          </span>
          <span>{isHeroSelectorOpen ? '▲ 접기' : '▼ 펼치기'}</span>
        </button>
        
        {isHeroSelectorOpen && (
          <div className="p-3 bg-indigo-50 rounded-b-lg border-t border-indigo-200">
            <div className="max-h-36 overflow-y-auto pr-1 space-y-2">
              {['탱커', '딜러', '지원가'].map((role) => (
                <div key={role}>
                  <h3 className="text-sm font-bold text-indigo-700 mb-1 border-b border-indigo-300">
                    {role}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {groupedAndSortedHeroes[role].map((hero) => {
                      const isSelected = selectedHeroIds.includes(hero.id);
                      return (
                        <button
                          key={hero.id}
                          onClick={() => toggleHeroSelection(hero.id)}
                          className={`
                            px-2 py-0.5 text-xs rounded-md transition duration-150 
                            ${isSelected
                              ? 'bg-indigo-600 text-white font-semibold shadow-sm ring-1 ring-indigo-400'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }
                          `}
                        >
                          {hero.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* ===================================================
        스킬 추적 UI
      =================================================== */}
      <div className="space-y-3">
        {selectedHeroes.length === 0 && (
          <p className="text-center text-gray-500 py-8 text-lg font-semibold">
            ✨ 추적할 영웅을 선택해 주세요 ✨
          </p>
        )}

        {selectedHeroes.map((hero) => (
          <div key={hero.id} className="p-2 border border-gray-200 rounded-lg shadow-sm bg-white">
            
            <h2 className="text-sm font-bold mb-2 text-gray-800">
              {hero.name} <span className="text-xs font-medium text-gray-500 ml-1">({hero.role})</span>
            </h2>

            <div className="grid grid-cols-3 gap-1">
              {/* 💡 필터링 로직 수정: 궁극기이거나 쿨타임이 0초를 초과하는 스킬만 표시 */}
              {hero.skills
                .filter(skill => skill.type === 'Ultimate' || skill.cooldown > 0)
                .map((skill) => {
                const key = `${hero.id}-${skill.id}`;
                const timestamp = activeTimestamps[key] || 0;
                
                const isUltimate = skill.type === 'Ultimate';

                let displayTimeMs: number;
                let isCooling: boolean;

                if (isUltimate) {
                  displayTimeMs = isUltimateUsed(hero.id, skill.id) ? currentTime - timestamp : 0;
                  isCooling = false;
                } else {
                  displayTimeMs = timestamp - currentTime;
                  isCooling = displayTimeMs > 0;
                }

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (isUltimate && !gameStartTime) {
                          setWarningMessage('🚨 게임 시작 버튼을 먼저 눌러주세요!');
                          return;
                      }
                      if (isUltimate) {
                        recordUltimateUse(hero.id, skill.id);
                      } else if (!isCooling) {
                        startCooldown(hero.id, skill.id, skill.cooldown);
                      }
                    }}
                    disabled={!isUltimate && isCooling}
                    className={`
                      px-1 py-0.5 rounded-md transition duration-150 transform hover:scale-[1.02] h-10 flex flex-col justify-center items-center overflow-hidden
                      ${isUltimate
                        ? 'bg-red-600 text-white shadow-sm hover:bg-red-700'
                        : isCooling
                          ? 'bg-gray-700 text-white cursor-not-allowed shadow-inner'
                          : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'
                      }
                    `}
                  >
                    <p className="text-xs font-bold truncate max-w-full">
                      {skill.name} 
                      <span className="text-[9px] font-normal text-gray-300 ml-0.5">
                        {isUltimate ? '(궁)' : `(${skill.cooldown}s)`}
                      </span>
                    </p>
                    <p className="text-sm font-extrabold mt-0 leading-none">
                      {isUltimate 
                        ? (timestamp === 0 || !gameStartTime ? 'START' : formatTime(displayTimeMs, isUltimate))
                        : formatTime(displayTimeMs, isUltimate)
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
