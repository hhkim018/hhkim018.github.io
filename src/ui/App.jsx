'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ArrowLeft, Search, Menu, X, ArrowRight, Play, Pause, RotateCcw, Timer, Music2, QrCode, Barcode, Braces, Link2, Fingerprint, Clock3, Split, Binary, Regex, FileCode2, Palette, Dices, TrendingDown, Type, Percent, Landmark, Download, Upload, Camera, CheckCircle2, AlertCircle, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { diffLines } from 'diff';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const langs = ['ko', 'ja', 'zh', 'en'];
const slugs = ['metronome', 'stopwatch', 'barcode', 'qr-code', 'json-formatter', 'url-encoder', 'uuid-generator', 'unix-timestamp', 'text-diff', 'base64', 'regex-tester', 'markdown-preview', 'color-converter', 'dice-roller', 'stock-average-calculator', 'character-byte-counter', 'percentage-discount-calculator', 'interest-calculator', 'character-encoding-converter', 'morse-code'];
const dictionaries = {
  ko: { name: '한국어', eyebrow: '필요한 순간, 바로 쓰는', title: 'TOOLS', subtitle: '일상과 개발에 필요한 도구를 한곳에서, 가볍고 빠르게.', search: '도구 검색...', all: '모든 도구', home: '홈', back: '도구 목록으로', open: '열어보기', popular: '매일 쓰는 도구', categories: ['시간', '코드 & 데이터', '텍스트', '디자인', '게임', '계산기'], category: '카테고리', input: '입력', output: '결과', copy: '복사', copied: '복사 완료', clear: '초기화', download: '다운로드', start: '시작', stop: '정지', reset: '다시 시작', generate: '생성하기', scan: '이미지 스캔', camera: '카메라로 스캔', file: '이미지 선택', noResult: '결과가 여기에 표시됩니다.', valid: '유효한 입력입니다', invalid: '입력을 확인해 주세요', encode: '인코딩', decode: '디코딩', pretty: '정리하기', minify: '압축하기', left: '원본', right: '변경본', text: '텍스트', flags: '플래그', pattern: '정규식', preview: '미리보기', bpm: '분당 박자', beats: '한 마디 박자', running: '실행 중', laps: '랩 기록', addLap: '랩 기록', count: '개수', timestamp: '타임스탬프', date: '날짜', seconds: '초', milliseconds: '밀리초', color: '색상 코드', foreground: '글자색', background: '배경색', contrast: '명암비', pass: '통과', fail: '기준 미달', secure: '모든 작업은 이 기기에서 처리됩니다. 입력 데이터는 서버로 전송되지 않습니다.', empty: '검색 결과가 없습니다.', footer: '작게 만들고, 유용하게 쓰세요.', barcodeValue: '바코드에 담을 값', qrValue: 'QR 코드에 담을 내용', jsonPlaceholder: '{\n  "hello": "world"\n}', urlPlaceholder: '변환할 텍스트나 URL', diffPlaceholder: '비교할 텍스트를 입력하세요', markdownPlaceholder: '# 제목\n\n마크다운을 입력해 보세요.', regexPlaceholder: '패턴 예: \\d+', scanHelp: '스캔 기능은 기기 카메라 또는 이미지 파일을 사용합니다.', tap: '탭 템포', metronome: '메트로놈', stopwatch: '스톱워치', barcode: '바코드', qr: 'QR 코드', json: 'JSON 정리·검증기', url: 'URL 인코딩·디코딩', uuid: 'UUID 생성기', unix: 'Unix 타임스탬프 변환기', diff: '텍스트 비교기', base64: 'Base64 인코딩·디코딩', regex: '정규식 테스트기', markdown: 'Markdown 미리보기', colorTool: '색상 코드 변환기·대비 확인기', dice: '주사위 굴리기', rollDice: '주사위 굴리기', diceRolling: '굴리는 중…', diceResult: '나온 눈', diceCount: '주사위 개수', diceTotal: '합계', diceDescription: '1~10개 중 개수를 선택해 6면 주사위를 함께 굴립니다.', stockCalc: '주식 물타기 계산기', charCount: '글자수·바이트 계산기', percentCalc: '퍼센트·할인 계산기', interestCalc: '이자 계산기', encodingConverter: '글자 인코딩 변환기', descriptions: ['박자와 템포를 정확하게 맞춰 보세요.', '랩 타임을 기록하는 간편한 타이머.', 'Code 128 바코드를 만들고 읽어 보세요.', 'QR 코드를 만들고 내용을 확인하세요.', 'JSON을 보기 좋게 정리하고 유효성을 확인하세요.', 'URL 문자열을 안전하게 인코딩하거나 디코딩하세요.', '필요한 만큼 무작위 UUID를 생성하세요.', 'Unix 시간과 날짜를 서로 변환하세요.', '두 텍스트의 차이를 한눈에 비교하세요.', 'Base64 텍스트를 UTF-8로 변환하세요.', '정규식 패턴과 매칭 결과를 확인하세요.', '마크다운을 입력하고 결과를 미리 보세요.', '색상 형식을 바꾸고 명암 대비를 확인하세요.', '1~10개의 주사위를 굴려 각 눈과 합계를 애니메이션으로 확인합니다.', '보유 수량과 추가 매수가를 입력해 추가 매수 후 새 평단과 총 매입액을 계산합니다.', '공백 포함·제외 글자 수, 줄 수와 UTF-8 바이트 수를 실시간으로 셉니다.', '비율, 퍼센트 증감률과 할인액·할인가를 계산합니다.', '원금·연이율·기간으로 단리 또는 복리 이자와 만기 금액을 계산합니다.', '텍스트를 UTF-8, EUC-KR, Shift_JIS, GBK 등 문자 인코딩으로 변환합니다.'] },
  en: { name: 'English', eyebrow: 'The right tool, right when you need it', title: 'Little Tools', subtitle: 'A tidy collection of handy tools for everyday tasks and development.', search: 'Search tools...', all: 'All tools', home: 'Home', back: 'All tools', open: 'Open tool', popular: 'Tools for every day', categories: ['Time', 'Code & Data', 'Text', 'Design', 'Games', 'Calculators'], category: 'Category', input: 'Input', output: 'Result', copy: 'Copy', copied: 'Copied', clear: 'Clear', download: 'Download', start: 'Start', stop: 'Stop', reset: 'Reset', generate: 'Generate', scan: 'Scan image', camera: 'Scan with camera', file: 'Choose image', noResult: 'Your result will appear here.', valid: 'Valid input', invalid: 'Please check your input', encode: 'Encode', decode: 'Decode', pretty: 'Format', minify: 'Minify', left: 'Original', right: 'Changed', text: 'Text', flags: 'Flags', pattern: 'Pattern', preview: 'Preview', bpm: 'Beats per minute', beats: 'Beats per bar', running: 'Running', laps: 'Laps', addLap: 'Lap', count: 'Count', timestamp: 'Timestamp', date: 'Date', seconds: 'Seconds', milliseconds: 'Milliseconds', color: 'Color code', foreground: 'Text color', background: 'Background', contrast: 'Contrast ratio', pass: 'Pass', fail: 'Below target', secure: 'Everything runs in your browser. Your input is never sent to a server.', empty: 'No tools found.', footer: 'Small tools, made useful.', barcodeValue: 'Value to encode', qrValue: 'Text or URL for your QR code', jsonPlaceholder: '{\n  "hello": "world"\n}', urlPlaceholder: 'Text or URL to convert', diffPlaceholder: 'Enter text to compare', markdownPlaceholder: '# Heading\n\nWrite some Markdown here.', regexPlaceholder: 'Pattern, e.g. \\d+', scanHelp: 'Scanning uses your camera or an image file.', tap: 'Tap tempo', metronome: 'Metronome', stopwatch: 'Stopwatch', barcode: 'Barcode', qr: 'QR code', json: 'JSON formatter & validator', url: 'URL encoder & decoder', uuid: 'UUID generator', unix: 'Unix timestamp converter', diff: 'Text diff', base64: 'Base64 encoder & decoder', regex: 'Regex tester', markdown: 'Markdown preview', colorTool: 'Color converter & contrast checker', dice: 'Dice roller', rollDice: 'Roll the die', diceRolling: 'Rolling…', diceResult: 'Result', diceCount: 'Number of dice', diceTotal: 'Total', diceDescription: 'Choose 1 to 10 dice and roll them together.', stockCalc: 'Stock Averaging Calculator', charCount: 'Character and Byte Counter', percentCalc: 'Percentage and Discount Calculator', interestCalc: 'Interest Calculator', encodingConverter: 'Text Encoding Converter', descriptions: ['Keep your beat and tempo steady.', 'A simple stopwatch with lap times.', 'Create and read Code 128 barcodes.', 'Create QR codes and read their contents.', 'Format JSON and check that it is valid.', 'Safely encode or decode a URL string.', 'Generate as many random UUIDs as you need.', 'Convert between Unix time and dates.', 'Compare two texts line by line.', 'Convert Base64 text to and from UTF-8.', 'Test a regular expression and its matches.', 'Write Markdown and preview the result.', 'Convert color formats and check contrast.', 'Roll 1 to 10 six-sided dice and see each result and the total.', 'Calculate your new average cost and total investment after buying more shares.', 'Count characters with or without whitespace, lines, and UTF-8 bytes as you type.', 'Calculate percentages, percentage changes, discounts, and final prices.', 'Calculate simple or compound interest from principal, annual rate, and term.', 'Convert text between UTF-8, EUC-KR, Shift_JIS, GBK, and other encodings.'] },
  ja: { name: '日本語', eyebrow: '必要なときに、すぐ使える', title: '小さなツール', subtitle: '日常や開発に役立つツールを、ひとつの場所に。', search: 'ツールを検索...', all: 'すべてのツール', home: 'ホーム', back: 'ツール一覧', open: 'ツールを開く', popular: 'よく使うツール', categories: ['時間', 'コードとデータ', 'テキスト', 'デザイン', 'ゲーム', '計算ツール'], category: 'カテゴリー', input: '入力', output: '結果', copy: 'コピー', copied: 'コピーしました', clear: 'クリア', download: 'ダウンロード', start: '開始', stop: '停止', reset: 'リセット', generate: '生成', scan: '画像をスキャン', camera: 'カメラでスキャン', file: '画像を選択', noResult: '結果がここに表示されます。', valid: '有効な入力です', invalid: '入力を確認してください', encode: 'エンコード', decode: 'デコード', pretty: '整形', minify: '圧縮', left: '変更前', right: '変更後', text: 'テキスト', flags: 'フラグ', pattern: '正規表現', preview: 'プレビュー', bpm: '毎分の拍数', beats: '1小節の拍数', running: '計測中', laps: 'ラップ', addLap: 'ラップを記録', count: '個数', timestamp: 'タイムスタンプ', date: '日時', seconds: '秒', milliseconds: 'ミリ秒', color: 'カラーコード', foreground: '文字色', background: '背景色', contrast: 'コントラスト比', pass: '合格', fail: '基準未達', secure: 'すべての処理はブラウザー内で行われ、入力データは送信されません。', empty: 'ツールが見つかりません。', footer: '小さく作って、便利に使う。', barcodeValue: 'バーコードにする値', qrValue: 'QRコードに含める内容', jsonPlaceholder: '{\n  "hello": "world"\n}', urlPlaceholder: '変換するテキストまたはURL', diffPlaceholder: '比較するテキストを入力', markdownPlaceholder: '# 見出し\n\nMarkdownを入力してください。', regexPlaceholder: 'パターン例: \\d+', scanHelp: 'カメラまたは画像ファイルを使ってスキャンします。', tap: 'タップテンポ', metronome: 'メトロノーム', stopwatch: 'ストップウォッチ', barcode: 'バーコード', qr: 'QRコード', json: 'JSON整形・検証', url: 'URLエンコード・デコード', uuid: 'UUID生成', unix: 'Unixタイムスタンプ変換', diff: 'テキスト比較', base64: 'Base64変換', regex: '正規表現テスター', markdown: 'Markdownプレビュー', colorTool: '色変換・コントラスト確認', dice: 'サイコロ', rollDice: 'サイコロを振る', diceRolling: '振っています…', diceResult: '出目', diceCount: 'サイコロの数', diceTotal: '合計', diceDescription: '1〜10個を選んで、6面サイコロを同時に振ります。', stockCalc: '株の平均取得単価計算', charCount: '文字数・バイト数カウンター', percentCalc: 'パーセント・割引計算', interestCalc: '利息計算', encodingConverter: '文字エンコード変換', descriptions: ['テンポを正確に刻みます。', 'ラップを記録できるシンプルなタイマー。', 'Code 128バーコードを作成して読み取ります。', 'QRコードを作成して内容を読み取ります。', 'JSONを整形し、正しい形式か確認します。', 'URL文字列をエンコード・デコードします。', '必要な数のUUIDを生成します。', 'Unix時刻と日時を相互変換します。', '2つのテキストの違いを比較します。', 'Base64をUTF-8テキストに変換します。', '正規表現と一致結果を確認します。', 'Markdownを入力してプレビューします。', '色形式を変換し、コントラストを確認します。', '1〜10個のサイコロを振り、それぞれの目と合計を表示します。', '保有株数と追加購入価格から、買い増し後の平均取得単価と投資額を計算します。', '空白を含む・含まない文字数、行数、UTF-8のバイト数をリアルタイムで数えます。', '割合、増減率、割引額と割引後の価格を計算します。', '元金・年利・期間から単利または複利と満期額を計算します。', 'テキストをUTF-8、EUC-KR、Shift_JIS、GBKなどの文字コードに変換します。'] },
  zh: { name: '简体中文', eyebrow: '需要时，马上使用', title: '实用小工具', subtitle: '日常与开发所需的工具，轻巧快速，一站搞定。', search: '搜索工具...', all: '全部工具', home: '首页', back: '返回工具列表', open: '打开工具', popular: '常用工具', categories: ['时间', '代码与数据', '文本', '设计', '游戏', '计算器'], category: '分类', input: '输入', output: '结果', copy: '复制', copied: '已复制', clear: '清除', download: '下载', start: '开始', stop: '停止', reset: '重置', generate: '生成', scan: '扫描图片', camera: '使用相机扫描', file: '选择图片', noResult: '结果将显示在这里。', valid: '输入有效', invalid: '请检查输入内容', encode: '编码', decode: '解码', pretty: '格式化', minify: '压缩', left: '原文', right: '修改后', text: '文本', flags: '标志', pattern: '正则表达式', preview: '预览', bpm: '每分钟节拍数', beats: '每小节拍数', running: '运行中', laps: '计圈', addLap: '记录一圈', count: '数量', timestamp: '时间戳', date: '日期', seconds: '秒', milliseconds: '毫秒', color: '颜色代码', foreground: '文字颜色', background: '背景颜色', contrast: '对比度', pass: '通过', fail: '未达标准', secure: '所有操作都在浏览器中完成，输入内容不会发送到服务器。', empty: '没有找到工具。', footer: '小工具，大用途。', barcodeValue: '要编码的条码内容', qrValue: '二维码内容或网址', jsonPlaceholder: '{\n  "hello": "world"\n}', urlPlaceholder: '要转换的文本或网址', diffPlaceholder: '输入要比较的文本', markdownPlaceholder: '# 标题\n\n在这里输入 Markdown。', regexPlaceholder: '模式示例：\\d+', scanHelp: '扫描功能使用设备相机或图片文件。', tap: '点击测拍', metronome: '节拍器', stopwatch: '秒表', barcode: '条形码', qr: '二维码', json: 'JSON 格式化与验证', url: 'URL 编码与解码', uuid: 'UUID 生成器', unix: 'Unix 时间戳转换器', diff: '文本比较器', base64: 'Base64 编码与解码', regex: '正则表达式测试器', markdown: 'Markdown 预览', colorTool: '颜色转换与对比度检查', dice: '掷骰子', rollDice: '掷骰子', diceRolling: '投掷中…', diceResult: '点数', diceCount: '骰子数量', diceTotal: '总和', diceDescription: '可选择 1 到 10 个六面骰子同时投掷。', stockCalc: '股票补仓计算器', charCount: '字符数与字节数计算器', percentCalc: '百分比与折扣计算器', interestCalc: '利息计算器', encodingConverter: '文本编码转换器', descriptions: ['保持节拍与速度稳定。', '支持记录圈数的简易秒表。', '生成并读取 Code 128 条形码。', '生成二维码并读取其中内容。', '格式化 JSON 并检查语法是否正确。', '安全地编码或解码 URL 字符串。', '按需生成任意数量的随机 UUID。', '在 Unix 时间和日期之间转换。', '逐行比较两段文本的差异。', '在 Base64 与 UTF-8 文本之间转换。', '测试正则表达式及匹配结果。', '编写 Markdown 并实时预览。', '转换颜色格式并检查对比度。', '可投掷 1 到 10 个骰子，并查看各骰子的点数与总和。', '输入持仓数量和补仓价格，计算补仓后的新均价与总投入。', '实时统计含空格与不含空格的字符数、行数和 UTF-8 字节数。', '计算百分比、涨跌幅、折扣金额和折后价格。', '根据本金、年利率和期限计算单利或复利及到期金额。', '在 UTF-8、EUC-KR、Shift_JIS、GBK 等字符编码之间转换文本。'] },
};
const icons = [Music2, Timer, Barcode, QrCode, Braces, Link2, Fingerprint, Clock3, Split, Binary, Regex, FileCode2, Palette, Dices, TrendingDown, Type, Percent, Landmark, Binary, Music2];
const categoryFor = (i) => i === 13 ? 4 : [14, 16, 17].includes(i) ? 5 : i === 0 || i === 1 || i === 7 ? 0 : i >= 2 && i <= 6 || i === 9 ? 1 : i === 8 || i === 10 || i === 11 || i === 15 || i === 18 || i === 19 ? 2 : 3;
const morseToolCopy = {
  ko: { title: '모스부호 변환기·플레이어', description: '영어 텍스트와 국제 모스부호를 서로 변환하고 점·선 신호음을 재생합니다.', guide: '영어 문장이나 모스부호를 입력하고 변환 방향을 선택하세요. 알파벳, 숫자와 일반 문장 부호를 지원하며, 재생 속도는 WPM으로 조절합니다.', inputExample: 'SOS', outputExample: '... --- ...', modeLabel: '변환 방향', toMorse: '영어 텍스트 → 모스부호', toText: '모스부호 → 영어 텍스트', textInput: '영어 텍스트', codeInput: '모스부호 (점 . / 선 -)', textOutput: '영어 텍스트', codeOutput: '모스부호', player: '모스부호 소리 플레이어', play: '재생', stop: '정지', speed: '재생 속도', wpm: 'WPM', speedHelp: 'WPM은 분당 단어 수를 기준으로 한 재생 속도입니다.', unsupported: '영어 알파벳, 숫자 또는 지원 문장 부호만 입력해 주세요.', invalidCode: '모스부호 기호와 글자 사이 공백을 확인해 주세요.', audioError: '이 브라우저에서 오디오를 재생할 수 없습니다.', playing: '모스부호를 재생하고 있습니다.' },
  en: { title: 'Morse Code Translator and Player', description: 'Translate English text to International Morse code, decode it back, and listen to timed tones.', guide: 'Enter English text or Morse code and choose a conversion direction. Letters, numbers, and common punctuation are supported. Adjust playback speed in WPM.', inputExample: 'SOS', outputExample: '... --- ...', modeLabel: 'Conversion direction', toMorse: 'English text → Morse code', toText: 'Morse code → English text', textInput: 'English text', codeInput: 'Morse code (dot . / dash -)', textOutput: 'English text', codeOutput: 'Morse code', player: 'Morse audio player', play: 'Play', stop: 'Stop', speed: 'Playback speed', wpm: 'WPM', speedHelp: 'WPM sets playback speed using words per minute.', unsupported: 'Enter English letters, numbers, or supported punctuation.', invalidCode: 'Check the Morse symbols and spaces between letters.', audioError: 'Audio playback is not available in this browser.', playing: 'Playing Morse code.' },
  ja: { title: 'モールス信号変換・再生ツール', description: '英語テキストを国際モールス信号に変換し、復号して音声を再生できます。', guide: '英語テキストまたはモールス信号を入力し、変換方向を選びます。アルファベット、数字、一般的な句読点に対応し、WPMで再生速度を調整できます。', inputExample: 'SOS', outputExample: '... --- ...', modeLabel: '変換方向', toMorse: '英語テキスト → モールス信号', toText: 'モールス信号 → 英語テキスト', textInput: '英語テキスト', codeInput: 'モールス信号（短点 . / 長点 -）', textOutput: '英語テキスト', codeOutput: 'モールス信号', player: 'モールス音声プレーヤー', play: '再生', stop: '停止', speed: '再生速度', wpm: 'WPM', speedHelp: 'WPMは1分あたりの単語数を基準にした再生速度です。', unsupported: '英字、数字、または対応する句読点を入力してください。', invalidCode: 'モールス記号と文字間の空白を確認してください。', audioError: 'このブラウザーでは音声を再生できません。', playing: 'モールス信号を再生しています。' },
  zh: { title: '摩斯密码转换与播放器', description: '将英文文本转换为国际摩斯密码、解码回文本，并收听点划音。', guide: '输入英文文本或摩斯密码并选择转换方向。支持英文字母、数字和常见标点，可用 WPM 调整播放速度。', inputExample: 'SOS', outputExample: '... --- ...', modeLabel: '转换方向', toMorse: '英文文本 → 摩斯密码', toText: '摩斯密码 → 英文文本', textInput: '英文文本', codeInput: '摩斯密码（点 . / 划 -）', textOutput: '英文文本', codeOutput: '摩斯密码', player: '摩斯密码声音播放器', play: '播放', stop: '停止', speed: '播放速度', wpm: 'WPM', speedHelp: 'WPM 按每分钟单词数设定播放速度。', unsupported: '请输入英文字母、数字或支持的标点符号。', invalidCode: '请检查摩斯符号以及字母之间的空格。', audioError: '此浏览器无法播放音频。', playing: '正在播放摩斯密码。' },
};
const morseFacts = {
  ko: { title: '국제 모스부호와 신호 간격', text: '같은 글자 안의 점·선 사이 간격은 1단위, 대시는 점 3개 길이입니다. 글자 사이는 3단위, 단어 사이는 7단위로 재생합니다. 알파벳·숫자·기본 문장 부호 표는 ITU-R M.1677-1을 기준으로 하며, 일부 추가 문장 부호도 지원합니다.', source: 'ITU-R M.1677-1 국제 모스부호 표준 보기' },
  en: { title: 'International Morse code and timing', text: 'A dash lasts three dot units. Gaps are one unit within a letter, three between letters, and seven between words. Letters, figures, and core punctuation follow ITU-R M.1677-1; this tool also accepts some common extra punctuation.', source: 'Read ITU-R M.1677-1: International Morse code' },
  ja: { title: '国際モールス信号と時間間隔', text: '短点の間隔は1単位、長点は3単位です。文字間は3単位、単語間は7単位で再生します。アルファベット・数字・基本的な句読点はITU-R M.1677-1に準拠し、一部の一般的な追加記号にも対応します。', source: 'ITU-R M.1677-1 国際モールス信号を見る' },
  zh: { title: '国际摩斯密码与信号间隔', text: '划的时长为三个点单位。点划间隔为一个单位，字母间隔为三个单位，单词间隔为七个单位。字母、数字和基本标点参考 ITU-R M.1677-1；本工具也支持部分常见扩展标点。', source: '查看 ITU-R M.1677-1 国际摩斯密码标准' },
};
const titleAt = (t, i, locale) => i === 19 ? morseToolCopy[locale].title : [t.metronome, t.stopwatch, t.barcode, t.qr, t.json, t.url, t.uuid, t.unix, t.diff, t.base64, t.regex, t.markdown, t.colorTool, t.dice, t.stockCalc, t.charCount, t.percentCalc, t.interestCalc, t.encodingConverter][i];
const descriptionAt = (t, i, locale) => i === 19 ? morseToolCopy[locale].description : t.descriptions[i];
const toolPath = (locale, slug) => `/${locale}/tools/${slug}`;
const categoryNames = {
  ko: ['시간 도구', '웹 도구', '텍스트 도구', '디자인 도구', '게임 도구', '계산기'],
  ja: ['時間ツール', 'ウェブツール', 'テキストツール', 'デザインツール', 'ゲームツール', '計算ツール'],
  zh: ['时间工具', '网页工具', '文本工具', '设计工具', '游戏工具', '计算器'],
  en: ['Time tools', 'Web tools', 'Text tools', 'Design tools', 'Games', 'Calculators'],
};
const guideUI = {
  ko: { title: '사용 방법과 예시', steps: '이 도구로 할 수 있는 일', input: '예시 입력', output: '기대 결과', related: '자세한 사용 가이드 읽기' },
  ja: { title: '使い方と例', steps: 'このツールでできること', input: '入力例', output: '期待される結果', related: '詳しい使い方を読む' },
  zh: { title: '使用方法与示例', steps: '这个工具可以做什么', input: '输入示例', output: '预期结果', related: '阅读详细使用指南' },
  en: { title: 'How to use it', steps: 'What this tool can do', input: 'Example input', output: 'What you will get', related: 'Read the complete guide' },
};
const barcodeFormats = { ko: { label: '바코드 형식', CODE128: 'CODE128 — 영문·숫자', EAN13: 'EAN-13 — 상품 GTIN' }, ja: { label: 'バーコード形式', CODE128: 'CODE128 — 英数字', EAN13: 'EAN-13 — 商品GTIN' }, zh: { label: '条码格式', CODE128: 'CODE128 — 字母与数字', EAN13: 'EAN-13 — 商品 GTIN' }, en: { label: 'Barcode format', CODE128: 'CODE128 — text and numbers', EAN13: 'EAN-13 — retail GTIN' } };
const homeGuides = {
  ko: { title: '도구 사용 가이드', links: [['barcode-formats', 'EAN-13과 CODE128, 어떤 바코드를 써야 할까요?'], ['qr-code-basics', 'QR 코드 만드는 법과 지원 형식']] },
  ja: { title: 'ツールの使い方ガイド', links: [['barcode-formats', 'EAN-13とCODE128、どちらを使う？'], ['qr-code-basics', 'QRコードの作り方と対応形式']] },
  zh: { title: '工具使用指南', links: [['barcode-formats', 'EAN-13 与 CODE128：该选哪种条码？'], ['qr-code-basics', '如何制作二维码及支持格式']] },
  en: { title: 'Practical guides', links: [['barcode-formats', 'EAN-13 vs CODE128: which barcode should you use?'], ['qr-code-basics', 'How to make a QR code and what it supports']] },
};
const toolFacts = {
  ko: { barcodeTitle: '형식과 입력 규칙', ean: 'EAN-13은 소매 상품용 GTIN을 담는 숫자형식입니다. 12자리 입력은 검사 숫자를 자동 추가하고, 13자리는 검사 숫자를 검증합니다. 실제 상품에는 GS1에서 발급한 GTIN을 사용하세요. 예: 400638133393 → 4006381333931.', code: 'CODE128은 주문번호·자산번호 같은 출력 가능한 ASCII 영문·숫자를 담습니다. 고정 글자 수 제한은 없지만 길수록 바코드 폭이 넓어집니다. 예: ORDER-2048.', gs1: '일반 CODE128과 GS1-128은 다릅니다. 이 생성기는 GS1 Application Identifier/FNC1 데이터를 만들지 않습니다.', qrTitle: '지원 형식과 개인정보', qrHow: 'URL 또는 텍스트를 입력하면 QR 미리보기가 만들어집니다. PNG(300 × 300)를 다운로드한 뒤 배포 전 다른 기기에서 스캔해 보세요.', qrFormats: '생성: 일반 텍스트와 URL(UTF-8). 스캔: QR, EAN-13/8, UPC, CODE128/39/93, Codabar, ITF, Data Matrix, Aztec, PDF417.', qrPrivacy: '입력 텍스트, 선택 이미지와 카메라 프레임은 브라우저에서 처리합니다. 도구 데이터는 서버로 업로드하거나 저장하지 않습니다. 웹사이트 파일을 불러오는 일반 요청은 발생합니다.' },
  en: { barcodeTitle: 'Formats and input rules', ean: 'EAN-13 carries a numeric retail GTIN. A 12-digit input gets an automatic check digit; a 13-digit input is validated. Use a GS1-assigned GTIN for a real product. Example: 400638133393 → 4006381333931.', code: 'CODE128 carries printable ASCII text for order or asset IDs. There is no fixed character cap, but longer values make wider symbols. Example: ORDER-2048.', gs1: 'General CODE128 is not GS1-128. This generator does not construct GS1 Application Identifier/FNC1 data.', qrTitle: 'Formats and privacy', qrHow: 'Enter a URL or text to create a preview. Download the 300 × 300 PNG and scan it with another device before sharing.', qrFormats: 'Generate: ordinary text and URLs (UTF-8). Scan: QR, EAN-13/8, UPC, CODE128/39/93, Codabar, ITF, Data Matrix, Aztec, and PDF417.', qrPrivacy: 'Text, selected images, and camera frames are processed in the browser. Tool data is not uploaded or stored. Normal requests still load the website and app files.' },
  ja: { barcodeTitle: '形式と入力ルール', ean: 'EAN-13は小売商品用GTINを格納する数字形式です。12桁入力ではチェックデジットを自動追加し、13桁入力では検証します。実商品にはGS1から割り当てられたGTINを使用してください。例: 400638133393 → 4006381333931。', code: 'CODE128は注文番号や資産番号など印字可能なASCII文字列に使えます。固定の文字数上限はありませんが、長いほど幅が広がります。例: ORDER-2048。', gs1: '通常のCODE128とGS1-128は別形式です。この生成器はGS1 Application Identifier/FNC1データを作成しません。', qrTitle: '対応形式とプライバシー', qrHow: 'URLまたはテキストを入力してQRを作成します。300 × 300 PNGを保存し、公開前に別端末で読み取りを確認してください。', qrFormats: '生成: 通常のテキストとURL（UTF-8）。読み取り: QR、EAN-13/8、UPC、CODE128/39/93、Codabar、ITF、Data Matrix、Aztec、PDF417。', qrPrivacy: '入力テキスト、選択画像、カメラフレームはブラウザー内で処理します。ツールデータのアップロードや保存はありません。サイトファイル取得の通常通信は発生します。' },
  zh: { barcodeTitle: '格式与输入规则', ean: 'EAN-13 是用于零售商品 GTIN 的数字格式。输入 12 位会自动补校验位；输入 13 位会验证校验位。实际商品请使用 GS1 分配的 GTIN。示例：400638133393 → 4006381333931。', code: 'CODE128 可编码订单号、资产编号等可打印 ASCII 文本。没有固定字数上限，但内容越长条码越宽。示例：ORDER-2048。', gs1: '通用 CODE128 不等于 GS1-128。本生成器不会构造 GS1 Application Identifier/FNC1 数据。', qrTitle: '支持格式与隐私', qrHow: '输入网址或文本即可生成预览。下载 300 × 300 PNG，分享前请用另一设备扫描确认。', qrFormats: '生成：普通文本与网址（UTF-8）。扫描：QR、EAN-13/8、UPC、CODE128/39/93、Codabar、ITF、Data Matrix、Aztec、PDF417。', qrPrivacy: '输入文本、选择的图片和相机画面都在浏览器中处理，不会上传或保存工具数据。加载网站与应用文件仍会产生常规请求。' },
};
const examples = [
  ['100 BPM · 4/4', 'A steady click with a stronger first beat in each bar.'],
  ['Start → Lap → Stop', 'Elapsed time and individually recorded lap times.'],
  ['ORDER-2048', 'A downloadable Code 128 barcode and a scan result.'],
  ['https://example.com/menu', 'A downloadable QR image that scans back to this URL.'],
  ['{"name":"Mina","score":92}', '{\n  "name": "Mina",\n  "score": 92\n}'],
  ['tea & cake', 'tea%20%26%20cake'],
  ['Generate 3', 'Three unique random UUID v4 values.'],
  ['1700000000 (seconds)', '2023-11-14 22:13:20 UTC · 1700000000000 milliseconds.'],
  ['Before: color: teal\nAfter: color: olive', 'Removed line: color: teal · Added line: color: olive'],
  ['hello world', 'aGVsbG8gd29ybGQ='],
  ['^[A-Z]{2}\\d{4}$\nAB1234 xy9000', 'Match: AB1234'],
  ['## Hello\n**Tiny tools**', 'A level-two heading and bold text in the live preview.'],
  ['#4f8068', 'RGB 79, 128, 104 · HSL 145°, 24%, 41% · contrast is calculated live.'],
  ['Roll once', 'A rolling six-sided die shows a random result from 1 to 6.'],
];
const diceExamples = {
  ko: ['굴리기 버튼', '애니메이션이 끝나면 1~6 중 하나가 표시됩니다.'],
  ja: ['「サイコロを振る」ボタン', 'アニメーション後に1〜6のいずれかが表示されます。'],
  zh: ['点击“掷骰子”', '动画结束后显示 1 到 6 之间的一个点数。'],
  en: ['Click Roll the die', 'A value from 1 to 6 appears after the animation.'],
};
const guideSteps = {
  ko: ['BPM과 박자 수를 정하고 시작을 눌러 박자를 듣습니다. 탭 템포로 직접 속도를 맞출 수도 있습니다.', '시작과 정지를 누르고 랩을 기록해 구간별 시간을 비교합니다.', '값을 입력해 Code 128을 생성하거나 카메라·이미지로 기존 바코드를 읽습니다.', 'URL이나 텍스트를 입력해 QR을 만들고 PNG로 저장하거나 이미지·카메라로 스캔합니다.', 'JSON을 입력해 유효성을 확인하고 보기 좋게 정리하거나 압축합니다.', '문자열을 입력하고 인코딩 또는 디코딩을 눌러 URL 안전 문자열로 변환합니다.', '생성할 개수를 정해 무작위 UUID v4를 만들고 한 번에 복사합니다.', '초 또는 밀리초 타임스탬프와 날짜를 입력해 서로 변환합니다.', '두 텍스트를 입력해 추가된 줄과 삭제된 줄을 확인합니다.', 'UTF-8 텍스트를 Base64로 바꾸거나 Base64를 UTF-8로 복원합니다.', '패턴과 플래그를 입력해 텍스트에서 일치하는 값을 확인합니다.', 'Markdown을 입력해 제목, 목록, 코드, 링크가 렌더링된 결과를 확인합니다.', 'HEX·RGB·HSL 색상 값을 변환하고 글자색과 배경색의 WCAG 대비를 확인합니다.', '개수를 선택하고 굴리기를 누르면 각 주사위의 눈과 합계를 보여줍니다.', '기존 수량과 평단, 추가 매수 수량과 가격을 입력해 수수료 제외 기준 새 평단과 총 매입액을 확인합니다.', '텍스트를 입력해 공백 포함·제외 글자 수, 줄 수, UTF-8 바이트 수를 실시간으로 비교합니다.', '계산 유형을 선택해 퍼센트 값, 비율, 증감률 또는 할인액과 최종 가격을 계산합니다.', '원금·연이율·기간을 입력하고 단리나 복리, 복리 주기를 선택해 이자와 만기 금액을 확인합니다.', '원본과 대상 문자셋을 선택해 텍스트를 변환하고 결과 바이트를 16진수·Base64로 확인합니다.'],
  en: ['Set a BPM and meter, then start the audible beat. Tap tempo can estimate a pace from your taps.', 'Start and stop the timer, adding laps to compare split times.', 'Enter a value to create Code 128, or read an existing barcode from the camera or an image.', 'Enter a URL or text to create a QR image, download PNG, or scan an image or camera feed.', 'Validate JSON, then format it for reading or minify it for compact output.', 'Encode a string for a URL or decode a percent-encoded value.', 'Choose a quantity and create random UUID v4 values for copying.', 'Convert Unix timestamps in seconds or milliseconds to dates and back.', 'Enter two texts to see lines that were added or removed.', 'Convert UTF-8 text to Base64 or restore text from Base64.', 'Enter a pattern and flags to inspect matches in sample text.', 'Write Markdown and see rendered headings, lists, code, and links.', 'Convert HEX, RGB, and HSL values and check WCAG text/background contrast.', 'Choose 1 to 10 dice and roll; each die shows its result, with a total for multiple dice.', 'Enter current shares and average cost, then the added share quantity and price to calculate the new average. Fees are excluded.', 'Enter text to compare character counts with and without whitespace, line count, and UTF-8 bytes in real time.', 'Choose a calculation to find a percentage value, ratio, percentage change, or discount and sale price.', 'Enter principal, annual rate, and term; choose simple or compound interest and a compounding frequency.', 'Choose source and target encodings, then inspect converted text and the result bytes as hex or Base64.'],
  ja: ['BPMと拍子を設定して開始するとクリック音が鳴ります。タップテンポで速度を測ることもできます。', '開始・停止し、ラップを記録して区間時間を比べます。', '値を入力してCode 128を作成するか、カメラや画像から読み取ります。', 'URLやテキストからQR画像を作り、PNG保存や画像・カメラでの読み取りができます。', 'JSONを検証し、読みやすく整形したり圧縮したりします。', '文字列をURL用にエンコードするか、パーセント表記をデコードします。', '個数を指定してランダムなUUID v4を生成し、まとめてコピーします。', '秒・ミリ秒のUnixタイムスタンプと日時を相互変換します。', '2つのテキストを入力し、追加・削除された行を確認します。', 'UTF-8テキストをBase64に変換し、Base64から復元します。', 'パターンとフラグを入力してテキスト内の一致を確認します。', 'Markdownを入力し、見出し・リスト・コード・リンクをプレビューします。', 'HEX・RGB・HSLを変換し、文字色と背景色のWCAGコントラストを確認します。', '個数を選んで振ると、それぞれの出目と合計が表示されます。', '保有株数と平均取得単価、追加購入価格と株数を入力し、手数料を除く新しい平均単価と取得額を確認します。', 'テキストを入力し、空白の有無別の文字数、行数、UTF-8バイト数をリアルタイムで比較します。', '計算方法を選び、割合・比率・増減率、または割引額と割引後価格を計算します。', '元金・年利・期間を入力し、単利または複利と頻度を選んで利息と満期額を確認します。', '元と変換先の文字コードを選び、変換後テキストとバイト列を16進数・Base64で確認します。'],
  zh: ['设置 BPM 和拍号后开始即可听到节拍，也可以通过点击测算速度。', '开始和停止计时，并记录圈数以比较分段时间。', '输入内容生成 Code 128，也可以用相机或图片读取条码。', '输入网址或文本生成二维码，可下载 PNG，也可扫描图片或相机画面。', '验证 JSON，并将其格式化以便阅读或压缩以节省空间。', '将字符串编码为 URL 安全格式，或解码百分号编码内容。', '选择数量，生成随机 UUID v4 并一次性复制。', '在秒、毫秒 Unix 时间戳与日期之间互相转换。', '输入两段文本，查看新增和删除的行。', '将 UTF-8 文本转换为 Base64，或从 Base64 还原文本。', '输入正则模式和标志，查看文本中的匹配结果。', '输入 Markdown，预览标题、列表、代码和链接。', '转换 HEX、RGB、HSL，并检查文字与背景的 WCAG 对比度。', '选择数量并点击投掷后，会显示每个骰子的点数和总和。', '输入持仓数量、当前均价、补仓价格和数量，计算不含手续费的新均价与总投入。', '输入文本后实时查看含空白与不含空白的字符数、行数和 UTF-8 字节数。', '选择计算类型，求百分比、占比、涨跌幅或优惠金额与折后价。', '输入本金、年利率和期限，选择单利或复利及复利频率，查看利息和到期金额。', '选择源字符集和目标字符集，转换文本并以十六进制或 Base64 查看结果字节。'],
};

const newToolUI = {
  ko: {
    stock: { owned: '보유 수량 (주)', average: '현재 평단', buyPrice: '추가 매수가', buyShares: '추가 매수 수량 (주)', added: '추가 매수액', totalShares: '총 보유 수량', totalCost: '총 매입액', newAverage: '새 평단', invalid: '수량은 0 이상의 정수로, 가격은 0 이상으로 입력해 주세요.', note: '수수료·세금·환율은 포함하지 않습니다. 금액은 입력한 통화 단위 그대로 계산합니다.' },
    counter: { input: '텍스트 입력', placeholder: '예: 한글과 emoji 👋', withSpaces: '공백 포함 글자 수', withoutSpaces: '공백 제외 글자 수', bytes: 'UTF-8 바이트', lines: '줄 수', note: '글자 수는 이모지와 결합 문자를 하나의 문자로 셉니다. 바이트는 UTF-8로 인코딩했을 때의 크기입니다.' },
    percent: { mode: '계산 유형', modes: { of: '값의 퍼센트', ratio: '부분값의 비율', change: '증감률', discount: '할인 계산' }, percentage: '퍼센트 (%)', base: '기준값', part: '부분값', whole: '전체값', before: '이전 값', after: '변경 값', price: '정가', rate: '할인율 (%)', result: '계산 결과', amount: '계산값', savings: '할인액', final: '할인가', invalid: '숫자를 확인해 주세요. 분모는 0일 수 없고 할인율은 0~100%여야 합니다.' },
    interest: { principal: '원금', rate: '연이율 (%)', months: '기간 (개월)', method: '계산 방식', simple: '단리', compound: '복리', frequency: '복리 주기', frequencies: { 1: '연 1회', 4: '분기별', 12: '월별', 365: '일별' }, earned: '이자', maturity: '만기 금액', invalid: '원금과 이율은 0 이상, 기간은 1개월 이상으로 입력해 주세요.' },
    encoding: { input: '변환할 텍스트', source: '원본 문자셋', target: '대상 문자셋', output: '변환된 텍스트', bytes: '대상 인코딩 바이트', hex: '16진수', base64: 'Base64', loss: '선택한 문자셋에 없는 문자는 ?로 바뀔 수 있습니다.', download: '바이트 파일 다운로드', invalid: '이 브라우저에서 지원하지 않는 문자셋입니다.', encodings: [['utf-8', 'UTF-8'], ['utf-16le', 'UTF-16LE'], ['euc-kr', 'EUC-KR / CP949'], ['shift_jis', 'Shift_JIS / Windows-31J'], ['gbk', 'GBK'], ['windows-1252', 'Windows-1252']] },
  },
  en: {
    stock: { owned: 'Current shares', average: 'Current average cost', buyPrice: 'Additional buy price', buyShares: 'Additional shares', added: 'Additional investment', totalShares: 'Total shares', totalCost: 'Total cost', newAverage: 'New average cost', invalid: 'Use non-negative prices and whole-number share counts.', note: 'Fees, taxes, and exchange rates are not included. Amounts use the same currency unit as your inputs.' },
    counter: { input: 'Text', placeholder: 'Example: Hello 👋', withSpaces: 'Characters including whitespace', withoutSpaces: 'Characters excluding whitespace', bytes: 'UTF-8 bytes', lines: 'Lines', note: 'Emoji and combining marks are counted as one user-perceived character. Bytes show the UTF-8 encoded size.' },
    percent: { mode: 'Calculation', modes: { of: 'Percentage of a value', ratio: 'Part as a percentage', change: 'Percentage change', discount: 'Discount price' }, percentage: 'Percentage (%)', base: 'Base value', part: 'Part', whole: 'Whole', before: 'Starting value', after: 'Ending value', price: 'Original price', rate: 'Discount (%)', result: 'Result', amount: 'Calculated value', savings: 'You save', final: 'Sale price', invalid: 'Check the numbers. Denominators cannot be zero and discounts must be 0–100%.' },
    interest: { principal: 'Principal', rate: 'Annual rate (%)', months: 'Term (months)', method: 'Interest type', simple: 'Simple', compound: 'Compound', frequency: 'Compounding frequency', frequencies: { 1: 'Annually', 4: 'Quarterly', 12: 'Monthly', 365: 'Daily' }, earned: 'Interest earned', maturity: 'Maturity value', invalid: 'Use a non-negative principal and rate, and a term of at least one month.' },
    encoding: { input: 'Text to convert', source: 'Source encoding', target: 'Target encoding', output: 'Converted text', bytes: 'Target-encoded bytes', hex: 'Hex', base64: 'Base64', loss: 'Characters unavailable in the selected encoding may become ?.', download: 'Download byte file', invalid: 'This browser does not support one of the selected encodings.', encodings: [['utf-8', 'UTF-8'], ['utf-16le', 'UTF-16LE'], ['euc-kr', 'EUC-KR / CP949'], ['shift_jis', 'Shift_JIS / Windows-31J'], ['gbk', 'GBK'], ['windows-1252', 'Windows-1252']] },
  },
  ja: {
    stock: { owned: '保有株数', average: '現在の平均取得単価', buyPrice: '追加購入価格', buyShares: '追加購入株数', added: '追加投資額', totalShares: '合計株数', totalCost: '合計取得額', newAverage: '新しい平均取得単価', invalid: '価格は0以上、株数は0以上の整数で入力してください。', note: '手数料・税金・為替は含みません。金額は入力と同じ通貨単位で計算します。' },
    counter: { input: 'テキスト', placeholder: '例: こんにちは 👋', withSpaces: '空白を含む文字数', withoutSpaces: '空白を除く文字数', bytes: 'UTF-8バイト数', lines: '行数', note: '絵文字や結合文字は、ユーザーが認識する1文字として数えます。バイト数はUTF-8でのサイズです。' },
    percent: { mode: '計算の種類', modes: { of: '値のパーセント', ratio: '割合', change: '増減率', discount: '割引価格' }, percentage: 'パーセント (%)', base: '基準値', part: '部分', whole: '全体', before: '変更前', after: '変更後', price: '元の価格', rate: '割引率 (%)', result: '計算結果', amount: '計算値', savings: '割引額', final: '割引後の価格', invalid: '数値を確認してください。分母は0にできず、割引率は0〜100%です。' },
    interest: { principal: '元金', rate: '年利 (%)', months: '期間 (か月)', method: '計算方法', simple: '単利', compound: '複利', frequency: '複利の頻度', frequencies: { 1: '年1回', 4: '四半期ごと', 12: '毎月', 365: '毎日' }, earned: '利息', maturity: '満期額', invalid: '元金と利率は0以上、期間は1か月以上で入力してください。' },
    encoding: { input: '変換するテキスト', source: '元の文字コード', target: '変換先の文字コード', output: '変換後のテキスト', bytes: '変換先のバイト列', hex: '16進数', base64: 'Base64', loss: '選択した文字コードにない文字は ? に置き換わる場合があります。', download: 'バイトデータをダウンロード', invalid: 'このブラウザーは選択した文字コードに対応していません。', encodings: [['utf-8', 'UTF-8'], ['utf-16le', 'UTF-16LE'], ['euc-kr', 'EUC-KR / CP949'], ['shift_jis', 'Shift_JIS / Windows-31J'], ['gbk', 'GBK'], ['windows-1252', 'Windows-1252']] },
  },
  zh: {
    stock: { owned: '当前持仓数量', average: '当前平均成本', buyPrice: '补仓价格', buyShares: '补仓数量', added: '本次投入', totalShares: '持仓总数', totalCost: '总投入', newAverage: '补仓后均价', invalid: '价格必须大于或等于 0，股数请输入非负整数。', note: '不含手续费、税费和汇率。金额沿用输入时的货币单位。' },
    counter: { input: '输入文本', placeholder: '例如：你好 👋', withSpaces: '含空白字符数', withoutSpaces: '不含空白字符数', bytes: 'UTF-8 字节数', lines: '行数', note: 'Emoji 和组合字符按用户感知的一个字符计数。字节数表示 UTF-8 编码后的大小。' },
    percent: { mode: '计算类型', modes: { of: '数值的百分比', ratio: '部分占比', change: '涨跌幅', discount: '折扣价格' }, percentage: '百分比 (%)', base: '基数', part: '部分值', whole: '总值', before: '原值', after: '新值', price: '原价', rate: '折扣 (%)', result: '计算结果', amount: '计算值', savings: '优惠金额', final: '折后价', invalid: '请检查数字；分母不能为 0，折扣范围为 0–100%。' },
    interest: { principal: '本金', rate: '年利率 (%)', months: '期限（月）', method: '计息方式', simple: '单利', compound: '复利', frequency: '复利频率', frequencies: { 1: '每年', 4: '每季度', 12: '每月', 365: '每日' }, earned: '利息', maturity: '到期金额', invalid: '本金和利率需大于或等于 0，期限至少为 1 个月。' },
    encoding: { input: '要转换的文本', source: '原字符集', target: '目标字符集', output: '转换后的文本', bytes: '目标编码字节', hex: '十六进制', base64: 'Base64', loss: '目标字符集不支持的字符可能会替换为 ?。', download: '下载字节文件', invalid: '此浏览器不支持所选字符集。', encodings: [['utf-8', 'UTF-8'], ['utf-16le', 'UTF-16LE'], ['euc-kr', 'EUC-KR / CP949'], ['shift_jis', 'Shift_JIS / Windows-31J'], ['gbk', 'GBK'], ['windows-1252', 'Windows-1252']] },
  },
};

const calculatorFacts = {
  ko: [
    ['평단 계산 방법', '새 평단 = (기존 수량 × 현재 평단 + 추가 수량 × 추가 매수가) ÷ 총 수량입니다. 입력한 값만 사용하는 계산기이며 투자 판단을 대신하지 않습니다.'],
    ['문자 수와 바이트 수', '문자 수는 Unicode grapheme 단위로 세어 결합 문자나 이모지를 가능한 한 한 글자로 처리합니다. UTF-8 바이트 수는 실제 웹 전송·저장에 쓰이는 UTF-8 인코딩 크기입니다.'],
    ['계산 종류와 공식', '값의 퍼센트는 기준값 × 퍼센트 ÷ 100, 비율은 부분값 ÷ 전체값 × 100, 증감률은 (변경값 − 이전값) ÷ 이전값 × 100으로 계산합니다. 할인액은 정가 × 할인율이며 할인가에서 차감합니다.'],
    ['단리와 복리', '단리 이자 = 원금 × 연이율 × (개월 수 ÷ 12)입니다. 복리는 원금 × (1 + 연이율 ÷ 연간 계산 횟수)^(연간 계산 횟수 × 기간(년))으로 계산합니다. 세금·수수료·정기 납입은 반영하지 않습니다.'],
    ['문자 인코딩 변환', 'UTF-8, UTF-16LE, EUC-KR/CP949, Shift_JIS/Windows-31J, GBK, Windows-1252를 지원합니다. 대상 문자셋에 표현할 수 없는 문자는 물음표(?)로 바뀔 수 있으며 결과는 16진수·Base64로 확인하거나 바이트 파일로 저장할 수 있습니다.'],
  ],
  en: [
    ['How averaging is calculated', 'New average = (existing shares × current average + added shares × buy price) ÷ total shares. This calculator only applies your inputs and does not make investment decisions.'],
    ['Characters and bytes', 'Characters use Unicode grapheme clusters so combining marks and emoji count as one user-perceived character where supported. UTF-8 bytes show the actual encoded size used by web storage and transfer.'],
    ['Percentage formulas', 'Percentage of a value = base × percent ÷ 100. Part ratio = part ÷ whole × 100. Percentage change = (new − old) ÷ old × 100. Discount savings = original price × discount rate; subtract it from the original price.'],
    ['Simple and compound interest', 'Simple interest = principal × annual rate × (months ÷ 12). Compound maturity = principal × (1 + annual rate ÷ periods per year)^(periods per year × years). Taxes, fees, and recurring deposits are excluded.'],
    ['Text encoding conversion', 'Supported encodings are UTF-8, UTF-16LE, EUC-KR/CP949, Shift_JIS/Windows-31J, GBK, and Windows-1252. Characters unavailable in the target encoding may become question marks. Inspect output as hex or Base64, or download the bytes.'],
  ],
  ja: [
    ['平均取得単価の計算', '新しい平均取得単価 = (保有株数 × 現在の平均取得単価 + 追加株数 × 購入価格) ÷ 合計株数です。入力値の計算のみを行い、投資判断は行いません。'],
    ['文字数とバイト数', '文字数はUnicodeの書記素クラスタで数え、結合文字や絵文字を可能な範囲で1文字として扱います。UTF-8バイト数はWebでの保存・転送に使われる実際のサイズです。'],
    ['パーセントの計算式', '値のパーセント = 基準値 × 割合 ÷ 100。部分の比率 = 部分 ÷ 全体 × 100。増減率 = (変更後 − 変更前) ÷ 変更前 × 100。割引額を元の価格から差し引きます。'],
    ['単利と複利', '単利 = 元金 × 年利 × (月数 ÷ 12)。複利の満期額 = 元金 × (1 + 年利 ÷ 年間回数)^(年間回数 × 年数)です。税金・手数料・定期積立は含みません。'],
    ['文字エンコード変換', 'UTF-8、UTF-16LE、EUC-KR/CP949、Shift_JIS/Windows-31J、GBK、Windows-1252に対応します。変換先で表せない文字は ? に置き換わる場合があります。16進数・Base64表示やバイトファイル保存ができます。'],
  ],
  zh: [
    ['均价计算方式', '补仓后均价 =（原持仓数量 × 当前均价 + 补仓数量 × 补仓价格）÷ 持仓总数。本工具仅按输入值计算，不提供投资建议。'],
    ['字符数与字节数', '字符数按 Unicode 字素簇统计，尽可能将组合字符和 Emoji 视为一个用户感知字符。UTF-8 字节数表示网页存储和传输所用编码后的实际大小。'],
    ['百分比公式', '数值百分比 = 基数 × 百分比 ÷ 100；部分占比 = 部分值 ÷ 总值 × 100；涨跌幅 =（新值 − 原值）÷ 原值 × 100。折扣金额从原价中扣除得到折后价。'],
    ['单利与复利', '单利 = 本金 × 年利率 ×（月数 ÷ 12）。复利到期金额 = 本金 ×（1 + 年利率 ÷ 每年计息次数）^(每年计息次数 × 年数)。不含税费、手续费和定期存款。'],
    ['文本编码转换', '支持 UTF-8、UTF-16LE、EUC-KR/CP949、Shift_JIS/Windows-31J、GBK 和 Windows-1252。目标编码无法表示的字符可能替换为问号。可查看十六进制、Base64 或下载字节文件。'],
  ],
};

const newToolExamples = {
  ko: [
    ['보유 100주·평단 1,000 / 추가 50주 @ 800', '총 150주 · 새 평단 약 933.33'],
    ['안녕 👋', '공백 포함 4자 · 공백 제외 3자 · UTF-8 11바이트'],
    ['정가 10,000원 · 20% 할인', '할인액 2,000원 · 할인가 8,000원'],
    ['원금 10,000 · 연 5% · 12개월 · 월복리', '이자 약 511.62 · 만기 약 10,511.62'],
    ['원본 UTF-8 → 대상 EUC-KR · 안녕', '변환 텍스트와 대상 문자셋의 바이트를 표시'],
  ],
  en: [
    ['100 shares at 1,000; buy 50 at 800', '150 shares · new average about 933.33'],
    ['Hello 👋', '7 characters with spaces · 6 without · 10 UTF-8 bytes'],
    ['Original price 100 · 20% off', 'Save 20 · sale price 80'],
    ['Principal 10,000 · 5% · 12 months · monthly', 'Interest about 511.62 · total about 10,511.62'],
    ['Source UTF-8 → target EUC-KR · Hello', 'Converted text and target-encoded bytes'],
  ],
  ja: [
    ['100株・平均1,000 / 800で50株追加', '合計150株 · 新単価 約933.33'],
    ['文字 👋', '空白を含む4文字 · 除くと3文字 · UTF-8で11バイト'],
    ['元値10,000円 · 20%割引', '割引額2,000円 · 割引後8,000円'],
    ['元金10,000 · 年5% · 12か月 · 月複利', '利息 約511.62 · 満期額 約10,511.62'],
    ['元UTF-8 → 先EUC-KR · こんにちは', '変換後のテキストと対象文字コードのバイト列'],
  ],
  zh: [
    ['持有100股，均价1,000；800元补仓50股', '共150股 · 新均价约933.33'],
    ['你好 👋', '含空白4个字符 · 不含空白3个 · UTF-8为11字节'],
    ['原价100 · 八折', '优惠20 · 折后价80'],
    ['本金10,000 · 年利率5% · 12个月 · 按月复利', '利息约511.62 · 到期约10,511.62'],
    ['源 UTF-8 → 目标 EUC-KR · 你好', '显示转换文本与目标字符集的字节'],
  ],
};

function App({ initialPath = '/ko' }) {
  const route = initialPath;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const nav = (href) => { setMobileOpen(false); window.location.assign(href); };
  const match = route.match(/^\/(ko|ja|zh|en)(?:\/tools\/([a-z0-9-]+))?\/?$/);
  useEffect(() => { if (!match || (match[2] && !slugs.includes(match[2]))) nav('/ko/'); }, [route]);
  const locale = match?.[1] || 'ko';
  const slug = match?.[2];
  const t = dictionaries[locale];
  const toolIndex = slugs.indexOf(slug);
  return <div className="app-shell">
    <header className="topbar"><div className="topbar-inner">
      <Link className="brand" href={`/${locale}/`} aria-label={t.home}><span className="brand-mark"><Sparkles size={17}/></span><span>tiny<span className="brand-dot">.</span>tools</span></Link>
      <nav className={`topnav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <Link className={`nav-link ${!slug ? 'active' : ''}`} href={`/${locale}/`}>{t.home}</Link>
        {slug && <Link className="nav-link" href={`/${locale}/`}><ArrowLeft size={15}/>{t.back}</Link>}
        <label className="language-select"><span className="sr-only">Language</span><select value={locale} onChange={(e) => nav(`/${e.target.value}${slug ? `/tools/${slug}` : ''}`)}>{langs.map((l) => <option value={l} key={l}>{dictionaries[l].name}</option>)}</select><ChevronDown size={14}/></label>
      </nav>
      <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button>
    </div></header>
    {slug && toolIndex >= 0 ? <ToolPage key={`${locale}-${slug}`} index={toolIndex} locale={locale} t={t}/> : <Home locale={locale} t={t} search={search} setSearch={setSearch}/>}
    <footer className="footer"><div><span className="brand-mini">tiny<span className="brand-dot">.</span>tools</span><span>{t.footer}</span></div><span className="privacy"><ShieldCheck size={14}/>{t.secure}</span></footer>
  </div>;
}

function Home({ locale, t, search, setSearch }) {
  const filtered = slugs.map((slug, i) => ({ slug, i })).filter(({ i }) => `${titleAt(t, i, locale)} ${descriptionAt(t, i, locale)}`.toLowerCase().includes(search.toLowerCase()));
  const groups = [0, 1, 2, 3, 4, 5].map((category) => ({ category, items: filtered.filter(({ i }) => categoryFor(i) === category) })).filter(({ items }) => items.length);
  return <main className="home-main"><section className="hero"><span className="eyebrow"><span className="eyebrow-dot"/>{t.eyebrow}</span><h1>{t.title}<span className="hero-period">.</span></h1><p>{t.subtitle}</p><div className="hero-search"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} aria-label={t.search}/><kbd>/</kbd></div><div className="hero-note"><span><CheckCircle2 size={14}/>{t.secure}</span></div></section>
    <section className="tools-section"><div className="section-heading"><div><span className="section-kicker">{t.category}</span><h2>{t.all}</h2></div><span className="tool-count">{filtered.length.toString().padStart(2, '0')} tools</span></div>
      {groups.length ? groups.map(({ category, items }) => <section className="tool-group" key={category}><div className="tool-group-heading"><h3>{categoryNames[locale][category]}</h3><span>{items.length.toString().padStart(2, '0')}</span></div><div className="tool-grid">{items.map(({ slug, i }) => { const Icon = icons[i]; return <Link className="tool-card" href={toolPath(locale, slug)} key={slug}><span className={`tool-icon icon-${categoryFor(i)}`}><Icon size={20}/></span><span className="tool-card-text"><span className="tool-name">{titleAt(t, i, locale)}</span><span className="tool-description">{descriptionAt(t, i, locale)}</span></span><ArrowRight className="card-arrow" size={17}/></Link>; })}</div></section>) : <div className="empty-state">{t.empty}</div>}
    </section><section className="home-guides"><span className="section-kicker">{homeGuides[locale].title}</span><div className="guide-link-grid">{homeGuides[locale].links.map(([slug, title]) => <Link className="guide-link-card" href={`/${locale}/guides/${slug}/`} key={slug}><span>{title}</span><ArrowRight size={16}/></Link>)}</div></section><div className="home-bottom-note"><span className="note-sparkle"><Sparkles size={17}/></span><span>{t.secure}</span></div></main>;
}

function ToolPage({ index, locale, t }) {
  const Icon = icons[index];
  const related = index === 2 ? homeGuides[locale].links[0] : index === 3 ? homeGuides[locale].links[1] : null;
  return <main className="tool-main"><Link className="back-link" href={`/${locale}/`}><ArrowLeft size={15}/>{t.back}</Link><div className="tool-heading"><div className={`tool-icon large icon-${categoryFor(index)}`}><Icon size={25}/></div><div><span className="section-kicker">{categoryNames[locale][categoryFor(index)]}</span><h1>{titleAt(t, index, locale)}</h1><p>{descriptionAt(t, index, locale)}</p></div></div><div className="workspace"><ToolBody index={index} t={t} locale={locale}/></div><ToolFacts index={index} locale={locale}/><ToolGuide index={index} locale={locale}/>{related && <Link className="related-guide-link" href={`/${locale}/guides/${related[0]}/`}><span><Sparkles size={16}/>{guideUI[locale].related}</span><ArrowRight size={16}/></Link>}<div className="privacy-note"><ShieldCheck size={16}/><span>{t.secure}</span></div></main>;
}

function ToolGuide({ index, locale }) {
  const labels = guideUI[locale];
  const morse = morseToolCopy[locale];
  const [input, output] = index === 19 ? [morse.inputExample, morse.outputExample] : index === 13 ? diceExamples[locale] : index >= 14 ? newToolExamples[locale][index - 14] : examples[index];
  const instruction = index === 19 ? morse.guide : guideSteps[locale][index];
  return <section className="tool-guide"><div className="guide-heading"><span className="guide-icon"><Sparkles size={16}/></span><div><span className="section-kicker">{labels.steps}</span><h2>{labels.title}</h2></div></div><p className="guide-instruction">{instruction}</p><div className="guide-examples"><div className="guide-example"><span className="field-label">{labels.input}</span><pre>{input}</pre></div><div className="guide-example"><span className="field-label">{labels.output}</span><pre>{output}</pre></div></div></section>;
}

function ToolFacts({ index, locale }) {
  if (index >= 14 && index <= 18) {
    const headings = { ko: '계산 공식과 기준', en: 'Formulas and counting rules', ja: '計算式とカウント基準', zh: '计算公式与统计规则' };
    return <section className="tool-facts"><h2>{headings[locale]}</h2><p className="format-caveat">{calculatorFacts[locale][index - 14]}</p></section>;
  }
  if (index === 19) {
    const facts = morseFacts[locale];
    return <section className="tool-facts"><h2>{facts.title}</h2><p>{facts.text}</p><p><a href="https://www.itu.int/rec/R-REC-M.1677-1-200910-I/en" target="_blank" rel="noreferrer">{facts.source}</a></p></section>;
  }
  if (index !== 2 && index !== 3) return null;
  const facts = toolFacts[locale];
  const isBarcode = index === 2;
  return <section className="tool-facts"><h2>{isBarcode ? facts.barcodeTitle : facts.qrTitle}</h2>{isBarcode ? <div className="format-facts"><div><strong>EAN-13</strong><p>{facts.ean}</p></div><div><strong>CODE128</strong><p>{facts.code}</p></div><p className="format-caveat">{facts.gs1}</p></div> : <div className="qr-facts"><p>{facts.qrHow}</p><p>{facts.qrFormats}</p><p className="format-caveat">{facts.qrPrivacy}</p></div>}</section>;
}

function CopyButton({ value, t, className = '' }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { if (!value) return; await navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  return <button className={`button button-light ${className}`} onClick={copy} disabled={!value}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? t.copied : t.copy}</button>;
}
function ActionButton({ children, onClick, disabled = false, secondary = false }) { return <button className={`button ${secondary ? 'button-light' : 'button-primary'}`} onClick={onClick} disabled={disabled}>{children}</button>; }
function TextArea({ label, value, onChange, placeholder, rows = 10 }) { return <label className="field"><span className="field-label">{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} spellCheck="false" /></label>; }
function ResultBox({ value, t, children, className = '' }) { return <div className={`result-panel ${className}`}><div className="result-head"><span className="field-label">{t.output}</span>{value && <CopyButton value={value} t={t}/>}</div>{children ?? <pre>{value || t.noResult}</pre>}</div>; }
function ToolBody({ index, t, locale }) {
  switch (index) {
    case 0: return <MetronomeReviewed t={t}/>;
    case 1: return <Stopwatch t={t}/>;
    case 2: return <BarcodeToolReviewed t={t} locale={locale}/>;
    case 3: return <QRToolReviewed t={t}/>;
    case 4: return <JsonTool t={t}/>;
    case 5: return <UrlTool t={t}/>;
    case 6: return <UuidTool t={t}/>;
    case 7: return <UnixToolReviewed t={t}/>;
    case 8: return <DiffTool t={t}/>;
    case 9: return <Base64Tool t={t}/>;
    case 10: return <RegexToolReviewed t={t} locale={locale}/>;
    case 11: return <MarkdownTool t={t}/>;
    case 13: return <DiceTool t={t}/>;
    case 14: return <StockAverageTool locale={locale}/>;
    case 15: return <CharacterByteTool locale={locale} t={t}/>;
    case 16: return <PercentageTool locale={locale}/>;
    case 17: return <InterestTool locale={locale}/>;
    case 18: return <EncodingToolReviewed locale={locale}/>;
    case 19: return <MorseTool locale={locale} t={t}/>;
    default: return <ColorTool t={t} locale={locale}/>;
  }
}
function Status({ ok, text }) { return <div className={`status ${ok ? 'is-ok' : 'is-error'}`}>{ok ? <CheckCircle2 size={15}/> : <AlertCircle size={15}/>} {text}</div>; }

function NumberField({ label, value, onChange, min = 0, step = 'any' }) {
  return <label className="field"><span className="field-label">{label}</span><input type="number" min={min} step={step} value={value} onChange={(event) => onChange(event.target.value)}/></label>;
}

function CalculatorMetrics({ items, locale }) {
  const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  return <div className="calculator-metrics">{items.map(([label, value, suffix = '']) => <div className="calculator-metric" key={label}><span>{label}</span><strong>{formatter.format(value)}{suffix}</strong></div>)}</div>;
}

function StockAverageTool({ locale }) {
  const copy = newToolUI[locale].stock;
  const [owned, setOwned] = useState('100');
  const [average, setAverage] = useState('1000');
  const [buyPrice, setBuyPrice] = useState('800');
  const [buyShares, setBuyShares] = useState('50');
  const values = [owned, average, buyPrice, buyShares];
  const complete = values.every((value) => value.trim() !== '' && Number.isFinite(Number(value)));
  const [ownedN, averageN, buyPriceN, buySharesN] = values.map(Number);
  const valid = complete && ownedN >= 0 && Number.isInteger(ownedN) && averageN >= 0 && buyPriceN >= 0 && Number.isInteger(buySharesN) && buySharesN > 0;
  const totalShares = ownedN + buySharesN;
  const added = buyPriceN * buySharesN;
  const totalCost = ownedN * averageN + added;
  const newAverage = totalShares ? totalCost / totalShares : 0;
  return <div className="tool-stack"><div className="tool-grid-two"><NumberField label={copy.owned} value={owned} onChange={setOwned} step="1"/><NumberField label={copy.average} value={average} onChange={setAverage}/><NumberField label={copy.buyPrice} value={buyPrice} onChange={setBuyPrice}/><NumberField label={copy.buyShares} value={buyShares} onChange={setBuyShares} min="1" step="1"/></div>{valid ? <CalculatorMetrics locale={locale} items={[[copy.added, added], [copy.totalShares, totalShares, ''], [copy.totalCost, totalCost], [copy.newAverage, newAverage]]}/> : <Status ok={false} text={copy.invalid}/>}<p className="helper-text">{copy.note}</p></div>;
}

function graphemeCount(value, locale) {
  if (typeof Intl.Segmenter === 'function') return Array.from(new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(value)).length;
  return Array.from(value).length;
}

function CharacterByteTool({ locale, t }) {
  const copy = newToolUI[locale].counter;
  const [value, setValue] = useState('');
  const total = graphemeCount(value, locale);
  const withoutWhitespace = graphemeCount(value.replace(/\s/gu, ''), locale);
  const lines = value ? value.split(/\r\n|\r|\n/).length : 0;
  const bytes = new TextEncoder().encode(value).length;
  return <div className="tool-stack"><label className="field"><span className="field-label">{copy.input}</span><textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder={copy.placeholder} rows={8}/></label><div className="calculator-metrics"><div className="calculator-metric"><span>{copy.withSpaces}</span><strong>{total.toLocaleString(locale)}</strong></div><div className="calculator-metric"><span>{copy.withoutSpaces}</span><strong>{withoutWhitespace.toLocaleString(locale)}</strong></div><div className="calculator-metric"><span>{copy.bytes}</span><strong>{bytes.toLocaleString(locale)}</strong></div><div className="calculator-metric"><span>{copy.lines}</span><strong>{lines.toLocaleString(locale)}</strong></div></div><p className="helper-text">{copy.note}</p></div>;
}

function PercentageTool({ locale }) {
  const copy = newToolUI[locale].percent;
  const [mode, setMode] = useState('of');
  const [values, setValues] = useState({ percentage: '20', base: '1000', part: '25', whole: '100', before: '100', after: '120', price: '10000', rate: '20' });
  const fields = {
    of: [['percentage', copy.percentage], ['base', copy.base]],
    ratio: [['part', copy.part], ['whole', copy.whole]],
    change: [['before', copy.before], ['after', copy.after]],
    discount: [['price', copy.price], ['rate', copy.rate]],
  }[mode];
  const currentValues = fields.map(([key]) => values[key]);
  const complete = currentValues.every((value) => value.trim() !== '' && Number.isFinite(Number(value)));
  const numbers = Object.fromEntries(fields.map(([key]) => [key, Number(values[key])]));
  let invalid = false;
  let results = [];
  if (complete) {
    if (mode === 'of') results = [[copy.result, numbers.base * numbers.percentage / 100]];
    if (mode === 'ratio') {
      invalid = numbers.whole === 0;
      if (!invalid) results = [[copy.result, numbers.part / numbers.whole * 100, '%']];
    }
    if (mode === 'change') {
      invalid = numbers.before === 0;
      if (!invalid) results = [[copy.result, (numbers.after - numbers.before) / numbers.before * 100, '%']];
    }
    if (mode === 'discount') {
      invalid = numbers.price < 0 || numbers.rate < 0 || numbers.rate > 100;
      if (!invalid) results = [[copy.savings, numbers.price * numbers.rate / 100], [copy.final, numbers.price * (1 - numbers.rate / 100)]];
    }
  }
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="tool-stack"><label className="field"><span className="field-label">{copy.mode}</span><select value={mode} onChange={(event) => setMode(event.target.value)}><option value="of">{copy.modes.of}</option><option value="ratio">{copy.modes.ratio}</option><option value="change">{copy.modes.change}</option><option value="discount">{copy.modes.discount}</option></select></label><div className="tool-grid-two">{fields.map(([key, label]) => <NumberField key={key} label={label} value={values[key]} onChange={(value) => update(key, value)} min={mode === 'discount' ? 0 : undefined}/>)}</div>{complete && invalid ? <Status ok={false} text={copy.invalid}/> : results.length ? <CalculatorMetrics locale={locale} items={results}/> : <p className="helper-text">{copy.invalid}</p>}</div>;
}

function InterestTool({ locale }) {
  const copy = newToolUI[locale].interest;
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [months, setMonths] = useState('12');
  const [method, setMethod] = useState('compound');
  const [frequency, setFrequency] = useState('12');
  const inputs = [principal, rate, months];
  const complete = inputs.every((value) => value.trim() !== '' && Number.isFinite(Number(value)));
  const [principalN, rateN, monthsN] = inputs.map(Number);
  const valid = complete && principalN >= 0 && rateN >= 0 && monthsN >= 1;
  const years = monthsN / 12;
  const annualRate = rateN / 100;
  const maturity = method === 'simple' ? principalN * (1 + annualRate * years) : principalN * (1 + annualRate / Number(frequency)) ** (Number(frequency) * years);
  const earned = maturity - principalN;
  return <div className="tool-stack"><div className="tool-grid-two"><NumberField label={copy.principal} value={principal} onChange={setPrincipal}/><NumberField label={copy.rate} value={rate} onChange={setRate}/><NumberField label={copy.months} value={months} onChange={setMonths} min="1" step="1"/><label className="field"><span className="field-label">{copy.method}</span><select value={method} onChange={(event) => setMethod(event.target.value)}><option value="simple">{copy.simple}</option><option value="compound">{copy.compound}</option></select></label></div>{method === 'compound' && <label className="field"><span className="field-label">{copy.frequency}</span><select value={frequency} onChange={(event) => setFrequency(event.target.value)}>{Object.entries(copy.frequencies).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>}{valid ? <CalculatorMetrics locale={locale} items={[[copy.earned, earned], [copy.maturity, maturity]]}/> : <Status ok={false} text={copy.invalid}/>}</div>;
}

function bytesToBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function Stopwatch({ t }) {
  const [ms, setMs] = useState(0); const [run, setRun] = useState(false); const [laps, setLaps] = useState([]);
  useEffect(() => { if (!run) return; const start = Date.now() - ms; const id = setInterval(() => setMs(Date.now() - start), 31); return () => clearInterval(id); }, [run]);
  const format = (v) => `${String(Math.floor(v / 60000)).padStart(2, '0')}:${String(Math.floor(v / 1000) % 60).padStart(2, '0')}.${String(Math.floor(v / 10) % 100).padStart(2, '0')}`;
  return <div className="stopwatch-layout"><div className="stopwatch-face"><div className="stopwatch-ring"><span className="time-digits">{format(ms)}</span><span className="timer-caption">{run ? t.running : t.stopwatch}</span></div><div className="action-row"><ActionButton onClick={() => setRun(!run)}>{run ? <><Pause size={16}/>{t.stop}</> : <><Play size={16}/>{t.start}</>}</ActionButton><ActionButton secondary onClick={() => { setRun(false); setMs(0); setLaps([]); }}><RotateCcw size={15}/>{t.reset}</ActionButton><ActionButton secondary disabled={!run} onClick={() => setLaps([ms, ...laps])}>{t.addLap}</ActionButton></div></div><div className="laps"><div className="result-head"><span className="field-label">{t.laps}</span><span>{laps.length}</span></div>{laps.length ? laps.map((lap, i) => <div className="lap-row" key={`${lap}-${i}`}><span>#{String(laps.length - i).padStart(2, '0')}</span><b>{format(lap)}</b></div>) : <div className="empty-laps">{t.noResult}</div>}</div></div>;
}

function ean13CheckDigit(data) { const sum = [...data].reduce((total, digit, index) => total + Number(digit) * (index % 2 ? 3 : 1), 0); return String((10 - sum % 10) % 10); }

function JsonTool({ t }) { const [input, setInput] = useState(t.jsonPlaceholder); const [result, setResult] = useState(''); const [status, setStatus] = useState(null); const [validationError, setValidationError] = useState(''); const format = (min) => { try { const parsed = JSON.parse(input); setResult(JSON.stringify(parsed, null, min ? 0 : 2)); setStatus(true); setValidationError(''); } catch (e) { setResult(''); setStatus(false); setValidationError(`${t.invalid}: ${e.message}`); } }; return <div className="tool-stack"><TextArea label={t.input} value={input} onChange={setInput} placeholder={t.jsonPlaceholder}/><div className="action-row"><ActionButton onClick={() => format(false)}><Braces size={16}/>{t.pretty}</ActionButton><ActionButton secondary onClick={() => format(true)}>{t.minify}</ActionButton><ActionButton secondary onClick={() => { setInput(''); setResult(''); setStatus(null); setValidationError(''); }}>{t.clear}</ActionButton></div>{status !== null && <Status ok={status} text={status ? t.valid : validationError}/>}<ResultBox value={result} t={t}/></div>; }
function UrlTool({ t }) { const [input, setInput] = useState(''); const [result, setResult] = useState(''); const [error, setError] = useState(false); const convert = (mode) => { try { setResult(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)); setError(false); } catch { setResult(''); setError(true); } }; return <div className="tool-stack"><TextArea label={t.input} value={input} onChange={setInput} placeholder={t.urlPlaceholder} rows={5}/><div className="action-row"><ActionButton onClick={() => convert('encode')}>{t.encode}</ActionButton><ActionButton secondary onClick={() => convert('decode')}>{t.decode}</ActionButton><ActionButton secondary onClick={() => { setInput(''); setResult(''); }}>{t.clear}</ActionButton></div>{error && <Status ok={false} text={t.invalid}/>}<ResultBox value={result} t={t}/></div>; }
function UuidTool({ t }) { const [count, setCount] = useState(5); const [items, setItems] = useState([]); return <div className="tool-stack"><div className="inline-control"><label className="field-label" htmlFor="uuid-count">{t.count}</label><input id="uuid-count" type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, +e.target.value || 1)))}/></div><ActionButton onClick={() => setItems(Array.from({ length: count }, () => crypto.randomUUID()))}><Fingerprint size={16}/>{t.generate}</ActionButton><ResultBox value={items.join('\n')} t={t}/></div>; }
function DiffTool({ t }) { const [a, setA] = useState(''); const [b, setB] = useState(''); const changes = diffLines(a, b); return <div className="tool-stack"><div className="tool-grid-two"><TextArea label={t.left} value={a} onChange={setA} placeholder={t.diffPlaceholder}/><TextArea label={t.right} value={b} onChange={setB} placeholder={t.diffPlaceholder}/></div><div className="result-panel"><div className="field-label">{t.output}</div><pre className="diff-output">{changes.map((part, i) => <span key={i} className={part.added ? 'diff-added' : part.removed ? 'diff-removed' : ''}>{part.added ? '+ ' : part.removed ? '− ' : '  '}{part.value}</span>)}</pre></div></div>; }
function base64Encode(value) { const bytes = new TextEncoder().encode(value); let binary = ''; bytes.forEach((byte) => { binary += String.fromCharCode(byte); }); return btoa(binary); }
function base64Decode(value) { const binary = atob(value); const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0)); return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
function Base64Tool({ t }) { const [input, setInput] = useState(''); const [result, setResult] = useState(''); const [error, setError] = useState(false); const run = (fn) => { try { setResult(fn(input)); setError(false); } catch { setResult(''); setError(true); } }; return <div className="tool-stack"><TextArea label={t.input} value={input} onChange={setInput} placeholder={t.urlPlaceholder} rows={5}/><div className="action-row"><ActionButton onClick={() => run(base64Encode)}>{t.encode}</ActionButton><ActionButton secondary onClick={() => run(base64Decode)}>{t.decode}</ActionButton></div>{error && <Status ok={false} text={t.invalid}/>}<ResultBox value={result} t={t}/></div>; }
function MarkdownTool({ t }) { const [input, setInput] = useState(t.markdownPlaceholder); const [html, setHtml] = useState(''); useEffect(() => { const raw = marked.parse(input || ''); const purifier = typeof DOMPurify.sanitize === 'function' ? DOMPurify : DOMPurify(window); setHtml(purifier.sanitize(raw)); }, [input]); return <div className="tool-grid-two markdown-layout"><TextArea label={t.input} value={input} onChange={setInput} placeholder={t.markdownPlaceholder}/><div className="panel markdown-preview"><span className="field-label">{t.preview}</span><article dangerouslySetInnerHTML={{ __html: html }}/></div></div>; }
function colorToHex(rgb) { return '#' + rgb.map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join(''); }
function hslToRgb([hueValue, saturationValue, lightnessValue]) {
  const hue = ((hueValue % 360) + 360) % 360;
  const saturation = saturationValue / 100;
  const lightness = lightnessValue / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = lightness - chroma / 2;
  const sector = hue < 60 ? [chroma, x, 0] : hue < 120 ? [x, chroma, 0] : hue < 180 ? [0, chroma, x] : hue < 240 ? [0, x, chroma] : hue < 300 ? [x, 0, chroma] : [chroma, 0, x];
  return sector.map((channel) => Math.round((channel + m) * 255));
}
function rgbToHsl([redValue, greenValue, blueValue]) {
  const [red, green, blue] = [redValue, greenValue, blueValue].map((channel) => channel / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;
  if (delta) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    if (max === red) hue = 60 * (((green - blue) / delta) % 6);
    else if (max === green) hue = 60 * ((blue - red) / delta + 2);
    else hue = 60 * ((red - green) / delta + 4);
  }
  return [Math.round((hue + 360) % 360), Math.round(saturation * 100), Math.round(lightness * 100)];
}
function parseColorValue(value, format) { const text = value.trim(); if (format === 'HEX') { let hex = text.replace(/^#/, ''); if (/^[0-9a-f]{3}$/i.test(hex)) hex = [...hex].map((digit) => digit + digit).join(''); if (!/^[0-9a-f]{6}$/i.test(hex)) throw new Error('Invalid HEX'); return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)); } if (format === 'RGB') { const match = text.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i); if (!match) throw new Error('Invalid RGB'); const rgb = match.slice(1).map(Number); if (rgb.some((channel) => channel > 255)) throw new Error('RGB out of range'); return rgb; } const match = text.match(/^hsla?\(\s*(-?\d+(?:\.\d+)?)\s*(?:deg)?\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/i); if (!match) throw new Error('Invalid HSL'); const [hue, saturation, lightness] = match.slice(1).map(Number); if (saturation > 100 || lightness > 100) throw new Error('HSL out of range'); return hslToRgb([hue, saturation, lightness]); }
function DiceTool({ t }) {
  const [count, setCount] = useState(1);
  const [values, setValues] = useState([1]);
  const [rolling, setRolling] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const roll = () => {
    if (rolling) return;
    setRolling(true);
    timer.current = window.setTimeout(() => {
      setValues(Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1));
      setRolling(false);
    }, 720);
  };
  const pipPositions = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };
  const changeCount = (next) => {
    setCount(next);
    setValues((current) => Array.from({ length: next }, (_, index) => current[index] || 1));
  };
  const total = values.slice(0, count).reduce((sum, value) => sum + value, 0);
  return <div className="dice-tool panel">
    <label className="dice-count-control"><span className="field-label">{t.diceCount}</span><select value={count} disabled={rolling} onChange={(event) => changeCount(Number(event.target.value))}>{Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select></label>
    <div className="dice-display">
      {values.slice(0, count).map((value, dieIndex) => <div className={'die-face ' + (rolling ? 'is-rolling' : '')} role="img" aria-label={t.diceResult + ' ' + (dieIndex + 1) + ': ' + value} key={dieIndex}>
        {Array.from({ length: 9 }, (_, index) => <span key={index} className={pipPositions[value].includes(index) ? 'die-pip is-visible' : 'die-pip'} />)}
      </div>)}
    </div>
    <div className="dice-result"><span className="field-label">{count > 1 ? t.diceTotal : t.diceResult}</span><strong aria-live="polite">{rolling ? '…' : total}</strong></div>
    <ActionButton onClick={roll} disabled={rolling}><Dices size={17}/>{rolling ? t.diceRolling : t.rollDice}</ActionButton>
    <p className="helper-text">{t.diceDescription}</p>
  </div>;
}
function ColorTool({ t, locale }) {
  const [format, setFormat] = useState('HEX');
  const [input, setInput] = useState('#4f8068');
  const [foreground, setForeground] = useState('#ffffff');
  const [background, setBackground] = useState('#4f8068');
  let rgb = null, inputError = false;
  try { rgb = parseColorValue(input, format); } catch { inputError = true; }
  const hex = rgb ? colorToHex(rgb) : '#000000';
  const hsl = rgb ? rgbToHsl(rgb) : [0, 0, 0];
  const setColorInput = (value, mode = format) => { setInput(value); try { setBackground(colorToHex(parseColorValue(value, mode))); } catch {} };
  const changeFormat = (next) => { if (rgb) { if (next === 'HEX') setInput(hex); else if (next === 'RGB') setInput(`rgb(${rgb.join(', ')})`); else setInput(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`); } setFormat(next); };
  const setColorPicker = (value) => { setFormat('HEX'); setInput(value); setBackground(value); };
  const colorHelp = {
    ko: 'HEX·RGB·HSL 색상 코드를 서로 변환합니다. 색상을 바꾸면 아래 명암비의 배경색에도 반영됩니다.',
    ja: 'HEX・RGB・HSLのカラーコードを相互変換します。色を変更すると、下のコントラスト確認の背景色にも反映されます。',
    zh: '可互相转换 HEX、RGB 和 HSL 颜色代码。更改颜色后，也会同步更新下方对比度检查的背景色。',
    en: 'Convert between HEX, RGB, and HSL. Changing this color also updates the contrast checker background.'
  }[locale];
  const contrastHelp = {
    ko: '글자색과 배경색을 바꾸면 미리보기와 대비비가 즉시 갱신됩니다. 일반 크기 텍스트의 WCAG AA 기준은 4.5:1입니다.',
    ja: '文字色または背景色を変更すると、プレビューと比率がすぐに更新されます。通常サイズの文字に対するWCAG AA基準は4.5:1です。',
    zh: '更改文字颜色或背景颜色后，预览和对比度会立即更新。普通大小文字的 WCAG AA 标准为 4.5:1。',
    en: 'Change either color to update the preview and ratio. The WCAG AA target for normal text is 4.5:1.'
  }[locale];
  let fgRgb, bgRgb, contrastError = false, ratio = 0;
  try { fgRgb = parseColorValue(foreground, 'HEX'); bgRgb = parseColorValue(background, 'HEX'); const luminance = (color) => color.map((channel) => { const c = channel / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, channel, i) => sum + channel * [.2126, .7152, .0722][i], 0); const a = luminance(fgRgb), b = luminance(bgRgb); ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05); } catch { contrastError = true; }
  return <div className="tool-stack"><div className="tool-grid-two"><div className="panel"><label className="field"><span className="field-label">{t.color}</span><select value={format} onChange={(e) => changeFormat(e.target.value)}><option value="HEX">HEX</option><option value="RGB">RGB</option><option value="HSL">HSL</option></select><div className="color-input"><input value={input} onChange={(e) => setColorInput(e.target.value)} placeholder={format === 'HEX' ? '#4f8068' : format === 'RGB' ? 'rgb(79, 128, 104)' : 'hsl(145, 24%, 41%)'} aria-invalid={inputError}/><input type="color" value={hex} onChange={(e) => setColorPicker(e.target.value)} aria-label={t.color}/></div></label>{inputError && <Status ok={false} text={t.invalid}/>}<div className="color-formats"><div><span>HEX</span><b>{rgb ? hex.toUpperCase() : '—'}</b></div><div><span>RGB</span><b>{rgb ? `rgb(${rgb.join(', ')})` : '—'}</b></div><div><span>HSL</span><b>{rgb ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : '—'}</b></div></div><p className="helper-text">{colorHelp}</p></div><div className="panel"><h3>{t.contrast}</h3><p className="helper-text">{contrastHelp}</p><div className="contrast-preview" style={{ color: contrastError ? '#000000' : colorToHex(fgRgb), background: contrastError ? '#ffffff' : colorToHex(bgRgb) }}>Aa <span>{t.preview}</span></div><label className="field"><span className="field-label">{t.foreground}</span><div className="color-input"><input value={foreground} onChange={(e) => setForeground(e.target.value)} aria-invalid={contrastError}/><input type="color" value={/^#[0-9a-f]{6}$/i.test(foreground) ? foreground : '#000000'} onChange={(e) => setForeground(e.target.value)} aria-label={t.foreground}/></div></label><label className="field"><span className="field-label">{t.background}</span><div className="color-input"><input value={background} onChange={(e) => setBackground(e.target.value)} aria-invalid={contrastError}/><input type="color" value={/^#[0-9a-f]{6}$/i.test(background) ? background : '#ffffff'} onChange={(e) => setBackground(e.target.value)} aria-label={t.background}/></div></label>{contrastError ? <Status ok={false} text={t.invalid}/> : <div className={`contrast-result ${ratio >= 4.5 ? 'is-ok' : 'is-error'}`}><strong>{ratio.toFixed(2)}:1</strong><span>{ratio >= 4.5 ? t.pass : t.fail} · AA 4.5:1</span></div>}</div></div></div>;
}

export default App;

const encodingHelpReviewed = {
  ko: '예시: “안녕”을 UTF-8에서 EUC-KR로 변환하면 텍스트는 그대로이고 대상 바이트는 BE C8 B3 E7입니다.',
  en: 'Example: “안녕” from UTF-8 to EUC-KR keeps the text and produces target bytes BE C8 B3 E7.',
  ja: '例：「안녕」をUTF-8からEUC-KRに変換すると、テキストはそのままで、出力バイトは BE C8 B3 E7 です。',
  zh: '示例：将“안녕”从 UTF-8 转为 EUC-KR 后，文本不变，目标字节为 BE C8 B3 E7。',
};

function EncodingToolReviewed({ locale }) {
  const copy = newToolUI[locale].encoding;
  const [value, setValue] = useState('안녕');
  const [source, setSource] = useState('utf-8');
  const [target, setTarget] = useState('euc-kr');
  const [conversion, setConversion] = useState(null);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const workerRef = useRef(null);
  const requestRef = useRef(0);

  useEffect(() => {
    let worker;
    try {
      worker = new Worker('/encoding-worker.js');
      workerRef.current = worker;
      worker.onmessage = ({ data }) => {
        if (data.id !== requestRef.current) return;
        setPending(false);
        if (data.error) {
          setConversion(null);
          setError(true);
          return;
        }
        setConversion({ ...data, bytes: Uint8Array.from(data.bytes) });
        setError(false);
      };
      worker.onerror = () => {
        setPending(false);
        setConversion(null);
        setError(true);
        worker.terminate();
        if (workerRef.current === worker) workerRef.current = null;
      };
    } catch {
      setError(true);
    }
    return () => {
      requestRef.current++;
      worker?.terminate();
      if (workerRef.current === worker) workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const requestId = ++requestRef.current;
    setConversion(null);
    setError(false);
    setPending(false);
    if (!value) return undefined;
    const timer = setTimeout(() => {
      const worker = workerRef.current;
      if (!worker) {
        setError(true);
        return;
      }
      setPending(true);
      worker.postMessage({ id: requestId, value, source, target });
    }, 80);
    return () => clearTimeout(timer);
  }, [value, source, target]);

  const download = () => {
    if (!conversion) return;
    const url = URL.createObjectURL(new Blob([conversion.bytes], { type: 'application/octet-stream' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `converted-${target}.bin`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const hex = conversion ? Array.from(conversion.bytes, (byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join(' ') : '';
  const base64 = conversion ? bytesToBase64(conversion.bytes) : '';
  const converting = { ko: '변환 중…', en: 'Converting…', ja: '変換中…', zh: '正在转换…' }[locale];

  return <div className="tool-stack"><label className="field"><span className="field-label">{copy.input}</span><textarea value={value} onChange={(event) => setValue(event.target.value)} rows={5}/></label><div className="tool-grid-two"><label className="field"><span className="field-label">{copy.source}</span><select value={source} onChange={(event) => setSource(event.target.value)}>{copy.encodings.map(([code, label]) => <option value={code} key={code}>{label}</option>)}</select></label><label className="field"><span className="field-label">{copy.target}</span><select value={target} onChange={(event) => setTarget(event.target.value)}>{copy.encodings.map(([code, label]) => <option value={code} key={code}>{label}</option>)}</select></label></div><p className="helper-text">{encodingHelpReviewed[locale]}</p>{pending && <p className="helper-text" role="status">{converting}</p>}{error && <Status ok={false} text={copy.invalid}/>} {conversion && <><div className="encoding-result"><span className="field-label">{copy.output}</span><pre>{conversion.text || ' '}</pre></div><div className="result-panel"><div className="result-head"><span className="field-label">{copy.bytes} · {copy.hex}</span><CopyButton value={hex} t={dictionaries[locale]}/></div><pre>{hex || '00'}</pre></div><div className="result-panel"><div className="result-head"><span className="field-label">{copy.bytes} · {copy.base64}</span><CopyButton value={base64} t={dictionaries[locale]}/></div><pre>{base64}</pre></div><div className="action-row"><ActionButton secondary onClick={download}><Download size={15}/>{copy.download}</ActionButton></div>{(conversion.sourceReplacements || conversion.targetReplacements) > 0 && <p className="helper-text">{copy.loss}</p>}</>}</div>;
}

function useReviewedScanner(videoRef, invalidText) {
  const [scanResult, setScanResult] = useState('');
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(false);
  const stateRef = useRef({ mounted: false, generation: 0, starting: false, controls: null, readId: 0 });

  useEffect(() => {
    const state = stateRef.current;
    state.mounted = true;
    return () => {
      state.mounted = false;
      state.generation++;
      state.readId++;
      state.starting = false;
      const controls = state.controls;
      state.controls = null;
      controls?.stop();
      const stream = videoRef.current?.srcObject;
      stream?.getTracks?.().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [videoRef]);

  const stopCamera = () => {
    const state = stateRef.current;
    state.generation++;
    state.starting = false;
    const controls = state.controls;
    state.controls = null;
    controls?.stop();
    const stream = videoRef.current?.srcObject;
    stream?.getTracks?.().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setBusy(false);
    setActive(false);
  };

  const startCamera = async () => {
    const state = stateRef.current;
    if (!state.mounted || state.starting || state.controls) return;
    const generation = ++state.generation;
    state.starting = true;
    setScanResult('');
    setBusy(true);
    setActive(false);
    let cameraControls = null;
    let decodedBeforeStartResolved = false;
    try {
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      if (!state.mounted || generation !== state.generation || !videoRef.current) {
        if (state.mounted && generation === state.generation) {
          state.starting = false;
          setBusy(false);
        }
        return;
      }
      const reader = new BrowserMultiFormatReader();
      cameraControls = await reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        if (!result || !state.mounted || generation !== state.generation) return;
        decodedBeforeStartResolved = !cameraControls;
        setScanResult(result.getText());
        const controls = cameraControls || state.controls;
        controls?.stop();
        if (state.controls === controls) state.controls = null;
        state.starting = false;
        setBusy(false);
        setActive(false);
      });
      if (!state.mounted || generation !== state.generation || decodedBeforeStartResolved) {
        cameraControls.stop();
        if (state.mounted && generation === state.generation) {
          state.starting = false;
          setBusy(false);
          setActive(false);
        }
        return;
      }
      state.controls = cameraControls;
      state.starting = false;
      setBusy(false);
      setActive(true);
    } catch {
      if (state.mounted && generation === state.generation) {
        state.starting = false;
        setBusy(false);
        setActive(false);
        setScanResult(invalidText);
      }
    }
  };

  const readFile = async (file) => {
    if (!file) return;
    const state = stateRef.current;
    const readId = ++state.readId;
    const objectUrl = URL.createObjectURL(file);
    setBusy(true);
    try {
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      const result = await new BrowserMultiFormatReader().decodeFromImageUrl(objectUrl);
      if (state.mounted && state.readId === readId) setScanResult(result.getText());
    } catch {
      if (state.mounted && state.readId === readId) setScanResult(invalidText);
    } finally {
      URL.revokeObjectURL(objectUrl);
      if (state.mounted && state.readId === readId) setBusy(false);
    }
  };

  return { scanResult, busy, active, startCamera, stopCamera, readFile };
}

function ReviewedScannerControls({ scanner, t }) {
  return <><label className="button button-light upload-button"><Upload size={15}/>{scanner.busy ? t.running : t.file}<input type="file" accept="image/*" onChange={(event) => scanner.readFile(event.target.files?.[0])}/></label><ActionButton secondary disabled={scanner.busy && !scanner.active} onClick={scanner.active ? scanner.stopCamera : scanner.startCamera}><Camera size={15}/>{scanner.busy && !scanner.active ? t.running : scanner.active ? t.stop : t.camera}</ActionButton></>;
}

function BarcodeToolReviewed({ t, locale }) {
  const [value, setValue] = useState('ORDER-2048');
  const [format, setFormat] = useState('CODE128');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const svg = useRef(null);
  const video = useRef(null);
  const scanner = useReviewedScanner(video, t.invalid);
  const generate = () => {
    try {
      if (!value.trim()) throw new Error();
      if (format === 'EAN13' && !/^\d{12,13}$/.test(value)) throw new Error();
      if (format === 'CODE128' && [...value].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) > 126)) throw new Error();
      JsBarcode(svg.current, value, { format, lineColor: '#1c2822', background: '#ffffff', width: 2, height: 110, displayValue: true, margin: 16 });
      setResult(format === 'EAN13' && value.length === 12 ? `${value}${ean13CheckDigit(value)}` : value);
      setError('');
    } catch {
      svg.current?.replaceChildren();
      setResult('');
      setError(t.invalid);
    }
  };
  useEffect(() => { if (value) generate(); }, []);
  const clearBarcode = () => { svg.current?.replaceChildren(); setResult(''); setError(''); };
  const download = () => {
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg.current)], { type: 'image/svg+xml' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'barcode.svg';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <div className="tool-stack"><div className="tool-grid-two"><div className="panel"><div className="panel-title"><Barcode size={17}/><h3>{barcodeFormats[locale][format]}</h3></div><label className="field"><span className="field-label">{barcodeFormats[locale].label}</span><select value={format} onChange={(event) => { const next = event.target.value; setFormat(next); setValue(next === 'EAN13' ? '400638133393' : 'ORDER-2048'); clearBarcode(); }}><option value="CODE128">{barcodeFormats[locale].CODE128}</option><option value="EAN13">{barcodeFormats[locale].EAN13}</option></select></label><TextArea label={t.barcodeValue} value={value} onChange={(next) => { setValue(next); clearBarcode(); }} rows={3} placeholder={format === 'EAN13' ? '12 digits, e.g. 400638133393' : 'ASCII text, e.g. ORDER-2048'}/><ActionButton onClick={generate}><Barcode size={16}/>{t.generate}</ActionButton>{error && <Status ok={false} text={error}/>}<svg ref={svg} className="barcode-svg" aria-label={`${format} barcode`}/>{result && <div className="encoded-value"><span>{t.output}</span><code>{result}</code></div>}</div><div className="panel"><h3>{t.scan}</h3><p className="helper-text">{t.scanHelp}</p><ReviewedScannerControls scanner={scanner} t={t}/><video ref={video} className="scan-video"/><ResultBox value={scanner.scanResult} t={t}/></div></div><div className="result-head"><span className="field-label">{t.output}</span><button className="button button-light" disabled={!result} onClick={download}><Download size={15}/>{t.download} SVG</button></div></div>;
}

function QRToolReviewed({ t }) {
  const [value, setValue] = useState('https://example.com');
  const [src, setSrc] = useState('');
  const [error, setError] = useState('');
  const video = useRef(null);
  const generationRef = useRef(0);
  const scanner = useReviewedScanner(video, t.invalid);
  useEffect(() => {
    const generation = ++generationRef.current;
    setSrc('');
    setError('');
    if (!value.trim()) return undefined;
    QRCode.toDataURL(value, { width: 300, margin: 2, color: { dark: '#17221c', light: '#ffffff' } })
      .then((dataUrl) => {
        if (generation === generationRef.current) { setSrc(dataUrl); setError(''); }
      })
      .catch(() => {
        if (generation === generationRef.current) { setSrc(''); setError(t.invalid); }
      });
    return () => { if (generationRef.current === generation) generationRef.current++; };
  }, [value, t.invalid]);
  const download = () => { const anchor = document.createElement('a'); anchor.href = src; anchor.download = 'qr-code.png'; anchor.click(); };
  return <div className="tool-grid-two"><div className="panel"><TextArea label={t.qrValue} value={value} onChange={(next) => { setValue(next); setSrc(''); setError(''); }} rows={4} placeholder={t.urlPlaceholder}/>{error && <Status ok={false} text={error}/>}<div className="qr-preview" aria-busy={!src && !error}>{src && <img src={src} alt="Generated QR code"/>}</div><button className="button button-light" disabled={!src} onClick={download}><Download size={15}/>{t.download} PNG</button></div><div className="panel"><h3>{t.scan}</h3><p className="helper-text">{t.scanHelp}</p><ReviewedScannerControls scanner={scanner} t={t}/><video ref={video} className="scan-video"/><ResultBox value={scanner.scanResult} t={t}/></div></div>;
}

function MetronomeReviewed({ t }) {
  const [bpm, setBpm] = useState(100); const [beats, setBeats] = useState(4); const [active, setActive] = useState(false); const [beat, setBeat] = useState(0); const [lastTap, setLastTap] = useState(0); const [taps, setTaps] = useState([]); const ctx = useRef(null); const timer = useRef(null);
  useEffect(() => { if (active) { let n = 0; const tick = () => { const audio = ctx.current || (ctx.current = new AudioContext()); const osc = audio.createOscillator(); const gain = audio.createGain(); osc.frequency.value = n % beats === 0 ? 1000 : 720; gain.gain.value = 0.12; osc.connect(gain); gain.connect(audio.destination); osc.start(); osc.stop(audio.currentTime + 0.055); setBeat(n % beats); n++; }; tick(); timer.current = setInterval(tick, 60000 / bpm); } else clearInterval(timer.current); return () => clearInterval(timer.current); }, [active, bpm, beats]);
  const tap = () => { const now = Date.now(); if (lastTap && now - lastTap < 2000) { const next = [...taps, 60000 / (now - lastTap)].slice(-4); setTaps(next); setBpm(Math.round(next.reduce((a, b) => a + b, 0) / next.length)); } else setTaps([]); setLastTap(now); };
  const weightY = 28 + (300 - bpm) / 280 * 82;
  return <div className="metronome-layout"><div className="metronome-settings"><div className="bpm-control"><button onClick={() => setBpm(Math.max(20, bpm - 1))} aria-label="Decrease BPM">−</button><div><strong>{bpm}</strong><label htmlFor="metronome-bpm-reviewed">{t.bpm}</label></div><button onClick={() => setBpm(Math.min(300, bpm + 1))} aria-label="Increase BPM">+</button></div><input id="metronome-bpm-reviewed" className="range" type="range" min="20" max="300" value={bpm} onChange={(event) => setBpm(+event.target.value)}/><label className="setting-row"><span>{t.beats}</span><select value={beats} onChange={(event) => setBeats(+event.target.value)}>{[2,3,4,5,6,7,8].map((value) => <option key={value}>{value}</option>)}</select></label><div className="beat-lights" aria-label={`${beats} ${t.beats}`}>{Array.from({ length: beats }, (_, index) => <span key={index} className={active && beat === index ? 'lit' : ''}/>)}</div><ActionButton onClick={() => setActive(!active)}>{active ? <><Pause size={16}/>{t.stop}</> : <><Play size={16}/>{t.start}</>}</ActionButton><button className="button button-light full-button" onClick={tap}>{t.tap}</button></div><div className="metronome-art"><div className={`mechanical-metronome ${active ? 'is-running' : ''}`}><div className="metronome-case"><span className="case-side"/><span className="case-face"/></div><div className="metronome-scale">{Array.from({ length: 17 }, (_, index) => <i key={index} className={index % 4 === 0 ? 'major' : ''}/>)}</div><div className={`metronome-arm ${active ? 'swing' : ''}`} style={{ '--swing-period': `${60 / bpm}s` }}><span className="metronome-weight" style={{ '--weight-y': `${weightY}px` }}/></div><span className="metronome-pivot"/><span className="metronome-knob"/></div><span>{active ? t.running : `${bpm} BPM`}</span></div></div>;
}

function formatLocalDateTimeReviewed(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function UnixToolReviewed({ t }) {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState('seconds');
  const [date, setDate] = useState(() => formatLocalDateTimeReviewed(new Date()));
  const [error, setError] = useState(false);
  const [convertedMs, setConvertedMs] = useState('');
  const fromTimestamp = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number)) { setError(true); return; }
    const milliseconds = unit === 'seconds' ? number * 1000 : number;
    const parsed = new Date(milliseconds);
    if (Number.isNaN(parsed.getTime())) { setError(true); return; }
    setDate(formatLocalDateTimeReviewed(parsed));
    setConvertedMs(String(milliseconds));
    setError(false);
  };
  const fromDate = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) { setError(true); return; }
    const milliseconds = parsed.getTime();
    setTimestamp(String(unit === 'seconds' ? Math.floor(milliseconds / 1000) : milliseconds));
    setConvertedMs(String(milliseconds));
    setError(false);
  };
  const parsedDate = new Date(date);
  const validDate = !Number.isNaN(parsedDate.getTime());
  return <div className="tool-grid-two"><div className="panel"><label className="field"><span className="field-label">{t.timestamp}</span><div className="inline-field"><input value={timestamp} onChange={(event) => setTimestamp(event.target.value)} inputMode="numeric"/><select value={unit} onChange={(event) => setUnit(event.target.value)}><option value="seconds">{t.seconds}</option><option value="milliseconds">{t.milliseconds}</option></select></div></label><ActionButton onClick={() => fromTimestamp(timestamp)}>{t.date} ← {t.timestamp}</ActionButton>{convertedMs && <div className="timestamp-results"><span>{t.milliseconds}</span><code>{convertedMs}</code></div>}</div><div className="panel"><label className="field"><span className="field-label">{t.date}</span><input type="datetime-local" value={date} onChange={(event) => setDate(event.target.value)}/></label><ActionButton onClick={() => fromDate(date)}>{t.timestamp} ← {t.date}</ActionButton><p className="helper-text">{t.seconds}: {validDate ? Math.floor(parsedDate.getTime() / 1000) : '—'} · {t.milliseconds}: {validDate ? parsedDate.getTime() : '—'}</p></div>{error && <Status ok={false} text={t.invalid}/>}</div>;
}

const regexMessagesReviewed = {
  ko: { timeout: '정규식 실행이 250ms 제한 시간을 넘었습니다.', truncated: '결과가 10,000개를 넘어 나머지는 표시하지 않았습니다.' },
  en: { timeout: 'The regular expression exceeded the 250 ms time limit.', truncated: 'There were more than 10,000 matches; the remaining results are hidden.' },
  ja: { timeout: '正規表現の実行が250ミリ秒の制限時間を超えました。', truncated: '一致結果が10,000件を超えたため、残りは表示していません。' },
  zh: { timeout: '正则表达式运行超过了 250 毫秒的时间限制。', truncated: '匹配结果超过 10,000 条，其余结果未显示。' },
};

function RegexToolReviewed({ t, locale }) {
  const [pattern, setPattern] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [input, setInput] = useState('There are 42 tools and 4 languages.');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [truncated, setTruncated] = useState(false);
  const [pending, setPending] = useState(true);
  const requestRef = useRef(0);
  useEffect(() => {
    const requestId = ++requestRef.current;
    let worker = null;
    let debounceTimer = null;
    let timeoutTimer = null;
    setMatches([]); setError(''); setTruncated(false); setPending(true);
    debounceTimer = setTimeout(() => {
      try {
        worker = new Worker('/regex-worker.js');
        timeoutTimer = setTimeout(() => {
          worker?.terminate();
          if (requestRef.current === requestId) { setError(regexMessagesReviewed[locale].timeout); setPending(false); }
        }, 250);
        worker.onmessage = ({ data }) => {
          if (requestRef.current !== requestId) return;
          clearTimeout(timeoutTimer);
          if (data.error) { setError(data.error); setMatches([]); setTruncated(false); }
          else { setError(''); setMatches(data.matches); setTruncated(data.truncated); }
          setPending(false);
        };
        worker.onerror = () => {
          if (requestRef.current !== requestId) return;
          clearTimeout(timeoutTimer); worker?.terminate(); setError(t.invalid); setPending(false);
        };
        worker.postMessage({ id: requestId, pattern, flags, input, maxMatches: 10000 });
      } catch { setError(t.invalid); setPending(false); }
    }, 150);
    return () => { clearTimeout(debounceTimer); clearTimeout(timeoutTimer); worker?.terminate(); };
  }, [pattern, flags, input, locale, t.invalid]);
  return <div className="tool-stack"><div className="tool-grid-two"><label className="field"><span className="field-label">{t.pattern}</span><input value={pattern} onChange={(event) => setPattern(event.target.value)} placeholder={t.regexPlaceholder}/></label><label className="field"><span className="field-label">{t.flags}</span><input value={flags} onChange={(event) => setFlags(event.target.value)} placeholder="gimsuy"/></label></div><TextArea label={t.text} value={input} onChange={setInput} rows={5}/>{error && <Status ok={false} text={error}/>}<div className="result-panel"><div className="result-head"><span className="field-label">{t.output}</span><span className="match-count">{pending ? '…' : matches.length}</span></div><div className="match-list">{matches.length ? matches.map((match, index) => <code key={index}>{match.text} <small>@ {match.index}</small></code>) : error ? null : t.noResult}</div>{truncated && <p className="helper-text">{regexMessagesReviewed[locale].truncated}</p>}</div></div>;
}

const internationalMorse = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
  K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
};
const morseToCharacter = Object.fromEntries(Object.entries(internationalMorse).map(([character, code]) => [code, character]));

function encodeMorseText(value) {
  if (!value.trim()) return '';
  return value.trim().toUpperCase().split(/\s+/).map((word) => Array.from(word, (character) => {
    const code = internationalMorse[character];
    if (!code) throw new Error('unsupported');
    return code;
  }).join(' ')).join(' / ');
}

function parseMorseWords(value) {
  const normalized = value.trim().replace(/[–—−]/g, '-').replace(/[·•]/g, '.');
  if (!normalized) return [];
  return normalized.split(/\s*\/\s*/).filter(Boolean).map((word) => word.trim().split(/\s+/).filter(Boolean));
}

function decodeMorseText(value) {
  return parseMorseWords(value).map((word) => word.map((code) => {
    if (!/^[.-]+$/.test(code) || !Object.hasOwn(morseToCharacter, code)) throw new Error('invalid');
    return morseToCharacter[code];
  }).join('')).join(' ');
}

function MorseTool({ locale, t }) {
  const copy = morseToolCopy[locale];
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('SOS');
  const [wpm, setWpm] = useState(15);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const playerRef = useRef({ context: null, nodes: [], timer: null, generation: 0 });
  let output = '';
  let conversionError = '';
  try {
    output = mode === 'encode' ? encodeMorseText(input) : decodeMorseText(input);
  } catch (error) {
    conversionError = error.message === 'unsupported' ? copy.unsupported : copy.invalidCode;
  }
  const playbackCode = mode === 'encode' ? output : input.trim();

  const stopPlayback = () => {
    const player = playerRef.current;
    player.generation++;
    if (player.timer) clearTimeout(player.timer);
    player.timer = null;
    player.nodes.forEach((node) => { try { node.stop(); } catch {} });
    player.nodes = [];
    const context = player.context;
    player.context = null;
    if (context && context.state !== 'closed') context.close().catch(() => {});
    setPlaying(false);
  };

  useEffect(() => () => {
    const player = playerRef.current;
    player.generation++;
    if (player.timer) clearTimeout(player.timer);
    player.nodes.forEach((node) => { try { node.stop(); } catch {} });
    if (player.context && player.context.state !== 'closed') player.context.close().catch(() => {});
  }, []);

  const play = async () => {
    if (!playbackCode || conversionError) return;
    stopPlayback();
    setAudioError(false);
    const player = playerRef.current;
    const generation = player.generation;
    let context;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) throw new Error('unsupported');
      context = new AudioContextClass();
      player.context = context;
      await context.resume();
      if (player.generation !== generation) { await context.close(); return; }

      const words = parseMorseWords(playbackCode);
      if (!words.length) throw new Error('invalid');
      const dotSeconds = 1.2 / wpm;
      let cursor = context.currentTime + 0.04;
      let lastToneEnd = cursor;
      words.forEach((word, wordIndex) => {
        word.forEach((letter, letterIndex) => {
          if (!/^[.-]+$/.test(letter) || !Object.hasOwn(morseToCharacter, letter)) throw new Error('invalid');
          Array.from(letter).forEach((signal, signalIndex, signals) => {
            const duration = signal === '.' ? dotSeconds : dotSeconds * 3;
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.frequency.value = 650;
            gain.gain.setValueAtTime(0.0001, cursor);
            gain.gain.exponentialRampToValueAtTime(0.12, cursor + Math.min(0.006, duration / 4));
            gain.gain.setValueAtTime(0.12, cursor + duration - Math.min(0.006, duration / 4));
            gain.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);
            oscillator.connect(gain);
            gain.connect(context.destination);
            oscillator.start(cursor);
            oscillator.stop(cursor + duration);
            player.nodes.push(oscillator);
            lastToneEnd = cursor + duration;
            cursor = lastToneEnd + (signalIndex < signals.length - 1 ? dotSeconds : 0);
          });
          if (letterIndex < word.length - 1) cursor += dotSeconds * 3;
        });
        if (wordIndex < words.length - 1) cursor += dotSeconds * 7;
      });
      setPlaying(true);
      player.timer = setTimeout(() => {
        if (player.generation === generation) stopPlayback();
      }, Math.max(0, (lastToneEnd - context.currentTime) * 1000) + 50);
    } catch {
      if (context && context.state !== 'closed') context.close().catch(() => {});
      player.context = null;
      player.nodes = [];
      setPlaying(false);
      setAudioError(true);
    }
  };

  const changeMode = (nextMode) => {
    stopPlayback();
    setAudioError(false);
    setMode(nextMode);
    setInput(nextMode === 'encode' ? 'SOS' : '... --- ...');
  };
  const changeInput = (value) => { stopPlayback(); setAudioError(false); setInput(value); };

  return <div className="tool-stack"><div className="panel"><label className="field"><span className="field-label">{copy.modeLabel}</span><select value={mode} onChange={(event) => changeMode(event.target.value)}><option value="encode">{copy.toMorse}</option><option value="decode">{copy.toText}</option></select></label><TextArea label={mode === 'encode' ? copy.textInput : copy.codeInput} value={input} onChange={changeInput} rows={5}/>{conversionError && <Status ok={false} text={conversionError}/>}<div className="result-panel"><div className="result-head"><span className="field-label">{mode === 'encode' ? copy.codeOutput : copy.textOutput}</span><CopyButton value={output} t={t}/></div><pre>{output || t.noResult}</pre></div></div><div className="panel morse-player"><div className="panel-title"><Music2 size={17}/><h3>{copy.player}</h3></div><p className="helper-text">{copy.speedHelp}</p><label className="field" htmlFor="morse-playback-speed"><span className="field-label">{copy.speed}: {wpm} {copy.wpm}</span><input id="morse-playback-speed" className="range" type="range" min="5" max="35" step="1" value={wpm} onChange={(event) => { stopPlayback(); setWpm(Number(event.target.value)); }}/></label><div className="action-row"><ActionButton onClick={play} disabled={!playbackCode || Boolean(conversionError) || playing}><Play size={16}/>{copy.play}</ActionButton><ActionButton secondary onClick={stopPlayback} disabled={!playing}><Pause size={16}/>{copy.stop}</ActionButton></div>{playing && <p className="helper-text" role="status" aria-live="polite">{copy.playing}</p>}{audioError && <Status ok={false} text={copy.audioError}/>}</div></div>;
}
