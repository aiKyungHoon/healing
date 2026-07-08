/* ==========================================================================
   interview.js — 참여자 셀프 인터뷰 폼 (Firestore + local fallback)
   ========================================================================== */

const SERVICE_CONFIG = {
  will:  { emoji: '📖', label: '유언 프로젝트',    cls: 'will'  },
  mood:  { emoji: '🌤️', label: '무드 진단',        cls: 'mood'  },
  aroma: { emoji: '🌿', label: '아로마 북 테라피',  cls: 'aroma' }
};

const RATING_CAPTIONS = {
  5: '⭐ 최고예요',
  4: '😊 좋아요',
  3: '🙂 보통이에요',
  2: '😐 아쉬워요',
  1: '😢 별로예요'
};

// 인터뷰 질문 라벨 (PDF 출력용)
const Q_LABELS = {
  q1: '어떤 계기로 이 힐링 프로젝트에 참여하게 되셨나요?',
  q2: '체험 과정에서 가장 기억에 남는 순간은 언제였나요?',
  q3: '힐링 전과 후, 나에게 어떤 변화가 있었나요?',
  q4: '비슷한 고민을 가진 또래에게 한마디 한다면?'
};

// 방금 제출한 인터뷰 (PDF 저장용)
let lastInterview = null;

document.addEventListener('DOMContentLoaded', () => {
  initServicePills();
  initRating();
  initCounters();
  initForm();
  renderFeed();
});

// ── UI 인터랙션 ────────────────────────────────────────────────

function initServicePills() {
  // :has(input:checked) CSS가 처리하므로 별도 로직 불필요, 에러 해제만
  document.querySelectorAll('input[name="ivService"]').forEach(r => {
    r.addEventListener('change', () => clearError('sec-service'));
  });
}

function initRating() {
  const caption = document.getElementById('rating-caption');
  document.querySelectorAll('input[name="ivRating"]').forEach(r => {
    r.addEventListener('change', () => {
      caption.textContent = RATING_CAPTIONS[r.value] || '';
      clearError('sec-rating');
    });
  });
}

function initCounters() {
  [['iv-q1', 'cnt-q1'], ['iv-q2', 'cnt-q2'], ['iv-q3', 'cnt-q3'], ['iv-q4', 'cnt-q4']].forEach(([ta, cnt]) => {
    const el = document.getElementById(ta);
    const c = document.getElementById(cnt);
    if (!el || !c) return;
    el.addEventListener('input', () => { c.textContent = el.value.length; });
  });
}

function initForm() {
  document.getElementById('iv-form').addEventListener('submit', submitInterview);
}

// ── 유효성 ────────────────────────────────────────────────────

function setError(secId, show) {
  const sec = document.getElementById(secId);
  if (sec) sec.classList.toggle('has-error', show);
}
function clearError(secId) { setError(secId, false); }

async function submitInterview(e) {
  e.preventDefault();

  const name = document.getElementById('iv-name').value.trim();
  const age = document.getElementById('iv-age').value.trim();
  const service = document.querySelector('input[name="ivService"]:checked')?.value;
  const rating = document.querySelector('input[name="ivRating"]:checked')?.value;
  const q1 = document.getElementById('iv-q1').value.trim();
  const q2 = document.getElementById('iv-q2').value.trim();
  const q3 = document.getElementById('iv-q3').value.trim();
  const q4 = document.getElementById('iv-q4').value.trim();
  const consent = document.getElementById('iv-consent-chk').checked;

  let valid = true;
  let firstErrorSec = null;

  const check = (cond, secId) => {
    setError(secId, !cond);
    if (!cond) { valid = false; firstErrorSec = firstErrorSec || secId; }
  };

  check(!!name, 'sec-basic');
  check(!!service, 'sec-service');
  check(!!rating, 'sec-rating');
  check(!!q1, 'sec-q1');
  check(!!q2, 'sec-q2');
  check(consent, 'sec-consent');

  if (!valid) {
    document.getElementById(firstErrorSec)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const entry = {
    id: Date.now().toString(),
    name, age, service,
    rating: parseInt(rating, 10),
    q1, q2, q3, q4,
    ts: new Date().toISOString()
  };

  lastInterview = entry;

  try {
    if (window.HealingDB) {
      await window.HealingDB.addInterview(entry);
    } else {
      const interviews = JSON.parse(localStorage.getItem('healing_interviews') || '[]');
      interviews.unshift(entry);
      localStorage.setItem('healing_interviews', JSON.stringify(interviews));
    }
  } catch (error) {
    console.error('Failed to save interview.', error);
    alert('인터뷰 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  showThanks();
  renderFeed();
}

// ── 화면 전환 ──────────────────────────────────────────────────

function showThanks() {
  document.getElementById('iv-form').style.display = 'none';
  const thanks = document.getElementById('iv-thanks');
  thanks.classList.add('show');
  document.getElementById('iv-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetInterview() {
  const form = document.getElementById('iv-form');
  form.reset();
  form.style.display = 'block';
  document.getElementById('iv-thanks').classList.remove('show');
  document.getElementById('rating-caption').textContent = '별점을 선택해 주세요';
  ['cnt-q1', 'cnt-q2', 'cnt-q3', 'cnt-q4'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '0'; });
  document.querySelectorAll('.iv-section.has-error').forEach(s => s.classList.remove('has-error'));
  document.querySelector('.iv-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── PDF 출력 (브라우저 인쇄 → PDF로 저장) ──────────────────────

function buildPrintSheet(entry) {
  const cfg = SERVICE_CONFIG[entry.service] || SERVICE_CONFIG.will;
  const d = new Date(entry.ts || Date.now());

  document.getElementById('iv-p-name').textContent = entry.name || '익명';
  document.getElementById('iv-p-age').textContent = entry.age ? entry.age + '세' : '-';
  document.getElementById('iv-p-service').textContent = `${cfg.emoji} ${cfg.label}`;
  document.getElementById('iv-p-rating').textContent =
    '★'.repeat(entry.rating || 0) + '☆'.repeat(5 - (entry.rating || 0));
  document.getElementById('iv-p-date').textContent =
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

  const result = buildInterviewResult(entry);
  document.getElementById('iv-p-result').innerHTML = `
    <h2>${escapeHtml(result.title)}</h2>
    <p>${escapeHtml(result.desc)}</p>
  `;

  const order = [['q1', 'Q1'], ['q2', 'Q2'], ['q3', 'Q3'], ['q4', 'Q4']];
  document.getElementById('iv-p-qa').innerHTML = order
    .map(([k, label]) => `
      <div class="pr-item">
        <div class="pr-q"><span class="num">${label}</span>${Q_LABELS[k]}</div>
        <div class="pr-a">${escapeHtml(entry[k]?.trim() || '미응답')}</div>
      </div>`).join('');
}

function buildInterviewResult(entry) {
  const cfg = SERVICE_CONFIG[entry.service] || SERVICE_CONFIG.will;
  const rating = Number(entry.rating || 0);
  const tone = rating >= 5 ? '강한 만족과 몰입' : rating >= 4 ? '긍정적인 회복감' : rating >= 3 ? '차분한 관찰과 보완점' : '아쉬움이 남은 경험';
  const serviceText = {
    will: '삶의 우선순위와 전하지 못한 마음을 다시 바라본 기록입니다.',
    mood: '감정 상태와 공간 감각을 연결해 나에게 맞는 쉼의 조건을 발견한 기록입니다.',
    aroma: '향과 독서를 통해 몰입과 회복의 감각을 구체화한 기록입니다.'
  }[entry.service] || '나에게 맞는 힐링 경험을 돌아본 기록입니다.';
  return {
    title: `${cfg.emoji} ${cfg.label} 인터뷰 결과지 · ${tone}`,
    desc: `${serviceText} Q1~Q4 응답을 기준으로 보면, 이 인터뷰는 참여자가 어떤 계기로 힐링을 선택했고 어떤 순간을 가장 의미 있게 받아들였는지 보여주는 후기 자료입니다.`
  };
}

function downloadInterviewPDF() {
  // 방금 제출한 인터뷰가 없으면 저장소의 최신 인터뷰 사용
  const entry = lastInterview || JSON.parse(localStorage.getItem('healing_interviews') || '[]')[0];
  if (!entry) return;
  buildPrintSheet(entry);
  window.print();
}

// ── 아카이브 피드 ──────────────────────────────────────────────

async function getAllInterviews() {
  if (window.HealingDB) return window.HealingDB.listInterviews();
  return JSON.parse(localStorage.getItem('healing_interviews') || '[]');
}

async function renderFeed() {
  const grid = document.getElementById('iv-feed-grid');
  const countEl = document.getElementById('iv-feed-count');
  if (!grid) return;

  let all = [];
  try {
    all = await getAllInterviews();
  } catch (error) {
    console.error('Failed to load interviews.', error);
  }
  countEl.textContent = all.length;

  if (all.length === 0) {
    grid.innerHTML = '<p class="iv-empty">아직 등록된 인터뷰가 없습니다.</p>';
    return;
  }

  grid.innerHTML = all.slice(0, 12).map(iv => {
    const cfg = SERVICE_CONFIG[iv.service] || SERVICE_CONFIG.will;
    const initial = maskName(iv.name);
    const quote = (iv.q2 || iv.q1 || '').trim() || '소감을 남겨주셨어요.';
    const stars = '★'.repeat(iv.rating || 0) + '☆'.repeat(5 - (iv.rating || 0));
    return `
      <article class="iv-story">
        <div class="iv-story-top">
          <div class="iv-story-avatar ${cfg.cls}">${cfg.emoji}</div>
          <div class="iv-story-who">
            <div class="iv-story-name">${initial}</div>
            <div class="iv-story-meta">${cfg.label} · ${formatDate(iv.ts)}</div>
          </div>
        </div>
        <div class="iv-story-stars">${stars}</div>
        <p class="iv-story-quote">“${escapeHtml(quote)}”</p>
        <span class="iv-story-tag ${cfg.cls}">${cfg.emoji} ${cfg.label}</span>
      </article>
    `;
  }).join('');
}

// ── 헬퍼 ──────────────────────────────────────────────────────

function maskName(name) {
  if (!name || name.length < 2) return name || '익명';
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[s]));
}
