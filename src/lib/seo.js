export const locales = ['ko', 'ja', 'zh', 'en'];
export const toolSlugs = ['metronome', 'stopwatch', 'barcode', 'qr-code', 'json-formatter', 'url-encoder', 'uuid-generator', 'unix-timestamp', 'text-diff', 'base64', 'regex-tester', 'markdown-preview', 'color-converter', 'dice-roller', 'stock-average-calculator', 'character-byte-counter', 'percentage-discount-calculator', 'interest-calculator', 'character-encoding-converter', 'morse-code', 'currency-converter', 'unit-converter', 'jwt-tool', 'db-meter', 'tts', 'date-calculator', 'age-calculator', 'salary-calculator', 'hourly-wage-calculator', 'loan-calculator', 'vat-calculator', 'pyeong-calculator', 'bmi-calculator', 'aspect-ratio-calculator', 'random-draw', 'world-time-converter', 'image-resizer', 'image-format-converter', 'image-compressor', 'image-cropper', 'image-color-picker', 'favicon-generator', 'image-base64-converter', 'svg-optimizer', 'image-watermark', 'qr-design-generator', 'reaction-memory-test', 'websocket-client', 'notification-tester'];
export const siteOrigin = (process.env.SITE_URL || 'https://tools.gogo-tools.workers.dev').replace(/\/$/, '');
export const siteBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const publicPath = (path) => `${siteBasePath}${path}`;

const home = {
  ko: ['온라인 무료 도구 모음', '메트로놈, 계산기, 이미지 편집기, 반응속도·기억력 테스트, WebSocket·알림 테스트 등 일상과 개발에 유용한 49가지 온라인 도구.'],
  ja: ['小さなツール — 無料オンラインツール', 'メトロノーム、計算ツール、画像編集、反応速度・記憶力、WebSocket・通知テストなど、日常や開発に役立つ49の無料オンラインツール。'],
  zh: ['实用小工具 — 免费在线工具集', '节拍器、计算器、图片编辑、反应速度与记忆力、WebSocket 与通知测试等 49 种实用工具。'],
  en: ['Little Tools — Free Online Utilities', '49 useful browser-based tools, including calculators, image editing, reaction and memory tests, a WebSocket client, and notification testing.'],
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
    ['주사위 굴리기', '1~10개의 6면 주사위를 굴려 각 눈과 합계를 애니메이션으로 확인합니다.'],
    ['주식 물타기 계산기', '보유 주식 수와 평단, 추가 매수 가격과 수량을 입력해 새 평균 매입가와 총 투자액을 계산합니다. 수수료와 세금은 제외합니다.'],
    ['글자수·바이트 계산기', '한글·영문·이모지의 글자 수와 UTF-8 바이트를 실시간으로 계산합니다. 공백 포함·제외 결과를 함께 확인하세요.'],
    ['퍼센트·할인 계산기', '퍼센트의 일부 값, 비율, 증감률, 할인액과 할인 후 가격을 계산하는 무료 온라인 도구입니다.'],
    ['이자 계산기', '원금·연이율·개월 수를 입력해 단리와 복리의 이자 및 만기 금액을 계산합니다. 복리 주기를 선택할 수 있습니다.'],
    ['글자 인코딩 변환기', '텍스트를 UTF-8, UTF-16LE, EUC-KR, Shift_JIS, GBK, Windows-1252 문자 인코딩으로 변환하고 결과 바이트를 확인합니다.']
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
    ['サイコロ', '1〜10個の6面サイコロを振り、それぞれの目と合計をアニメーションで確認できます。'],
    ['株の平均取得単価計算', '保有株数と平均取得単価、追加購入価格と株数から、新しい平均取得単価と投資額を計算します。手数料・税金は含みません。'],
    ['文字数・バイト数カウンター', '空白の有無別の文字数、行数、UTF-8バイト数をリアルタイムで数えます。'],
    ['パーセント・割引計算', '割合、比率、増減率、割引額と割引後の価格を計算します。'],
    ['利息計算', '元金・年利・月数から単利または複利の利息と満期額を計算します。複利の頻度を選べます。'],
    ['文字エンコード変換', 'テキストをUTF-8、UTF-16LE、EUC-KR、Shift_JIS、GBK、Windows-1252に変換し、出力バイトを確認できます。']
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
    ['掷骰子', '可同时投掷 1 到 10 个六面骰子，并通过动画查看各点数与总和。'],
    ['股票补仓计算器', '根据持仓数量、当前均价、补仓价格和数量计算新的平均成本与总投入。不含手续费和税费。'],
    ['字符数与字节数计算器', '实时统计含空白和不含空白的 Unicode 字符数、行数及 UTF-8 字节数。'],
    ['百分比与折扣计算器', '计算数值百分比、比例、涨跌幅、优惠金额和折后价格。'],
    ['利息计算器', '根据本金、年利率和月数计算单利或复利及到期金额，并可选择复利频率。'],
    ['文本编码转换器', '在 UTF-8、UTF-16LE、EUC-KR、Shift_JIS、GBK 和 Windows-1252 之间转换文本并查看字节结果。']
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
    ['Dice Roller', 'Roll 1 to 10 six-sided dice and see each result and the total with an animation.'],
    ['Stock Averaging Calculator', 'Calculate a new average share cost and total investment from your current holdings and an additional purchase. Fees and taxes are excluded.'],
    ['Character and Byte Counter', 'Count Unicode characters with or without whitespace, lines, and UTF-8 bytes in real time.'],
    ['Percentage and Discount Calculator', 'Calculate a percentage of a value, ratios, percentage change, discount savings, and sale prices.'],
    ['Interest Calculator', 'Calculate simple or compound interest and maturity value from principal, annual rate, and term. Choose a compounding frequency.'],
    ['Text Encoding Converter', 'Convert text between UTF-8, UTF-16LE, EUC-KR, Shift_JIS, GBK, and Windows-1252, then inspect the output bytes.']
  ],
};

const morseMetadata = {
  ko: ['모스부호 변환기·플레이어', '영어 텍스트와 국제 모스부호를 서로 변환하고 재생 속도를 조절해 신호음을 들을 수 있습니다.'],
  ja: ['モールス信号変換・再生ツール', '英語テキストと国際モールス信号を相互変換し、再生速度を調整して信号音を聴けます。'],
  zh: ['摩斯密码转换与播放器', '在英文文本与国际摩斯密码之间互相转换，并可调节播放速度收听信号音。'],
  en: ['Morse Code Translator and Player', 'Translate English text to International Morse code, decode it back, and listen to timed tones at an adjustable speed.'],
};
const currencyMetadata = {
  ko: ['환율 계산기', 'Frankfurter 기준 환율로 출발 통화와 도착 통화를 선택해 금액을 변환합니다.'],
  ja: ['為替計算ツール', 'Frankfurterの基準レートを使い、変換元と変換先の通貨を選んで換算します。'],
  zh: ['汇率计算器', '使用 Frankfurter 参考汇率，选择来源货币和目标货币进行换算。'],
  en: ['Currency Converter', 'Convert an amount between source and destination currencies using Frankfurter reference rates.'],
};
const unitMetadata = {
  ko: ['단위 환산기', '길이, 무게, 온도, 넓이, 부피, 속도와 시간을 브라우저에서 변환합니다.'],
  ja: ['単位変換ツール', '長さ、重さ、温度、面積、体積、速度、時間の単位をブラウザーで変換します。'],
  zh: ['单位换算器', '在浏览器中换算长度、重量、温度、面积、体积、速度和时间单位。'],
  en: ['Unit Converter', 'Convert units for length, weight, temperature, area, volume, speed, and time in your browser.'],
};
const jwtMetadata = {
  ko: ['JWT 인코딩·디코딩', 'JWT 헤더와 페이로드를 디코딩하고 HS256 시크릿 키 서명을 생성하거나 검증합니다.'],
  ja: ['JWTエンコード・デコード', 'JWTのヘッダーとペイロードをデコードし、HS256シークレットキー署名を作成・検証します。'],
  zh: ['JWT 编码 / 解码', '解码 JWT 标头和负载，并使用 HS256 密钥生成或验证签名。'],
  en: ['JWT Encoder / Decoder', 'Decode JWT headers and payloads, then create or verify HS256 signatures with a secret key.'],
};
const dbMeterMetadata = {
  ko: ['데시벨 측정기', '브라우저 마이크를 사용해 실시간 dBFS 음량과 피크 레벨을 확인합니다.'],
  ja: ['デシベル測定ツール', 'ブラウザーのマイクを使い、リアルタイムのdBFS音量とピークレベルを表示します。'],
  zh: ['分贝测量器', '使用浏览器麦克风实时查看 dBFS 音量和峰值。'],
  en: ['Decibel Meter', 'View live dBFS microphone input and peak levels in your browser.'],
};
const ttsMetadata = {
  ko: ['TTS 음성 읽기', '텍스트를 브라우저 음성으로 읽고 언어, 목소리와 속도를 조절합니다.'],
  ja: ['テキスト読み上げ', 'ブラウザー音声で文章を読み上げ、言語、声、速度を調整します。'],
  zh: ['文本转语音', '使用浏览器语音朗读文本，并调整语言、音色和语速。'],
  en: ['Text to Speech', 'Read text aloud with browser voices and adjust the language, voice, and speed.'],
};
const addedMetadata = {
  ko: [['날짜 계산기','날짜 간 일수, D-Day, 날짜 더하기와 빼기를 계산합니다.'],['만나이 계산기','생년월일을 기준으로 만 나이와 다음 생일까지 남은 날을 계산합니다.'],['연봉 실수령액 계산기','한국 2026년 기준 세금과 근로자 부담 보험료를 추정합니다.'],['시급·월급 계산기','주당 근무시간과 시급으로 주휴수당 선택 적용 급여를 계산합니다.'],['대출 상환 계산기','원리금균등과 원금균등 상환액 및 월별 잔액을 확인합니다.'],['부가세 계산기','공급가액, 부가세와 합계금액을 서로 계산합니다.'],['평수 계산기','제곱미터와 평을 양방향 변환합니다.'],['BMI 계산기','키와 몸무게로 체질량지수를 계산합니다.'],['비율 계산기','가로세로 비율을 유지해 크기를 계산합니다.'],['랜덤 추첨기','목록에서 중복 없이 무작위 항목을 뽑습니다.'],['사다리타기','참가자와 결과를 무작위 사다리로 연결합니다.'],['룰렛','항목을 추가해 룰렛으로 무작위 선택합니다.'],['세계 시간 변환기','도시별 현지 시간을 비교하고 시간대를 변환합니다.']],
  en: [['Date Calculator','Count days, check a countdown, or add and subtract dates.'],['Age Calculator','Calculate age from a birth date and days until the next birthday.'],['Take-home Salary Estimator','Estimate Korean 2026 income tax and employee insurance deductions.'],['Hourly and Monthly Pay','Calculate pay from weekly hours and hourly wage, with optional weekly holiday pay.'],['Loan Repayment Calculator','Compare equal payment and equal principal plans with a monthly schedule.'],['VAT Calculator','Calculate net amount, VAT, or total in either direction.'],['Pyeong Converter','Convert square meters and pyeong both ways.'],['BMI Calculator','Calculate body mass index from height and weight.'],['Aspect Ratio Calculator','Resize while preserving a width-to-height ratio.'],['Random Draw','Choose unique winners at random from a list.'],['Ladder Game','Randomly connect participants to outcomes with a ladder.'],['Roulette','Add choices and spin to select one at random.'],['World Time Converter','Compare local times across cities and time zones.']],
  ja: [['日付計算','日数・D-Dayの確認や日付の加算・減算を行います。'],['満年齢計算','生年月日から満年齢と次の誕生日までの日数を計算します。'],['手取り給与の目安','韓国2026年基準で税金と本人負担保険料を推定します。'],['時給・月給計算','週の勤務時間と時給から週休手当を選択適用して計算します。'],['ローン返済計算','元利均等・元金均等の返済額と月次残高を比較します。'],['VAT計算','税抜額・VAT・税込額を相互に計算します。'],['坪換算','平方メートルと坪を相互に変換します。'],['BMI計算','身長と体重からBMIを計算します。'],['比率計算','縦横比を保ったままサイズを計算します。'],['ランダム抽選','リストから重複なしで抽選します。'],['あみだくじ','参加者と結果をランダムに結びます。'],['ルーレット','項目を追加してランダムに選びます。'],['世界時間変換','都市別時刻を比較しタイムゾーンを変換します。']],
  zh: [['日期计算器','计算日期间隔、倒数日，并对日期加减天数。'],['周岁计算器','根据出生日期计算周岁和距离下次生日的天数。'],['税后工资估算器','按韩国 2026 年标准估算所得税和个人承担的保险费。'],['时薪与月薪计算器','根据每周工时和时薪计算工资，可选计入周休津贴。'],['贷款还款计算器','比较等额本息与等额本金，并查看逐月还款计划。'],['增值税计算器','互相计算未税金额、增值税和含税总额。'],['坪数换算器','双向换算平方米和坪。'],['BMI 计算器','根据身高和体重计算 BMI。'],['比例计算器','保持宽高比例计算缩放尺寸。'],['随机抽选器','从名单中随机抽取不重复的结果。'],['爬梯抽签','用随机梯子将参与者与结果配对。'],['转盘抽选','添加选项并旋转随机选择。'],['世界时间转换器','比较不同城市的当地时间并转换时区。']],
};
const addedMetadataIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12];
const addedMetadataAt = (locale, index) => addedMetadata[locale][addedMetadataIndexes[index - 25]];
const imageMetadata = {
  ko: [['이미지 크기 변경기','픽셀 크기와 비율을 유지해 이미지 크기를 변경합니다.'],['이미지 포맷 변환기','PNG, JPG, WebP 형식을 브라우저에서 변환합니다.'],['이미지 압축기','품질을 조절하고 변환 전후 파일 크기를 비교합니다.'],['이미지 자르기','이미지에서 영역을 드래그해 비율에 맞춰 자릅니다.'],['이미지 색상 추출기','이미지를 클릭해 해당 픽셀의 HEX 색상을 추출합니다.'],['파비콘 생성기','PNG에서 여러 크기의 아이콘과 멀티사이즈 ICO를 만듭니다.'],['이미지 Base64 변환기','이미지와 Data URL을 서로 변환하고 미리 봅니다.'],['SVG 최적화기','SVG의 불필요한 정보와 위험한 요소를 정리합니다.'],['이미지 워터마크','텍스트나 이미지 워터마크를 넣어 저장합니다.'],['QR 디자인 생성기','색상·테두리·로고를 적용한 QR 코드를 만듭니다.']],
  en: [['Image Resizer','Resize images by pixels while optionally preserving aspect ratio.'],['Image Format Converter','Convert PNG, JPG, and WebP in your browser.'],['Image Compressor','Adjust quality and compare file sizes before and after.'],['Image Cropper','Drag to select and crop an image with a chosen aspect ratio.'],['Image Color Picker','Click an image to extract a pixel color as HEX.'],['Favicon Generator','Create common icon sizes and a multi-size ICO from PNG.'],['Image Base64 Converter','Convert images and Data URLs both ways with a preview.'],['SVG Optimizer','Clean unnecessary SVG data and remove unsafe elements.'],['Image Watermark','Add a text or image watermark and download the result.'],['QR Design Generator','Create QR codes with custom colors, borders, and a logo.']],
  ja: [['画像リサイズ','縦横比を保ちながらピクセルサイズを変更します。'],['画像形式変換','PNG、JPG、WebPをブラウザー内で変換します。'],['画像圧縮','画質を調整し、変換前後のファイルサイズを比較します。'],['画像トリミング','画像上をドラッグして比率を選び切り取ります。'],['画像カラーピッカー','画像をクリックしてピクセルのHEX色を取得します。'],['ファビコン生成','PNGから複数サイズのアイコンとICOを作成します。'],['画像Base64変換','画像とData URLを相互変換してプレビューします。'],['SVG最適化','不要なSVGデータと危険な要素を整理します。'],['画像ウォーターマーク','テキストまたは画像の透かしを追加します。'],['QRデザイン生成','色・枠・ロゴを設定したQRコードを作成します。']],
  zh: [['图片尺寸调整','按像素调整尺寸，并可保持宽高比例。'],['图片格式转换','在浏览器中转换 PNG、JPG 和 WebP。'],['图片压缩','调整质量并比较转换前后的文件大小。'],['图片裁剪','拖动选择区域并按指定比例裁剪。'],['图片取色器','点击图片提取像素的 HEX 颜色。'],['网站图标生成器','从 PNG 生成常见尺寸图标和多尺寸 ICO。'],['图片 Base64 转换器','双向转换图片与 Data URL 并预览。'],['SVG 优化器','清理多余 SVG 数据并移除不安全元素。'],['图片水印','添加文字或图片水印并下载。'],['二维码设计生成器','自定义颜色、边框和 Logo 来生成二维码。']],
};
const reactionMemoryMetadata = {
  ko: ['반응속도·기억력 테스트', '반응속도 5회 평균과 숫자 기억력을 측정하고 브라우저에 최고 기록을 저장해 친구와 비교합니다.'],
  en: ['Reaction & Memory Test', 'Measure a five-round reaction average and digit memory, save personal bests in your browser, and compare scores with friends.'],
  ja: ['反応速度・記憶力テスト', '反応速度の5回平均と数字記憶力を測定し、自己ベストをブラウザーに保存して友達と比べます。'],
  zh: ['反应速度与记忆力测试', '测量 5 次反应速度平均值和数字记忆力，在浏览器保存最佳成绩并与朋友比较。'],
};
const browserToolMetadata = {
  ko: [
    ['WebSocket 클라이언트', '브라우저에서 WebSocket 서버에 직접 연결해 텍스트를 보내고 응답과 연결 로그를 확인합니다.'],
    ['브라우저 알림·토스트·알람 테스트', '브라우저 알림 권한, 화면 토스트와 타이머 알람을 테스트합니다.'],
  ],
  en: [
    ['WebSocket Client', 'Connect to a WebSocket server, send text messages, and inspect replies and connection logs.'],
    ['Notification, Toast & Alarm Tester', 'Test browser notification permission, on-page toasts, and timed alarms.'],
  ],
  ja: [
    ['WebSocketクライアント', 'WebSocketサーバーに接続し、テキスト送信、応答、接続ログを確認します。'],
    ['通知・トースト・アラームテスト', 'ブラウザー通知の権限、画面内トースト、タイマーアラームをテストします。'],
  ],
  zh: [
    ['WebSocket 客户端', '连接 WebSocket 服务器、发送文本并查看响应与连接日志。'],
    ['通知、Toast 与闹钟测试器', '测试浏览器通知权限、页面 Toast 和定时闹钟。'],
  ],
};

export function homeMetadata(locale = 'ko') {
  const [title, description] = home[locale] || home.ko;
  const href = publicPath(locale === 'ko' ? '/ko/' : `/${locale}/`);
  return { title, description, alternates: { canonical: href, languages: Object.fromEntries(locales.map((lang) => [lang, `${siteOrigin}${publicPath(`/${lang}/`)}`]).concat([['x-default', `${siteOrigin}${publicPath('/ko/')}`]])) } };
}

export function toolMetadata(locale = 'ko', slug) {
  const toolIndex = toolSlugs.indexOf(slug);
  if (toolIndex < 0) return homeMetadata(locale);
  const [name, description] = slug === 'morse-code' ? morseMetadata[locale] : slug === 'currency-converter' ? currencyMetadata[locale] : slug === 'unit-converter' ? unitMetadata[locale] : slug === 'jwt-tool' ? jwtMetadata[locale] : slug === 'db-meter' ? dbMeterMetadata[locale] : slug === 'tts' ? ttsMetadata[locale] : slug === 'reaction-memory-test' ? reactionMemoryMetadata[locale] : slug === 'websocket-client' ? browserToolMetadata[locale][0] : slug === 'notification-tester' ? browserToolMetadata[locale][1] : toolIndex >= 36 ? imageMetadata[locale][toolIndex - 36] : toolIndex >= 25 ? addedMetadataAt(locale, toolIndex) : tools[locale]?.[toolIndex] || tools.ko[toolIndex];
  const path = publicPath(`/${locale}/tools/${slug}/`);
  return { title: `${name} — Tools`, description, alternates: { canonical: path, languages: Object.fromEntries(locales.map((lang) => [lang, `${siteOrigin}${publicPath(`/${lang}/tools/${slug}/`)}`]).concat([['x-default', `${siteOrigin}${publicPath(`/ko/tools/${slug}/`)}`]])) }, openGraph: { title: name, description, url: `${siteOrigin}${path}`, siteName: 'Tools', locale } };
}
