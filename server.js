<!DOCTYPE html>
<html lang="ur">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>NEXA AI</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #080800; font-family: 'Rajdhani', sans-serif; color: white; overflow: hidden; }

    /* ── LOGIN SCREEN ── */
    #loginScreen {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: #080800;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      z-index: 1000; gap: 40px;
    }
    .login-logo {
      font-family: 'Orbitron', monospace;
      font-size: 3rem; font-weight: 900;
      background: linear-gradient(90deg, #f5c842, #fff7c0, #f5c842);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: goldShine 3s linear infinite;
      letter-spacing: 8px;
    }
    @keyframes goldShine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
    .login-subtitle {
      font-size: 0.85rem; color: rgba(245,200,66,0.5);
      letter-spacing: 3px; text-transform: uppercase;
      font-family: 'Orbitron', monospace;
      margin-top: -30px;
    }
    .login-card {
      background: rgba(245,200,66,0.04);
      border: 1px solid rgba(245,200,66,0.15);
      border-radius: 20px;
      padding: 40px 50px;
      display: flex; flex-direction: column;
      align-items: center; gap: 20px;
      backdrop-filter: blur(10px);
    }
    .login-card p {
      font-size: 0.9rem; color: rgba(255,255,255,0.4);
      letter-spacing: 1px; text-align: center;
    }
    .google-btn {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 28px;
      border-radius: 50px;
      border: 1px solid rgba(245,200,66,0.4);
      background: rgba(245,200,66,0.08);
      color: rgba(245,200,66,0.95);
      font-size: 0.9rem; font-weight: 600;
      cursor: pointer; font-family: 'Orbitron', monospace;
      letter-spacing: 1px;
      transition: all 0.3s;
      box-shadow: 0 0 20px rgba(245,200,66,0.1);
    }
    .google-btn:hover {
      background: rgba(245,200,66,0.15);
      box-shadow: 0 0 30px rgba(245,200,66,0.3);
      transform: scale(1.03);
    }
    .login-by {
      font-size: 0.7rem; color: rgba(245,200,66,0.3);
      letter-spacing: 2px; margin-top: 10px;
    }

    /* ── INTRO ANIMATION ── */
    #introScreen {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: #080800;
      display: none; flex-direction: column;
      align-items: center; justify-content: center;
      z-index: 999; gap: 16px;
    }
    .intro-welcome {
      font-family: 'Orbitron', monospace;
      font-size: 3.5rem; font-weight: 900;
      background: linear-gradient(90deg, #f5c842, #fff7c0, #f5c842);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: goldShine 2s linear infinite;
      letter-spacing: 10px;
      opacity: 0;
    }
    .intro-name {
      font-family: 'Orbitron', monospace;
      font-size: 1.8rem; font-weight: 700;
      color: rgba(255,255,255,0.9);
      letter-spacing: 4px;
      opacity: 0;
    }
    .intro-tagline {
      font-size: 1rem; color: rgba(245,200,66,0.7);
      letter-spacing: 3px; text-transform: uppercase;
      opacity: 0;
    }
    .intro-by {
      font-size: 0.72rem; color: rgba(245,200,66,0.4);
      letter-spacing: 2px; margin-top: 8px;
      opacity: 0;
    }
    .intro-line {
      width: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(245,200,66,0.6), transparent);
      margin: 8px 0;
    }

    /* ── MAIN APP ── */
    #mainApp {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      display: none; flex-direction: column;
      opacity: 0;
    }
    #mainApp.show {
      display: flex;
    }

    /* Top bar */
    .top-bar {
      padding: 14px 20px;
      display: flex; align-items: center; gap: 12px;
      border-bottom: 1px solid rgba(245,200,66,0.1);
      background: rgba(10,8,0,0.9);
      backdrop-filter: blur(20px);
      flex-shrink: 0; z-index: 10;
    }
    .menu-btn {
      width: 36px; height: 36px;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center; gap: 5px;
      cursor: pointer; border: none; background: transparent;
    }
    .menu-btn span {
      width: 22px; height: 2px;
      background: rgba(245,200,66,0.7);
      border-radius: 2px;
      box-shadow: 0 0 6px rgba(245,200,66,0.5);
      transition: all 0.3s;
    }
    .top-title {
      flex: 1;
      font-family: 'Orbitron', monospace;
      font-size: 1rem; font-weight: 900;
      background: linear-gradient(90deg, #f5c842, #fff7c0, #f5c842);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: goldShine 3s linear infinite;
      letter-spacing: 4px;
    }
    .user-avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(245,200,66,0.4);
      object-fit: cover;
    }

    /* Sphere Section */
    .sphere-section {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 24px; position: relative;
    }
    .sphere-wrapper {
      position: relative; width: 240px; height: 240px;
      cursor: pointer;
      animation: sphereDrop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
      opacity: 0;
    }
    @keyframes sphereDrop {
      0% { opacity: 0; transform: translateY(-120px) scale(0.5); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .sphere {
      width: 240px; height: 240px; border-radius: 50%;
      position: relative;
      background: radial-gradient(circle at 35% 35%, rgba(255,220,100,0.15), rgba(180,140,0,0.4) 40%, rgba(60,40,0,0.9) 70%, rgba(10,8,0,1) 100%);
      box-shadow: 0 0 60px rgba(245,200,66,0.4), 0 0 120px rgba(200,160,0,0.2), inset 0 0 60px rgba(150,100,0,0.5);
      animation: sphereIdle 4s ease-in-out infinite;
      overflow: hidden;
    }
    @keyframes sphereIdle {
      0%,100% { box-shadow: 0 0 60px rgba(245,200,66,0.4), 0 0 120px rgba(200,160,0,0.2), inset 0 0 60px rgba(150,100,0,0.5); }
      50% { box-shadow: 0 0 80px rgba(255,220,80,0.6), 0 0 160px rgba(220,180,0,0.3), inset 0 0 80px rgba(180,130,0,0.6); }
    }
    .sphere.listening { animation: sphereListen 0.8s ease-in-out infinite; }
    @keyframes sphereListen {
      0%,100% { box-shadow: 0 0 80px rgba(255,220,80,0.8), 0 0 160px rgba(245,200,66,0.4), inset 0 0 80px rgba(180,130,0,0.6); transform: scale(1); }
      50% { box-shadow: 0 0 120px rgba(255,230,100,0.9), 0 0 200px rgba(245,200,66,0.5), inset 0 0 100px rgba(200,150,0,0.7); transform: scale(1.03); }
    }
    .sphere.thinking { animation: sphereThink 1.5s linear infinite; }
    @keyframes sphereThink { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(30deg); } }
    #sphereCanvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; opacity: 0.7; }
    .sphere-shine { position: absolute; top: 15%; left: 20%; width: 35%; height: 25%; background: radial-gradient(ellipse, rgba(255,255,200,0.2), transparent); border-radius: 50%; pointer-events: none; }
    .sphere-ring { position: absolute; top: -12px; left: -12px; right: -12px; bottom: -12px; border-radius: 50%; border: 1px solid rgba(245,200,66,0.3); animation: ringPulse 3s ease-in-out infinite; }
    .sphere-ring2 { position: absolute; top: -24px; left: -24px; right: -24px; bottom: -24px; border-radius: 50%; border: 1px solid rgba(245,200,66,0.15); animation: ringPulse 3s ease-in-out infinite 1s; }
    @keyframes ringPulse { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.02); } }

    #transcript {
      font-size: 0.88rem; color: rgba(245,200,66,0.7);
      font-style: italic; max-width: 280px;
      text-align: center; min-height: 20px;
    }
    #status {
      font-family: 'Orbitron', monospace;
      font-size: 0.85rem; color: rgba(245,200,66,0.6);
      letter-spacing: 2px;
      animation: statusGlow 2s ease-in-out infinite;
    }
    @keyframes statusGlow {
      0%,100% { text-shadow: 0 0 8px rgba(245,200,66,0.3); }
      50% { text-shadow: 0 0 16px rgba(255,220,80,0.6); }
    }

    /* Response Popup */
    .response-popup {
      position: absolute; bottom: 20px; left: 50%;
      transform: translateX(-50%);
      max-width: 85%;
      background: rgba(15,12,0,0.95);
      border: 1px solid rgba(245,200,66,0.3);
      border-radius: 16px; padding: 12px 16px;
      font-size: 0.85rem; line-height: 1.6;
      color: rgba(255,255,255,0.9);
      display: none; backdrop-filter: blur(10px);
      box-shadow: 0 0 30px rgba(200,160,0,0.2);
      z-index: 5;
    }
    .response-popup.show { display: block; animation: popupIn 0.3s ease; }
    @keyframes popupIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

    /* Bottom Chat Bar */
    .chat-bar {
      flex-shrink: 0; padding: 12px 16px;
      background: rgba(10,8,0,0.95);
      border-top: 1px solid rgba(245,200,66,0.15);
      backdrop-filter: blur(20px);
      animation: slideUp 0.6s ease forwards;
      opacity: 0;
    }
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    .chat-bar-inner {
      display: flex; align-items: center; gap: 10px;
      max-width: 700px; margin: 0 auto;
    }
    #textInput {
      flex: 1; padding: 12px 18px;
      background: rgba(245,200,66,0.05);
      border: 1px solid rgba(245,200,66,0.2);
      border-radius: 50px; color: white;
      font-size: 0.9rem; outline: none;
      font-family: 'Rajdhani', sans-serif;
      -webkit-appearance: none; transition: all 0.3s;
    }
    #textInput::placeholder { color: rgba(245,200,66,0.3); }
    #textInput:focus { border-color: rgba(245,200,66,0.5); box-shadow: 0 0 15px rgba(245,200,66,0.1); }
    .mic-btn-bar {
      width: 46px; height: 46px; border-radius: 50%;
      border: 2px solid rgba(245,200,66,0.5);
      background: rgba(245,200,66,0.08);
      color: white; font-size: 1.2rem;
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      flex-shrink: 0; transition: all 0.3s;
      animation: btnIdle 3s ease-in-out infinite;
    }
    @keyframes btnIdle {
      0%,100% { box-shadow: 0 0 12px rgba(245,200,66,0.2); }
      50% { box-shadow: 0 0 25px rgba(245,200,66,0.5); }
    }
    .mic-btn-bar.listening { border-color: rgba(239,68,68,0.8); background: rgba(239,68,68,0.12); animation: pulseRed 1s ease-out infinite; }
    @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); } 70% { box-shadow: 0 0 0 14px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
    .mic-btn-bar.thinking { border-color: rgba(245,200,66,0.8); animation: spinGlow 1.2s linear infinite; }
    @keyframes spinGlow { 0% { transform: rotate(0deg); box-shadow: 0 0 18px rgba(245,200,66,0.5); } 100% { transform: rotate(360deg); box-shadow: 0 0 18px rgba(245,200,66,0.5); } }
    #sendBtn {
      width: 46px; height: 46px; border-radius: 50%;
      border: 1px solid rgba(245,200,66,0.3);
      background: rgba(245,200,66,0.1);
      color: rgba(245,200,66,0.9); font-size: 1rem;
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      flex-shrink: 0; transition: all 0.2s;
    }
    #sendBtn:hover { background: rgba(245,200,66,0.2); box-shadow: 0 0 15px rgba(245,200,66,0.3); }

    /* Sidebar */
    .sidebar-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); z-index: 200;
      display: none; opacity: 0;
      transition: opacity 0.3s;
    }
    .sidebar-overlay.show { display: block; opacity: 1; }
    .sidebar {
      position: fixed; top: 0; left: -320px; bottom: 0;
      width: 300px;
      background: rgba(10,8,0,0.98);
      border-right: 1px solid rgba(245,200,66,0.15);
      z-index: 201; display: flex; flex-direction: column;
      transition: left 0.35s cubic-bezier(0.4,0,0.2,1);
      backdrop-filter: blur(20px);
    }
    .sidebar.open { left: 0; }
    .sidebar-header {
      padding: 20px; border-bottom: 1px solid rgba(245,200,66,0.1);
      display: flex; align-items: center; gap: 12px;
    }
    .sidebar-avatar { width: 44px; height: 44px; border-radius: 50%; border: 2px solid rgba(245,200,66,0.4); object-fit: cover; }
    .sidebar-user-name { font-family: 'Orbitron', monospace; font-size: 0.8rem; color: rgba(245,200,66,0.9); }
    .sidebar-user-email { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 2px; }
    .sidebar-title {
      padding: 16px 20px 8px;
      font-family: 'Orbitron', monospace;
      font-size: 0.65rem; color: rgba(245,200,66,0.4);
      letter-spacing: 2px; text-transform: uppercase;
    }
    #sidebarHistory {
      flex: 1; overflow-y: auto; padding: 0 12px;
    }
    .history-item {
      padding: 12px 14px; margin-bottom: 6px;
      background: rgba(245,200,66,0.04);
      border: 1px solid rgba(245,200,66,0.08);
      border-radius: 10px; cursor: pointer;
      transition: all 0.2s;
    }
    .history-item:hover { background: rgba(245,200,66,0.1); border-color: rgba(245,200,66,0.2); }
    .history-date { font-size: 0.6rem; color: rgba(245,200,66,0.4); font-family: 'Orbitron', monospace; margin-bottom: 4px; }
    .history-preview { font-size: 0.8rem; color: rgba(255,255,255,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .no-history { text-align: center; color: rgba(255,255,255,0.2); font-size: 0.8rem; padding: 30px 0; }
    .sidebar-footer {
      padding: 16px 20px;
      border-top: 1px solid rgba(245,200,66,0.1);
    }
    .logout-btn {
      width: 100%; padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(239,68,68,0.3);
      background: rgba(239,68,68,0.08);
      color: rgba(239,68,68,0.8);
      font-size: 0.8rem; cursor: pointer;
      font-family: 'Orbitron', monospace;
      letter-spacing: 1px; transition: all 0.2s;
    }
    .logout-btn:hover { background: rgba(239,68,68,0.15); }

    /* Corner decorations */
    .corner { position: fixed; width: 40px; height: 40px; z-index: 2; pointer-events: none; }
    .corner::before, .corner::after { content: ''; position: absolute; background: rgba(245,200,66,0.5); box-shadow: 0 0 8px rgba(245,200,66,0.7); }
    .corner::before { width: 100%; height: 1px; top: 0; left: 0; }
    .corner::after { width: 1px; height: 100%; top: 0; left: 0; }
    .corner-tl { top: 10px; left: 10px; }
    .corner-tr { top: 10px; right: 10px; transform: scaleX(-1); }
    .corner-bl { bottom: 10px; left: 10px; transform: scaleY(-1); }
    .corner-br { bottom: 10px; right: 10px; transform: scale(-1); }

    #bgCanvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
  </style>
</head>
<body>

<canvas id="bgCanvas"></canvas>
<div class="corner corner-tl"></div>
<div class="corner corner-tr"></div>
<div class="corner corner-bl"></div>
<div class="corner corner-br"></div>

<!-- LOGIN SCREEN -->
<div id="loginScreen">
  <div class="login-logo">NEXA</div>
  <div class="login-subtitle">Your AI Assistant</div>
  <div class="login-card">
    <p>Sign in to continue</p>
    <button class="google-btn" onclick="loginWithGoogle()">
      <span>🔑</span> Continue with Google
    </button>
    <div class="login-by">By Kh. Wali Abdullah Butt</div>
  </div>
</div>

<!-- INTRO SCREEN -->
<div id="introScreen">
  <div class="intro-welcome" id="introWelcome">WELCOME</div>
  <div class="intro-line" id="introLine"></div>
  <div class="intro-name" id="introName">I am NEXA</div>
  <div class="intro-tagline" id="introTagline">Your AI Assistant</div>
  <div class="intro-by" id="introBy">By Kh. Wali Abdullah Butt</div>
</div>

<!-- MAIN APP -->
<div id="mainApp">

  <!-- Top Bar -->
  <div class="top-bar">
    <button class="menu-btn" onclick="openSidebar()">
      <span></span><span></span><span></span>
    </button>
    <div class="top-title">NEXA</div>
    <img class="user-avatar" id="topAvatar" src="" alt="">
  </div>

  <!-- Sphere -->
  <div class="sphere-section">
    <div class="sphere-wrapper" id="sphereWrapper" onclick="toggleVoice()">
      <div class="sphere-ring2"></div>
      <div class="sphere-ring"></div>
      <div class="sphere" id="sphere">
        <canvas id="sphereCanvas"></canvas>
        <div class="sphere-shine"></div>
      </div>
    </div>
    <div id="transcript"></div>
    <div id="status">Tap sphere to speak</div>
    <div class="response-popup" id="responsePopup"></div>
  </div>

  <!-- Chat Bar -->
  <div class="chat-bar">
    <div class="chat-bar-inner">
      <input type="text" id="textInput" placeholder="Ask NEXA anything..."
        onkeydown="if(event.key==='Enter') sendText()" />
      <button class="mic-btn-bar" id="micBtn" onclick="toggleVoice()">🎤</button>
      <button id="sendBtn" onclick="sendText()">➤</button>
    </div>
  </div>

</div>

<!-- SIDEBAR -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
<div class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <img class="sidebar-avatar" id="sidebarAvatar" src="" alt="">
    <div>
      <div class="sidebar-user-name" id="sidebarName">User</div>
      <div class="sidebar-user-email" id="sidebarEmail"></div>
    </div>
  </div>
  <div class="sidebar-title">Recent Chats</div>
  <div id="sidebarHistory"></div>
  <div class="sidebar-footer">
    <button class="logout-btn" onclick="logoutUser()">⬡ LOGOUT</button>
  </div>
</div>

<!-- Firebase -->
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
  import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

  const firebaseConfig = {
    apiKey: "AIzaSyCLosHSZulEZW1ustqAXk8XfpLNWkjKyhw",
    authDomain: "butts-ai-assistant.firebaseapp.com",
    projectId: "butts-ai-assistant",
    storageBucket: "butts-ai-assistant.firebasestorage.app",
    messagingSenderId: "212491212408",
    appId: "1:212491212408:web:7bf79f2d3321674a6d7f8d"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Hide login, show intro
      document.getElementById('loginScreen').style.display = 'none';
      showIntro(user);

      // Set user info
      document.getElementById('topAvatar').src = user.photoURL || '';
      document.getElementById('sidebarAvatar').src = user.photoURL || '';
      document.getElementById('sidebarName').textContent = user.displayName || 'User';
      document.getElementById('sidebarEmail').textContent = user.email || '';
    } else {
      document.getElementById('loginScreen').style.display = 'flex';
      document.getElementById('introScreen').style.display = 'none';
      document.getElementById('mainApp').style.display = 'none';
    }
  });

  window.loginWithGoogle = async () => {
    try { await signInWithPopup(auth, provider); } catch(e) { console.error(e); }
  };

  window.logoutUser = async () => {
    await signOut(auth);
    closeSidebar();
  };

  window.saveMessage = async (userText, aiText) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await addDoc(collection(db, 'chats'), {
        userId: user.uid, userText, aiText,
        timestamp: serverTimestamp()
      });
    } catch(e) { console.error(e); }
  };

  window.loadSidebarHistory = async () => {
    const user = auth.currentUser;
    const container = document.getElementById('sidebarHistory');
    if (!user) { container.innerHTML = '<div class="no-history">Login required</div>'; return; }
    try {
      container.innerHTML = '<div class="no-history">Loading...</div>';
      const q = query(collection(db, 'chats'), where('userId','==',user.uid), orderBy('timestamp','desc'));
      const snap = await getDocs(q);
      if (snap.empty) { container.innerHTML = '<div class="no-history">No chats yet</div>'; return; }
      container.innerHTML = '';
      snap.forEach(doc => {
        const d = doc.data();
        const date = d.timestamp?.toDate();
        const dateStr = date ? date.toLocaleDateString()+' '+date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '';
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `<div class="history-date">${dateStr}</div><div class="history-preview">▶ ${d.userText}</div>`;
        container.appendChild(div);
      });
    } catch(e) { container.innerHTML = '<div class="no-history">Error loading</div>'; }
  };
</script>

<script>
  // ── BACKGROUND ────────────────────────────────────────
  const bgCanvas = document.getElementById('bgCanvas');
  const bgCtx = bgCanvas.getContext('2d');
  function resizeBg() { bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight; }
  resizeBg(); window.addEventListener('resize', resizeBg);

  const stars = Array.from({length:150}, ()=>({ x:Math.random()*bgCanvas.width, y:Math.random()*bgCanvas.height, size:Math.random()*1.5+0.3, opacity:Math.random()*0.6+0.1, twinkle:Math.random()*Math.PI*2 }));
  const bgP = Array.from({length:20}, ()=>({ x:Math.random()*bgCanvas.width, y:Math.random()*bgCanvas.height, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, size:Math.random()*2+0.5, color:Math.random()>0.5?'245,200,66':'200,160,0' }));

  function animateBg() {
    bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
    stars.forEach(s=>{ s.twinkle+=0.015; const op=s.opacity*(0.7+0.3*Math.sin(s.twinkle)); bgCtx.beginPath(); bgCtx.arc(s.x,s.y,s.size,0,Math.PI*2); bgCtx.fillStyle=`rgba(255,240,180,${op})`; bgCtx.fill(); });
    bgP.forEach(p=>{ bgCtx.beginPath(); bgCtx.arc(p.x,p.y,p.size,0,Math.PI*2); bgCtx.fillStyle=`rgba(${p.color},0.2)`; bgCtx.shadowBlur=8; bgCtx.shadowColor=`rgba(${p.color},0.8)`; bgCtx.fill(); bgCtx.shadowBlur=0; p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>bgCanvas.width) p.vx*=-1; if(p.y<0||p.y>bgCanvas.height) p.vy*=-1; });
    requestAnimationFrame(animateBg);
  }
  animateBg();

  // ── SPHERE ────────────────────────────────────────────
  const sc = document.getElementById('sphereCanvas');
  const sCtx = sc.getContext('2d');
  sc.width=240; sc.height=240;
  let waveAmplitude=8, targetAmplitude=8, waveFrame=0;

  function animateSphere() {
    sCtx.clearRect(0,0,240,240); waveFrame+=0.05;
    waveAmplitude+=(targetAmplitude-waveAmplitude)*0.1;
    [{color:'rgba(255,200,50,0.5)',offset:0,freq:2},{color:'rgba(200,150,0,0.4)',offset:Math.PI/3,freq:3},{color:'rgba(255,220,80,0.3)',offset:Math.PI/1.5,freq:1.5}].forEach(w=>{
      sCtx.beginPath();
      for(let x=0;x<=240;x+=2){const y=120+Math.sin(x*0.04*w.freq+waveFrame+w.offset)*waveAmplitude+Math.sin(x*0.02+waveFrame*0.7+w.offset)*(waveAmplitude*0.5); if(x===0)sCtx.moveTo(x,y);else sCtx.lineTo(x,y);}
      sCtx.strokeStyle=w.color; sCtx.lineWidth=2; sCtx.shadowBlur=10; sCtx.shadowColor=w.color; sCtx.stroke(); sCtx.shadowBlur=0;
    });
    requestAnimationFrame(animateSphere);
  }
  animateSphere();

  // ── INTRO ANIMATION ───────────────────────────────────
  function showIntro(user) {
    const intro = document.getElementById('introScreen');
    intro.style.display = 'flex';

    const welcome = document.getElementById('introWelcome');
    const line = document.getElementById('introLine');
    const name = document.getElementById('introName');
    const tagline = document.getElementById('introTagline');
    const by = document.getElementById('introBy');

    // Step 1: WELCOME
    setTimeout(()=>{
      welcome.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      welcome.style.opacity = '1';
      welcome.style.transform = 'scale(1)';
    }, 300);

    // Step 2: Line
    setTimeout(()=>{
      line.style.transition = 'width 0.6s ease';
      line.style.width = '200px';
    }, 1200);

    // Step 3: I am NEXA
    setTimeout(()=>{
      name.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      name.style.opacity = '1';
      name.style.transform = 'translateY(0)';
    }, 1600);

    // Step 4: tagline
    setTimeout(()=>{
      tagline.style.transition = 'opacity 0.6s ease';
      tagline.style.opacity = '1';
    }, 2100);

    // Step 5: by
    setTimeout(()=>{
      by.style.transition = 'opacity 0.6s ease';
      by.style.opacity = '1';
    }, 2500);

    // Step 6: Fade out intro, show main app
    setTimeout(()=>{
      intro.style.transition = 'opacity 0.8s ease';
      intro.style.opacity = '0';
    }, 3500);

    setTimeout(()=>{
      intro.style.display = 'none';
      const mainApp = document.getElementById('mainApp');
      mainApp.style.display = 'flex';
      mainApp.style.transition = 'opacity 0.8s ease';
      setTimeout(()=>{ mainApp.style.opacity = '1'; }, 50);

      // Sphere drop animation
      document.getElementById('sphereWrapper').style.animation = 'sphereDrop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards';

      // Chat bar slide up
      document.querySelector('.chat-bar').style.animation = 'slideUp 0.6s ease 0.4s forwards';
    }, 4300);
  }

  // ── SIDEBAR ───────────────────────────────────────────
  function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('show');
    if (window.loadSidebarHistory) window.loadSidebarHistory();
  }
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  }

  // ── VOICE ─────────────────────────────────────────────
  let recognition, isListening = false;

  function toggleVoice() {
    if (isListening) stopVoice(); else startVoice();
  }
  function startVoice() {
    if (!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)) { setStatus('Chrome use karo!'); return; }
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = 'ur-PK';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.start();
    isListening = true; targetAmplitude = 35;
    document.getElementById('sphere').classList.add('listening');
    document.getElementById('micBtn').textContent = '⏹';
    document.getElementById('micBtn').classList.add('listening');
    setStatus('Listening...'); setTranscript('');

    recognition.onresult = async(e) => {
      const interim = Array.from(e.results).map(r=>r[0].transcript).join('');
      setTranscript(interim);
      if (e.results[e.results.length-1].isFinal) {
        const text = e.results[e.results.length-1][0].transcript;
        stopVoice(); await getResponse(text, true);
      }
    };
    recognition.onerror = ()=>{ stopVoice(); setStatus('Tap sphere to speak'); };
    recognition.onend = ()=>{ if(isListening) stopVoice(); };
  }
  function stopVoice() {
    if(recognition) recognition.stop();
    isListening = false; targetAmplitude = 8;
    document.getElementById('sphere').classList.remove('listening','thinking');
    document.getElementById('micBtn').textContent = '🎤';
    document.getElementById('micBtn').classList.remove('listening','thinking');
  }

  // ── TEXT ──────────────────────────────────────────────
  function sendText() {
    const input = document.getElementById('textInput');
    const text = input.value.trim(); if(!text) return;
    input.value = ''; getResponse(text, false);
  }

  // ── AI RESPONSE ───────────────────────────────────────
  async function getResponse(text, speakOut) {
    document.getElementById('sphere').classList.add('thinking');
    document.getElementById('micBtn').classList.add('thinking');
    targetAmplitude = 20; setStatus('Processing...'); setTranscript('');

    try {
      const res = await fetch('https://butts-ai-assistant.vercel.app/ai-response', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({userText: text})
      });
      const data = await res.json();
      document.getElementById('sphere').classList.remove('thinking');
      document.getElementById('micBtn').classList.remove('thinking');

      showPopup(data.response);
      if(window.saveMessage) window.saveMessage(text, data.response);
      if(speakOut) { speakText(data.response); setStatus('Speaking...'); targetAmplitude=25; }
      else { setStatus('Tap sphere to speak'); targetAmplitude=8; }
    } catch {
      document.getElementById('sphere').classList.remove('thinking');
      document.getElementById('micBtn').classList.remove('thinking');
      setStatus('Error — retry karo'); targetAmplitude=8;
    }
  }

  // ── POPUP ─────────────────────────────────────────────
  let popupTimer;
  function showPopup(text) {
    const popup = document.getElementById('responsePopup');
    popup.textContent = '✨ '+text;
    popup.classList.add('show');
    clearTimeout(popupTimer);
    popupTimer = setTimeout(()=>popup.classList.remove('show'), 6000);
  }

  // ── SPEAK ─────────────────────────────────────────────
  function speakText(text) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = /[\u0600-\u06FF]/.test(text)?'ur-PK':'en-US';
    utt.rate=0.88; utt.pitch=1; utt.volume=1;
    utt.onend = ()=>{ setStatus('Tap sphere to speak'); targetAmplitude=8; };
    setTimeout(()=>window.speechSynthesis.speak(utt), 200);
  }

  function setStatus(msg) { document.getElementById('status').textContent = msg; }
  function setTranscript(msg) { document.getElementById('transcript').textContent = msg; }

  if(window.visualViewport) {
    window.visualViewport.addEventListener('resize',()=>{
      document.getElementById('mainApp').style.height = window.visualViewport.height+'px';
    });
  }
</script>
</body>
</html>