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
  };
  
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
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

// Update statistics and chart visualizers
function updateDashboard() {
  const total = submissions.length;
  document.getElementById('stat-total').textContent = total;
  
  // Service count calculation
  const counts = { will: 0, mood: 0, aroma: 0 };
  submissions.forEach(sub => {
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
  
  submissions.forEach(sub => {
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
  const filteredData = submissions.filter(sub => {
    const matchesFilter = (currentFilter === 'all' || sub.purpose === currentFilter);
    const matchesSearch = searchQuery === '' || 
                          sub.userName.toLowerCase().includes(searchQuery) ||
                          sub.userPhone.replace(/-/g, '').includes(searchQuery.replace(/-/g, ''));
    
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
  
  // Mapping names
  const serviceBadgeClass = {
    'will': 'will-bg',
    'mood': 'mood-bg',
    'aroma': 'aroma-bg'
  };
  const serviceKorean = {
    'will': '유언 프로젝트',
    'mood': '무드 진단',
    'aroma': '아로마 북 테라피'
  };
  
  filteredData.forEach(sub => {
    const row = document.createElement('tr');
    
    // Format timestamp
    const date = new Date(sub.submittedAt);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    // Shorten answer for preview
    let previewText = '';
    if (sub.answers && sub.answers.q1) {
      previewText = sub.answers.q1;
      if (previewText.length > 25) previewText = previewText.substring(0, 22) + '...';
    }
    
    row.innerHTML = `
      <td>${dateStr}</td>
      <td style="font-weight:700;">${sub.userName}</td>
      <td style="font-family:'Outfit';">${sub.userAge}세</td>
      <td style="font-family:'Outfit';">${sub.userPhone}</td>
      <td><span class="table-badge ${serviceBadgeClass[sub.purpose]}">${serviceKorean[sub.purpose]}</span></td>
      <td class="text-muted" style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${previewText}</td>
      <td>
        <button class="btn-tbl-view" onclick="openDetailModal('${sub.id}')">상세</button>
        <button class="btn-tbl-del" onclick="deleteSubmission('${sub.id}')">삭제</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Open detailed modal dialog for a specific response
window.openDetailModal = function(id) {
  const sub = submissions.find(s => s.id === id);
  if (!sub) return;
  
  const dialog = document.getElementById('detail-dialog');
  const backdrop = document.getElementById('dialog-backdrop');
  
  // Set modal text contents
  document.getElementById('modal-name').textContent = sub.userName;
  document.getElementById('modal-age').textContent = sub.userAge;
  document.getElementById('modal-phone').textContent = sub.userPhone;
  
  // Format full date
  const dateObj = new Date(sub.submittedAt);
  document.getElementById('modal-date').textContent = dateObj.toLocaleString('ko-KR');
  
  // Badge styling mapping
  const serviceKorean = {
    'will': '유언 프로젝트 (your-text-project)',
    'mood': '무드 진단 (moodinshop)',
    'aroma': '아로마 북 테라피 (onepage-pj)'
  };
  const badge = document.getElementById('modal-badge');
  badge.textContent = serviceKorean[sub.purpose];
  badge.className = 'table-badge';
  
  if (sub.purpose === 'will') badge.classList.add('will-bg');
  else if (sub.purpose === 'mood') badge.classList.add('mood-bg');
  else if (sub.purpose === 'aroma') badge.classList.add('aroma-bg');
  
  // Questions layout mappings
  const answersBox = document.getElementById('modal-answers-container');
  answersBox.innerHTML = '';
  
  let q1Label = '';
  let q2Label = '';
  
  if (sub.purpose === 'will') {
    q1Label = "Q1. 삶의 마지막 순간에 소중한 사람에게 전하고 싶은 한마디는?";
    q2Label = "Q2. 나의 장례식장을 위로할 선호 플레이리스트 장르는?";
  } else if (sub.purpose === 'mood') {
    q1Label = "Q1. 오늘 지친 기분을 표현하는 기상 날씨 상태는?";
    q2Label = "Q2. 방 안에 들어섰을 때 심신 안정을 느끼는 희망 조도는?";
  } else if (sub.purpose === 'aroma') {
    q1Label = "Q1. 힐링이 필요할 때 오감을 열어줄 선호 도서 장르는?";
    q2Label = "Q2. 활자에 스며들기 위해 함께 켜고 싶은 아로마 향의 종류는?";
  }
  
  answersBox.innerHTML = `
    <div class="dialog-q-box">
      <div class="dialog-q-label">${q1Label}</div>
      <div class="dialog-q-val" style="color:#fff;">${sub.answers.q1}</div>
    </div>
    <div class="dialog-q-box">
      <div class="dialog-q-label">${q2Label}</div>
      <div class="dialog-q-val" style="color:#fff;">${sub.answers.q2}</div>
    </div>
  `;
  
  // Dynamically set CSS variables in dialog wrapper to match thematic color of submission
  const dynamicThemeHues = { 'will': '258', 'mood': '30', 'aroma': '125' };
  dialog.style.setProperty('--primary', `hsl(${dynamicThemeHues[sub.purpose]}, 50%, 55%)`);
  
  // Show elements
  dialog.classList.add('show');
  backdrop.classList.add('show');
};

// Delete single response
window.deleteSubmission = function(id) {
  if (!confirm('해당 신청 정보를 영구적으로 삭제하시겠습니까?')) return;
  
  submissions = submissions.filter(sub => sub.id !== id);
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

// Utilities button: Export to CSV (Korean UTF-8 Bom fixed)
function exportToCSV() {
  if (submissions.length === 0) {
    alert('다운로드할 신청 데이터가 존재하지 않습니다.');
    return;
  }
  
  const serviceNames = { 'will': '유언 프로젝트', 'mood': '무드 진단', 'aroma': '아로마 북 테라피' };
  
  // Header row
  let csvContent = "신청일시,이름,나이,연락처,선택 서비스,사전답변Q1,사전답변Q2\n";
  
  submissions.forEach(sub => {
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
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#5a5869;padding:24px;">아직 등록된 인터뷰가 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = stored.map(entry => {
    const date = new Date(entry.ts || entry.submittedAt || Date.now());
    const dateStr = `${date.getMonth()+1}/${date.getDate()} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
    const service = SERVICE_LABELS_ADMIN[entry.service] || entry.service;
    const name = entry.name || entry.userName || '익명';
    const rating = entry.rating ? '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating) : '—';
    const quote = (entry.q2 || entry.q1 || '—').replace(/</g, '&lt;');

    return `<tr>
      <td style="color:#aaa7b5;font-size:0.82rem;">${dateStr}</td>
      <td style="font-weight:600;">${name}</td>
      <td style="color:#fbbf24;letter-spacing:1px;">${rating}</td>
      <td>${service}</td>
      <td style="color:#aaa7b5;font-size:0.85rem;max-width:320px;">${quote}</td>
    </tr>`;
  }).join('');
}

// Auto-load on DOMContentLoaded (append to existing listener)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadInterviewEntries, 300);
});
