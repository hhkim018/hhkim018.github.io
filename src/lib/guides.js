import { locales, siteBasePath, siteOrigin } from './seo.js';

export const guideSlugs = ['barcode-formats', 'qr-code-basics'];

const sources = {
  barcode: [
    { label: 'GS1: retail product barcodes and trade item identification', href: 'https://support.gs1.org/support/solutions/articles/43000734137-what-is-the-gs1-barcode-commonly-used-for-trade-item-identification-' },
    { label: 'GS1: where GTIN barcodes are used', href: 'https://support.gs1.org/support/solutions/articles/43000734104-which-barcodes-are-used-to-represent-gtins-' },
    { label: 'GS1: GS1-128 format and Application Identifiers', href: 'https://support.gs1.org/support/solutions/articles/43000734455-what-is-the-format-of-gs1-128-' },
    { label: 'JsBarcode: supported formats and EAN-13 example', href: 'https://github.com/lindell/JsBarcode' },
  ],
  qr: [
    { label: 'ISO/IEC 18004:2024 — QR Code symbology specification', href: 'https://www.iso.org/standard/83389.html' },
    { label: 'DENSO WAVE: QR Code features and encoded data', href: 'https://www.denso-wave.com/en/adcd/fundamental/2dcode/qrc/' },
    { label: 'GS1: QR Code within retail and GS1 data standards', href: 'https://ref.gs1.org/standards/genspecs/' },
  ],
};

const content = {
  ko: {
    'barcode-formats': {
      title: 'EAN-13과 CODE128: 어떤 바코드를 써야 할까요?', description: 'EAN-13과 일반 Code 128의 차이, 입력 규칙과 사용처를 예시로 설명합니다.', lead: 'EAN-13은 주로 소매 상품의 GTIN을 표현하는 숫자형 바코드입니다. Code 128은 주문 번호나 내부 식별자처럼 ASCII 문자와 숫자를 담는 범용 바코드입니다. 이 생성기는 두 형식을 만들지만 GS1 상품번호를 발급하지는 않습니다.', table: { headers: ['형식', '입력 규칙', '주로 쓰는 곳', '이 도구의 예시'], rows: [['EAN-13', '숫자 12자리(검사 숫자를 자동 계산) 또는 유효한 검사 숫자가 포함된 13자리', '소매 상품 식별과 POS 스캔. 실제 판매 상품에는 GS1에서 할당받은 GTIN을 사용하세요.', '400638133393 → 4006381333931'], ['CODE128', '출력 가능한 ASCII 문자와 숫자. 앱은 최대 글자 수를 따로 제한하지 않지만 내용이 길수록 바코드 폭이 넓어집니다.', '주문번호, 자산 태그, 내부 라벨, 물류 데이터', 'ORDER-2048 → 문자형 Code 128']] },
      sections: [
        { heading: '필요한 형식 선택하기', paragraphs: ['일반 매장 계산대에서 상품을 식별해야 한다면 상품에 할당된 GTIN-13을 EAN-13으로 표현하는 것이 일반적입니다. 반면 주문번호나 사내 자산번호처럼 문자와 숫자를 섞어 담으려면 Code 128이 더 적합합니다.', '일반 Code 128과 GS1-128은 같은 이름의 형식이 아닙니다. GS1-128은 시작부의 FNC1과 Application Identifier 등 GS1 데이터 규칙이 필요합니다. 이 페이지는 일반 Code 128을 만들며 GS1-128 데이터 문법은 만들지 않습니다.'] },
        { heading: 'EAN-13 만들기와 입력 제한', paragraphs: ['바코드 도구에서 EAN-13을 선택하고 숫자 12자리 또는 13자리를 입력한 뒤 생성을 누르세요. 12자리를 입력하면 이 도구가 마지막 검사 숫자를 계산합니다. 13자리를 입력하면 검사 숫자가 맞는지 검증합니다. 공백이나 문자는 허용하지 않습니다.', '검사 숫자가 맞다는 것만으로 판매 가능한 GTIN이 발급되는 것은 아닙니다. 소매 상품에 사용할 번호는 GS1에서 할당받은 GTIN인지 확인하세요. 예시 `400638133393`은 검사 숫자 `1`이 붙어 `4006381333931`이 됩니다.'] },
        { heading: 'CODE128 만들기와 출력 팁', paragraphs: ['CODE128을 선택하고 `ORDER-2048`처럼 출력 가능한 ASCII 텍스트를 입력하세요. 유니코드 문자는 생성하지 않으며, 앱에 정해진 글자 수 상한은 없습니다. 단, 너무 긴 데이터는 인쇄 시 폭이 커져 스캐너가 읽기 어려울 수 있으니 실제 크기로 출력해 확인하세요.', '이 도구는 SVG 바코드 파일을 내려받습니다. 내려받은 파일이나 기기의 카메라로 읽기 전에 인쇄 크기, 대비, 여백을 확인하세요.'] },
      ],
      faqs: [
        { q: '12자리 EAN-13 입력이 가능한가요?', a: '가능합니다. 생성기가 체크 숫자를 계산해 13자리 기호를 만듭니다. 13자리를 입력하면 체크 숫자가 일치해야 합니다. 유효한 체크 숫자는 GS1 GTIN 할당을 대신하지 않습니다.' },
        { q: 'Code 128을 상품 계산대에서 쓸 수 있나요?', a: '계산대가 Code 128을 지원한다고 가정할 수 없습니다. 소매 POS 상품 식별에는 일반적으로 EAN/UPC 계열 바코드를 사용합니다. 판매 상품에는 해당 상품의 GS1 GTIN을 사용하세요.' },
        { q: '이 도구가 GS1-128을 생성하나요?', a: '아니요. 생성기는 일반 CODE128만 지원합니다. GS1-128에는 FNC1과 GS1 Application Identifier에 맞는 데이터 구조가 필요합니다.' },
      ],
      cta: '바코드 생성기로 이동', privacy: '', relatedTitle: '함께 읽기', related: [['qr-code-basics', 'QR 코드 만드는 법과 지원 형식']], sources: sources.barcode,
    },
    'qr-code-basics': {
      title: 'QR 코드 만드는 법과 지원 형식', description: 'QR 코드 생성·스캔 방법, PNG 형식, 입력 제한과 개인정보 처리 방식을 안내합니다.', lead: 'QR 코드는 URL이나 텍스트 같은 데이터를 2차원 기호로 표현합니다. QR 코드 표준은 ISO/IEC 18004:2024에 정의되어 있으며, 이 도구는 입력 문자열을 브라우저에서 QR 이미지로 인코딩합니다.',
      sections: [
        { heading: 'QR 코드 만들기', paragraphs: ['QR 도구에 전체 URL 또는 텍스트를 입력하면 미리보기가 자동으로 갱신됩니다. 다운로드를 눌러 300 × 300 픽셀 PNG를 저장하고, 게시하기 전에 다른 기기의 카메라나 업로드 스캔 기능으로 실제로 읽히는지 확인하세요.', 'URL을 넣으면 QR에는 URL 문자열만 들어갑니다. 해당 웹사이트의 내용이나 파일이 QR 이미지 안에 포함되는 것은 아닙니다. Wi-Fi·연락처 형식을 미리 채워 주는 템플릿은 없지만, 필요한 규격 문자열을 직접 입력하면 일반 텍스트로 인코딩할 수 있습니다.'] },
        { heading: '지원 입력과 스캔 형식', paragraphs: ['생성기는 URL을 포함한 일반 문자열을 지원하며 한글을 포함한 유니코드 입력을 브라우저에서 UTF-8로 인코딩합니다. QR의 최대 용량은 데이터 종류와 기호 버전에 따라 달라지므로 고정 글자 수를 약속하지 않습니다. 내용이 길어지면 패턴이 조밀해져 인쇄·화면에서 읽기 어려워질 수 있습니다.', 'PNG 이미지 또는 카메라 스캔은 QR 외에도 EAN-13, EAN-8, UPC, CODE128, CODE39, CODE93, Codabar, ITF, Data Matrix, Aztec, PDF417 형식을 읽을 수 있습니다. 주변 환경, 초점, 이미지 품질에 따라 인식되지 않을 수 있습니다.'] },
        { heading: '데이터와 개인정보', paragraphs: ['입력한 내용은 이 브라우저 안에서 QR 이미지로 만들어집니다. 선택한 이미지와 카메라 프레임도 브라우저의 디코더가 기기 안에서 읽으며, 도구 입력·이미지·카메라 프레임을 서버로 업로드하는 코드나 저장 기능은 없습니다. 페이지와 앱 파일을 내려받기 위한 웹사이트 요청은 발생하지만 도구 데이터는 요청에 포함하지 않습니다. 카메라 스캔은 브라우저 권한이 필요하며 HTTPS 또는 localhost에서 사용할 수 있습니다.'] },
      ],
      faqs: [
        { q: 'QR 코드가 URL을 열어 주나요?', a: 'QR 코드는 입력한 URL을 담습니다. 스캐너가 읽은 뒤 사용자가 링크를 선택하거나 기기의 카메라가 링크 열기를 제안할 수 있습니다. QR 이미지 자체에 웹페이지가 저장되지는 않습니다.' },
        { q: 'QR 이미지는 어떤 형식으로 받을 수 있나요?', a: '현재 생성기는 PNG 형식으로 제공합니다. 저장된 이미지를 다른 QR 스캐너로 읽어 배포 전 확인하세요.' },
        { q: '입력 내용이 서버로 전송되나요?', a: '아니요. 이 구현에서는 생성과 이미지·카메라 스캔이 브라우저 안에서 처리됩니다. 도구 데이터는 업로드하거나 저장하지 않습니다.' },
      ],
      cta: 'QR 코드 생성기로 이동', privacy: '페이지에서 입력한 텍스트, 선택한 이미지, 카메라 프레임은 생성·스캔 과정에서 기기를 벗어나지 않습니다. 사이트 파일을 내려받기 위한 일반 페이지 요청은 별도로 발생합니다.', relatedTitle: '함께 읽기', related: [['barcode-formats', 'EAN-13과 CODE128의 차이']], sources: sources.qr,
    },
  },
  en: {
    'barcode-formats': {
      title: 'EAN-13 vs CODE128: which barcode should you use?', description: 'Compare EAN-13 and general Code 128, with input rules, examples, and common uses.', lead: 'EAN-13 is a numeric barcode commonly used to represent a GTIN for retail trade items. Code 128 is a general-purpose symbol for ASCII text such as order IDs. This generator creates both symbol formats; it does not issue GS1 product numbers.', table: { headers: ['Format', 'Input rules', 'Common use', 'Example here'], rows: [['EAN-13', '12 digits (check digit added) or 13 digits with a valid check digit', 'Retail trade item identification and POS scanning. Use a GTIN assigned by GS1 for a real product.', '400638133393 → 4006381333931'], ['CODE128', 'Printable ASCII text and numbers. No app character cap; longer data creates a wider symbol.', 'Order IDs, asset tags, internal labels, and logistics data', 'ORDER-2048 → Code 128 symbol']] },
      sections: [
        { heading: 'Choose the right format', paragraphs: ['For a product that needs identification at a retail checkout, EAN-13 carrying the product’s assigned GTIN-13 is common. For internal IDs such as an order number or asset tag that can contain both letters and digits, general Code 128 is more flexible.', 'General Code 128 is not the same data format as GS1-128. GS1-128 requires FNC1 and GS1 data rules such as Application Identifiers. This page generates regular Code 128 and does not construct GS1-128 data.'] },
        { heading: 'Create an EAN-13 barcode', paragraphs: ['Choose EAN-13 in the barcode tool and enter 12 or 13 digits. With 12 digits, the generator calculates the final check digit. With 13 digits, it validates that check digit. Letters, spaces, and punctuation are rejected.', 'A correct check digit does not mean that GS1 has assigned the number. For retail use, confirm that the GTIN belongs to your product. In the example, `400638133393` receives check digit `1`, producing `4006381333931`.'] },
        { heading: 'Create a CODE128 barcode', paragraphs: ['Choose CODE128 and enter printable ASCII text such as `ORDER-2048`. This generator rejects Unicode characters. It has no fixed character-count limit, but long data makes a wider barcode that may be harder to print and scan; test it at the intended size.', 'Download the result as SVG. Check print size, contrast, and clear space before putting it on a label.'] },
      ],
      faqs: [
        { q: 'Can I enter only 12 digits for EAN-13?', a: 'Yes. The generator calculates the check digit and creates a 13-digit symbol. If you enter 13 digits, the check digit must be valid. A valid check digit is not a substitute for a GS1-assigned GTIN.' },
        { q: 'Can I use Code 128 at a retail checkout?', a: 'Do not assume a checkout scanner accepts Code 128. Retail POS product identification generally uses EAN/UPC symbols. Use the product’s assigned GS1 GTIN for a retail item.' },
        { q: 'Does this generator create GS1-128?', a: 'No. It creates general CODE128. GS1-128 requires FNC1 and data structured with GS1 Application Identifiers.' },
      ],
      cta: 'Open the barcode generator', privacy: '', relatedTitle: 'Related guide', related: [['qr-code-basics', 'How to make a QR code']], sources: sources.barcode,
    },
    'qr-code-basics': {
      title: 'How to make a QR code and what it supports', description: 'Learn how to create and scan QR codes, supported formats, input limits, and privacy behavior.', lead: 'A QR Code represents data such as a URL or text in a two-dimensional symbol. The current QR Code symbology is specified by ISO/IEC 18004:2024. This tool encodes the string you enter into a QR image in your browser.',
      sections: [
        { heading: 'Create a QR code', paragraphs: ['Enter a complete URL or text in the QR tool; the preview updates automatically. Download the 300 × 300 pixel PNG, then test it with another device or the image scanner before publishing.', 'When you encode a URL, the QR contains that URL string. It does not contain the website’s page or files. There are no prefilled Wi-Fi or contact-card templates, but you can enter a correctly formatted payload as plain text.'] },
        { heading: 'Supported input and scan formats', paragraphs: ['The generator accepts ordinary text, including URLs, and encodes Unicode text as UTF-8 in the browser. QR capacity depends on data and symbol version, so this tool does not promise a fixed character limit. Longer content creates a denser pattern that may be harder to print or scan.', 'Image and camera scanning can read QR, EAN-13, EAN-8, UPC, CODE128, CODE39, CODE93, Codabar, ITF, Data Matrix, Aztec, and PDF417. Recognition depends on focus, lighting, and image quality.'] },
        { heading: 'Data and privacy', paragraphs: ['Your text is encoded to an image in this browser. The browser decoder also reads the selected image and camera frames locally. The app contains no upload or storage step for tool text, images, or camera frames. Normal site requests still load the page and app files, but they do not include tool data. Camera scanning requires permission and works on HTTPS or localhost.'] },
      ],
      faqs: [
        { q: 'Does a QR code open a URL by itself?', a: 'The QR stores the URL you entered. A scanner may show a link for you to open, or a phone camera may offer to open it. The QR image does not store the web page itself.' },
        { q: 'What image format can I download?', a: 'The generator currently downloads PNG. Scan the saved image with another reader before distributing it.' },
        { q: 'Is the text sent to a server?', a: 'No. Generation and image or camera decoding happen in the browser. The app does not upload or save the tool data.' },
      ],
      cta: 'Open the QR code generator', privacy: 'Text entered here, selected images, and camera frames stay on the device during generation and scanning. Ordinary page requests still load the site files.', relatedTitle: 'Related guide', related: [['barcode-formats', 'EAN-13 vs CODE128']], sources: sources.qr,
    },
  },
  ja: {
    'barcode-formats': {
      title: 'EAN-13とCODE128の違いと選び方', description: 'EAN-13と一般的なCode 128の違い、入力ルール、用途を例とともに説明します。', lead: 'EAN-13は小売商品のGTINを表すためによく使われる数字のみのバーコードです。Code 128は注文番号などのASCII文字列を格納できる汎用バーコードです。この生成器は記号を作成しますが、GS1の商品番号は発行しません。', table: { headers: ['形式', '入力ルール', 'よく使う用途', '入力例'], rows: [['EAN-13', '数字12桁（チェックデジットを自動追加）または有効なチェックデジットを含む13桁', '小売商品の識別とPOSスキャン。実商品にはGS1から割り当てられたGTINを使用します。', '400638133393 → 4006381333931'], ['CODE128', '印字可能なASCII文字と数字。固定の文字数上限はありませんが、長いほど幅が広くなります。', '注文番号、資産タグ、社内ラベル、物流データ', 'ORDER-2048 → Code 128']] },
      sections: [
        { heading: '用途に合わせて選ぶ', paragraphs: ['店頭レジで商品を識別する場合は、商品に割り当てられたGTIN-13をEAN-13で表す方法が一般的です。英数字を含む注文番号や社内資産番号には、一般的なCode 128が便利です。', '一般的なCode 128とGS1-128は同じデータ形式ではありません。GS1-128ではFNC1やApplication IdentifierなどGS1の規則が必要です。このページの生成器は通常のCode 128を作成し、GS1-128のデータ構造は作りません。'] },
        { heading: 'EAN-13の作り方と入力制限', paragraphs: ['バーコードツールでEAN-13を選び、数字を12桁または13桁入力します。12桁の場合は最後のチェックデジットを自動計算し、13桁の場合はチェックデジットを検証します。文字や空白は入力できません。', 'チェックデジットが正しくても、GS1が番号を割り当てたことにはなりません。販売商品には正規に割り当てられたGTINを使ってください。例の`400638133393`にはチェックデジット`1`が付いて`4006381333931`になります。'] },
        { heading: 'CODE128の作り方と印刷の注意', paragraphs: ['CODE128を選び、`ORDER-2048`のような印字可能なASCII文字列を入力します。Unicode文字は使えません。固定の文字数上限はありませんが、長いデータはバーコード幅が広くなり、読み取りにくくなる場合があります。実際の印刷サイズで確認してください。', '出力はSVGで保存できます。ラベルに使う前にサイズ、コントラスト、余白を確認しましょう。'] },
      ],
      faqs: [{ q: 'EAN-13に12桁だけ入力できますか？', a: 'できます。生成器がチェックデジットを計算して13桁の記号を作ります。13桁入力の場合はチェックデジットが正しい必要があります。' }, { q: 'Code 128を店頭レジで使えますか？', a: 'レジがCode 128に対応しているとは限りません。小売POSの商品識別には通常EAN/UPCが使われます。販売商品にはGS1 GTINを使用してください。' }, { q: 'このツールはGS1-128を生成しますか？', a: 'いいえ。通常のCODE128を生成します。GS1-128にはFNC1とGS1 Application Identifierに沿ったデータ構造が必要です。' }],
      cta: 'バーコード生成器を開く', privacy: '', relatedTitle: '関連ガイド', related: [['qr-code-basics', 'QRコードの作り方']], sources: sources.barcode,
    },
    'qr-code-basics': {
      title: 'QRコードの作り方と対応形式', description: 'QRコードの作成・読み取り方法、入力内容、画像形式、プライバシーについて説明します。', lead: 'QRコードはURLやテキストなどのデータを二次元の記号で表します。QRコードの仕様はISO/IEC 18004:2024で定義されています。このツールは入力した文字列をブラウザー内でQR画像に変換します。',
      sections: [{ heading: 'QRコードを作成する', paragraphs: ['QRツールにURLまたはテキストを入力するとプレビューが更新されます。300 × 300ピクセルのPNGを保存し、公開する前に別の端末や画像スキャナーで読み取れることを確認してください。', 'URLを入力した場合、QRに入るのはURL文字列です。Webページの内容やファイルが画像に含まれるわけではありません。Wi-Fiや連絡先のテンプレートはありませんが、形式に合った文字列を入力すればテキストとして符号化できます。'] }, { heading: '入力と読み取りの対応形式', paragraphs: ['URLを含む通常の文字列を入力できます。日本語を含むUnicode文字列はブラウザー内でUTF-8として処理します。QRの容量はデータとシンボルのバージョンで変わるため、固定の文字数上限は表示していません。長文はパターンが細かくなり、印刷や読み取りが難しくなることがあります。', '画像・カメラの読み取りはQR、EAN-13、EAN-8、UPC、CODE128、CODE39、CODE93、Codabar、ITF、Data Matrix、Aztec、PDF417に対応します。焦点や照明、画像品質によって読み取れない場合があります。'] }, { heading: 'データとプライバシー', paragraphs: ['入力文字列からの画像生成と選択画像・カメラフレームの読み取りはブラウザー内で行います。ツール入力、画像、カメラ映像をサーバーへアップロードまたは保存する処理はありません。ページとアプリのファイルを取得する通常のサイト通信は発生しますが、ツールデータは含みません。カメラは許可が必要で、HTTPSまたはlocalhostで利用できます。'] }],
      faqs: [{ q: 'QRコードを読み取ると自動でURLが開きますか？', a: 'QRには入力したURLが格納されます。読み取り後にリンクを開く操作が必要な場合があります。WebページそのものはQR画像に保存されません。' }, { q: 'ダウンロードできる画像形式は？', a: '現在はPNG形式です。配布前に別のリーダーで読み取りを確認してください。' }, { q: '入力内容はサーバーに送信されますか？', a: 'いいえ。生成と画像・カメラの読み取りはブラウザー内で処理され、ツールデータをアップロード・保存しません。' }],
      cta: 'QRコード生成器を開く', privacy: '入力したテキスト、選択した画像、カメラフレームは生成・読み取り中も端末内で処理します。サイトファイルの取得通信は別途発生します。', relatedTitle: '関連ガイド', related: [['barcode-formats', 'EAN-13とCODE128の違い']], sources: sources.qr,
    },
  },
  zh: {
    'barcode-formats': {
      title: 'EAN-13 与 CODE128：如何选择条码？', description: '通过示例说明 EAN-13 与通用 Code 128 的差别、输入规则和使用场景。', lead: 'EAN-13 是常用于零售商品 GTIN 的纯数字条码。Code 128 是通用条码，可编码订单号等 ASCII 文本。本生成器可以生成这两种符号，但不会分配 GS1 商品编号。', table: { headers: ['格式', '输入规则', '常见用途', '本工具示例'], rows: [['EAN-13', '12 位数字（自动补校验位），或含有效校验位的 13 位数字', '零售商品识别与 POS 扫描。实际销售商品应使用 GS1 分配的 GTIN。', '400638133393 → 4006381333931'], ['CODE128', '可打印 ASCII 字符与数字。没有固定字数上限；内容越长，条码越宽。', '订单号、资产标签、内部标签和物流数据', 'ORDER-2048 → Code 128 条码']] },
      sections: [{ heading: '按用途选择格式', paragraphs: ['如果需要在零售收银台识别商品，通常用 EAN-13 表示分配给该商品的 GTIN-13。订单号或资产编号等包含字母和数字的内部编号，更适合通用 Code 128。', '通用 Code 128 与 GS1-128 不是同一种数据格式。GS1-128 需要 FNC1 以及 Application Identifier 等 GS1 数据规则。本页面只生成普通 Code 128，不会构造 GS1-128 数据。'] }, { heading: 'EAN-13 的制作方法与输入限制', paragraphs: ['在条码工具中选择 EAN-13，输入 12 或 13 位数字。输入 12 位时，生成器会计算最后一位校验位；输入 13 位时，会验证校验位。不能输入字母、空格或标点。', '校验位正确并不代表该号码已由 GS1 分配。零售商品请确认使用的是正式分配的 GTIN。示例 `400638133393` 会补上校验位 `1`，得到 `4006381333931`。'] }, { heading: 'CODE128 的制作方法与打印提示', paragraphs: ['选择 CODE128 并输入 `ORDER-2048` 这类可打印 ASCII 文本。本工具不接受 Unicode 字符，没有设置固定字数上限；但数据太长会使条码变宽，可能更难打印和扫描，请按实际尺寸测试。', '生成结果可下载为 SVG。用于标签前请检查打印尺寸、对比度和留白。'] }],
      faqs: [{ q: 'EAN-13 可以只输入 12 位吗？', a: '可以。生成器会计算校验位并生成 13 位符号。如果输入 13 位，校验位必须正确。有效校验位不能代替 GS1 分配的 GTIN。' }, { q: 'Code 128 能用于零售收银吗？', a: '不能假设收银扫描器支持 Code 128。零售 POS 商品识别通常使用 EAN/UPC。实际销售商品请使用其 GS1 GTIN。' }, { q: '这个生成器支持 GS1-128 吗？', a: '不支持。它生成通用 CODE128。GS1-128 需要 FNC1 和按 GS1 Application Identifier 组织的数据。' }],
      cta: '打开条码生成器', privacy: '', relatedTitle: '相关指南', related: [['qr-code-basics', '如何制作二维码']], sources: sources.barcode,
    },
    'qr-code-basics': {
      title: '如何制作二维码及支持格式', description: '了解二维码的生成和扫描步骤、输入限制、PNG 输出与隐私处理方式。', lead: '二维码使用二维符号表示网址或文本等数据。当前 QR Code 符号规范由 ISO/IEC 18004:2024 定义。本工具在浏览器中将输入字符串编码成二维码图片。',
      sections: [{ heading: '制作二维码', paragraphs: ['在二维码工具中输入完整网址或文本，预览会自动更新。下载 300 × 300 像素 PNG，发布前请用另一台设备或图片扫描功能确认能正常读取。', '输入网址时，二维码里保存的是网址字符串，不会包含网页内容或文件。本工具没有 Wi-Fi 或联系人模板，但可以把符合格式的字符串作为普通文本编码。'] }, { heading: '支持的输入和扫描格式', paragraphs: ['生成器接受包含网址的普通字符串，并在浏览器中以 UTF-8 编码 Unicode 文本。二维码容量取决于数据类型和符号版本，因此不承诺固定字符数。内容越长，图案越密，打印或扫描可能越困难。', '图片和相机扫描支持 QR、EAN-13、EAN-8、UPC、CODE128、CODE39、CODE93、Codabar、ITF、Data Matrix、Aztec 和 PDF417。识别效果会受焦点、光线和图片质量影响。'] }, { heading: '数据与隐私', paragraphs: ['输入文本在当前浏览器中生成二维码。所选图片和相机画面也由浏览器解码器在设备本地读取。应用没有上传或保存工具文本、图片或相机画面的步骤。加载网页和应用文件会产生正常的网站请求，但不会包含工具数据。相机扫描需要权限，并要求 HTTPS 或 localhost。'] }],
      faqs: [{ q: '扫描二维码会自动打开网址吗？', a: '二维码保存的是输入的网址。扫描器可能显示链接供你选择，手机相机也可能提示打开；网页本身并未保存在二维码图像中。' }, { q: '可以下载什么图片格式？', a: '目前生成器提供 PNG。分发前请用其他扫描器测试保存的图片。' }, { q: '输入内容会发送到服务器吗？', a: '不会。生成和图片或相机扫描都在浏览器中完成，应用不会上传或保存工具数据。' }],
      cta: '打开二维码生成器', privacy: '输入文本、选取的图片和相机画面在生成与扫描时留在设备本地。加载网站文件的常规请求仍会发生。', relatedTitle: '相关指南', related: [['barcode-formats', 'EAN-13 与 CODE128 的差异']], sources: sources.qr,
    },
  },
};

export function getGuide(locale, slug) {
  return content[locale]?.[slug] || null;
}

export function getGuideMetadata(locale, slug) {
  const guide = getGuide(locale, slug);
  if (!guide) return {};
  const path = `${siteBasePath}/${locale}/guides/${slug}/`;
  return { title: `${guide.title} — Tools`, description: guide.description, alternates: { canonical: path, languages: Object.fromEntries(locales.map((lang) => [lang, `${siteOrigin}${siteBasePath}/${lang}/guides/${slug}/`]).concat([['x-default', `${siteOrigin}${siteBasePath}/ko/guides/${slug}/`]])) }, openGraph: { title: guide.title, description: guide.description, url: `${siteOrigin}${path}`, siteName: 'Tools', locale } };
}
