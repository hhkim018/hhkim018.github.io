'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, BellRing, Cable, Check, CircleAlert, RotateCcw, Send, Wifi, WifiOff } from 'lucide-react';
import styles from './BrowserTools.module.css';

export const browserToolMeta = {
  ko: [
    ['WebSocket 클라이언트', '브라우저에서 WebSocket 서버에 직접 연결해 텍스트 메시지를 보내고 응답과 연결 로그를 확인합니다.', 'WebSocket URL에 연결한 뒤 텍스트 프레임을 보내고 서버 응답과 연결 상태를 확인하세요.', 'wss://서버주소/경로 · Hello WebSocket', 'OPEN · 보낸 메시지와 서버 응답 로그', '보내기를 누르면 입력 메시지가 선택한 WebSocket 서버로 직접 전송됩니다. Tools 서버에는 전송하거나 저장하지 않습니다.'],
    ['브라우저 알림·토스트·알람 테스트', '브라우저 알림 권한과 화면 토스트, 타이머 알람을 한곳에서 테스트합니다.', '알림 권한을 요청하고 브라우저 알림을 띄우거나 토스트와 초 단위 타이머 알람을 테스트하세요.', '알림 권한 허용 · 알람 5초', '브라우저 알림 · 화면 토스트 · 알람'],
  ],
  en: [
    ['WebSocket Client', 'Connect directly to a WebSocket server from your browser, send text messages, and inspect replies and connection logs.', 'Connect to a WebSocket URL, send text frames, and inspect server replies and connection status.', 'wss://server/path · Hello WebSocket', 'OPEN · sent message and server reply log', 'Messages are sent directly to the selected WebSocket server when you click Send. Tools does not receive or store them.'],
    ['Notification, Toast & Alarm Tester', 'Test browser notification permission, on-page toasts, and timed alarms in one place.', 'Request notification permission, show a browser notification, or test a toast and a seconds-based timer alarm.', 'Allow notifications · alarm in 5 seconds', 'Browser notification · page toast · alarm'],
  ],
  ja: [
    ['WebSocketクライアント', 'ブラウザーからWebSocketサーバーに直接接続し、テキスト送信、応答、接続ログを確認します。', 'WebSocket URLに接続し、テキストフレームを送信して応答と接続状態を確認します。', 'wss://サーバー/パス · Hello WebSocket', 'OPEN · 送信内容とサーバー応答ログ', '送信を押すと、入力したメッセージは選択したWebSocketサーバーに直接送信されます。Toolsは受信・保存しません。'],
    ['通知・トースト・アラームテスト', 'ブラウザー通知の権限、画面内トースト、タイマーアラームをテストします。', '通知権限をリクエストし、ブラウザー通知やトースト、秒単位のタイマーをテストします。', '通知を許可 · 5秒後にアラーム', 'ブラウザー通知 · 画面トースト · アラーム'],
  ],
  zh: [
    ['WebSocket 客户端', '在浏览器中直接连接 WebSocket 服务器，发送文本并查看响应与连接日志。', '连接 WebSocket 地址，发送文本帧并查看服务器响应和连接状态。', 'wss://服务器/路径 · Hello WebSocket', 'OPEN · 已发送消息和服务器响应日志', '点击发送后，消息会直接发送到所选 WebSocket 服务器。Tools 不会接收或保存消息。'],
    ['通知、Toast 与闹钟测试器', '测试浏览器通知权限、页面 Toast 提示和定时闹钟。', '请求通知权限、显示浏览器通知，或测试页面 Toast 和秒级定时闹钟。', '允许通知 · 5 秒后闹钟', '浏览器通知 · 页面 Toast · 闹钟'],
  ],
};

const text = {
  ko: {
    ws: 'WebSocket 연결 테스트', endpoint: 'WebSocket 주소', endpointHint: 'wss:// 또는 ws:// 주소를 입력하세요.', message: '보낼 메시지', send: '보내기', connect: '연결', disconnect: '연결 끊기', clear: '로그 지우기', log: '연결 로그', emptyLog: '아직 로그가 없습니다.', invalidUrl: 'ws:// 또는 wss:// 주소를 확인해 주세요.', connecting: '연결 중', open: '연결됨', closing: '종료 중', closed: '연결 안 됨', caution: '직접 관리하거나 테스트 권한이 있는 서버에만 연결하세요. HTTPS 페이지에서는 보안 연결(wss://)이 필요할 수 있습니다.',
    notification: '브라우저 알림', toast: '토스트', alarm: '타이머 알람', permission: '알림 권한', request: '권한 요청', granted: '허용됨', denied: '차단됨', default: '아직 선택하지 않음', unsupported: '알림은 HTTPS 또는 localhost의 지원 브라우저에서 사용할 수 있습니다.', title: '알림 제목', body: '알림 내용', notify: '알림 띄우기', toastType: '토스트 종류', info: '안내', success: '성공', error: '오류', showToast: '토스트 띄우기', duration: '표시 시간 (초)', alarmSeconds: '알람까지 시간 (초)', startAlarm: '알람 시작', cancelAlarm: '알람 취소', alarmRunning: '남은 시간', alarmDone: '알람 시간입니다!', toastDone: '토스트 알림 테스트입니다.', notificationDone: '브라우저 알림 테스트입니다.', noPermission: '알림을 띄우려면 브라우저 알림 권한을 허용해 주세요.', alarmInfo: '시간이 되면 토스트를 표시하고, 페이지가 열려 있으며 권한이 허용된 경우 브라우저 알림도 띄웁니다.',
  },
  en: {
    ws: 'WebSocket connection test', endpoint: 'WebSocket URL', endpointHint: 'Enter a ws:// or wss:// URL.', message: 'Message to send', send: 'Send', connect: 'Connect', disconnect: 'Disconnect', clear: 'Clear log', log: 'Connection log', emptyLog: 'No log entries yet.', invalidUrl: 'Enter a valid ws:// or wss:// URL.', connecting: 'Connecting', open: 'Connected', closing: 'Closing', closed: 'Disconnected', caution: 'Only connect to servers you own or are authorized to test. Secure pages may require wss://.',
    notification: 'Browser notification', toast: 'Toast', alarm: 'Timed alarm', permission: 'Notification permission', request: 'Request permission', granted: 'Granted', denied: 'Denied', default: 'Not decided', unsupported: 'Notifications require a supported browser on HTTPS or localhost.', title: 'Notification title', body: 'Notification message', notify: 'Show notification', toastType: 'Toast type', info: 'Info', success: 'Success', error: 'Error', showToast: 'Show toast', duration: 'Display duration (seconds)', alarmSeconds: 'Seconds until alarm', startAlarm: 'Start alarm', cancelAlarm: 'Cancel alarm', alarmRunning: 'Time remaining', alarmDone: 'Your alarm is due!', toastDone: 'This is a toast notification test.', notificationDone: 'This is a browser notification test.', noPermission: 'Allow browser notifications before sending a notification.', alarmInfo: 'When the timer ends, a toast appears. Keep this page open; a browser notification also appears if permission is granted.',
  },
  ja: {
    ws: 'WebSocket接続テスト', endpoint: 'WebSocket URL', endpointHint: 'ws:// または wss:// のURLを入力してください。', message: '送信メッセージ', send: '送信', connect: '接続', disconnect: '切断', clear: 'ログを消去', log: '接続ログ', emptyLog: 'ログはまだありません。', invalidUrl: 'ws:// または wss:// の有効なURLを入力してください。', connecting: '接続中', open: '接続済み', closing: '終了中', closed: '未接続', caution: '自分が管理する、またはテスト許可を得たサーバーにのみ接続してください。HTTPSページではwss://が必要な場合があります。',
    notification: 'ブラウザー通知', toast: 'トースト', alarm: 'タイマーアラーム', permission: '通知の権限', request: '権限をリクエスト', granted: '許可', denied: '拒否', default: '未選択', unsupported: '通知はHTTPSまたはlocalhostの対応ブラウザーで利用できます。', title: '通知タイトル', body: '通知メッセージ', notify: '通知を表示', toastType: 'トーストの種類', info: '情報', success: '成功', error: 'エラー', showToast: 'トーストを表示', duration: '表示時間（秒）', alarmSeconds: 'アラームまでの秒数', startAlarm: 'アラーム開始', cancelAlarm: 'アラーム取消', alarmRunning: '残り時間', alarmDone: 'アラームの時間です！', toastDone: 'トースト通知のテストです。', notificationDone: 'ブラウザー通知のテストです。', noPermission: '通知を表示するには、ブラウザー通知を許可してください。', alarmInfo: '時間になるとトーストを表示します。ページを開いたままにすると、許可済みの場合は通知も表示します。',
  },
  zh: {
    ws: 'WebSocket 连接测试', endpoint: 'WebSocket 地址', endpointHint: '请输入 ws:// 或 wss:// 地址。', message: '要发送的消息', send: '发送', connect: '连接', disconnect: '断开连接', clear: '清除日志', log: '连接日志', emptyLog: '暂无日志。', invalidUrl: '请输入有效的 ws:// 或 wss:// 地址。', connecting: '正在连接', open: '已连接', closing: '正在关闭', closed: '未连接', caution: '请只连接你管理或获准测试的服务器。HTTPS 页面可能要求使用 wss://。',
    notification: '浏览器通知', toast: 'Toast 提示', alarm: '定时闹钟', permission: '通知权限', request: '请求权限', granted: '已允许', denied: '已拒绝', default: '尚未选择', unsupported: '通知需在 HTTPS 或 localhost 的受支持浏览器中使用。', title: '通知标题', body: '通知内容', notify: '显示通知', toastType: 'Toast 类型', info: '提示', success: '成功', error: '错误', showToast: '显示 Toast', duration: '显示时长（秒）', alarmSeconds: '闹钟倒计时（秒）', startAlarm: '启动闹钟', cancelAlarm: '取消闹钟', alarmRunning: '剩余时间', alarmDone: '闹钟时间到！', toastDone: '这是一条 Toast 测试提示。', notificationDone: '这是一条浏览器通知测试。', noPermission: '请先允许浏览器通知，然后再发送通知。', alarmInfo: '计时结束时会显示 Toast。请保持页面打开；如果已允许通知，也会显示浏览器通知。',
  },
};

function statusText(status, c) {
  return { connecting: c.connecting, open: c.open, closing: c.closing, closed: c.closed }[status] || c.closed;
}

export function WebSocketClient({ locale = 'ko' }) {
  const c = text[locale] || text.ko;
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('Hello WebSocket');
  const [status, setStatus] = useState('closed');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const addLog = (kind, content) => setLogs((items) => [...items, { id: `${Date.now()}-${Math.random()}`, kind, content: String(content).slice(0, 10000), time: new Date().toLocaleTimeString(locale) }].slice(-100));

  useEffect(() => () => socketRef.current?.close(), []);

  const connect = () => {
    setError('');
    let parsed;
    try {
      parsed = new URL(url.trim());
      if (!['ws:', 'wss:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) throw new Error();
    } catch {
      setError(c.invalidUrl);
      return;
    }
    socketRef.current?.close();
    let socket;
    try { socket = new WebSocket(parsed.href); } catch { setError(c.invalidUrl); return; }
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;
    setStatus('connecting');
    addLog('system', `${c.connecting}: ${parsed.href}`);
    socket.addEventListener('open', () => {
      if (socketRef.current !== socket) return;
      setStatus('open');
      addLog('system', c.open);
    });
    socket.addEventListener('message', (event) => {
      const payload = typeof event.data === 'string' ? event.data : event.data instanceof ArrayBuffer ? new TextDecoder().decode(event.data) : `[${event.data?.constructor?.name || 'binary'}]`;
      addLog('received', payload);
    });
    socket.addEventListener('error', () => addLog('error', 'WebSocket error'));
    socket.addEventListener('close', (event) => {
      if (socketRef.current === socket) {
        socketRef.current = null;
        setStatus('closed');
      }
      addLog('system', `${c.closed} · ${event.code}${event.reason ? ` · ${event.reason}` : ''}`);
    });
  };

  const disconnect = () => {
    if (!socketRef.current) return;
    setStatus('closing');
    socketRef.current.close(1000, 'Closed by user');
  };

  const send = () => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    try {
      socket.send(message);
      addLog('sent', message);
    } catch {
      addLog('error', 'Could not send message');
    }
  };

  return <div className="tool-stack">
    <section className="panel">
      <div className="panel-title"><Cable size={17}/><h3>{c.ws}</h3></div>
      <label className="field"><span className="field-label">{c.endpoint}</span><input type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="wss://example.com/socket" autoComplete="url" /></label>
      <p className="helper-text">{c.endpointHint}</p>
      <div className={styles.actions}>
        <span className={styles.status}><span className={`${styles.statusDot} ${styles[status]}`}/>{statusText(status, c)}</span>
        {status === 'open' || status === 'connecting' ? <button type="button" className="button button-light" onClick={disconnect}><WifiOff size={15}/>{c.disconnect}</button> : <button type="button" className="button button-primary" onClick={connect}><Wifi size={15}/>{c.connect}</button>}
      </div>
      {error && <p className="status is-error" role="alert">{error}</p>}
      <label className="field"><span className="field-label">{c.message}</span><textarea value={message} maxLength={65536} onChange={(event) => setMessage(event.target.value)} rows={3} /></label>
      <button type="button" className="button button-primary" onClick={send} disabled={status !== 'open'}><Send size={15}/>{c.send}</button>
      <p className="helper-text">{c.caution}</p>
    </section>
    <section className="panel">
      <div className={styles.logHeading}><h3>{c.log}</h3><button type="button" className="button button-light" onClick={() => setLogs([])}><RotateCcw size={14}/>{c.clear}</button></div>
      <div className={styles.log} aria-live="polite">{logs.length ? logs.map((entry) => <div className={`${styles.logEntry} ${styles[entry.kind]}`} key={entry.id}><time>{entry.time}</time><b>{entry.kind}</b><span>{entry.content}</span></div>) : <p className="helper-text">{c.emptyLog}</p>}</div>
    </section>
  </div>;
}

export function NotificationTester({ locale = 'ko' }) {
  const c = text[locale] || text.ko;
  const [tab, setTab] = useState('notification');
  const [permission, setPermission] = useState('unsupported');
  const [title, setTitle] = useState('Tools');
  const [body, setBody] = useState(c.notificationDone);
  const [toastType, setToastType] = useState('info');
  const [toastDuration, setToastDuration] = useState(4);
  const [toast, setToast] = useState(null);
  const [alarmSeconds, setAlarmSeconds] = useState(5);
  const [alarmRemaining, setAlarmRemaining] = useState(0);
  const [alarmActive, setAlarmActive] = useState(false);
  const [notice, setNotice] = useState('');
  const toastTimer = useRef(null);
  const alarmTicker = useRef(null);
  const alarmDeadline = useRef(0);

  useEffect(() => {
    setPermission('Notification' in window && window.isSecureContext ? Notification.permission : 'unsupported');
    return () => {
      window.clearTimeout(toastTimer.current);
      window.clearInterval(alarmTicker.current);
    };
  }, []);

  const showToast = (kind, message, duration = toastDuration) => {
    window.clearTimeout(toastTimer.current);
    setToast({ kind, message });
    toastTimer.current = window.setTimeout(() => setToast(null), Math.max(1, Number(duration) || 4) * 1000);
  };

  const requestPermission = async () => {
    if (!('Notification' in window) || !window.isSecureContext) { setPermission('unsupported'); return; }
    try { setPermission(await Notification.requestPermission()); } catch { setPermission('denied'); }
  };

  const sendNotification = () => {
    if (!('Notification' in window) || !window.isSecureContext) { setPermission('unsupported'); return; }
    if (Notification.permission !== 'granted') { setPermission(Notification.permission); setNotice(c.noPermission); return; }
    setNotice('');
    try { new Notification(title.trim() || 'Tools', { body: body.trim() || c.notificationDone }); } catch { setNotice(c.noPermission); }
  };

  const stopAlarm = () => {
    window.clearInterval(alarmTicker.current);
    setAlarmActive(false);
    setAlarmRemaining(0);
  };

  const startAlarm = () => {
    const seconds = Math.min(86400, Math.max(1, Math.floor(Number(alarmSeconds) || 1)));
    window.clearInterval(alarmTicker.current);
    alarmDeadline.current = Date.now() + seconds * 1000;
    setAlarmRemaining(seconds);
    setAlarmActive(true);
    alarmTicker.current = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((alarmDeadline.current - Date.now()) / 1000));
      setAlarmRemaining(remaining);
      if (remaining === 0) {
        window.clearInterval(alarmTicker.current);
        setAlarmActive(false);
        showToast('success', c.alarmDone, 8);
        if ('Notification' in window && window.isSecureContext && Notification.permission === 'granted') { try { new Notification('Tools', { body: c.alarmDone }); } catch {} }
      }
    }, 200);
  };

  const permissionLabel = { granted: c.granted, denied: c.denied, default: c.default, unsupported: c.unsupported }[permission] || c.default;
  return <div className="tool-stack">
    <div className={styles.tabs} role="tablist" aria-label={browserToolMeta[locale][1][0]}>
      {(['notification', 'toast', 'alarm']).map((item) => <button type="button" role="tab" aria-selected={tab === item} className={`button ${tab === item ? 'button-primary' : 'button-light'}`} key={item} onClick={() => { setTab(item); setNotice(''); }}>{c[item]}</button>)}
    </div>

    {tab === 'notification' && <section className="panel">
      <div className="panel-title"><Bell size={17}/><h3>{c.notification}</h3></div>
      <div className={styles.permission}><span>{c.permission}</span><strong>{permissionLabel}</strong></div>
      {permission === 'default' && <button type="button" className="button button-light" onClick={requestPermission}><BellRing size={15}/>{c.request}</button>}
      {permission === 'unsupported' && <p className="helper-text">{c.unsupported}</p>}
      <label className="field"><span className="field-label">{c.title}</span><input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
      <label className="field"><span className="field-label">{c.body}</span><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={3}/></label>
      {notice && <p className="status is-error" role="alert">{notice}</p>}
      <button type="button" className="button button-primary" onClick={sendNotification} disabled={permission !== 'granted'}><Bell size={15}/>{c.notify}</button>
    </section>}

    {tab === 'toast' && <section className="panel">
      <div className="panel-title"><CircleAlert size={17}/><h3>{c.toast}</h3></div>
      <label className="field"><span className="field-label">{c.toastType}</span><select value={toastType} onChange={(event) => setToastType(event.target.value)}><option value="info">{c.info}</option><option value="success">{c.success}</option><option value="error">{c.error}</option></select></label>
      <label className="field"><span className="field-label">{c.duration}</span><input type="number" min="1" max="30" value={toastDuration} onChange={(event) => setToastDuration(Math.min(30, Math.max(1, Number(event.target.value) || 1)))}/></label>
      <button type="button" className="button button-primary" onClick={() => showToast(toastType, c.toastDone)}>{c.showToast}</button>
    </section>}

    {tab === 'alarm' && <section className="panel">
      <div className="panel-title"><BellRing size={17}/><h3>{c.alarm}</h3></div>
      <label className="field"><span className="field-label">{c.alarmSeconds}</span><input type="number" min="1" max="86400" value={alarmSeconds} disabled={alarmActive} onChange={(event) => setAlarmSeconds(Math.min(86400, Math.max(1, Number(event.target.value) || 1)))}/></label>
      {alarmActive && <div className={styles.alarmRemaining}><span>{c.alarmRunning}</span><strong>{alarmRemaining}s</strong></div>}
      {alarmActive ? <button type="button" className="button button-light" onClick={stopAlarm}><RotateCcw size={15}/>{c.cancelAlarm}</button> : <button type="button" className="button button-primary" onClick={startAlarm}><BellRing size={15}/>{c.startAlarm}</button>}
      <p className="helper-text">{c.alarmInfo}</p>
    </section>}

    {toast && <div className={`${styles.toast} ${styles[`toast-${toast.kind}`]}`} role="status" aria-live="polite">{toast.message}</div>}
  </div>;
}
