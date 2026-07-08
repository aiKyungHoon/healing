/* ==========================================================================
   Cozy & Premium Healing Console Script (admin.js)
   ========================================================================== */

// Standard Mock Data for initialization
const INITIAL_MOCK_DATA = [
  {
    id: "sub_mock_1",
    purpose: "aroma",
    userName: "김민재",
    userAge: 24,
    userPhone: "010-3849-2048",
    answers: {
      q1: "경험과 공감의 에세이",
      q2: "숲길을 걷는 듯한 피톤치드 우디향"
    },
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  },
  {
    id: "sub_mock_2",
    purpose: "will",
    userName: "이지은",
    userAge: 21,
    userPhone: "010-8472-9274",
    answers: {
      q1: "태어나서 네 언니로, 네 친구로 살 수 있어서 정말 행복했어. 사랑해.",
      q2: "잔잔한 인디 발라드"
    },
    submittedAt: new Date(Date.now() - 3600000 * 6).toISOString() // 6 hours ago
  },
  {
    id: "sub_mock_3",
    purpose: "mood",
    userName: "박서준",
    userAge: 25,
    userPhone: "010-4829-1053",
    answers: {
      q1: "다정하게 부서지는 따뜻한 햇살",
      q2: "은은한 간접 조명 (노을빛)"
    },
    submittedAt: new Date(Date.now() - 3600000 * 12).toISOString() // 12 hours ago
  },
  {
    id: "sub_mock_4",
    purpose: "aroma",
    userName: "최소희",
    userAge: 23,
    userPhone: "010-9284-7482",
    answers: {
      q1: "감성을 자극하는 소설/시집",
      q2: "마음을 포근히 감싸주는 은은한 플로럴"
    },
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
  },
  {
    id: "sub_mock_5",
    purpose: "will",
    userName: "정우성",
    userAge: 27,
    userPhone: "010-3948-2849",
    answers: {
      q1: "후회 없이 신나게 놀다 갑니다! 남은 사람들도 매 순간 행복하길 바랄게요.",
      q2: "슬프지 않은 밝고 신나는 팝"
    },
    submittedAt: new Date(Date.now() - 3600000 * 30).toISOString() // 1.2 days ago
  },
  {
    id: "sub_mock_6",
    purpose: "mood",
    userName: "강하늘",
    userAge: 26,
    userPhone: "010-8572-1048",
    answers: {
      q1: "차분하고 선선한 흐림",
      q2: "포근하고 따뜻한 스탠드 스팟"
    },
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString() // 2 days ago
  },
  {
    id: "sub_mock_7",
    purpose: "aroma",
    userName: "윤아름",
    userAge: 20,
    userPhone: "010-5829-3829",
    answers: {
      q1: "시야를 넓히는 인문/철학/사회",
      q2: "생각을 가라앉히는 차분하고 묵직한 머스크"
    },
    submittedAt: new Date(Date.now() - 3600000 * 72).toISOString() // 3 days ago
  }
];

let submissions = [];
let currentFilter = 'all';
let searchQuery = '';

const SERVICE_KOREAN = {
  will: '유언 프로젝트',
  mood: '무드 진단',
  aroma: '아로마 북 테라피'
};

const SERVICE_BADGE_CLASS = {
  will: 'will-bg',
  mood: 'mood-bg',
  aroma: 'aroma-bg'
};

const DIAGNOSIS_QUESTION_LABELS = {
  will: {
    q1: '만약 내일이 삶의 마지막이라면, 소중한 사람에게 남길 첫 한 마디는?',
    q2: '나의 장례식장에서 흐를 플레이리스트 장르는?',
    q3: '삶에서 가장 소중한 것은 무엇인가요?',
    q4: '가장 표현하지 못했던 감정은 무엇인가요?',
    q5: '마지막 하루, 어떻게 보내고 싶으신가요?',
    q6: '세상에 남기고 싶은 흔적은 무엇인가요?',
    q7: '삶의 끝에서 가장 후회할 것 같은 것은?'
  },
  mood: {
    q1: "오늘 나의 기분을 '날씨'로 표현한다면?",
    q2: '하루를 마치고 방에 들어섰을 때 가장 편안한 조도는?',
    q3: '지금 가장 필요한 감정 보충제는 무엇인가요?',
    q4: '쉬고 싶을 때 가고 싶은 공간은?',
    q5: '지금 배경으로 깔고 싶은 사운드는?',
    q6: '요즘 나를 가장 지치게 하는 것은?',
    q7: '오늘 나에게 선물하고 싶은 감각적 경험은?'
  },
  aroma: {
    q1: '지치거나 여유가 필요할 때 주로 읽는 도서 장르는?',
    q2: '독서할 때 나의 호흡을 진정시켜 줄 향의 계열은?',
    q3: '독서할 때 나의 자세는?',
    q4: '독서 중 가장 집중을 방해하는 요소는?',
    q5: '책 읽을 때 함께하는 음료는?',
    q6: '나에게 독서란 어떤 의미인가요?',
    q7: '독서를 마치고 나면 주로 남겨지는 감정은?'
  }
};

const ANSWER_LABELS = {
  classic:'클래식 / 뉴에이지', indie:'잔잔한 인디 발라드', pop:'밝고 신나는 팝', jazz:'재즈 / 블루스', custom:'내가 직접 선곡',
  relationship:'사람과의 관계', moments:'작은 순간들', freedom:'자유와 여행', records:'기록과 흔적', achievement:'나의 성취',
  love:'사랑한다는 말', gratitude:'감사하다는 말', sorry:'미안하다는 말', proud:'자랑스럽다는 말', courage:'용기를 내지 못한 것',
  family:'가족과 함께 식사', travel:'혼자 좋아하는 여행지로', write:'글쓰기와 기록으로', music:'음악 듣고 그림 그리며', volunteer:'낯선 이에게 봉사',
  memory:'누군가의 마음속 기억', work:'글 / 작품 / 창작물', influence:'내가 준 긍정적 영향', peace:'조용한 평화',
  unsaid:'말 못한 감정들', challenge:'하지 못한 도전들', relations:'소홀했던 관계들', alone:'나만의 시간 부족',
  sunny:'구름 한 점 없는 맑음', cloudy:'차분하고 선선한 흐림', rain:'쓸쓸한 가을비', fog:'앞이 보이지 않는 안개', sunshine:'다정하게 부서지는 햇살',
  indirect:'은은한 간접조명 (노을빛)', spotlight:'포근한 스탠드 스팟', natural:'창문으로 스며드는 자연광', dark:'완전한 암막 어둠',
  energy:'에너지와 활력', connection:'포근한 연결감', ventilation:'가벼운 환기', calm:'깊은 고요와 안정', comfort:'감성적 위로',
  nature:'자연 속 숲 / 바다', room:'아늑한 나만의 방', cafe:'조용한 카페 구석자리', empty:'아무것도 없는 빈 공간', people:'사랑하는 사람 옆',
  lofi:'Lo-fi 음악', wind:'자연의 바람소리', tasks:'끝없는 할 일 목록', anxiety:'앞이 보이지 않는 불안', routine:'반복되는 일상', self:'나 자신에 대한 실망',
  bath:'따뜻한 목욕과 아로마', food:'맛있는 음식 혼자', walk:'핸드폰 없이 긴 산책', movie:'좋아하는 영화 다시보기', nothing:'아무것도 안 하기',
  novel:'소설 / 시집', essay:'에세이', selfdev:'자기계발서', humanities:'인문 / 철학 / 사회', magazine:'잡지 / 화보집',
  woody:'숲·피톤치드 우디향', citrus:'상큼한 시트러스향', floral:'화사한 플로럴향', musk:'묵직한 머스크향',
  bed:'침대에 누워 옆으로', desk:'책상 앞 바르게 앉아', sofa:'소파에 웅크리고', floor:'바닥에 쿠션 놓고',
  noise:'소음과 잡음', phone:'스마트폰 알림', light:'너무 밝거나 어두운 조명', posture:'불편한 자세', thoughts:'흐트러지는 생각들',
  chamomile:'따뜻한 허브티', coffee:'아메리카노 / 핸드드립', latte:'따뜻한 라테', water:'물 / 탄산수', cocoa:'달콤한 코코아',
  mirror:'내면을 보는 거울', tool:'지식을 쌓는 도구', escape:'나를 잊는 탈출구',
  reflection:'깊은 성찰과 여운', excitement:'설렘과 영감'
};

const INTERVIEW_QUESTION_LABELS = {
  q1: '어떤 계기로 이 힐링 프로젝트에 참여하게 되셨나요?',
  q2: '체험 과정에서 가장 기억에 남는 순간은 언제였나요?',
  q3: '힐링 전과 후, 나에게 어떤 변화가 있었나요?',
  q4: '비슷한 고민을 가진 또래에게 한마디 한다면?'
};

const CONTEXT_ANSWER_LABELS = {
  'will.q3.freedom': '자유와 여행',
  'will.q5.travel': '혼자 좋아하는 여행지로',
  'will.q5.write': '글쓰기와 기록으로',
  'will.q5.music': '음악 듣고 그림 그리며',
  'will.q6.freedom': '자유로운 삶의 궤적',
  'will.q7.moments': '흘려보낸 순간들',
  'mood.q4.nature': '자연 속 숲 / 바다',
  'mood.q4.room': '아늑한 나만의 방',
  'mood.q4.cafe': '조용한 카페 구석자리',
  'mood.q4.people': '사랑하는 사람 옆',
  'mood.q5.rain': '빗소리 / 파도소리',
  'mood.q6.people': '복잡한 인간관계',
  'aroma.q3.cafe': '카페에서 음료와 함께',
  'aroma.q5.water': '물 / 탄산수',
  'aroma.q6.travel': '다른 세계로의 여행',
  'aroma.q6.comfort': '지친 하루의 위로',
  'aroma.q7.comfort': '위로받고 포근한 기분'
};

document.addEventListener('DOMContentLoaded', () => {
  // Load database
  loadDatabase();
  
  // Setup interactive toolbar filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderTable();
    });
  });
  
  // Setup Search query input
  const searchBox = document.getElementById('search-box');
  searchBox.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTable();
  });
  
  // Setup Admin Utility button actions
  document.getElementById('btn-seed-mock').addEventListener('click', seedMockData);
  document.getElementById('btn-export-csv').addEventListener('click', exportToCSV);
  document.getElementById('btn-clear-db').addEventListener('click', clearDatabase);
  
  // Setup detail modal / dialog listeners
  const dialog = document.getElementById('detail-dialog');
  const backdrop = document.getElementById('dialog-backdrop');
  const closeBtn = document.getElementById('dialog-close-btn');
  
  const closeModal = () => {
    dialog.classList.remove('show');
    backdrop.classList.remove('show');
    if (dialog.open) dialog.close();
  };
  
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  dialog.addEventListener('close', () => {
    dialog.classList.remove('show');
    backdrop.classList.remove('show');
  });
});

// Load submissions database from localStorage (or auto-seed)
function loadDatabase() {
  const localData = localStorage.getItem('healing_submissions');
  
  if (!localData || JSON.parse(localData).length === 0) {
    // Database is empty. Seed initial mock data automatically for previewing
    submissions = [...INITIAL_MOCK_DATA];
    localStorage.setItem('healing_submissions', JSON.stringify(submissions));
  } else {
    submissions = JSON.parse(localData);
  }
  
  updateDashboard();
}

function getDiagnosisSubmissions() {
  return submissions.filter(sub => sub.source !== 'interview');
}

// Update statistics and chart visualizers
function updateDashboard() {
  const diagnosisSubmissions = getDiagnosisSubmissions();
  const total = diagnosisSubmissions.length;
  document.getElementById('stat-total').textContent = total;
  
  // Service count calculation
  const counts = { will: 0, mood: 0, aroma: 0 };
  diagnosisSubmissions.forEach(sub => {
    if (counts[sub.purpose] !== undefined) {
      counts[sub.purpose]++;
    }
  });
  
  document.getElementById('stat-will').textContent = counts.will;
  document.getElementById('stat-mood').textContent = counts.mood;
  document.getElementById('stat-aroma').textContent = counts.aroma;
  
  // Render SVG Donut Chart and Legend Percentages
  renderDonutChart(counts, total);
  
  // Render Age distribution Bar Chart (20 ~ 27)
  renderAgeBarChart();
  
  // Render the submissions data table
  renderTable();
}

// Draw dynamic SVG Donut chart segments
function renderDonutChart(counts, total) {
  const percentWillEl = document.getElementById('percent-will');
  const percentMoodEl = document.getElementById('percent-mood');
  const percentAromaEl = document.getElementById('percent-aroma');
  
  if (total === 0) {
    percentWillEl.textContent = '0%';
    percentMoodEl.textContent = '0%';
    percentAromaEl.textContent = '0%';
    
    document.querySelectorAll('.donut-segment').forEach(seg => {
      seg.setAttribute('stroke-dasharray', '0 440');
    });
    return;
  }
  
  const pWill = (counts.will / total) * 100;
  const pMood = (counts.mood / total) * 100;
  const pAroma = (counts.aroma / total) * 100;
  
  percentWillEl.textContent = `${Math.round(pWill)}% (${counts.will}명)`;
  percentMoodEl.textContent = `${Math.round(pMood)}% (${counts.mood}명)`;
  percentAromaEl.textContent = `${Math.round(pAroma)}% (${counts.aroma}명)`;
  
  // SVG Circumference for radius 70 is approx 440
  const circ = 439.82;
  
  const lenWill = (counts.will / total) * circ;
  const lenMood = (counts.mood / total) * circ;
  const lenAroma = (counts.aroma / total) * circ;
  
  const segWill = document.querySelector('.segment-will');
  const segMood = document.querySelector('.segment-mood');
  const segAroma = document.querySelector('.segment-aroma');
  
  // Will segment starts at offset 0
  segWill.setAttribute('stroke-dasharray', `${lenWill} ${circ}`);
  segWill.setAttribute('stroke-dashoffset', '0');
  
  // Mood segment offset
  segMood.setAttribute('stroke-dasharray', `${lenMood} ${circ}`);
  segMood.setAttribute('stroke-dashoffset', `-${lenWill}`);
  
  // Aroma segment offset
  segAroma.setAttribute('stroke-dasharray', `${lenAroma} ${circ}`);
  segAroma.setAttribute('stroke-dashoffset', `-${lenWill + lenMood}`);
}

// Render dynamic bar charts for ages (20 ~ 27)
function renderAgeBarChart() {
  const ageCounts = { 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0, 27: 0 };
  
  getDiagnosisSubmissions().forEach(sub => {
    const age = sub.userAge;
    if (ageCounts[age] !== undefined) {
      ageCounts[age]++;
    }
  });
  
  // Find maximum frequency for scale factor
  const frequencies = Object.values(ageCounts);
  const maxFreq = Math.max(...frequencies, 1); // Avoid division by 0
  
  // Set heights
  for (let age = 20; age <= 27; age++) {
    const count = ageCounts[age];
    const fillBar = document.querySelector(`.bar-fill[data-age="${age}"]`);
    if (fillBar) {
      const heightPercent = (count / maxFreq) * 100;
      fillBar.style.height = `${Math.max(heightPercent, 5)}%`; // Keep a tiny 5% indicator even for 0 values
      fillBar.querySelector('.bar-value').textContent = count;
    }
  }
}

// Filter, search and render submissions list table
function renderTable() {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  
  // Apply logic filtering & query searching
  const filteredData = getDiagnosisSubmissions().filter(sub => {
    const matchesFilter = (currentFilter === 'all' || sub.purpose === currentFilter);
    const phone = String(sub.userPhone || '');
    const name = String(sub.userName || sub.name || '');
    const matchesSearch = searchQuery === '' || 
                          name.toLowerCase().includes(searchQuery) ||
                          phone.replace(/-/g, '').includes(searchQuery.replace(/-/g, ''));
    
    return matchesFilter && matchesSearch;
  });
  
  if (filteredData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>조건에 부합하는 신청 정보가 존재하지 않습니다.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  
  filteredData.forEach(sub => {
    const row = document.createElement('tr');
    
    // Format timestamp
    const date = new Date(sub.submittedAt);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    // Shorten answer for preview
    let previewText = '';
    if (sub.answers && sub.answers.q1) {
      previewText = formatAnswerValue(sub.answers.q1);
      if (previewText.length > 25) previewText = previewText.substring(0, 22) + '...';
    }
    const userName = sub.userName || sub.name || '익명';
    const userAge = sub.userAge || sub.age || '-';
    const userPhone = sub.userPhone || '-';
    
    row.innerHTML = `
      <td>${dateStr}</td>
      <td style="font-weight:700;">${escapeHTML(userName)}</td>
      <td style="font-family:'Outfit';">${escapeHTML(userAge)}${userAge === '-' ? '' : '세'}</td>
      <td style="font-family:'Outfit';">${escapeHTML(userPhone)}</td>
      <td><span class="table-badge ${SERVICE_BADGE_CLASS[sub.purpose] || ''}">${SERVICE_KOREAN[sub.purpose] || sub.purpose || '-'}</span></td>
      <td class="text-muted" style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(previewText)}</td>
      <td>
        <button class="btn-tbl-view" onclick="openDetailModal('${sub.id}')">상세</button>
        <button class="btn-tbl-pdf" onclick="downloadSubmissionPDF('${sub.id}')">PDF</button>
        <button class="btn-tbl-del" onclick="deleteSubmission('${sub.id}')">삭제</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Open detailed modal dialog for a specific response
window.openDetailModal = function(id) {
  const sub = getDiagnosisSubmissions().find(s => String(s.id) === String(id));
  if (!sub) return;
  
  const dialog = document.getElementById('detail-dialog');
  const backdrop = document.getElementById('dialog-backdrop');
  
  // Set modal text contents
  document.querySelector('#detail-dialog .dialog-header h3').textContent = '신청 정보 세부 정보';
  document.getElementById('modal-name').textContent = sub.userName || sub.name || '익명';
  document.getElementById('modal-age').textContent = sub.userAge || sub.age || '-';
  document.getElementById('modal-phone').textContent = sub.userPhone || '-';
  
  // Format full date
  const dateObj = new Date(sub.submittedAt);
  document.getElementById('modal-date').textContent = dateObj.toLocaleString('ko-KR');
  
  // Badge styling mapping
  const badge = document.getElementById('modal-badge');
  badge.textContent = SERVICE_KOREAN[sub.purpose] || sub.purpose || '-';
  badge.className = 'table-badge';
  
  if (SERVICE_BADGE_CLASS[sub.purpose]) badge.classList.add(SERVICE_BADGE_CLASS[sub.purpose]);
  
  const answersBox = document.getElementById('modal-answers-container');
  answersBox.innerHTML = buildDiagnosisAnswerBlocks(sub);

  answersBox.innerHTML += buildResultBlock(sub);
  
  // Dynamically set CSS variables in dialog wrapper to match thematic color of submission
  const dynamicThemeHues = { 'will': '258', 'mood': '30', 'aroma': '125' };
  dialog.style.setProperty('--primary', `hsl(${dynamicThemeHues[sub.purpose]}, 50%, 55%)`);
  
  // Show elements
  if (!dialog.open) dialog.show();
  dialog.classList.add('show');
  backdrop.classList.add('show');
};

// Delete single response
window.deleteSubmission = function(id) {
  if (!confirm('해당 신청 정보를 영구적으로 삭제하시겠습니까?')) return;
  
  submissions = submissions.filter(sub => String(sub.id) !== String(id));
  localStorage.setItem('healing_submissions', JSON.stringify(submissions));
  updateDashboard();
};

// Utilities button: Seed mock data
function seedMockData() {
  if (confirm('대시보드 통계 테스트를 위해 7건의 20대 MZ 신청자 예시 데이터를 생성하시겠습니까?')) {
    submissions = [...INITIAL_MOCK_DATA, ...submissions];
    localStorage.setItem('healing_submissions', JSON.stringify(submissions));
    updateDashboard();
  }
}

// Utilities button: Clear database
function clearDatabase() {
  if (confirm('저장된 모든 신청 메이트 응답 데이터를 영구적으로 초기화하시겠습니까?')) {
    submissions = [];
    localStorage.setItem('healing_submissions', JSON.stringify(submissions));
    updateDashboard();
  }
}

function buildDiagnosisAnswerBlocks(sub) {
  const labels = DIAGNOSIS_QUESTION_LABELS[sub.purpose] || {};
  const answers = sub.answers || {};
  const keys = Object.keys(labels).length ? Object.keys(labels) : Object.keys(answers);

  return keys.map((key, idx) => `
    <div class="dialog-q-box">
      <div class="dialog-q-label">Q${idx + 1}. ${escapeHTML(labels[key] || key)}</div>
      <div class="dialog-q-val" style="color:#fff;">${escapeHTML(formatAnswerValue(answers[key] || '미응답', sub.purpose, key))}</div>
    </div>
  `).join('');
}

function buildResultBlock(sub) {
  return buildAdminResultCard(sub);
}

function buildAdminResultCard(sub) {
  const result = getSubmissionResult(sub);
  const chips = getResultChips(sub);
  const kits = Array.isArray(result.kits) ? result.kits : [];

  return `
    <div class="admin-result-card">
      <div class="admin-result-hero">
        <div class="admin-result-visual">
          ${buildResultVisual(sub, result)}
        </div>
        <div class="admin-result-summary">
          <div class="admin-result-name">${escapeHTML(`${result.emoji || ''} ${result.name}`)}</div>
          <div class="admin-result-sub">${escapeHTML(result.sub || SERVICE_KOREAN[sub.purpose] || '맞춤 힐링 결과')}</div>
          <div class="admin-result-chips">
            ${chips.map(chip => `
              <span class="admin-result-chip">${escapeHTML(chip.label)}: <strong>${escapeHTML(chip.value)}</strong></span>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="admin-result-section">
        <h4>📋 처방 분석 결과</h4>
        <p>${escapeHTML(result.desc)}</p>
      </div>

      <div class="admin-result-section">
        <h4>📦 발송 예정 힐링 키트</h4>
        <div class="admin-result-kits">
          ${kits.length ? kits.map(kit => `
            <div class="admin-result-kit">
              <div class="admin-result-kit-icon">${escapeHTML(kit.emoji || '•')}</div>
              <div>
                <strong>${escapeHTML(kit.title || '힐링 키트')}</strong>
                <span>${escapeHTML(kit.desc || '')}</span>
              </div>
            </div>
          `).join('') : `
            <div class="admin-result-kit">
              <div class="admin-result-kit-icon">✨</div>
              <div><strong>맞춤 힐링 키트</strong><span>선택 답변을 기준으로 구성됩니다.</span></div>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function buildResultVisual(sub, result) {
  if (sub.purpose === 'mood') {
    return `<div class="admin-result-orb" style="background:${escapeAttribute(getMoodOrbGradient(sub.answers || {}, result))};"></div>`;
  }
  if (sub.purpose === 'aroma') {
    return '<div class="admin-result-bottle"></div>';
  }
  return '<div class="admin-result-book"></div>';
}

function getResultChips(sub) {
  const answers = sub.answers || {};
  if (sub.purpose === 'mood') {
    return [
      { label: '오늘 날씨', value: formatAnswerValue(answers.q1 || '미응답', sub.purpose, 'q1') },
      { label: '선호 조도', value: formatAnswerValue(answers.q2 || '미응답', sub.purpose, 'q2') },
      { label: '필요 감정', value: formatAnswerValue(answers.q3 || '미응답', sub.purpose, 'q3') }
    ];
  }
  if (sub.purpose === 'aroma') {
    return [
      { label: '도서 장르', value: formatAnswerValue(answers.q1 || '미응답', sub.purpose, 'q1') },
      { label: '선호 향', value: formatAnswerValue(answers.q2 || '미응답', sub.purpose, 'q2') },
      { label: '독서 의미', value: formatAnswerValue(answers.q6 || answers.q3 || '미응답', sub.purpose, answers.q6 ? 'q6' : 'q3') }
    ];
  }
  return [
    { label: '마지막 한마디', value: formatAnswerValue(answers.q1 || '미응답', sub.purpose, 'q1') },
    { label: '플레이리스트', value: formatAnswerValue(answers.q2 || '미응답', sub.purpose, 'q2') },
    { label: '삶의 가치', value: formatAnswerValue(answers.q3 || '미응답', sub.purpose, 'q3') }
  ];
}

function getMoodOrbGradient(answers, result) {
  if (result.gradient) return result.gradient;
  const weather = String(answers.q1 || '');
  if (weather.includes('rain') || weather.includes('비')) return 'linear-gradient(135deg,#485563,#29323c)';
  if (weather.includes('fog') || weather.includes('안개')) return 'linear-gradient(135deg,#e6e9f0,#94a3b8)';
  if (weather.includes('cloud') || weather.includes('흐림')) return 'linear-gradient(135deg,#a1c4fd,#c2e9fb)';
  if (weather.includes('sunshine') || weather.includes('햇살')) return 'linear-gradient(135deg,#ffd35c,#ff8540)';
  return 'linear-gradient(135deg,#f59e0b,#d97706)';
}

function escapeAttribute(value) {
  return String(value || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getSubmissionResult(sub) {
  if (sub.resultSnapshot?.name) return sub.resultSnapshot;

  const service = SERVICE_KOREAN[sub.purpose] || '힐링 진단';
  const answers = sub.answers || {};
  const topAnswers = Object.entries(answers)
    .slice(0, 3)
    .map(([key, value]) => formatAnswerValue(value, sub.purpose, key))
    .filter(Boolean)
    .join(', ');

  const fallback = {
    will: {
      emoji: '📖',
      name: '기록형 성찰가',
      desc: `선택하신 답변(${topAnswers || '미응답'})을 기준으로 보면, 지금 가장 중요한 것은 마음속에 남아 있던 말과 관계의 의미를 차분히 기록하는 과정입니다. 유언 프로젝트는 마지막을 상상하는 방식으로 오늘의 우선순위를 다시 세우도록 돕습니다.`,
      kits: [
        { emoji: '📜', title: '성찰 기록지', desc: '마지막 한마디와 남기고 싶은 마음을 정리하는 기록 카드' },
        { emoji: '🖊️', title: '메시지 펜 키트', desc: '소중한 사람에게 전할 문장을 남기는 필기 키트' }
      ]
    },
    mood: {
      emoji: '🌤️',
      name: '감정 공간 조율자',
      desc: `선택하신 답변(${topAnswers || '미응답'})을 기준으로 보면, 현재 마음은 조도와 색감, 소리 같은 공간 감각의 영향을 크게 받는 상태입니다. 무드 진단은 나에게 맞는 쉼의 환경을 찾아 감정 회복의 조건을 정리해줍니다.`,
      kits: [
        { emoji: '💡', title: '무드 조명 가이드', desc: '선호 조도에 맞춘 공간 연출 카드' },
        { emoji: '🎨', title: '감정 컬러 카드', desc: '오늘의 기분에 맞는 컬러 처방 엽서' }
      ]
    },
    aroma: {
      emoji: '🌿',
      name: '오감 독서 몰입가',
      desc: `선택하신 답변(${topAnswers || '미응답'})을 기준으로 보면, 향과 독서가 결합될 때 더 깊게 몰입하고 회복하는 유형입니다. 아로마 북 테라피는 선호 장르와 향 계열을 연결해 나만의 독서 루틴을 만들어줍니다.`,
      kits: [
        { emoji: '📚', title: '독서 큐레이션 카드', desc: '선호 장르 기반 독서 가이드' },
        { emoji: '🧴', title: '아로마 롤온 샘플', desc: '독서 몰입을 돕는 향기 처방 키트' }
      ]
    }
  };

  return fallback[sub.purpose] || {
    emoji: '✨',
    name: `${service} 분석 결과`,
    desc: `선택하신 답변(${topAnswers || '미응답'})을 기준으로 생성한 힐링 분석 결과입니다.`,
    kits: []
  };
}

function buildInterviewResult(entry) {
  const rating = Number(entry.rating || 0);
  const tone = rating >= 5 ? '강한 만족과 몰입' : rating >= 4 ? '긍정적인 회복감' : rating >= 3 ? '차분한 관찰과 보완점' : '아쉬움이 남은 경험';
  const serviceText = {
    will: '삶의 우선순위와 전하지 못한 마음을 다시 바라본 기록입니다.',
    mood: '감정 상태와 공간 감각을 연결해 나에게 맞는 쉼의 조건을 발견한 기록입니다.',
    aroma: '향과 독서를 통해 몰입과 회복의 감각을 구체화한 기록입니다.'
  }[entry.service] || '나에게 맞는 힐링 경험을 돌아본 기록입니다.';

  return {
    title: `${SERVICE_LABELS_ADMIN[entry.service] || entry.service || '힐링'} 인터뷰 결과지 · ${tone}`,
    desc: `${serviceText} Q1~Q4 응답을 기준으로, 참여 계기와 가장 인상 깊었던 순간, 변화와 추천 메시지를 한 장의 인터뷰 결과지로 정리했습니다.`
  };
}

function fillAdminPrint({ title, meta, sections }) {
  const today = new Date();
  document.getElementById('admin-p-date').textContent =
    `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  document.getElementById('admin-p-title').textContent = title;
  document.getElementById('admin-p-meta').innerHTML = meta.map(([label, value]) => `
    <div><b>${escapeHTML(label)}</b><span>${escapeHTML(value || '-')}</span></div>
  `).join('');
  document.getElementById('admin-p-body').innerHTML = sections.map(section => `
    <section class="pr-section ${section.type || ''}">
      <h2>${escapeHTML(section.title)}</h2>
      ${section.html}
    </section>
  `).join('');
}

window.downloadSubmissionPDF = function(id) {
  const sub = getDiagnosisSubmissions().find(s => String(s.id) === String(id));
  if (!sub) return;

  const answerSections = Object.entries(DIAGNOSIS_QUESTION_LABELS[sub.purpose] || {}).map(([key, label], idx) => ({
    title: `Q${idx + 1}. ${label}`,
    html: `<p class="pr-a">${escapeHTML(formatAnswerValue(sub.answers?.[key] || '미응답', sub.purpose, key))}</p>`
  }));

  fillAdminPrint({
    title: '힐링 진단 결과지',
    meta: [
      ['이름', sub.userName || '익명'],
      ['나이', sub.userAge ? `${sub.userAge}세` : '-'],
      ['연락처', sub.userPhone || '-'],
      ['참여 서비스', SERVICE_KOREAN[sub.purpose] || sub.purpose || '-']
    ],
    sections: [{ title: '맞춤 힐링 분석 결과', type: 'result', html: buildAdminResultCard(sub) }, ...answerSections]
  });
  window.print();
};

// Utilities button: Export to CSV (Korean UTF-8 Bom fixed)
function exportToCSV() {
  const diagnosisSubmissions = getDiagnosisSubmissions();
  if (diagnosisSubmissions.length === 0) {
    alert('다운로드할 신청 데이터가 존재하지 않습니다.');
    return;
  }
  
  const serviceNames = { 'will': '유언 프로젝트', 'mood': '무드 진단', 'aroma': '아로마 북 테라피' };
  
  // Header row
  let csvContent = "신청일시,이름,나이,연락처,선택 서비스,사전답변Q1,사전답변Q2\n";
  
  diagnosisSubmissions.forEach(sub => {
    const date = new Date(sub.submittedAt).toLocaleString('ko-KR');
    // Escape double quotes inside values
    const escape = val => `"${String(val).replace(/"/g, '""')}"`;
    
    csvContent += [
      escape(date),
      escape(sub.userName),
      escape(`${sub.userAge}세`),
      escape(sub.userPhone),
      escape(serviceNames[sub.purpose]),
      escape(sub.answers.q1),
      escape(sub.answers.q2)
    ].join(',') + '\n';
  });
  
  // Create download link with BOM for Excel Korean rendering
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `healing_submissions_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ============================================================
// 인터뷰 참여자 로딩 (admin.js 추가)
// ============================================================

const SERVICE_LABELS_ADMIN = {
  will: '📖 유언 프로젝트',
  mood: '🌤️ 무드 진단',
  aroma: '🌿 아로마 북 테라피'
};

function loadInterviewEntries() {
  const stored = JSON.parse(localStorage.getItem('healing_interviews') || '[]');
  const tbody = document.getElementById('map-entries-body');
  const countBadge = document.getElementById('map-entry-count');

  if (!tbody) return;

  if (countBadge) countBadge.textContent = `${stored.length}명`;

  if (stored.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#5a5869;padding:24px;">아직 등록된 인터뷰가 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = stored.map(entry => {
    const date = new Date(entry.ts || entry.submittedAt || Date.now());
    const dateStr = `${date.getMonth()+1}/${date.getDate()} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
    const service = SERVICE_LABELS_ADMIN[entry.service] || entry.service;
    const name = entry.name || entry.userName || '익명';
    const rating = entry.rating ? '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating) : '—';
    const quote = escapeHTML(entry.q2 || entry.q1 || '—');

    return `<tr>
      <td style="color:#aaa7b5;font-size:0.82rem;">${dateStr}</td>
      <td style="font-weight:600;">${escapeHTML(name)}</td>
      <td style="color:#fbbf24;letter-spacing:1px;">${rating}</td>
      <td>${service}</td>
      <td style="color:#aaa7b5;font-size:0.85rem;max-width:320px;">${quote}</td>
      <td>
        <button class="btn-tbl-view" onclick="openInterviewDetail('${entry.id}')">상세</button>
        <button class="btn-tbl-pdf" onclick="downloadInterviewPDFAdmin('${entry.id}')">PDF</button>
        <button class="btn-tbl-del" onclick="deleteInterviewEntry('${entry.id}')">삭제</button>
      </td>
    </tr>`;
  }).join('');
}

window.openInterviewDetail = function(id) {
  const entries = JSON.parse(localStorage.getItem('healing_interviews') || '[]');
  const entry = entries.find(item => String(item.id) === String(id));
  if (!entry) return;

  const dialog = document.getElementById('detail-dialog');
  const backdrop = document.getElementById('dialog-backdrop');
  document.querySelector('#detail-dialog .dialog-header h3').textContent = '인터뷰 세부 정보';
  document.getElementById('modal-name').textContent = entry.name || '익명';
  document.getElementById('modal-age').textContent = entry.age || '-';
  document.getElementById('modal-phone').textContent = '인터뷰 응답';
  document.getElementById('modal-date').textContent = new Date(entry.ts || Date.now()).toLocaleString('ko-KR');

  const badge = document.getElementById('modal-badge');
  badge.textContent = SERVICE_LABELS_ADMIN[entry.service] || entry.service || '-';
  badge.className = 'table-badge';
  if (SERVICE_BADGE_CLASS[entry.service]) badge.classList.add(SERVICE_BADGE_CLASS[entry.service]);

  const result = buildInterviewResult(entry);
  document.getElementById('modal-answers-container').innerHTML = `
    <div class="dialog-q-box">
      <div class="dialog-q-label">인터뷰 결과지</div>
      <div class="dialog-q-val" style="color:#fff;"><strong>${escapeHTML(result.title)}</strong><br>${escapeHTML(result.desc)}</div>
    </div>
    ${Object.entries(INTERVIEW_QUESTION_LABELS).map(([key, label], idx) => `
      <div class="dialog-q-box">
        <div class="dialog-q-label">Q${idx + 1}. ${escapeHTML(label)}</div>
        <div class="dialog-q-val" style="color:#fff;">${escapeHTML(entry[key]?.trim() || '미응답')}</div>
      </div>
    `).join('')}
  `;

  if (!dialog.open) dialog.show();
  dialog.classList.add('show');
  backdrop.classList.add('show');
};

window.deleteInterviewEntry = function(id) {
  if (!confirm('해당 인터뷰를 영구적으로 삭제하시겠습니까?')) return;
  const entries = JSON.parse(localStorage.getItem('healing_interviews') || '[]')
    .filter(item => String(item.id) !== String(id));
  localStorage.setItem('healing_interviews', JSON.stringify(entries));

  submissions = submissions.filter(sub => !(sub.source === 'interview' && String(sub.id) === String(id)));
  localStorage.setItem('healing_submissions', JSON.stringify(submissions));
  updateDashboard();
  loadInterviewEntries();
};

window.downloadInterviewPDFAdmin = function(id) {
  const entries = JSON.parse(localStorage.getItem('healing_interviews') || '[]');
  const entry = entries.find(item => String(item.id) === String(id));
  if (!entry) return;

  const result = buildInterviewResult(entry);
  fillAdminPrint({
    title: '힐링 경험 인터뷰 결과지',
    meta: [
      ['이름', entry.name || '익명'],
      ['나이', entry.age ? `${entry.age}세` : '-'],
      ['참여 프로그램', SERVICE_LABELS_ADMIN[entry.service] || entry.service || '-'],
      ['만족도', entry.rating ? '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating) : '-']
    ],
    sections: [
      { title: result.title, type: 'interview-result', html: `<p>${escapeHTML(result.desc)}</p>` },
      ...Object.entries(INTERVIEW_QUESTION_LABELS).map(([key, label], idx) => ({
        title: `Q${idx + 1}. ${label}`,
        html: `<p class="pr-a">${escapeHTML(entry[key]?.trim() || '미응답')}</p>`
      }))
    ]
  });
  window.print();
};

function formatAnswerValue(value, purpose, key) {
  if (value === undefined || value === null || value === '') return '미응답';
  const scoped = CONTEXT_ANSWER_LABELS[`${purpose}.${key}.${value}`];
  if (scoped) return scoped;
  return ANSWER_LABELS[value] || String(value);
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[s]));
}

// Auto-load on DOMContentLoaded (append to existing listener)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadInterviewEntries, 300);
});
