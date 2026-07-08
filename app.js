/* ==========================================================================
   Healing. — Form Logic + 32-Result Scoring Engine (app.js)
   ========================================================================== */

// ============================================================
// 32가지 결과 데이터 (RESULT_DATA)
// ============================================================
const RESULT_DATA = {

  // ── 유언 프로젝트 결과 10가지 ──────────────────────────────
  W1: {
    service: 'will', emoji: '💜', name: '고요한 수용자',
    sub: '말 못한 감정을 품고 살아온 사람',
    gradient: 'linear-gradient(135deg,#6d28d9,#4c1d95)',
    color: '#a78bfa',
    desc: '당신은 말로 다 담지 못한 미안함을 마음속 깊이 안고 살아온 분입니다. 삶의 끝자락에서 가장 먼저 떠오르는 것이 용서와 화해라는 것은, 그만큼 타인의 마음을 세심하게 배려해온 사람임을 의미합니다. 유언 프로젝트를 통해 그 말을 꺼내놓고 내면의 평화를 찾아가세요.',
    kits: [
      { emoji: '📜', title: '사과의 편지지 세트', desc: '자개 문양 봉투 + 금박 왁스 씰 키트' },
      { emoji: '🕯️', title: '화해의 캔들', desc: '은은한 화이트 머스크 향 소이 캔들 80g' }
    ]
  },
  W2: {
    service: 'will', emoji: '🔥', name: '열정의 연소자',
    sub: '하지 못한 도전이 가슴에 남은 사람',
    gradient: 'linear-gradient(135deg,#dc2626,#b45309)',
    color: '#fca5a5',
    desc: '하지 못한 도전들이 가슴 한 켠에 남아있는 분이시네요. 삶을 뜨겁게 살아왔기에 더 많이 이루고 싶었던, 그 뜨거운 열망이 당신의 본질입니다. 마지막 유언에 그 불꽃 같은 열정을 담아 후대에 전달해 주세요.',
    kits: [
      { emoji: '📕', title: '버킷리스트 레더 노트', desc: '레드 레더 커버 프리미엄 버킷리스트 저널' },
      { emoji: '🖊️', title: '골드 잉크 만년필', desc: '영원히 남길 문장을 위한 골드 닙 만년필' }
    ]
  },
  W3: {
    service: 'will', emoji: '🌿', name: '뿌리 깊은 연결자',
    sub: '관계와 사랑이 삶의 중심인 사람',
    gradient: 'linear-gradient(135deg,#065f46,#047857)',
    color: '#6ee7b7',
    desc: '가장 소중한 것이 사람이었고, 소홀했던 관계를 가장 아쉬워하시는 분이시군요. 당신의 존재는 주변 사람들에게 든든한 뿌리가 되어주었습니다. 그 깊은 사랑을 글로 남겨 영원히 간직하세요.',
    kits: [
      { emoji: '📷', title: '패브릭 가족 앨범 키트', desc: '소중한 사진을 담는 수제 패브릭 포토북' },
      { emoji: '💌', title: '손편지 세트', desc: '사랑하는 사람에게 보내는 프리미엄 편지지 세트' }
    ]
  },
  W4: {
    service: 'will', emoji: '🌙', name: '고독한 성찰가',
    sub: '혼자만의 시간이 가장 부족했던 사람',
    gradient: 'linear-gradient(135deg,#1e1b4b,#312e81)',
    color: '#c7d2fe',
    desc: '자신만의 시간이 부족했다는 아쉬움을 품고 계신 분이시네요. 고독을 통해 가장 깊은 자신을 만나는 사람, 그것이 당신입니다. 지금 이 순간, 오롯이 나만을 위한 성찰의 글을 남겨보세요.',
    kits: [
      { emoji: '📔', title: '달 무늬 새벽 일기장', desc: '자정의 감성을 담은 블랙 라인 다이어리' },
      { emoji: '🕯️', title: '달빛 무드 캔들', desc: '재스민 & 달맞이꽃 향 소이 캔들' }
    ]
  },
  W5: {
    service: 'will', emoji: '✨', name: '순간의 찰나 수집가',
    sub: '작은 순간들을 가장 소중히 여기는 사람',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    color: '#e9d5ff',
    desc: '작은 순간들을 가장 소중히 여기고, 그 순간들을 흘려보냈음을 아쉬워하는 분이시군요. 반짝이는 일상의 파편들을 수집해온 당신은 삶을 가장 섬세하게 살아온 사람입니다.',
    kits: [
      { emoji: '📸', title: '폴라로이드 미니 앨범', desc: '찰나의 기억을 담는 인스탁스 필름 앨범 키트' },
      { emoji: '🌟', title: '순간 기록 스티커 세트', desc: '날짜 & 감정 태그 골드 포일 스티커 60종' }
    ]
  },
  W6: {
    service: 'will', emoji: '📖', name: '기록하는 증인',
    sub: '글과 기록으로 흔적을 남기고 싶은 사람',
    gradient: 'linear-gradient(135deg,#1d4ed8,#1e40af)',
    color: '#93c5fd',
    desc: '글과 기록으로 자신의 흔적을 남기고 싶은 분이시네요. 당신의 문장 하나하나가 세상에 남길 가장 아름다운 유산입니다. 마지막 페이지를 채우듯 유언을 정성스럽게 기록해 보세요.',
    kits: [
      { emoji: '📒', title: '핸드바인딩 유언 기록장', desc: '수제 하드커버 유언 아카이빙 노트북' },
      { emoji: '🪶', title: '빈티지 깃털 펜 세트', desc: '칼리그라피 잉크 + 깃털 펜 2종 세트' }
    ]
  },
  W7: {
    service: 'will', emoji: '🎵', name: '감각의 낭만주의자',
    sub: '음악과 예술로 기억되고 싶은 사람',
    gradient: 'linear-gradient(135deg,#be185d,#9d174d)',
    color: '#fbcfe8',
    desc: '음악과 예술로 마지막을 채우고 싶은 낭만적인 영혼을 가진 분이시군요. 감각적인 아름다움 속에서 삶의 의미를 찾아온 당신에게, 선율과 함께하는 고별이야말로 가장 아름다운 작별입니다.',
    kits: [
      { emoji: '🎶', title: '커스텀 LP 앨범 커버', desc: '나만의 플레이리스트 아트워크 인쇄 키트' },
      { emoji: '🎨', title: '수채화 엽서 세트', desc: '감성적 작별을 담는 수채화 메시지 카드' }
    ]
  },
  W8: {
    service: 'will', emoji: '🤝', name: '선한 유산 기부자',
    sub: '세상에 긍정적 영향을 남기고 싶은 사람',
    gradient: 'linear-gradient(135deg,#0369a1,#075985)',
    color: '#7dd3fc',
    desc: '자신이 남긴 긍정적 영향과 봉사의 기억으로 기억되고 싶으신 분이시네요. 세상을 조금 더 따뜻하게 만들어온 당신의 삶 자체가 이미 최고의 선물입니다. 그 마음을 유언으로 전해주세요.',
    kits: [
      { emoji: '💌', title: '사회 임팩트 레터 키트', desc: '나의 가치관을 담은 오픈레터 제작 키트' },
      { emoji: '🎀', title: '감사 리본 카드 세트', desc: '감사의 마음을 전하는 프리미엄 카드 12종' }
    ]
  },
  W9: {
    service: 'will', emoji: '🌊', name: '자유로운 파도',
    sub: '자유와 여행으로 살아온 사람',
    gradient: 'linear-gradient(135deg,#0891b2,#0e7490)',
    color: '#67e8f9',
    desc: '자유와 여행을 가장 소중히 여기며 살아온 분이시네요. 경계 없이 흘러가는 파도처럼, 당신의 삶은 그 자체로 하나의 아름다운 항해였습니다. 마지막 한 마디에 그 자유로운 바람을 담아주세요.',
    kits: [
      { emoji: '🗺️', title: '세계 지도 트레블 노트', desc: '방문한 나라를 색칠하는 트레블 저널' },
      { emoji: '🧭', title: '나침반 펜던트 키트', desc: '자유의 방향을 가리키는 황동 나침반 목걸이' }
    ]
  },
  W10: {
    service: 'will', emoji: '🕊️', name: '평화로운 귀환자',
    sub: '감사와 평화가 삶의 마지막 화두인 사람',
    gradient: 'linear-gradient(135deg,#374151,#4b5563)',
    color: '#d1d5db',
    desc: '감사와 평화가 삶의 마지막 화두인 분이시네요. 고요히 본래의 자신으로 돌아가는 것, 그것이 당신이 그려온 가장 아름다운 결말입니다. 감사의 마음을 담아 유언을 전해주세요.',
    kits: [
      { emoji: '🏺', title: '백자 도자기 잉크스탠드', desc: '고요한 백색의 미니 인센스 & 잉크 홀더' },
      { emoji: '📄', title: '한지 편지지 세트', desc: '전통 한지 감성의 프리미엄 편지 키트' }
    ]
  },

  // ── 무드 진단 결과 12가지 ──────────────────────────────────
  M1: {
    service: 'mood', emoji: '☀️', name: '따뜻한 활력 공간',
    sub: '맑음 × 에너지 충전이 필요한 날',
    gradient: 'linear-gradient(135deg,#f59e0b,#d97706)',
    color: '#fde68a',
    desc: '오늘 맑은 기운 속에서도 몸과 마음이 에너지 충전을 원하고 있군요. 밝고 따뜻한 자연광 아래, 생동감 있는 공간 배치가 당신의 활력을 극대화합니다. 주황빛 포인트 조명과 비타민 향이 피로를 날려버릴 것입니다.',
    kits: [
      { emoji: '💡', title: '선명한 옐로우 무드 라이트', desc: '색온도 조절 가능한 포터블 LED 바' },
      { emoji: '🍊', title: '비타민C 아로마 룸스프레이', desc: '달콤한 오렌지 & 자몽 에너지 룸 미스트' }
    ]
  },
  M2: {
    service: 'mood', emoji: '🌻', name: '포근한 연결 공간',
    sub: '맑음 × 연결감이 필요한 날',
    gradient: 'linear-gradient(135deg,#f97316,#ea580c)',
    color: '#fed7aa',
    desc: '화창한 날씨처럼 당신의 마음도 따뜻하지만, 지금 가장 필요한 것은 소중한 사람들과의 연결입니다. 공유 가능한 따뜻한 공간 구성으로 관계의 온기를 채우세요.',
    kits: [
      { emoji: '🕯️', title: '2인용 무드 캔들 세트', desc: '함께 피우는 따뜻한 바닐라 우드 캔들' },
      { emoji: '💌', title: '연결의 손편지 카드', desc: '소중한 사람에게 전하는 감성 메시지 카드 세트' }
    ]
  },
  M3: {
    service: 'mood', emoji: '🌤️', name: '가벼운 환기 공간',
    sub: '흐림 × 환기가 필요한 날',
    gradient: 'linear-gradient(135deg,#0ea5e9,#0284c7)',
    color: '#bae6fd',
    desc: '흐린 날처럼 다소 무거운 기분이지만, 신선한 공기가 필요한 상태입니다. 창문 옆 가벼운 색채의 공간 배치와 페퍼민트 향이 막힌 기운을 시원하게 뚫어줄 것입니다.',
    kits: [
      { emoji: '🌿', title: '페퍼민트 룸 디퓨저', desc: '시원한 민트 향 리드 디퓨저 100ml' },
      { emoji: '🎨', title: '스카이 블루 인테리어 카드', desc: '연한 블루톤 포스터 & 엽서 3종 세트' }
    ]
  },
  M4: {
    service: 'mood', emoji: '🫧', name: '조용한 고요 공간',
    sub: '흐림 × 안정이 필요한 날',
    gradient: 'linear-gradient(135deg,#475569,#334155)',
    color: '#cbd5e1',
    desc: '흐린 하늘 아래 깊은 안정을 원하고 있군요. 소음을 차단하고 따뜻한 톤의 간접조명 아래 나만의 고요한 쉼터를 만들어 보세요.',
    kits: [
      { emoji: '🎧', title: '노이즈 캔슬링 귀마개', desc: '실리콘 메모리폼 귀마개 + 수면 아이마스크' },
      { emoji: '🛋️', title: '그레이-베이지 패브릭 쿠션', desc: '뭉개지는 마이크로화이버 필링 무드 쿠션' }
    ]
  },
  M5: {
    service: 'mood', emoji: '🌧️', name: '감성적 치유 공간',
    sub: '비 × 위로가 필요한 날',
    gradient: 'linear-gradient(135deg,#1e3a5f,#1e40af)',
    color: '#93c5fd',
    desc: '가을비 같은 감성의 날씨 속에 깊은 위로가 필요한 상태군요. 빗소리 ASMR과 따뜻한 조명의 조합이 상처받은 내면을 부드럽게 어루만져 줍니다.',
    kits: [
      { emoji: '🌧️', title: '빗소리 수면 멜로디 QR카드', desc: '8시간 ASMR 빗소리 플레이리스트 QR코드 카드' },
      { emoji: '🕯️', title: '앰버 힐링 캔들', desc: '따뜻한 amber & 샌달우드 향 소이 캔들' }
    ]
  },
  M6: {
    service: 'mood', emoji: '🩵', name: '차분한 정화 공간',
    sub: '비 × 정화가 필요한 날',
    gradient: 'linear-gradient(135deg,#0c4a6e,#075985)',
    color: '#7dd3fc',
    desc: '내린 비가 대기를 정화하듯, 당신도 지금 내면을 깨끗이 비우고 싶군요. 쿨 톤의 조명과 유칼립투스 향이 마음속 불필요한 것들을 씻어냅니다.',
    kits: [
      { emoji: '🌿', title: '유칼립투스 퓨리파잉 스틱', desc: '공기 정화 효과의 유칼립투스 드라이 부케' },
      { emoji: '🏺', title: '쿨블루 세라믹 화병', desc: '미니 세라믹 화병 + 드라이플라워 세트' }
    ]
  },
  M7: {
    service: 'mood', emoji: '🌫️', name: '깊은 몰입 공간',
    sub: '안개 × 집중이 필요한 날',
    gradient: 'linear-gradient(135deg,#292524,#1c1917)',
    color: '#a8a29e',
    desc: '안개처럼 방향이 불분명한 날, 오히려 깊은 집중으로 돌파구를 찾고 싶군요. 암막 + 포인트 조명 조합으로 디지털 디톡스 집중 공간을 만들어보세요.',
    kits: [
      { emoji: '💡', title: '포인트 스터디 램프', desc: '각도 조절 가능한 아이케어 미니 LED 스탠드' },
      { emoji: '📓', title: '디지털 디톡스 플래너', desc: '스마트폰 없이 하루를 설계하는 오프라인 플래너' }
    ]
  },
  M8: {
    service: 'mood', emoji: '🌑', name: '완전한 쉼의 공간',
    sub: '안개 × 고독이 필요한 날',
    gradient: 'linear-gradient(135deg,#0f172a,#1e293b)',
    color: '#94a3b8',
    desc: '아무것도 보이지 않는 안개 속에서 완전한 고독과 쉼을 원하고 있군요. 암흑 속에서 가장 깊이 쉬는 사람, 그것이 당신입니다.',
    kits: [
      { emoji: '😴', title: '블랙아웃 수면 안대', desc: '완전 차광 실크 아이마스크 + 귀마개 세트' },
      { emoji: '🌙', title: '딥 릴렉스 라벤더 스프레이', desc: '베개에 뿌리는 라벤더 수면 필로우 미스트' }
    ]
  },
  M9: {
    service: 'mood', emoji: '🌈', name: '생동하는 창조 공간',
    sub: '햇살 × 창의력이 필요한 날',
    gradient: 'linear-gradient(135deg,#7c3aed,#db2777)',
    color: '#f9a8d4',
    desc: '따스한 햇살 아래 창의적 에너지가 충만한 상태군요. 컬러풀한 포인트 소품과 밝은 색채의 공간이 영감을 극대화합니다.',
    kits: [
      { emoji: '🎨', title: '파스텔 수채화 엽서 세트', desc: '창의 에너지를 담은 파스텔 수채화 6종' },
      { emoji: '📒', title: '창의 아이디어 노트', desc: '도트 그리드 + 마인드맵 아이디어 저널' }
    ]
  },
  M10: {
    service: 'mood', emoji: '🌅', name: '따스한 기억 공간',
    sub: '햇살 × 안정과 그리움이 필요한 날',
    gradient: 'linear-gradient(135deg,#b45309,#92400e)',
    color: '#fde68a',
    desc: '따뜻한 햇살이 그리움과 포근한 안정감을 불러오는 날이군요. 노을빛 조명과 오래된 사진들로 채워진 공간이 마음을 감싸안아 줍니다.',
    kits: [
      { emoji: '🌇', title: '골든 아워 조명 필터', desc: '따뜻한 노을빛 필터 + 간접 조명 전구 교체 키트' },
      { emoji: '📸', title: '복고 폴라로이드 사진 키트', desc: '추억을 현상하는 인스탁스 필름 세트' }
    ]
  },
  M11: {
    service: 'mood', emoji: '🌪️', name: '에너지 전환 공간',
    sub: '불안 × 변화가 필요한 날',
    gradient: 'linear-gradient(135deg,#7f1d1d,#991b1b)',
    color: '#fca5a5',
    desc: '앞이 보이지 않는 불안이 당신을 지치게 하고 있군요. 에너지의 방향을 바꾸는 공간 재배치와 강렬한 대비 컬러가 변화의 파동을 일으킵니다.',
    kits: [
      { emoji: '🔄', title: '스파이럴 에너지 디퓨저', desc: '에너지 리셋을 위한 시트러스+민트 블렌딩 디퓨저' },
      { emoji: '📓', title: '변화 다짐 저널', desc: '불안을 글로 내려놓는 언러닝(unlearning) 노트' }
    ]
  },
  M12: {
    service: 'mood', emoji: '🍂', name: '계절의 쉼터 공간',
    sub: '복합적 감정이 교차하는 날',
    gradient: 'linear-gradient(135deg,#78350f,#92400e)',
    color: '#fcd34d',
    desc: '다양한 감정이 교차하는 계절의 환절기 같은 날이군요. 계절의 변화를 받아들이듯 지금 이 복잡한 감정도 자연스러운 과정임을 기억하세요.',
    kits: [
      { emoji: '🍵', title: '계절 아로마 샘플러', desc: '봄·여름·가을·겨울 시즌 향 미니 샘플 4종' },
      { emoji: '📔', title: '감사 일기장', desc: '오늘의 작은 감사를 기록하는 그라티튜드 저널' }
    ]
  },

  // ── 아로마 북 테라피 결과 10가지 ──────────────────────────
  A1: {
    service: 'aroma', emoji: '🌲', name: '숲속 사색자',
    sub: '우디 향 × 깊은 성찰과 위로',
    gradient: 'linear-gradient(135deg,#14532d,#166534)',
    color: '#86efac',
    desc: '피톤치드 향기와 함께 깊은 사색에 잠기는 분이시군요. 시더우드 향이 뇌를 진정시키고 책의 문장을 더욱 깊이 흡수하게 합니다. 숲속을 걷는 듯한 몰입이 활자를 통해 실현됩니다.',
    kits: [
      { emoji: '🌲', title: '시더우드+편백 사색 롤온', desc: '숲의 피톤치드가 담긴 10ml 롤온 아로마 오일' },
      { emoji: '📚', title: '숲 테마 독서 가이드북', desc: '자연과 문학을 연결하는 에디터 큐레이션 독서 카드' }
    ]
  },
  A2: {
    service: 'aroma', emoji: '🔥', name: '우디 에너지 집중가',
    sub: '우디 향 × 새로운 활력과 에너지',
    gradient: 'linear-gradient(135deg,#365314,#3f6212)',
    color: '#bef264',
    desc: '숲의 에너지를 삼키듯 독서로 활력을 충전하는 분이시군요. 샌달우드의 묵직함이 집중력을 강화하고 책에서 배운 지식을 즉시 실행하고 싶게 만듭니다.',
    kits: [
      { emoji: '⚡', title: '샌달우드+블랙페퍼 에너지 롤온', desc: '집중력과 활력을 동시에 끌어올리는 10ml 롤온' },
      { emoji: '📓', title: '실행 계획 노트', desc: '책에서 얻은 인사이트를 액션 플랜으로 정리하는 저널' }
    ]
  },
  A3: {
    service: 'aroma', emoji: '🍋', name: '시트러스 자유 영혼',
    sub: '시트러스 향 × 해방감과 설렘',
    gradient: 'linear-gradient(135deg,#713f12,#92400e)',
    color: '#fed7aa',
    desc: '상큼한 시트러스 향과 함께 책 속 세계로 자유롭게 여행 떠나는 분이시네요. 베르가못의 신선한 향분자가 창의적 연상을 활성화하며 자유로운 독서 몰입을 이끌어냅니다.',
    kits: [
      { emoji: '🕊️', title: '베르가못+자몽 프리덤 롤온', desc: '해방감과 자유를 담은 시트러스 블렌딩 10ml 롤온' },
      { emoji: '✈️', title: '여행 에세이 큐레이션 리스트', desc: '자유를 꿈꾸는 당신에게 추천하는 여행 에세이 7선' }
    ]
  },
  A4: {
    service: 'aroma', emoji: '🌞', name: '시트러스 명랑 독서가',
    sub: '시트러스 향 × 활력 넘치는 에너지',
    gradient: 'linear-gradient(135deg,#78350f,#b45309)',
    color: '#fde68a',
    desc: '읽고 나면 세상과 더 활기차게 마주하고 싶어지는 분이시군요. 스위트 오렌지의 달콤한 향이 새로운 정보를 즐겁게 받아들이는 학습 분위기를 조성합니다.',
    kits: [
      { emoji: '☀️', title: '스위트오렌지+시나몬 롤온', desc: '명랑한 독서 에너지를 위한 따뜻한 시트러스 롤온' },
      { emoji: '📅', title: '자기계발 독서 플래너', desc: '월간 독서 목표와 요약 기록을 위한 학습 플래너' }
    ]
  },
  A5: {
    service: 'aroma', emoji: '🌸', name: '플로럴 감성 수집가',
    sub: '플로럴 향 × 위로와 깊은 성찰',
    gradient: 'linear-gradient(135deg,#831843,#9d174d)',
    color: '#fbcfe8',
    desc: '꽃향기처럼 섬세한 감성으로 책의 문장을 수집하는 분이시군요. 라벤더의 안정 효과가 감정을 부드럽게 다독이며 문학적 공감을 극대화합니다.',
    kits: [
      { emoji: '🌸', title: '라벤더+네롤리 세레니티 롤온', desc: '감성적 위로와 안정을 위한 플로럴 블렌딩 10ml' },
      { emoji: '🔖', title: '감성 문학 북마크 세트', desc: '시집과 소설을 위한 프레스드 플라워 북마크 5종' }
    ]
  },
  A6: {
    service: 'aroma', emoji: '🌷', name: '플로럴 낭만 탐험가',
    sub: '플로럴 향 × 설렘과 해방감',
    gradient: 'linear-gradient(135deg,#701a75,#86198f)',
    color: '#e9d5ff',
    desc: '화사한 꽃향기와 함께 책 속 낭만적 세계로 빠져드는 분이시네요. 일랑일랑의 달콤하고 화려한 향이 상상의 날개를 펼쳐줍니다.',
    kits: [
      { emoji: '🌺', title: '일랑일랑+로즈 로맨스 롤온', desc: '낭만적 상상력을 자극하는 플로럴 롤온 오일' },
      { emoji: '📖', title: '소설 큐레이션 추천 카드', desc: '낭만적 탐험을 위한 소설 7선 엽서형 추천 카드' }
    ]
  },
  A7: {
    service: 'aroma', emoji: '🖤', name: '머스크 심층 잠수가',
    sub: '머스크 향 × 깊은 몰입과 성찰',
    gradient: 'linear-gradient(135deg,#1e1b4b,#312e81)',
    color: '#c7d2fe',
    desc: '무겁고 깊은 머스크 향과 함께 책의 심연으로 잠수하는 분이시군요. 프랑킨센스의 명상적 향이 대뇌 피질의 집중도를 최고 수준으로 끌어올립니다.',
    kits: [
      { emoji: '🌑', title: '화이트머스크+프랑킨센스 딥포커스 롤온', desc: '심층 집중을 위한 명상적 머스크 블렌딩 10ml' },
      { emoji: '🏛️', title: '철학·인문 독서 가이드', desc: '생각의 깊이를 더하는 인문학 필독서 7선 카드' }
    ]
  },
  A8: {
    service: 'aroma', emoji: '🌙', name: '머스크 고요 명상가',
    sub: '머스크 향 × 안정과 포근한 위로',
    gradient: 'linear-gradient(135deg,#0f172a,#1e293b)',
    color: '#94a3b8',
    desc: '깊고 차분한 머스크 향기 속에서 마음의 소음을 지우며 독서하는 분이시네요. 패출리의 안정시키는 향이 읽는 내내 명상적 고요함을 유지시켜 줍니다.',
    kits: [
      { emoji: '🌿', title: '패출리+머스크 미디테이션 롤온', desc: '고요한 명상 독서를 위한 10ml 머스크 블렌딩' },
      { emoji: '📕', title: '힐링 에세이 북키트', desc: '마음의 소음을 가라앉히는 힐링 에세이 큐레이션 3선' }
    ]
  },
  A9: {
    service: 'aroma', emoji: '🌿', name: '균형의 치유사',
    sub: '우디+플로럴 × 산란한 생각에서 몰입으로',
    gradient: 'linear-gradient(135deg,#166534,#7c3aed)',
    color: '#a7f3d0',
    desc: '독서 중 머릿속 생각이 많아지는 분이시군요. 우디와 플로럴이 균형있게 블렌딩된 향이 산란한 생각을 잔잔하게 가라앉히고 활자에 집중하도록 도와줍니다.',
    kits: [
      { emoji: '⚖️', title: '우디+플로럴 균형 롤온', desc: '시더우드 50% + 라벤더 50% 밸런싱 블렌딩 10ml' },
      { emoji: '📋', title: '마인드풀 독서법 가이드', desc: '생각을 비우고 책에 집중하는 5단계 독서 루틴 카드' }
    ]
  },
  A10: {
    service: 'aroma', emoji: '⚡', name: '이중 독서가',
    sub: '시트러스+머스크 × 자유로운 자세로 가장 깊이',
    gradient: 'linear-gradient(135deg,#0c4a6e,#78350f)',
    color: '#7dd3fc',
    desc: '가장 자유로운 자세로 가장 깊이 책을 읽는 분이시군요. 시트러스의 상쾌함과 머스크의 묵직함이 교차하는 콘트라스트 블렌딩이 역설적인 몰입 상태를 만들어냅니다.',
    kits: [
      { emoji: '⚡', title: '시트러스+머스크 컨트라스트 롤온', desc: '베르가못 60% + 화이트머스크 40% 독창적 블렌딩 10ml' },
      { emoji: '📝', title: '나만의 개성 독서 리스트', desc: '독서 취향 유형별 큐레이션 맞춤 추천 카드 12선' }
    ]
  }
};

// ============================================================
// 스코어링 엔진
// ============================================================

function calculateWillResult(answers) {
  const typeMap = {
    q3: { relationship: 'W3', moments: 'W5', freedom: 'W9', records: 'W6', achievement: 'W2' },
    q4: { love: 'W3', gratitude: 'W10', sorry: 'W1', proud: 'W8', courage: 'W2' },
    q5: { family: 'W3', travel: 'W9', write: 'W6', music: 'W7', volunteer: 'W8' },
    q6: { memory: 'W5', work: 'W6', influence: 'W8', peace: 'W10', freedom: 'W9' },
    q7: { unsaid: 'W1', challenge: 'W2', relations: 'W3', moments: 'W5', alone: 'W4' }
  };

  const scores = {};
  ['q3', 'q4', 'q5', 'q6', 'q7'].forEach(q => {
    const t = typeMap[q]?.[answers[q]];
    if (t) scores[t] = (scores[t] || 0) + 1;
  });

  // Special: W7 if classic music + music last day
  if (answers.q2 === 'classic' && answers.q5 === 'music') return 'W7';

  // Find highest
  let best = 'W1', max = 0;
  for (const [type, score] of Object.entries(scores)) {
    if (score > max || (score === max && type === typeMap.q3?.[answers.q3])) {
      max = score; best = type;
    }
  }
  return best;
}

function calculateMoodResult(answers) {
  // M11: anxiety driven
  if (answers.q6 === 'anxiety') return 'M11';

  const matrix = {
    sunny:    { energy: 'M1', connection: 'M2', ventilation: 'M3', calm: 'M4', comfort: 'M10' },
    cloudy:   { energy: 'M3', connection: 'M2', ventilation: 'M3', calm: 'M4', comfort: 'M5'  },
    rain:     { energy: 'M5', connection: 'M6', ventilation: 'M6', calm: 'M4', comfort: 'M5'  },
    fog:      { energy: 'M7', connection: 'M8', ventilation: 'M7', calm: 'M8', comfort: 'M8'  },
    sunshine: { energy: 'M9', connection: 'M2', ventilation: 'M9', calm: 'M10', comfort: 'M10' }
  };

  const result = matrix[answers.q1]?.[answers.q3];
  return result || 'M12';
}

function calculateAromaResult(answers) {
  if (answers.q3 === 'floor') return 'A10';
  if (answers.q4 === 'thoughts') return 'A9';

  const matrix = {
    woody:  { reflection: 'A1', comfort: 'A1', energy: 'A2', freedom: 'A2', excitement: 'A2' },
    citrus: { freedom: 'A3', excitement: 'A3', energy: 'A4', comfort: 'A4', reflection: 'A3' },
    floral: { comfort: 'A5', reflection: 'A5', excitement: 'A6', freedom: 'A6', energy: 'A6' },
    musk:   { reflection: 'A7', energy: 'A7', comfort: 'A8', freedom: 'A8', excitement: 'A7' }
  };

  return matrix[answers.q2]?.[answers.q7] || 'A1';
}

// ============================================================
// 폼 초기화 및 단계 제어
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initPhoneFormatter();
  initPurposeSelector();
  initChoiceCards();
  document.getElementById('healing-form').addEventListener('submit', finalizeSubmission);
});

// 진행 순서: 목적 → 질문 → 결과 → 체험단 신청 → 정보 → 동의  (완료는 별도)
const FLOW = ['purpose', 'questions', 'result', 'apply', 'info', 'consent'];
let currentStep = 'start';
let purposeAdvanceTimer = null;
const surveyState = { purpose: null, answers: {}, resultKey: null };

function initPhoneFormatter() {
  const phoneInput = document.getElementById('user-phone');
  if (!phoneInput) return;
  phoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length < 4) e.target.value = v;
    else if (v.length < 7) e.target.value = v.slice(0,3) + '-' + v.slice(3);
    else if (v.length < 11) e.target.value = v.slice(0,3) + '-' + v.slice(3,7) + '-' + v.slice(7);
    else e.target.value = v.slice(0,3) + '-' + v.slice(3,7) + '-' + v.slice(7,11);
  });
}

function applyPurpose(sel) {
  surveyState.purpose = sel;
  document.body.dataset.theme = sel;
  document.querySelectorAll('.service-question-group').forEach(g => g.classList.remove('active'));
  document.getElementById(`questions-${sel}`)?.classList.add('active');
  document.getElementById('purpose-error').style.display = 'none';
}

function schedulePurposeAdvance() {
  // 이미지 강조를 잠깐 보여준 뒤 자동으로 질문 단계로 이동
  clearTimeout(purposeAdvanceTimer);
  purposeAdvanceTimer = setTimeout(() => {
    if (currentStep === 'purpose') goToStep('questions');
  }, 320);
}

function initPurposeSelector() {
  // 라디오 값이 바뀔 때 (키보드 선택 포함)
  document.querySelectorAll('input[name="participationPurpose"]').forEach(radio => {
    radio.addEventListener('change', () => {
      applyPurpose(radio.value);
      schedulePurposeAdvance();
    });
  });

  // 카드를 클릭하면 (이미 선택된 카드를 다시 눌러도) 항상 질문 단계로 이동
  document.querySelectorAll('.purpose-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.insta-badge')) return; // 인스타 링크 클릭은 제외
      const radio = card.querySelector('input[type="radio"]');
      if (!radio) return;
      radio.checked = true;
      applyPurpose(radio.value);
      schedulePurposeAdvance();
    });
  });
}

function initChoiceCards() {
  document.querySelectorAll('.choice-card input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const name = radio.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
        r.closest('.choice-card')?.classList.remove('selected');
      });
      radio.closest('.choice-card')?.classList.add('selected');

      // 선택하면 다음 문항(마지막이면 '결과 보기' 버튼)으로 자동 이동
      advanceToNextQuestion(radio);
    });
  });
}

function advanceToNextQuestion(radio) {
  const block = radio.closest('.question-block');
  const group = radio.closest('.service-question-group');
  if (!block || !group) return;

  const blocks = [...group.querySelectorAll('.question-block')];
  const next = blocks[blocks.indexOf(block) + 1];

  clearTimeout(advanceToNextQuestion._t);
  advanceToNextQuestion._t = setTimeout(() => {
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // 마지막 문항 → 결과 보기 버튼으로
      document.querySelector('#step-questions .form-navigation')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 240);
}

function startSurvey() {
  goToStep('purpose');
}

function goBackToWelcome() {
  restartSurvey();
}

function goToStep(name) {
  currentStep = name;
  const wrapper = document.getElementById('progress-wrapper');
  if (FLOW.includes(name)) {
    wrapper.style.display = 'block';
    updateProgress(name);
  } else {
    wrapper.style.display = 'none';
  }
  showStep(name);
}

function updateProgress(name) {
  const idx = FLOW.indexOf(name);
  if (idx < 0) return;
  document.getElementById('progress-fill').style.width = `${(idx / (FLOW.length - 1)) * 100}%`;

  document.querySelectorAll('.step-indicator').forEach(ind => {
    const s = parseInt(ind.dataset.step); // 1-based
    ind.classList.toggle('active', s === idx + 1);
    ind.classList.toggle('completed', s < idx + 1);
  });
}

function showStep(name) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${name}`)?.classList.add('active');

  const card = document.getElementById('form-glass-card');
  if (card) card.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 목적 단계 → 질문 (수동 '다음' 버튼용)
function goPurposeNext() {
  const sel = document.querySelector('input[name="participationPurpose"]:checked');
  if (!sel) { document.getElementById('purpose-error').style.display = 'block'; return; }
  goToStep('questions');
}

// 질문 단계 → 결과 계산 후 결과 페이지로
function submitQuestions() {
  const purpose = surveyState.purpose || document.querySelector('input[name="participationPurpose"]:checked')?.value;
  if (!purpose) { goToStep('purpose'); return; }
  if (!validateServiceQuestions(purpose)) return;

  surveyState.purpose = purpose;
  surveyState.answers = gatherAnswers(purpose);
  surveyState.resultKey =
    purpose === 'will' ? calculateWillResult(surveyState.answers) :
    purpose === 'mood' ? calculateMoodResult(surveyState.answers) :
    calculateAromaResult(surveyState.answers);

  renderResult(purpose, surveyState.answers, surveyState.resultKey);
  goToStep('result');
}

// 정보 단계 → 동의 단계
function submitInfo() {
  if (!validateInfo()) return;
  goToStep('consent');
}

// ============================================================
// 유효성 검사
// ============================================================

function validateInfo() {
  let ok = true;
  const name = document.getElementById('user-name');
  const age = document.getElementById('user-age');
  const phone = document.getElementById('user-phone');

  const showErr = (el, errId) => {
    el.closest('.form-group')?.classList.add('has-error');
    el.classList.add('is-invalid');
    document.getElementById(errId).style.display = 'block';
    ok = false;
  };
  const clearErr = (el, errId) => {
    el.closest('.form-group')?.classList.remove('has-error');
    el.classList.remove('is-invalid');
    document.getElementById(errId).style.display = 'none';
  };

  if (!name.value.trim()) showErr(name, 'name-error'); else clearErr(name, 'name-error');
  const ageVal = parseInt(age.value);
  if (!age.value || ageVal < 20 || ageVal > 27) showErr(age, 'age-error'); else clearErr(age, 'age-error');
  const phoneClean = phone.value.replace(/[^0-9]/g, '');
  if (phoneClean.length < 10) showErr(phone, 'phone-error'); else clearErr(phone, 'phone-error');

  return ok;
}

function validateServiceQuestions(purpose) {
  const prefixMap = { will: 'will', mood: 'mood', aroma: 'aroma' };
  const questionsMap = {
    will: ['willQ2','willQ3','willQ4','willQ5','willQ6','willQ7'],
    mood: ['moodQ1','moodQ2','moodQ3','moodQ4','moodQ5','moodQ6','moodQ7'],
    aroma: ['aromaQ1','aromaQ2','aromaQ3','aromaQ4','aromaQ5','aromaQ6','aromaQ7']
  };

  const qs = questionsMap[purpose] || [];
  let ok = true;

  qs.forEach(name => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    const group = document.querySelector(`input[name="${name}"]`)?.closest('.question-block');
    if (!checked && group) {
      group.classList.add('has-error');
      ok = false;
    } else if (group) {
      group.classList.remove('has-error');
    }
  });

  // Will Q1 textarea
  if (purpose === 'will') {
    const q1 = document.getElementById('will-q1');
    if (q1 && !q1.value.trim()) {
      q1.classList.add('is-invalid');
      ok = false;
    } else if (q1) {
      q1.classList.remove('is-invalid');
    }
  }

  if (!ok) {
    const firstErr = document.querySelector('.service-question-group.active .has-error, .service-question-group.active .is-invalid');
    firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return ok;
}

// ============================================================
// 폼 제출
// ============================================================

function gatherAnswers(purpose) {
  const answers = {};
  const fields = {
    will:  ['willQ2', 'willQ3', 'willQ4', 'willQ5', 'willQ6', 'willQ7'],
    mood:  ['moodQ1', 'moodQ2', 'moodQ3', 'moodQ4', 'moodQ5', 'moodQ6', 'moodQ7'],
    aroma: ['aromaQ1', 'aromaQ2', 'aromaQ3', 'aromaQ4', 'aromaQ5', 'aromaQ6', 'aromaQ7']
  }[purpose] || [];

  if (purpose === 'will') answers.q1 = document.getElementById('will-q1')?.value.trim();

  fields.forEach((f, i) => {
    const key = 'q' + (purpose === 'will' ? i + 2 : i + 1);
    answers[key] = document.querySelector(`input[name="${f}"]:checked`)?.value;
  });

  return answers;
}

// 동의 단계 제출 → 저장 후 완료 화면
async function finalizeSubmission(e) {
  if (e) e.preventDefault();

  const consent = document.getElementById('privacy-consent');
  if (!consent.checked) {
    document.getElementById('consent-error').style.display = 'block';
    document.querySelector('.checkbox-container')?.classList.add('has-error');
    return;
  }
  document.getElementById('consent-error').style.display = 'none';
  document.querySelector('.checkbox-container')?.classList.remove('has-error');

  const result = RESULT_DATA[surveyState.resultKey] || null;
  const submission = {
    id: Date.now(),
    source: 'diagnosis',
    purpose: surveyState.purpose,
    resultKey: surveyState.resultKey,
    resultSnapshot: result ? {
      emoji: result.emoji,
      name: result.name,
      sub: result.sub,
      desc: result.desc,
      color: result.color,
      gradient: result.gradient,
      kits: result.kits
    } : null,
    userName: document.getElementById('user-name').value.trim(),
    userAge: document.getElementById('user-age').value,
    userPhone: document.getElementById('user-phone').value,
    answers: surveyState.answers,
    submittedAt: new Date().toISOString()
  };

  try {
    if (window.HealingDB) {
      await window.HealingDB.addSubmission(submission);
    } else {
      const existing = JSON.parse(localStorage.getItem('healing_submissions') || '[]');
      existing.unshift(submission);
      localStorage.setItem('healing_submissions', JSON.stringify(existing));
    }
  } catch (error) {
    console.error('Failed to save submission.', error);
    alert('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  document.getElementById('done-user-name').textContent = submission.userName || '메이트';
  goToStep('done');
}

// ============================================================
// 결과 화면 렌더링
// ============================================================

function renderResult(purpose, answers, resultKey) {
  const result = RESULT_DATA[resultKey] || RESULT_DATA['W1'];

  // Update type badge / name / sub
  const badge = document.getElementById('result-type-badge');
  badge.textContent = `${result.emoji} ${result.name}`;
  badge.style.background = result.gradient;
  document.getElementById('result-type-name').textContent = result.name;
  document.getElementById('result-type-sub').textContent = result.sub;

  // Result body card accent color
  const bodyCard = document.getElementById('result-body-card');
  bodyCard.style.borderColor = result.color + '44';

  // Hide all service visuals, show relevant
  document.querySelectorAll('.result-visual-item').forEach(el => el.classList.remove('active'));

  if (purpose === 'will') {
    document.getElementById('visual-will')?.classList.add('active');
    document.getElementById('lp-music-genre').textContent = getWillQ2Label(answers.q2);
    document.getElementById('result-will-quote').textContent = answers.q1 || '...';
  } else if (purpose === 'mood') {
    document.getElementById('visual-mood')?.classList.add('active');
    document.getElementById('result-weather-val').textContent = getMoodQ1Label(answers.q1);
    document.getElementById('result-light-val').textContent = getMoodQ2Label(answers.q2);

    const orbMap = {
      sunny: 'linear-gradient(135deg,#f59e0b,#d97706)',
      cloudy: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
      rain: 'linear-gradient(135deg,#485563,#29323c)',
      fog: 'linear-gradient(135deg,#e6e9f0,#eef1f5)',
      sunshine: 'linear-gradient(135deg,#ffd35c,#ff8540)'
    };
    document.getElementById('mood-color-orb').style.background = orbMap[answers.q1] || orbMap.sunny;
  } else if (purpose === 'aroma') {
    document.getElementById('visual-aroma')?.classList.add('active');
    document.getElementById('bottle-book-genre').textContent = getAromaQ1Label(answers.q1);
    renderAromaRecipe(answers.q2, result.color);
  }

  // Diagnosis text + kits
  document.getElementById('result-diagnosis-desc').textContent = result.desc;
  const kitGrid = document.getElementById('result-kit-list');
  kitGrid.innerHTML = result.kits.map(k => `
    <div class="kit-item">
      <div class="kit-item-icon">${k.emoji}</div>
      <div class="kit-item-details">
        <span class="kit-item-title">${k.title}</span>
        <span class="kit-item-desc">${k.desc}</span>
      </div>
    </div>
  `).join('');
}

// ============================================================
// 라벨 헬퍼
// ============================================================

function getWillQ2Label(val) {
  const m = { classic:'클래식/뉴에이지', indie:'인디 발라드', pop:'밝고 신나는 팝', jazz:'재즈/블루스', custom:'직접 선곡 플레이리스트' };
  return m[val] || val;
}

function getMoodQ1Label(val) {
  const m = { sunny:'맑음', cloudy:'흐림', rain:'가을비', fog:'안개', sunshine:'따뜻한 햇살' };
  return m[val] || val;
}

function getMoodQ2Label(val) {
  const m = { indirect:'은은한 간접조명', spotlight:'포근한 스탠드', natural:'자연광', dark:'완전한 암막' };
  return m[val] || val;
}

function getAromaQ1Label(val) {
  const m = { novel:'소설/시집', essay:'에세이', selfdev:'자기계발서', humanities:'인문/철학/사회', magazine:'잡지/화보집' };
  return m[val] || val;
}

function renderAromaRecipe(scent, accentColor) {
  const recipes = {
    woody:  [{ name:'시더우드 (Cedarwood)', pct:50 },{ name:'샌달우드 (Sandalwood)', pct:30 },{ name:'편백 오일 (Hinoki)', pct:20 }],
    citrus: [{ name:'베르가못 (Bergamot)', pct:60 },{ name:'스위트 오렌지 (Orange)', pct:25 },{ name:'자몽 (Grapefruit)', pct:15 }],
    floral: [{ name:'라벤더 (Lavender)', pct:50 },{ name:'네롤리 (Neroli)', pct:30 },{ name:'일랑일랑 (Ylang-Ylang)', pct:20 }],
    musk:   [{ name:'화이트 머스크 (Musk)', pct:60 },{ name:'패출리 (Patchouli)', pct:25 },{ name:'프랑킨센스 (Frankincense)', pct:15 }]
  };
  const liquidColors = {
    woody: '#059669', citrus: '#d97706', floral: '#7c3aed', musk: '#1e40af'
  };

  const recipe = recipes[scent] || recipes.woody;
  document.getElementById('bottle-liquid-color').style.background =
    `linear-gradient(180deg, ${liquidColors[scent] || '#059669'}, transparent)`;

  const box = document.getElementById('result-aroma-recipe-list');
  box.innerHTML = recipe.map(item => `
    <div class="recipe-bar-row">
      <div class="recipe-info">
        <span class="recipe-label">${item.name}</span>
        <span class="recipe-pct">${item.pct}%</span>
      </div>
      <div class="recipe-track">
        <div class="recipe-bar-fill" style="width:${item.pct}%; background:${accentColor};"></div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// 폼 리셋
// ============================================================

function restartSurvey() {
  clearTimeout(purposeAdvanceTimer);
  document.getElementById('healing-form').reset();
  document.body.dataset.theme = 'default';
  document.querySelectorAll('.service-question-group').forEach(g => g.classList.remove('active'));
  document.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.question-block').forEach(b => b.classList.remove('has-error'));
  document.querySelectorAll('.form-group').forEach(b => b.classList.remove('has-error'));
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  document.querySelector('.checkbox-container')?.classList.remove('has-error');
  document.getElementById('purpose-error').style.display = 'none';
  const ce = document.getElementById('consent-error');
  if (ce) ce.style.display = 'none';
  surveyState.purpose = null;
  surveyState.answers = {};
  surveyState.resultKey = null;
  goToStep('start');
}

// 이전 이름 호환 별칭
const resetForm = restartSurvey;
