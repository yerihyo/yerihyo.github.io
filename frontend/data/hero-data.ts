// frontend/data/hero-data.ts

export interface Skill {
  id: string;
  name: string;
  cooldown: number; // 일반 스킬 쿨타임 (초), 궁극기는 0
  type: 'Ability' | 'Ultimate' | 'Passive';
}

export interface Hero {
  id: string;
  name: string;
  role: '탱커' | '딜러' | '지원가';
  skills: Skill[];
}

export const ALL_HERO_DATA: Hero[] = [
  // ===================================
  // TANK (11명)
  // ===================================
  {
    id: 'dva', name: 'D.Va', role: '탱커',
    skills: [
      { id: 'booster', name: '부스터', cooldown: 3.5, type: 'Ability' },
      { id: 'defense_matrix', name: '방어 매트릭스', cooldown: 1, type: 'Ability' },
      { id: 'micro_missiles', name: '마이크로 미사일', cooldown: 8, type: 'Ability' },
      { id: 'self_destruct', name: '자폭', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'doomfist', name: '둠피스트', role: '탱커',
    skills: [
      { id: 'power_block', name: '파워 블락', cooldown: 7, type: 'Ability' },
      { id: 'rocket_punch', name: '로켓 펀치', cooldown: 3, type: 'Ability' },
      { id: 'seismic_slam', name: '지진 강타', cooldown: 7, type: 'Ability' },
      { id: 'meteor_strike', name: '파멸의 일격', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'junker_queen', name: '정커퀸', role: '탱커',
    skills: [
      { id: 'commanding_shout', name: '지휘의 외침', cooldown: 12, type: 'Ability' },
      { id: 'carnage', name: '대학살', cooldown: 8, type: 'Ability' },
      { id: 'jagged_blade', name: '톱니칼', cooldown: 5, type: 'Ability' },
      { id: 'rampage', name: '전력 질주', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'mauga', name: '마우가', role: '탱커',
    skills: [
      { id: 'overrun', name: '돌파', cooldown: 7, type: 'Ability' },
      { id: 'caged_fight', name: '대규모 교전', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'orisa', name: '오리사', role: '탱커',
    skills: [
      { id: 'javelin_spin', name: '투창 회전', cooldown: 12, type: 'Ability' },
      { id: 'fortify', name: '강화', cooldown: 15, type: 'Ability' },
      { id: 'energy_javelin', name: '에너지 투창', cooldown: 8, type: 'Ability' },
      { id: 'terra_surge', name: '대지 분쇄', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'ramattra', name: '라마트라', role: '탱커', // 💡 라마트라 이름 수정
    skills: [
      { id: 'nemesis_form', name: '복수의 경계', cooldown: 8, type: 'Ability' },
      { id: 'void_accelerator', name: '공허 가속기', cooldown: 7, type: 'Ability' },
      { id: 'annihilation', name: '파멸의 고리', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'reinhardt', name: '라인하르트', role: '탱커',
    skills: [
      { id: 'charge', name: '돌진', cooldown: 7, type: 'Ability' },
      { id: 'fire_strike', name: '화염 강타', cooldown: 7, type: 'Ability' },
      { id: 'shatter', name: '대지 분쇄', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'roadhog', name: '로드호그', role: '탱커',
    skills: [
      { id: 'take_a_breather', name: '숨 돌리기', cooldown: 14, type: 'Ability' },
      { id: 'chain_hook', name: '갈고리 사슬', cooldown: 8, type: 'Ability' },
      { id: 'whole_hog', name: '핵폭탄', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'sigma', name: '시그마', role: '탱커',
    skills: [
      { id: 'kinetic_grasp', name: '키네틱 손아귀', cooldown: 12, type: 'Ability' },
      { id: 'accretion', name: '강착', cooldown: 10, type: 'Ability' },
      { id: 'gravitic_flux', name: '중력 붕괴', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'winston', name: '윈스턴', role: '탱커',
    skills: [
      { id: 'jump_pack', name: '점프 팩', cooldown: 5, type: 'Ability' },
      { id: 'barrier_projector', name: '방벽 생성기', cooldown: 13, type: 'Ability' },
      { id: 'primal_rage', name: '원시의 분노', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'zarya', name: '자리야', role: '탱커',
    skills: [
      { id: 'particle_barrier', name: '입자 방벽', cooldown: 10, type: 'Ability' },
      { id: 'projected_barrier', name: '방벽 씌우기', cooldown: 10, type: 'Ability' },
      { id: 'graviton_surge', name: '중력자탄', cooldown: 0, type: 'Ultimate' },
    ],
  },
  // ===================================
  // DAMAGE (20명)
  // ===================================
  {
    id: 'ashe', name: '애쉬', role: '딜러',
    skills: [
      { id: 'coach_gun', name: '충격 샷건', cooldown: 10, type: 'Ability' },
      { id: 'dynamite', name: '다이너마이트', cooldown: 12, type: 'Ability' },
      { id: 'bob', name: 'B.O.B.', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'bastion', name: '바스티온', role: '딜러',
    skills: [
      { id: 'assault_mode', name: '강습 모드', cooldown: 10, type: 'Ability' },
      { id: 'reconfigure', name: '설정 변경', cooldown: 12, type: 'Ability' },
      { id: 'artillery', name: '포격', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'cassidy', name: '캐서디', role: '딜러',
    skills: [
      { id: 'combat_roll', name: '전투 구르기', cooldown: 6, type: 'Ability' },
      { id: 'magnetic_grenade', name: '자력 수류탄', cooldown: 10, type: 'Ability' },
      { id: 'deadeye', name: '황야의 무법자', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'echo', name: '에코', role: '딜러',
    skills: [
      { id: 'flight', name: '비행', cooldown: 6, type: 'Ability' },
      { id: 'sticky_bombs', name: '점착 폭탄', cooldown: 8, type: 'Ability' },
      { id: 'duplicate', name: '복제', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'genji', name: '겐지', role: '딜러',
    skills: [
      { id: 'deflect', name: '튕겨내기', cooldown: 8, type: 'Ability' },
      { id: 'swift_strike', name: '질풍참', cooldown: 7, type: 'Ability' },
      { id: 'dragonblade', name: '용검', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'hanzo', name: '한조', role: '딜러',
    skills: [
      { id: 'sonic_arrow', name: '음파 화살', cooldown: 12, type: 'Ability' },
      { id: 'storm_arrows', name: '폭풍 화살', cooldown: 10, type: 'Ability' },
      { id: 'dragonstrike', name: '용의 일격', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'junker_queen_dmg', name: '정크랫', role: '딜러',
    skills: [
      { id: 'concussion_mine', name: '충격 지뢰', cooldown: 8, type: 'Ability' },
      { id: 'steel_trap', name: '덫', cooldown: 10, type: 'Ability' },
      { id: 'rip_tire', name: '죽이는 타이어', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'mei', name: '메이', role: '딜러',
    skills: [
      { id: 'cryo_freeze', name: '급속 빙결', cooldown: 12, type: 'Ability' },
      { id: 'ice_wall', name: '빙벽', cooldown: 13, type: 'Ability' },
      { id: 'blizzard', name: '눈보라', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'pharah', name: '파라', role: '딜러',
    skills: [
      { id: 'jump_jet', name: '점프 추진기', cooldown: 10, type: 'Ability' },
      { id: 'concussive_blast', name: '충격탄', cooldown: 7, type: 'Ability' },
      { id: 'barrage', name: '포화', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'reaper', name: '리퍼', role: '딜러',
    skills: [
      { id: 'shadow_step', name: '그림자 밟기', cooldown: 10, type: 'Ability' },
      { id: 'wraith_form', name: '망령화', cooldown: 8, type: 'Ability' },
      { id: 'death_blossom', name: '죽음의 꽃', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'sojourn', name: '소전', role: '딜러',
    skills: [
      { id: 'power_slide', name: '파워 슬라이드', cooldown: 7, type: 'Ability' },
      { id: 'disruptor_shot', name: '분열 사격', cooldown: 10, type: 'Ability' },
      { id: 'overclock', name: '오버클럭', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'soldier76', name: '솔저: 76', role: '딜러',
    skills: [
      { id: 'helix_rockets', name: '나선 로켓', cooldown: 8, type: 'Ability' },
      { id: 'biotic_field', name: '생체장', cooldown: 15, type: 'Ability' },
      { id: 'tactical_visor', name: '전술 조준경', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'sombra', name: '솜브라', role: '딜러',
    skills: [
      { id: 'translocator', name: '위치 변환기', cooldown: 6, type: 'Ability' },
      { id: 'hack', name: '해킹', cooldown: 4, type: 'Ability' },
      { id: 'emp', name: 'EMP', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'symmetra', name: '시메트라', role: '딜러',
    skills: [
      { id: 'sentry_turret', name: '감시 포탑', cooldown: 10, type: 'Ability' },
      { id: 'teleporter', name: '순간이동기', cooldown: 12, type: 'Ability' },
      { id: 'photon_barrier', name: '광자 방벽', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'torbjorn', name: '토르비욘', role: '딜러',
    skills: [
      { id: 'deploy_turret', name: '포탑 설치', cooldown: 10, type: 'Ability' },
      { id: 'overload', name: '과부하', cooldown: 12, type: 'Ability' },
      { id: 'molten_core', name: '초고열 용광로', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'tracer', name: '트레이서', role: '딜러',
    skills: [
      { id: 'blink', name: '점멸', cooldown: 3, type: 'Ability' },
      { id: 'recall', name: '시간 역행', cooldown: 12, type: 'Ability' },
      { id: 'pulse_bomb', name: '펄스 폭탄', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'venture', name: '벤처', role: '딜러',
    skills: [
      { id: 'burrow', name: '땅굴 파기', cooldown: 8, type: 'Ability' },
      { id: 'drill_dash', name: '드릴 돌진', cooldown: 5, type: 'Ability' },
      { id: 'tectonic_shock', name: '지각 충격', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'widowmaker', name: '위도우메이커', role: '딜러',
    skills: [
      { id: 'grappling_hook', name: '갈고리 발사', cooldown: 10, type: 'Ability' },
      { id: 'venom_mine', name: '맹독 지뢰', cooldown: 15, type: 'Ability' },
      { id: 'infra_sight', name: '적외선 투시', cooldown: 0, type: 'Ultimate' },
    ],
  },
  // ===================================
  // SUPPORT (10명)
  // ===================================
  {
    id: 'ana', name: '아나', role: '지원가',
    skills: [
      { id: 'sleep_dart', name: '수면총', cooldown: 15, type: 'Ability' },
      { id: 'biotic_grenade', name: '생체 수류탄', cooldown: 10, type: 'Ability' },
      { id: 'nano_boost', name: '나노 강화제', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'baptiste', name: '바티스트', role: '지원가',
    skills: [
      { id: 'immortality_field', name: '불사 장치', cooldown: 25, type: 'Ability' },
      { id: 'regenerative_burst', name: '생체탄', cooldown: 13, type: 'Ability' },
      { id: 'amplification_matrix', name: '증폭 매트릭스', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'brigitte', name: '브리기테', role: '지원가',
    skills: [
      { id: 'repair_pack', name: '수리 팩', cooldown: 6, type: 'Ability' },
      { id: 'whip_shot', name: '채찍 공격', cooldown: 4, type: 'Ability' },
      { id: 'rally', name: '집결', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'kiriko', name: '키리코', role: '지원가',
    skills: [
      { id: 'swift_step', name: '순보', cooldown: 7, type: 'Ability' },
      { id: 'protection_suzu', name: '정화의 방울', cooldown: 15, type: 'Ability' },
      { id: 'kitsune_rush', name: '여우길', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'lifeweaver', name: '라이프위버', role: '지원가',
    skills: [
      { id: 'petal_platform', name: '연꽃 단상', cooldown: 8, type: 'Ability' },
      { id: 'life_grip', name: '생명의 손아귀', cooldown: 16, type: 'Ability' },
      { id: 'tree_of_life', name: '생명의 나무', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'lucio', name: '루시우', role: '지원가',
    skills: [
      { id: 'amp_it_up', name: '볼륨을 높여라!', cooldown: 12, type: 'Ability' },
      { id: 'soundwave', name: '소리 파동', cooldown: 4, type: 'Ability' },
      { id: 'sound_barrier', name: '소리 방벽', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'mercy', name: '메르시', role: '지원가',
    skills: [
      { id: 'guardian_angel', name: '수호천사', cooldown: 1.5, type: 'Ability' },
      { id: 'resurrect', name: '부활', cooldown: 30, type: 'Ability' },
      { id: 'valkyrie', name: '발키리', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'moira', name: '모이라', role: '지원가',
    skills: [
      { id: 'biotic_orb', name: '생체 구슬', cooldown: 8, type: 'Ability' },
      { id: 'fade', name: '소멸', cooldown: 6, type: 'Ability' },
      { id: 'coalescence', name: '융화', cooldown: 0, type: 'Ultimate' },
    ],
  },
  {
    id: 'zenyatta', name: '젠야타', role: '지원가',
    skills: [
      { id: 'discord_orb', name: '부조화의 구슬', cooldown: 0, type: 'Ability' }, // 쿨타임 없음
      { id: 'transcendence', name: '초월', cooldown: 0, type: 'Ultimate' },
    ],
  },
];
