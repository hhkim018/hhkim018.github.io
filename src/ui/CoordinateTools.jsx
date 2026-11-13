'use client';

import { useState } from 'react';
import proj4 from 'proj4';
import { ArrowLeftRight, Copy } from 'lucide-react';

const systems = {
  'EPSG:4326': { label: 'WGS84 (EPSG:4326)', geographic: true },
  'EPSG:4737': { label: 'KGD2002 (EPSG:4737)', geographic: true, definition: '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs' },
  'EPSG:3857': { label: 'Web Mercator (EPSG:3857)' },
  'EPSG:32651': { label: 'WGS84 / UTM 51N (EPSG:32651)', definition: '+proj=utm +zone=51 +datum=WGS84 +units=m +no_defs' },
  'EPSG:32652': { label: 'WGS84 / UTM 52N (EPSG:32652)', definition: '+proj=utm +zone=52 +datum=WGS84 +units=m +no_defs' },
  'EPSG:32653': { label: 'WGS84 / UTM 53N (EPSG:32653)', definition: '+proj=utm +zone=53 +datum=WGS84 +units=m +no_defs' },
  'EPSG:5179': { label: 'KGD2002 / Unified CS (EPSG:5179)', definition: '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5180': { label: 'KGD2002 / West Belt (EPSG:5180)', definition: '+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5181': { label: 'KGD2002 / Central Belt (EPSG:5181)', definition: '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5182': { label: 'KGD2002 / Central Belt Jeju (EPSG:5182)', definition: '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5183': { label: 'KGD2002 / East Belt (EPSG:5183)', definition: '+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5184': { label: 'KGD2002 / East Sea Belt (EPSG:5184)', definition: '+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5185': { label: 'KGD2002 / West Belt 2010 (EPSG:5185)', definition: '+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5186': { label: 'KGD2002 / Central Belt 2010 (EPSG:5186)', definition: '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5187': { label: 'KGD2002 / East Belt 2010 (EPSG:5187)', definition: '+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs' },
  'EPSG:5188': { label: 'KGD2002 / East Sea Belt 2010 (EPSG:5188)', definition: '+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs' },
};
Object.entries(systems).forEach(([code, system]) => { if (system.definition) proj4.defs(code, system.definition); });

export const coordinateMeta = {
  ko: [['좌표 변환기', '출발지와 도착지 좌표계를 선택해 위경도와 평면 좌표를 변환합니다.', '좌표계를 선택하고 위도·경도 또는 X·Y 값을 입력하세요.', 'EPSG:4326 · 37.5665, 126.9780', 'EPSG:3857 · X 14135126.30, Y 4518366.51'], ['좌표 형식 확인기', '입력한 좌표의 표기 형식과 가능한 좌표계 후보를 확인합니다.', '쉼표로 구분된 좌표 쌍이나 방위가 포함된 도분초를 입력하세요.', '37.5665, 126.9780', 'EPSG:4326 등 가능']],
  en: [['Coordinate Converter', 'Convert latitude and longitude or projected coordinates between selected coordinate systems.', 'Select source and destination systems and enter latitude and longitude or X and Y.', 'EPSG:4326 · 37.5665, 126.9780', 'EPSG:3857 · X 14135126.30, Y 4518366.51'], ['Coordinate Format Identifier', 'Inspect the notation and possible coordinate system candidates for a coordinate pair.', 'Enter a comma-separated pair or degrees, minutes and seconds with hemisphere letters.', '37.5665, 126.9780', 'EPSG:4326 or another geographic CRS']],
  ja: [['座標変換', '変換元と変換先の座標系を選び、緯度経度と平面座標を変換します。', '座標系を選び、緯度・経度または X・Y を入力します。', 'EPSG:4326 · 37.5665, 126.9780', 'EPSG:3857 · X 14135126.30, Y 4518366.51'], ['座標形式の確認', '座標の表記形式と座標系の候補を確認します。', 'カンマ区切りの座標または方位付きの度分秒を入力します。', '37.5665, 126.9780', '十進度の緯度経度の候補']],
  zh: [['坐标转换器', '选择源坐标系和目标坐标系，转换经纬度或平面坐标。', '选择坐标系并输入经纬度或 X、Y。', 'EPSG:4326 · 37.5665, 126.9780', 'EPSG:3857 · X 14135126.30, Y 4518366.51'], ['坐标格式识别', '检查坐标的表示格式及可能的坐标系。', '输入以逗号分隔的坐标，或带方位字母的度分秒坐标。', '37.5665, 126.9780', '可能是十进制度经纬度']],
};
const copy = {
  ko: { from: '출발 좌표계', to: '도착 좌표계', lat: '위도 (°)', lon: '경도 (°)', x: 'X / 동쪽 방향 (m)', y: 'Y / 북쪽 방향 (m)', result: '변환 결과', swap: '좌표계와 결과 바꾸기', invalid: '유효한 숫자와 좌표 범위를 확인해 주세요.', mercator: 'Web Mercator는 위도 약 ±85.05112878°까지만 지원합니다.', note: '위경도는 위도, 경도 순서이고 평면 좌표는 X(동쪽), Y(북쪽) 순서이며 단위는 미터입니다. 국내 EPSG 정의의 공식 축 순서는 다를 수 있습니다. 좌표계의 사용 지역을 확인하세요. KGD2002와 WGS84는 근사 변환하므로 정밀 측량에는 공식 변환 기준을 확인하세요.', input: '확인할 좌표', placeholder: '예: 37.5665, 126.9780 또는 37°33′59.4″N, 126°58′40.8″E', identify: '판별 결과', empty: '좌표 쌍을 입력하세요.', unknown: '지원하는 형식으로 인식하지 못했습니다. 숫자 두 개 또는 방위가 포함된 도분초를 입력하세요.', decimal: '십진 도 위경도 가능', reversed: '십진 도 경도, 위도 순서 가능', projected: '미터 단위 평면 좌표 가능', dms: '도분초 (DMS) 위경도', ambiguous: '표시된 EPSG는 가능한 예시입니다. 숫자만으로 정확한 좌표계, 단위나 좌표 순서를 확정할 수 없습니다. 원본 데이터의 좌표계 정보를 확인하세요.', copied: '복사 완료', copy: '복사' },
  en: { from: 'Source system', to: 'Destination system', lat: 'Latitude (°)', lon: 'Longitude (°)', x: 'X / easting (m)', y: 'Y / northing (m)', result: 'Converted coordinates', swap: 'Swap systems and result', invalid: 'Check the numbers and coordinate ranges.', mercator: 'Web Mercator supports latitudes up to approximately ±85.05112878°.', note: 'Geographic values are latitude, longitude. Projected values are X (easting), Y (northing) in meters. Korean EPSG definitions may specify northing first. KGD2002 and WGS84 are treated as approximately equivalent; consult official transformation guidance for surveying.', input: 'Coordinate to identify', placeholder: 'e.g. 37.5665, 126.9780 or 37°33′59.4″N, 126°58′40.8″E', identify: 'Identification', empty: 'Enter a coordinate pair.', unknown: 'Format not recognized. Enter two numbers or DMS with hemisphere letters.', decimal: 'Possible latitude, longitude', reversed: 'Possible longitude, latitude', projected: 'Possible projected coordinates', dms: 'Possible degrees, minutes and seconds', ambiguous: 'The listed EPSG codes are examples; numbers alone cannot establish the CRS, units, or axis order. Check the source metadata.', copied: 'Copied', copy: 'Copy' },
  ja: { from: '変換元', to: '変換先', lat: '緯度 (°)', lon: '経度 (°)', x: 'X / 東方向 (m)', y: 'Y / 北方向 (m)', result: '変換結果', swap: '座標系と結果を入れ替える', invalid: '数値と座標の範囲を確認してください。', mercator: 'Web Mercator の対応緯度は約 ±85.05112878° までです。', note: '緯度、経度の順に入力します。平面座標は X（東）、Y（北）の順で単位はメートルです。測量には公式の変換基準を確認してください。', input: '確認する座標', placeholder: '例: 37.5665, 126.9780 または 37°33′59.4″N, 126°58′40.8″E', identify: '判別結果', empty: '座標を入力してください。', unknown: '形式を認識できません。2つの数値または方位付きの度分秒を入力してください。', decimal: '十進度の緯度・経度の可能性', reversed: '十進度の経度・緯度の可能性', projected: 'メートル単位の平面座標の可能性', dms: '度分秒 (DMS)', ambiguous: '数値だけでは測地系（EPSG）、単位、軸の順序を特定できません。元データの情報を確認してください。', copied: 'コピー済み', copy: 'コピー' },
  zh: { from: '源坐标系', to: '目标坐标系', lat: '纬度 (°)', lon: '经度 (°)', x: 'X / 东向 (m)', y: 'Y / 北向 (m)', result: '转换结果', swap: '交换坐标系和结果', invalid: '请检查数值和坐标范围。', mercator: 'Web Mercator 的纬度范围约为 ±85.05112878°。', note: '地理坐标按纬度、经度排列。平面坐标按 X（东向）、Y（北向）排列，单位为米。测量用途请核对官方转换标准。', input: '待识别坐标', placeholder: '例如 37.5665, 126.9780 或 37°33′59.4″N, 126°58′40.8″E', identify: '识别结果', empty: '请输入一对坐标。', unknown: '无法识别格式，请输入两个数字或带方位字母的度分秒。', decimal: '可能是十进制度纬度、经度', reversed: '可能是十进制度经度、纬度', projected: '可能是米制平面坐标', dms: '度分秒 (DMS)', ambiguous: '仅凭数字无法确定基准（EPSG）、单位或坐标顺序，请检查原始数据的坐标系信息。', copied: '已复制', copy: '复制' },
};

const numeric = (s) => /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s.trim()) ? Number(s) : NaN;
const format = (n, digits) => Number(n.toFixed(digits)).toString();
const LIMIT = 85.0511287798066;
const koreanSystemLabels = {
  'EPSG:4326': 'WGS84 위경도 (EPSG:4326)', 'EPSG:4737': '한국 측지계 2002 위경도 (EPSG:4737)', 'EPSG:3857': '웹 메르카토르 (EPSG:3857)',
  'EPSG:5179': '한국 통합좌표계 (EPSG:5179)', 'EPSG:5180': '한국 서부원점 (EPSG:5180)', 'EPSG:5181': '한국 중부원점 (EPSG:5181)',
  'EPSG:5182': '한국 중부원점 제주 (EPSG:5182)', 'EPSG:5183': '한국 동부원점 (EPSG:5183)', 'EPSG:5184': '한국 동해원점 (EPSG:5184)',
  'EPSG:5185': '한국 서부원점 2010 (EPSG:5185)', 'EPSG:5186': '한국 중부원점 2010 (EPSG:5186)', 'EPSG:5187': '한국 동부원점 2010 (EPSG:5187)', 'EPSG:5188': '한국 동해원점 2010 (EPSG:5188)',
};
const systemLabel = (id, locale) => (locale === 'ko' && koreanSystemLabels[id]) || systems[id].label || id;

export function CoordinateConverter({ locale }) {
  const c = copy[locale] || copy.ko;
  const [from, setFrom] = useState('EPSG:4326');
  const [to, setTo] = useState('EPSG:3857');
  const [first, setFirst] = useState('37.5665');
  const [second, setSecond] = useState('126.9780');
  const [copied, setCopied] = useState(false);
  let output = null, error = '';
  const a = numeric(first), b = numeric(second);
  if (!Number.isFinite(a) || !Number.isFinite(b) || (systems[from].geographic && (Math.abs(a) > 90 || Math.abs(b) > 180)) || (from === 'EPSG:3857' && (Math.abs(a) > 20037508.342789244 || Math.abs(b) > 20037508.342789244))) error = c.invalid;
  else {
    try {
      const xy = systems[from].geographic ? [b, a] : [a, b];
      const lonLat = proj4(from, 'EPSG:4326', xy);
      if (!lonLat.every(Number.isFinite) || Math.abs(lonLat[1]) > 90 || Math.abs(lonLat[0]) > 180) error = c.invalid;
      else if (to === 'EPSG:3857' && Math.abs(lonLat[1]) > LIMIT) error = c.mercator;
      else {
        const converted = proj4(from, to, xy);
        if (!converted.every(Number.isFinite)) error = c.invalid;
        else output = systems[to].geographic ? [format(converted[1], 8), format(converted[0], 8)] : converted.map((n) => format(n, 3));
      }
    } catch { error = c.invalid; }
  }
  const swap = () => { if (!output) return; setFrom(to); setTo(from); setFirst(output[0]); setSecond(output[1]); };
  const doCopy = async () => { try { await navigator.clipboard.writeText(output.join(', ')); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {} };
  return <div className="tool-stack">
    <div className="currency-pair"><label className="field"><span className="field-label">{c.from}</span><select value={from} onChange={(e) => setFrom(e.target.value)}>{Object.entries(systems).map(([id, s]) => <option key={id} value={id}>{systemLabel(id, locale)}</option>)}</select></label><button type="button" className="currency-swap" onClick={swap} disabled={!output} aria-label={c.swap} title={c.swap}><ArrowLeftRight size={16}/></button><label className="field"><span className="field-label">{c.to}</span><select value={to} onChange={(e) => setTo(e.target.value)}>{Object.entries(systems).map(([id, s]) => <option key={id} value={id}>{systemLabel(id, locale)}</option>)}</select></label></div>
    <div className="tool-grid-two"><label className="field"><span className="field-label">{systems[from].geographic ? c.lat : c.x}</span><input inputMode="decimal" value={first} onChange={(e) => setFirst(e.target.value)} /></label><label className="field"><span className="field-label">{systems[from].geographic ? c.lon : c.y}</span><input inputMode="decimal" value={second} onChange={(e) => setSecond(e.target.value)} /></label></div>
    <div className="result-panel" aria-live="polite"><div className="result-head"><span className="field-label">{c.result} · {to}</span>{output && <button type="button" className="button button-light" onClick={doCopy}><Copy size={14}/>{copied ? c.copied : c.copy}</button>}</div>{output ? <pre>{`${systems[to].geographic ? c.lat : c.x}: ${output[0]}\n${systems[to].geographic ? c.lon : c.y}: ${output[1]}`}</pre> : <p className="status is-error">{error}</p>}</div><p className="helper-text">{c.note}</p>
  </div>;
}

export function identifyCoordinates(value) {
  const trimmed = value.trim();
  if (!trimmed) return [];
  const dms = /^\s*(\d{1,3})\s*°\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*["″]\s*([NS])\s*[,;\s]+\s*(\d{1,3})\s*°\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*["″]\s*([EW])\s*$/i.exec(trimmed);
  if (dms) {
    const [, lat, lm, ls, , lon, om, os] = dms;
    if (+lm < 60 && +ls < 60 && +om < 60 && +os < 60 && +lat + +lm / 60 + +ls / 3600 <= 90 && +lon + +om / 60 + +os / 3600 <= 180) return ['dms'];
    return [];
  }
  const parts = trimmed.split(/\s*[,;]\s*|\s+/);
  if (parts.length !== 2) return [];
  const [a, b] = parts.map(numeric);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return [];
  const candidates = [];
  if (Math.abs(a) <= 90 && Math.abs(b) <= 180) candidates.push('decimal');
  if (Math.abs(a) <= 180 && Math.abs(b) <= 90) candidates.push('reversed');
  if (Math.abs(a) > 180 || Math.abs(b) > 180) candidates.push('projected');
  return candidates;
}

export function CoordinateIdentifier({ locale }) {
  const c = copy[locale] || copy.ko;
  const [value, setValue] = useState('37.5665, 126.9780');
  const candidates = identifyCoordinates(value);
  const epsgExamples = { decimal: 'EPSG:4326', reversed: 'EPSG:4326', dms: 'EPSG:4326', projected: 'EPSG:3857 / EPSG:5179 / EPSG:5181 / EPSG:5186' };
  return <div className="tool-stack"><label className="field"><span className="field-label">{c.input}</span><textarea rows={3} value={value} onChange={(e) => setValue(e.target.value)} placeholder={c.placeholder} spellCheck="false" /></label><div className="result-panel" aria-live="polite"><div className="result-head"><span className="field-label">{c.identify}</span></div>{!value.trim() ? <p className="helper-text">{c.empty}</p> : candidates.length ? <>{candidates.map((key) => <p className="status is-ok" key={key}><span><strong>{epsgExamples[key]}</strong> — {c[key]}</span></p>)}<p className="helper-text">{c.ambiguous}</p></> : <p className="status is-error">{c.unknown}</p>}</div></div>;
}
