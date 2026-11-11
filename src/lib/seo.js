export const locales = ['ko', 'ja', 'zh', 'en'];
export const toolSlugs = ['metronome', 'stopwatch', 'barcode', 'qr-code', 'json-formatter', 'url-encoder', 'uuid-generator', 'unix-timestamp', 'text-diff', 'base64', 'regex-tester', 'markdown-preview', 'color-converter'];
export const siteOrigin = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');

const home = {
  ko: ['작은 도구들 — 온라인 무료 도구 모음', '메트로놈, 스톱워치, QR 코드, JSON 정리기 등 일상과 개발에 유용한 13가지 온라인 도구. 가입 없이 브라우저에서 안전하게 사용하세요.'],
  ja: ['小さなツール — 無料オンラインツール', 'メトロノーム、ストップウォッチ、QRコード、JSON整形など、日常や開発に役立つ13の無料オンラインツール。'],
  zh: ['实用小工具 — 免费在线工具集', '节拍器、秒表、二维码、JSON 格式化等 13 种日常与开发工具。无需注册，在浏览器中安全使用。'],
  en: ['Little Tools — Free Online Utilities', '13 useful browser-based tools for everyday tasks and development, including a metronome, stopwatch, QR code maker, and JSON formatter.'],
};
const tools = {
  ko: [
    ['온라인 메트로놈', 'BPM과 박자를 설정하고 탭 템포로 속도를 맞추는 무료 온라인 메트로놈. 브라우저에서 소리를 재생합니다.'],
    ['온라인 스톱워치', '랩 타임 기록을 지원하는 무료 온라인 스톱워치. 브라우저에서 실행되며 기록은 기기에만 남습니다.'],
    ['바코드 생성기·스캐너', '텍스트나 주문 번호를 Code 128 바코드로 만들고 이미지 또는 카메라로 읽습니다.'],
    ['QR 코드 생성기·스캐너', 'URL이나 텍스트로 QR 코드를 만들고 PNG로 저장하거나 이미지와 카메라로 스캔합니다.'],
    ['JSON 정리 및 검증기', 'JSON 문법을 검증하고 보기 좋게 정리하거나 압축합니다. 오류 위치와 형식화 결과를 확인하세요.'],
    ['URL 인코더·디코더', 'URL 문자열을 퍼센트 인코딩하거나 디코딩하는 무료 온라인 변환 도구입니다.'],
    ['UUID 생성기', '브라우저에서 무작위 UUID v4를 원하는 개수만큼 생성하고 복사합니다.'],
    ['Unix 타임스탬프 변환기', '초 또는 밀리초 Unix 타임스탬프와 날짜·시간을 서로 변환합니다.'],
    ['텍스트 비교기', '두 텍스트를 줄 단위로 비교해 추가되거나 삭제된 내용을 확인합니다.'],
    ['Base64 인코더·디코더', 'UTF-8 텍스트와 Base64 문자열을 브라우저에서 변환합니다.'],
    ['정규식 테스트기', '정규식 패턴과 플래그를 테스트하고 텍스트에서 일치하는 값을 확인합니다.'],
    ['Markdown 미리보기', 'Markdown을 입력하고 제목, 목록, 코드와 링크 렌더링 결과를 안전하게 미리 봅니다.'],
    ['색상 변환·대비 검사기', 'HEX 색상을 RGB·HSL로 변환하고 글자색과 배경색의 WCAG 대비율을 확인합니다.'],
  ],
  ja: [
    ['オンラインメトロノーム', 'BPMと拍子を設定できる無料メトロノーム。ブラウザーでクリック音を再生します。'],
    ['オンラインストップウォッチ', 'ラップタイムを記録できる無料ストップウォッチ。計測はブラウザー内で行います。'],
    ['バーコード作成・読み取り', 'テキストをCode 128バーコードに変換し、画像やカメラから読み取ります。'],
    ['QRコード作成・読み取り', 'URLやテキストからQRコードを作成し、PNG保存や画像・カメラでの読み取りができます。'],
    ['JSON整形・検証ツール', 'JSONの構文を検証し、読みやすく整形または圧縮します。'],
    ['URLエンコード・デコード', 'URL文字列をパーセントエンコードまたはデコードします。'],
    ['UUID生成ツール', 'ランダムなUUID v4を必要な数だけブラウザーで生成します。'],
    ['Unixタイムスタンプ変換', '秒・ミリ秒のUnixタイムスタンプと日時を相互変換します。'],
    ['テキスト比較ツール', '2つのテキストを行単位で比較し、追加・削除された内容を表示します。'],
    ['Base64エンコード・デコード', 'UTF-8テキストとBase64文字列をブラウザーで変換します。'],
    ['正規表現テスター', '正規表現パターンとフラグを試し、テキスト内の一致を確認します。'],
    ['Markdownプレビュー', 'Markdownの見出し、リスト、コードやリンクを安全にプレビューします。'],
    ['色変換・コントラスト確認', 'HEXをRGB・HSLに変換し、文字色と背景色のWCAGコントラスト比を確認します。'],
  ],
  zh: [
    ['在线节拍器', '设置 BPM 和拍号的免费在线节拍器，可在浏览器中播放节拍声。'],
    ['在线秒表', '支持圈数记录的免费在线秒表，计时在浏览器中完成。'],
    ['条形码生成与扫描', '将文本转换为 Code 128 条形码，并通过图片或相机读取。'],
    ['二维码生成与扫描', '用网址或文本生成二维码，可下载 PNG，也可扫描图片或相机画面。'],
    ['JSON 格式化与验证', '验证 JSON 语法，并将内容格式化以便阅读或压缩。'],
    ['URL 编码与解码', '对 URL 字符串进行百分号编码或解码。'],
    ['UUID 生成器', '在浏览器中按需生成随机 UUID v4。'],
    ['Unix 时间戳转换器', '在秒或毫秒 Unix 时间戳与日期时间之间转换。'],
    ['文本比较器', '逐行比较两段文本，并查看新增或删除的内容。'],
    ['Base64 编码与解码', '在浏览器中转换 UTF-8 文本与 Base64 字符串。'],
    ['正则表达式测试器', '测试正则模式与标志，并查看文本中的匹配结果。'],
    ['Markdown 预览', '安全预览 Markdown 标题、列表、代码和链接。'],
    ['颜色转换与对比度检查', '将 HEX 颜色转换为 RGB、HSL，并检查文字与背景的 WCAG 对比度。'],
  ],
  en: [
    ['Online Metronome', 'A free metronome with adjustable BPM and meter, tap tempo, and browser-based audio.'],
    ['Online Stopwatch', 'A free browser stopwatch with lap timing and split records.'],
    ['Barcode Generator and Scanner', 'Create Code 128 barcodes from text and read barcodes from images or a camera.'],
    ['QR Code Generator and Scanner', 'Create QR codes from text or URLs, download PNGs, and scan images or camera input.'],
    ['JSON Formatter and Validator', 'Validate JSON syntax, then format it for reading or minify it for compact output.'],
    ['URL Encoder and Decoder', 'Percent-encode or decode URL strings in your browser.'],
    ['UUID Generator', 'Generate as many random UUID v4 identifiers as you need in your browser.'],
    ['Unix Timestamp Converter', 'Convert Unix timestamps in seconds or milliseconds to dates and back.'],
    ['Text Diff Checker', 'Compare two texts line by line and inspect added or removed content.'],
    ['Base64 Encoder and Decoder', 'Convert UTF-8 text to Base64 and back in your browser.'],
    ['Regex Tester', 'Test regular expression patterns and flags against sample text.'],
    ['Markdown Preview', 'Safely preview rendered Markdown headings, lists, code, and links.'],
    ['Color Converter and Contrast Checker', 'Convert HEX colors to RGB and HSL, then check WCAG text and background contrast.'],
  ],
};

export function homeMetadata(locale = 'ko') {
  const [title, description] = home[locale] || home.ko;
  const href = locale === 'ko' ? '/ko/' : `/${locale}/`;
  return { title, description, alternates: { canonical: href, languages: Object.fromEntries(locales.map((lang) => [lang, `${siteOrigin}/${lang}/`]).concat([['x-default', `${siteOrigin}/ko/`]])) } };
}

export function toolMetadata(locale = 'ko', slug) {
  const toolIndex = toolSlugs.indexOf(slug);
  if (toolIndex < 0) return homeMetadata(locale);
  const [name, description] = tools[locale]?.[toolIndex] || tools.ko[toolIndex];
  const path = `/${locale}/tools/${slug}/`;
  return { title: `${name} — tiny.tools`, description, alternates: { canonical: path, languages: Object.fromEntries(locales.map((lang) => [lang, `${siteOrigin}/${lang}/tools/${slug}/`]).concat([['x-default', `${siteOrigin}/ko/tools/${slug}/`]])) }, openGraph: { title: name, description, url: path, siteName: 'tiny.tools', locale } };
}
