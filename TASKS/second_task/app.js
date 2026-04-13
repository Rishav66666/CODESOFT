// ================================================
// app.js — CAPTION AI Image Analysis
// ================================================

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL   = "claude-sonnet-4-20250514";

let currentMode = "caption";
let imgB64      = null;
let imgType     = "image/jpeg";
let hist        = [];
let t0          = 0;

// ── Analysis Mode Prompts ──────────────────────
const MODES = {
  caption: {
    label: "CAPTION",
    p: "Generate a concise, vivid single-sentence caption for this image. Make it descriptive yet punchy — as a professional photographer would write."
  },
  detailed: {
    label: "DETAILED",
    p: "Describe this image richly: main subjects, setting, lighting, colors, mood, any text. Write 3-5 sentences of flowing prose."
  },
  tags: {
    label: "TAGS",
    p: 'Return ONLY a JSON array of 20-30 descriptive tags for this image, most prominent first. No preamble. Format: ["tag1","tag2",...]'
  },
  story: {
    label: "STORY",
    p: "Write a short imaginative 3-paragraph story inspired by this image — before, during, and after the moment captured."
  },
  technical: {
    label: "TECHNICAL",
    p: "Analyze this image technically: composition, lighting, depth of field, color temperature, focal length estimate, shot type, post-processing."
  },
  emotion: {
    label: "EMOTION",
    p: "Analyze the emotional and psychological dimension: feelings evoked, mood, symbolic elements, how viewers might react. 2-3 paragraphs."
  }
};

// ── Tab Switching ──────────────────────────────
function switchTab(name) {
  const names = ['file', 'url', 'paste'];
  document.querySelectorAll('.tab').forEach((t, i) =>
    t.classList.toggle('active', names[i] === name)
  );
  document.querySelectorAll('.tab-panel').forEach(p =>
    p.classList.remove('active')
  );
  document.getElementById('tab-' + name).classList.add('active');
}

// ── Mode Buttons ───────────────────────────────
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    document.getElementById('modeTag').textContent = MODES[currentMode].label;
  });
});

// ── File Input ─────────────────────────────────
document.getElementById('fileInput').addEventListener('change', e => {
  if (e.target.files[0]) readFile(e.target.files[0]);
});

function readFile(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    const [meta, b64] = ev.target.result.split(',');
    imgType = meta.match(/:(.*?);/)[1];
    imgB64  = b64;
    showPreview(ev.target.result, file.name + ' · ' + (file.size / 1024 | 0) + 'KB');
  };
  reader.readAsDataURL(file);
}

// ── URL Loader ─────────────────────────────────
document.getElementById('urlInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') loadFromURL();
});

async function loadFromURL() {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) { toast('Enter an image URL first', true); return; }
  toast('Fetching…');

  // Method 1: canvas (works if CORS headers are open)
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((ok, fail) => { img.onload = ok; img.onerror = fail; img.src = url; });
    const c = document.createElement('canvas');
    c.width  = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    const dataUrl = c.toDataURL('image/jpeg', 0.92);
    imgType = 'image/jpeg';
    imgB64  = dataUrl.split(',')[1];
    showPreview(dataUrl, 'From URL');
    toast('Loaded ✓');
    return;
  } catch (_) { /* try next method */ }

  // Method 2: allorigins CORS proxy fallback
  try {
    const r    = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
    const blob = await r.blob();
    readFile(new File([blob], 'img.jpg', { type: blob.type || 'image/jpeg' }));
    toast('Loaded via proxy ✓');
    return;
  } catch (_) { /* fall through */ }

  toast('Could not load — try the Paste tab', true);
}

// ── Paste / Clipboard ──────────────────────────
async function triggerPaste() {
  try {
    if (!navigator.clipboard?.read) throw new Error('Clipboard API unavailable');
    const items = await navigator.clipboard.read();
    for (const item of items) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          readFile(new File([blob], 'paste.png', { type }));
          return;
        }
      }
    }
    toast('No image found in clipboard', true);
  } catch {
    toast('Allow clipboard access in browser settings, then try again', true);
  }
}

// Also intercept global Ctrl+V / long-press paste
document.addEventListener('paste', e => {
  for (const item of e.clipboardData?.items || []) {
    if (item.type.startsWith('image/')) {
      readFile(item.getAsFile());
      e.preventDefault();
      return;
    }
  }
});

// ── Preview & Reset ────────────────────────────
function showPreview(src, info) {
  document.getElementById('previewImg').src          = src;
  document.getElementById('previewInfo').textContent  = info;
  document.getElementById('uploadZone').classList.add('has-image');
  document.getElementById('analyzeBtn').disabled      = false;
}

function resetImage() {
  imgB64 = null;
  document.getElementById('previewImg').src = '';
  document.getElementById('uploadZone').classList.remove('has-image');
  document.getElementById('analyzeBtn').disabled = true;
  document.getElementById('fileInput').value  = '';
  document.getElementById('urlInput').value   = '';
}

// ── Analyze — calls Anthropic API ─────────────
async function analyzeImage() {
  if (!imgB64) return;
  t0 = Date.now();

  const btn = document.getElementById('analyzeBtn');
  btn.disabled = true;
  document.getElementById('btnIcon').textContent   = '⏳';
  document.getElementById('btnLabel').textContent  = 'Analyzing…';
  document.getElementById('copyBtn').style.display    = 'none';
  document.getElementById('metaStrip').style.display  = 'none';
  showLoading();

  const mode = currentMode;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: imgType, data: imgB64 } },
            { type: 'text',  text: MODES[mode].p }
          ]
        }]
      })
    });

    if (!response.ok) throw new Error('API error ' + response.status);

    const data = await response.json();
    const raw  = data.content.map(c => c.text || '').join('').trim();
    const secs = ((Date.now() - t0) / 1000).toFixed(1);

    renderResult(mode, raw, secs);
    addHist(mode, raw);

  } catch (err) {
    showErr(err.message);
  } finally {
    btn.disabled = false;
    document.getElementById('btnIcon').textContent  = '▶';
    document.getElementById('btnLabel').textContent = 'Analyze Image';
  }
}

// ── Loading Indicator ──────────────────────────
function showLoading() {
  const phases = ['Encoding image…', 'Extracting features…', 'Generating output…'];
  let i = 0;
  const iv = setInterval(() => {
    const el = document.getElementById('lp');
    if (el) { el.textContent = phases[i++ % phases.length]; }
    else clearInterval(iv);
  }, 900);

  document.getElementById('resultBody').innerHTML = `
    <div>
      <div class="loading-dots"><span></span><span></span><span></span></div>
      <div class="loading-label">
        Processing
        <span class="loading-phase" id="lp">Encoding image…</span>
      </div>
    </div>`;
}

// ── Render Result ──────────────────────────────
function renderResult(mode, raw, secs) {
  const body = document.getElementById('resultBody');
  let html = '';

  if (mode === 'tags') {
    try {
      const tags = JSON.parse(raw.replace(/```json|```/g, '').trim());
      html = '<div class="tags-output">' +
        tags.map((t, i) =>
          `<span class="tag ${i < 5 ? 'hl' : ''}" style="animation-delay:${i * 0.04}s">${esc(t)}</span>`
        ).join('') +
        '</div>';
      document.getElementById('metaWords').textContent = tags.length;
    } catch {
      html = `<div class="output-text">${esc(raw)}</div>`;
      document.getElementById('metaWords').textContent = raw.split(/\s+/).length;
    }
  } else {
    html = `<div class="output-text">${
      esc(raw)
        .replace(/\n\n/g, '</p><p style="margin-top:11px">')
        .replace(/\n/g, '<br/>')
    }</div>`;
    document.getElementById('metaWords').textContent = raw.split(/\s+/).length;
  }

  body.innerHTML   = html;
  body.dataset.raw = raw;

  document.getElementById('metaTime').textContent    = secs + 's';
  document.getElementById('metaConf').textContent    = MODES[mode].label;
  document.getElementById('metaStrip').style.display = 'grid';
  document.getElementById('copyBtn').style.display   = 'flex';
}

// ── Copy Result ────────────────────────────────
function copyResult() {
  const raw = document.getElementById('resultBody').dataset.raw || '';
  navigator.clipboard.writeText(raw).then(() => {
    const b = document.getElementById('copyBtn');
    b.textContent = '✓ Copied';
    setTimeout(() => { b.innerHTML = '⎘ Copy'; }, 2000);
  });
}

// ── Error State ────────────────────────────────
function showErr(msg) {
  document.getElementById('resultBody').innerHTML =
    `<div class="error-state">⚠ ${esc(msg)}</div>`;
}

// ── History ────────────────────────────────────
function addHist(mode, raw) {
  const thumb = document.getElementById('previewImg').src;
  const cap   = mode === 'tags'
    ? raw.replace(/[\[\]"]/g, '').slice(0, 80)
    : raw.slice(0, 80);
  const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  hist.unshift({ mode, cap, thumb, ts, full: raw });
  if (hist.length > 5) hist.pop();
  renderHist();
}

function renderHist() {
  const list  = document.getElementById('histList');
  const label = document.getElementById('histLabel');

  if (!hist.length) { label.style.display = 'none'; return; }
  label.style.display = 'flex';

  list.innerHTML = hist.map((h, i) => `
    <div class="history-item" onclick="loadHist(${i})">
      <img class="history-thumb" src="${h.thumb}" alt=""/>
      <div class="history-caption">${esc(h.cap)}…</div>
      <div class="history-time">
        ${h.ts}<br/>
        <span style="color:var(--accent)">${h.mode}</span>
      </div>
    </div>`).join('');
}

function loadHist(i) {
  const h = hist[i];
  renderResult(h.mode, h.full, '—');
  document.getElementById('modeTag').textContent = MODES[h.mode].label;
}

// ── Toast Notification ─────────────────────────
function toast(msg, err = false) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = 'toast show' + (err ? ' err' : '');
  setTimeout(() => { el.className = 'toast'; }, 3200);
}

// ── Utility ────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}