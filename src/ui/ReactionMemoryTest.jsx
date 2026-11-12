'use client';

import { useEffect, useRef, useState } from 'react';
import { Share2, Timer, Brain, RotateCcw } from 'lucide-react';
import styles from './ReactionMemoryTest.module.css';

const copy = {
  ko: { title: '반응속도·기억력 테스트', description: '반응속도와 숫자 기억력을 측정하고 브라우저에 최고 기록을 저장해 친구와 비교해 보세요.', reaction: '반응속도', memory: '숫자 기억', start: '시작', retry: '다시 시도', wait: '초록색 신호가 나오면 누르세요', ready: '지금 누르세요!', early: '너무 빨랐어요. 같은 회차를 다시 시도하세요.', round: '회차', average: '5회 평균', best: '내 최고 기록', ms: 'ms', share: '결과 공유', copied: '점수를 클립보드에 복사했습니다.', shareError: '공유할 수 없습니다. 다시 시도해 주세요.', digits: '자리', showing: '숫자를 기억하세요', enter: '본 순서대로 숫자를 누르세요', submit: '확인', next: '다음 단계', correct: '정답입니다!', wrong: '틀렸어요. 이번 점수', score: '이번 점수', backspace: '마지막 숫자 삭제', guide: '반응 테스트는 신호가 나타난 뒤 누른 시간을 5회 평균 냅니다. 기억력 테스트는 세 자리부터 시작해 성공할 때마다 한 자리씩 늘어납니다.', inputExample: '반응속도: 5회 측정', outputExample: '평균 245 ms · 기억력: 7자리 성공' },
  en: { title: 'Reaction & Memory Test', description: 'Measure reaction speed and digit memory, save personal bests in this browser, and compare scores with friends.', reaction: 'Reaction', memory: 'Digit memory', start: 'Start', retry: 'Try again', wait: 'Wait for the green signal, then tap', ready: 'Tap now!', early: 'Too soon. Retry this round.', round: 'Round', average: '5-round average', best: 'Personal best', share: 'Share score', copied: 'Score copied to clipboard.', shareError: 'Could not share the score. Try again.', digits: 'digits', showing: 'Remember the digits', enter: 'Enter the digits in order', submit: 'Check', next: 'Next level', correct: 'Correct!', wrong: 'Not quite. Your score', score: 'Your score', backspace: 'Delete last digit', guide: 'Reaction score is the average of five valid attempts. Digit memory starts at three digits and adds one after each success.', inputExample: 'Reaction: 5 attempts', outputExample: '245 ms average · Memory: 7 digits' },
  ja: { title: '反応速度・記憶力テスト', description: '反応速度と数字の記憶力を測定し、このブラウザーに記録して友達と比べられます。', reaction: '反応速度', memory: '数字記憶', start: '開始', retry: 'もう一度', wait: '緑の合図が出たらタップ', ready: '今すぐタップ！', early: '早すぎます。同じラウンドをやり直してください。', round: 'ラウンド', average: '5回の平均', best: '自己ベスト', share: 'スコアを共有', copied: 'スコアをクリップボードにコピーしました。', shareError: '共有できませんでした。もう一度お試しください。', digits: '桁', showing: '数字を覚えてください', enter: '同じ順番で数字を入力してください', submit: '確認', next: '次のレベル', correct: '正解！', wrong: '不正解。今回のスコア', score: '今回のスコア', backspace: '最後の数字を削除', guide: '反応速度は有効な5回の平均です。数字記憶は3桁から始まり、正解するたびに1桁増えます。', inputExample: '反応速度：5回測定', outputExample: '平均 245 ms · 記憶力：7桁' },
  zh: { title: '反应速度与记忆力测试', description: '测量反应速度和数字记忆力，在此浏览器保存最佳成绩并与朋友比较。', reaction: '反应速度', memory: '数字记忆', start: '开始', retry: '再试一次', wait: '等待绿色信号出现后点击', ready: '现在点击！', early: '太快了，请重试本轮。', round: '轮次', average: '5 次平均', best: '个人最佳', share: '分享成绩', copied: '成绩已复制到剪贴板。', shareError: '无法分享，请重试。', digits: '位', showing: '记住数字', enter: '按顺序输入数字', submit: '确认', next: '下一关', correct: '正确！', wrong: '答错了。本次成绩', score: '本次成绩', backspace: '删除最后一位', guide: '反应速度取 5 次有效测量的平均值。数字记忆从 3 位开始，每答对一次增加 1 位。', inputExample: '反应速度：测量 5 次', outputExample: '平均 245 毫秒 · 记忆力：7 位' },
};

const REACTION_KEY = 'tiny-tools-reaction-best-v1';
const MEMORY_KEY = 'tiny-tools-memory-best-v1';

function readRecord(key, fallback) {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  } catch {
    return fallback;
  }
}

function ReactionMemoryTest({ locale = 'ko' }) {
  const c = copy[locale] || copy.ko;
  const [mode, setMode] = useState('reaction');
  const [reactionPhase, setReactionPhase] = useState('idle');
  const [round, setRound] = useState(1);
  const [times, setTimes] = useState([]);
  const [reactionScore, setReactionScore] = useState(null);
  const [reactionBest, setReactionBest] = useState(null);
  const [memoryBest, setMemoryBest] = useState(0);
  const [memoryPhase, setMemoryPhase] = useState('idle');
  const [sequence, setSequence] = useState([]);
  const [showIndex, setShowIndex] = useState(0);
  const [shownDigit, setShownDigit] = useState('');
  const [entered, setEntered] = useState('');
  const [memoryScore, setMemoryScore] = useState(0);
  const [shareMessage, setShareMessage] = useState('');
  const reactionTimer = useRef(null);
  const memoryTimer = useRef(null);
  const cueTime = useRef(0);

  useEffect(() => {
    setReactionBest(readRecord(REACTION_KEY, null));
    setMemoryBest(readRecord(MEMORY_KEY, 0));
    return () => {
      window.clearTimeout(reactionTimer.current);
      window.clearTimeout(memoryTimer.current);
    };
  }, []);

  const scheduleReaction = (nextRound) => {
    setRound(nextRound);
    setReactionPhase('waiting');
    reactionTimer.current = window.setTimeout(() => {
      cueTime.current = performance.now();
      setReactionPhase('ready');
    }, 1200 + Math.random() * 2800);
  };

  const startReaction = () => {
    window.clearTimeout(reactionTimer.current);
    setTimes([]);
    setReactionScore(null);
    scheduleReaction(1);
  };

  const handleReaction = () => {
    if (reactionPhase === 'idle' || reactionPhase === 'result') {
      startReaction();
      return;
    }
    if (reactionPhase === 'waiting') {
      window.clearTimeout(reactionTimer.current);
      setReactionPhase('early');
      return;
    }
    if (reactionPhase === 'early') {
      scheduleReaction(round);
      return;
    }
    if (reactionPhase !== 'ready') return;

    const nextTimes = [...times, Math.round(performance.now() - cueTime.current)];
    setTimes(nextTimes);
    if (nextTimes.length === 5) {
      const score = Math.round(nextTimes.reduce((sum, time) => sum + time, 0) / nextTimes.length);
      setReactionScore(score);
      setReactionPhase('result');
      const best = reactionBest == null ? score : Math.min(reactionBest, score);
      setReactionBest(best);
      try { localStorage.setItem(REACTION_KEY, String(best)); } catch {}
      return;
    }
    scheduleReaction(nextTimes.length + 1);
  };

  const startMemory = (length = 3) => {
    window.clearTimeout(memoryTimer.current);
    const nextSequence = Array.from({ length }, () => Math.floor(Math.random() * 10));
    setSequence(nextSequence);
    setShowIndex(0);
    setShownDigit('');
    setEntered('');
    setMemoryPhase('showing');
  };

  useEffect(() => {
    if (memoryPhase !== 'showing') return undefined;
    if (showIndex >= sequence.length) {
      memoryTimer.current = window.setTimeout(() => setMemoryPhase('input'), 450);
      return () => window.clearTimeout(memoryTimer.current);
    }
    setShownDigit(String(sequence[showIndex]));
    memoryTimer.current = window.setTimeout(() => {
      setShownDigit('');
      memoryTimer.current = window.setTimeout(() => setShowIndex((index) => index + 1), 250);
    }, 650);
    return () => window.clearTimeout(memoryTimer.current);
  }, [memoryPhase, sequence, showIndex]);

  const checkMemory = () => {
    const isCorrect = entered === sequence.join('');
    if (!isCorrect) {
      setMemoryPhase('result');
      return;
    }
    const score = sequence.length;
    setMemoryScore(score);
    const best = Math.max(memoryBest, score);
    setMemoryBest(best);
    try { localStorage.setItem(MEMORY_KEY, String(best)); } catch {}
    setMemoryPhase('success');
  };

  const shareScore = async () => {
    const value = mode === 'reaction' ? reactionScore : memoryScore;
    if (value == null) return;
    const result = mode === 'reaction' ? `${c.reaction}: ${value} ms` : `${c.memory}: ${value} ${c.digits}`;
    const message = `${c.title} — ${result} · ${window.location.href}`;
    try {
      if (navigator.share) await navigator.share({ title: c.title, text: message });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(message); setShareMessage(c.copied); }
      else throw new Error('Sharing is unavailable');
      if (navigator.share) setShareMessage('');
    } catch (error) {
      if (error?.name !== 'AbortError') setShareMessage(c.shareError);
    }
  };

  const switchMode = (nextMode) => {
    window.clearTimeout(reactionTimer.current);
    window.clearTimeout(memoryTimer.current);
    setMode(nextMode);
    setReactionPhase('idle');
    setMemoryPhase('idle');
    setShownDigit('');
    setTimes([]);
    setReactionScore(null);
    setMemoryScore(0);
    setShareMessage('');
  };

  const bestLabel = mode === 'reaction'
    ? reactionBest == null ? '—' : `${reactionBest} ${c.ms}`
    : memoryBest ? `${memoryBest} ${c.digits}` : '—';
  const scoreAvailable = mode === 'reaction' ? reactionScore != null : memoryScore > 0;

  return <div className={`tool-stack ${styles.root}`}>
    <div className={styles.tabs} role="tablist" aria-label={c.title}>
      <button type="button" role="tab" aria-selected={mode === 'reaction'} className={`button ${mode === 'reaction' ? 'button-primary' : 'button-light'}`} onClick={() => switchMode('reaction')}><Timer size={15}/>{c.reaction}</button>
      <button type="button" role="tab" aria-selected={mode === 'memory'} className={`button ${mode === 'memory' ? 'button-primary' : 'button-light'}`} onClick={() => switchMode('memory')}><Brain size={15}/>{c.memory}</button>
    </div>

    <div className={`panel ${styles.record}`}><span>{c.best}</span><strong>{bestLabel}</strong></div>

    {mode === 'reaction' ? <section className={`panel ${styles.gamePanel}`} aria-live="polite">
      <p className="helper-text">{c.round} {Math.min(round, 5)} / 5</p>
      <button type="button" className={`${styles.target} ${reactionPhase === 'ready' ? styles.ready : ''}`} disabled={reactionPhase !== 'waiting' && reactionPhase !== 'ready'} onClick={handleReaction}>
        {reactionPhase === 'waiting' ? c.wait : reactionPhase === 'ready' ? c.ready : reactionPhase === 'early' ? c.early : reactionPhase === 'result' ? `${c.average}: ${reactionScore} ${c.ms}` : c.start}
      </button>
      {reactionPhase === 'result' ? <div className={styles.result}><strong>{reactionScore} {c.ms}</strong><span>{c.average}</span></div> : null}
      {reactionPhase === 'idle' || reactionPhase === 'result' ? <button type="button" className="button button-light" onClick={startReaction}><RotateCcw size={15}/>{c.start}</button> : null}
      {reactionPhase === 'early' ? <button type="button" className="button button-light" onClick={handleReaction}>{c.retry}</button> : null}
      {times.length > 0 && <p className="helper-text">{times.map((time, index) => `${index + 1}: ${time} ${c.ms}`).join(' · ')}</p>}
    </section> : <section className={`panel ${styles.gamePanel}`} aria-live="polite">
      <p className="helper-text">{c.digits}: {Math.max(3, sequence.length || 3)}</p>
      <div className={styles.display} aria-label={memoryPhase === 'showing' ? c.showing : c.enter}>
        {memoryPhase === 'showing' ? shownDigit : memoryPhase === 'input' ? entered || '·' : memoryPhase === 'success' ? c.correct : memoryPhase === 'result' ? `${c.wrong}: ${memoryScore} ${c.digits}` : '—'}
      </div>
      {memoryPhase === 'idle' || memoryPhase === 'result' ? <button type="button" className="button button-primary" onClick={() => startMemory(3)}>{c.start}</button> : null}
      {memoryPhase === 'showing' && <p className="helper-text">{c.showing}</p>}
      {memoryPhase === 'input' && <>
        <p className="helper-text">{c.enter}</p>
        <div className={styles.keypad}>{Array.from({ length: 10 }, (_, digit) => <button type="button" className="button button-light" key={digit} disabled={entered.length >= sequence.length} onClick={() => setEntered((current) => current.length < sequence.length ? `${current}${digit}` : current)}>{digit}</button>)}</div>
        <div className={styles.actions}><button type="button" className="button button-light" aria-label={c.backspace} onClick={() => setEntered((current) => current.slice(0, -1))}>⌫</button><button type="button" className="button button-primary" disabled={entered.length !== sequence.length} onClick={checkMemory}>{c.submit}</button></div>
      </>}
      {memoryPhase === 'success' && <><p className={styles.result}><strong>{c.correct}</strong><span>{memoryScore} {c.digits}</span></p><button type="button" className="button button-primary" onClick={() => startMemory(sequence.length + 1)}>{c.next}</button></>}
    </section>}

    {scoreAvailable && <div className={styles.share}><button type="button" className="button button-light" onClick={shareScore}><Share2 size={15}/>{c.share}</button>{shareMessage && <span role="status">{shareMessage}</span>}</div>}
    <p className="helper-text">{c.guide}</p>
  </div>;
}

export const reactionMemoryMeta = Object.fromEntries(Object.entries(copy).map(([locale, text]) => [locale, [text.title, text.description, text.guide, text.inputExample, text.outputExample]]));

export default ReactionMemoryTest;
