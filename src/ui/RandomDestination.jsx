'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock3, Coins, Globe2, MapPin, RotateCw, Sparkles } from 'lucide-react';
import { destinationUI, travelDestinations } from '../lib/travelDestinations.js';
import { loadCurrencyRates, readCurrencyCache } from '../lib/currencyRates.js';
import DestinationMap from './DestinationMap.jsx';
import styles from './RandomDestination.module.css';

function offsetAt(date, timezone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const asUtc = Date.UTC(+values.year, +values.month - 1, +values.day, +values.hour, +values.minute, +values.second);
  return Math.round((asUtc - date.getTime()) / 60000);
}

function formatOffset(minutes) {
  const sign = minutes < 0 ? '−' : '+';
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const remainder = absolute % 60;
  return `UTC${sign}${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function formatDifference(minutes, copy, locale) {
  if (minutes === 0) return copy.sameTime;
  const sign = minutes < 0 ? '−' : '+';
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const remainder = absolute % 60;
  const number = new Intl.NumberFormat(locale);
  const parts = [];
  if (hours) parts.push(`${number.format(hours)}${copy.hours}`);
  if (remainder) parts.push(`${number.format(remainder)}${copy.minutes}`);
  return `${sign}${parts.join(' ')}`;
}

function displayMoney(amount, currency, locale) {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
  } catch {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(amount)} ${currency}`;
  }
}

function displayCountry(code, locale) {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

export default function RandomDestination({ locale = 'ko' }) {
  const copy = destinationUI[locale] || destinationUI.ko;
  const [region, setRegion] = useState('all');
  const [destination, setDestination] = useState(null);
  const [now, setNow] = useState(null);
  const [rateBook, setRateBook] = useState(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [rateError, setRateError] = useState(false);
  const lastDestinationId = useRef(null);

  const available = region === 'all'
    ? travelDestinations
    : travelDestinations.filter((item) => item.region === region);

  const recommend = async () => {
    const candidates = available.length > 1
      ? available.filter((item) => item.id !== lastDestinationId.current)
      : available;
    if (!candidates.length) return;

    const next = candidates[Math.floor(Math.random() * candidates.length)];
    lastDestinationId.current = next.id;
    setDestination(next);
    setNow(new Date());
    setRateBook(readCurrencyCache());
    setLoadingRate(true);
    setRateError(false);

    try {
      const fresh = await loadCurrencyRates();
      setRateBook(fresh);
    } catch {
      setRateError(true);
    } finally {
      setLoadingRate(false);
    }
  };

  useEffect(() => {
    if (!destination) return undefined;
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, [destination]);

  const cityName = destination?.name?.[locale] || destination?.name?.en;
  const cityOffset = destination && now ? offsetAt(now, destination.timezone) : null;
  const seoulOffset = now ? offsetAt(now, 'Asia/Seoul') : null;
  const currencyRate = destination && rateBook
    ? rateBook.rates?.[destination.currency]
    : null;
  const krwRate = rateBook?.rates?.KRW;
  const localPerThousandWon = currencyRate && krwRate ? 1000 * currencyRate / krwRate : null;
  const wonPerLocal = currencyRate && krwRate ? krwRate / currencyRate : null;
  const dates = destination && rateBook
    ? [rateBook.dates?.KRW, rateBook.dates?.[destination.currency]].filter(Boolean).filter((date, index, all) => all.indexOf(date) === index)
    : [];

  let localTime = '';
  if (destination && now) {
    try {
      localTime = new Intl.DateTimeFormat(locale, {
        timeZone: destination.timezone,
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(now);
    } catch {}
  }

  return <div className={styles.destinationTool}>
    <div className={styles.controls}>
      <label className="field">
        <span className="field-label">{copy.chooseRegion}</span>
        <select value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="all">{copy.all}</option>
          {Object.entries(copy.regions).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
        </select>
      </label>
      <button type="button" className="button button-primary" onClick={recommend}>
        {destination ? <RotateCw size={15}/> : <Sparkles size={15}/>} {destination ? copy.again : copy.pick}
      </button>
    </div>

    {!destination ? <div className={styles.emptyState}>
      <span className={styles.emptyIcon}><Globe2 size={25}/></span>
      <p>{copy.pickPrompt}</p>
      <small>{travelDestinations.length} {copy.count}</small>
    </div> : <article className={styles.cityCard}>
      <div className={styles.cityEyebrow}>
        <span><MapPin size={14}/>{copy.regions[destination.region]}</span>
        <span>{displayCountry(destination.country, locale)}</span>
      </div>
      <h2>{cityName}</h2>
      <div className={styles.tagList}>
        {destination.tags.map((tag) => <span className={styles.tag} key={tag}>{copy.tags[tag] || tag}</span>)}
      </div>

      <div className={styles.infoGrid}>
        <section className={styles.infoCard}>
          <div className={styles.infoLabel}><Clock3 size={15}/>{copy.localTime}</div>
          <strong className={styles.localTime}>{localTime || '—'}</strong>
          <span>{copy.timeZone}: {destination.timezone}</span>
          <span>{copy.utcOffset}: {cityOffset === null ? '—' : formatOffset(cityOffset)}</span>
        </section>
        <section className={styles.infoCard}>
          <div className={styles.infoLabel}><Globe2 size={15}/>{copy.seoulDiff}</div>
          <strong className={styles.timeDifference}>
            {cityOffset === null || seoulOffset === null ? '—' : formatDifference(cityOffset - seoulOffset, copy, locale)}
          </strong>
          <span>{copy.localCurrency}: {destination.currency}</span>
        </section>
      </div>

      <DestinationMap destination={destination} locale={locale}/>

      <section className={styles.exchangeCard}>
        <div className={styles.infoLabel}><Coins size={15}/>{copy.exchange}</div>
        {loadingRate && !currencyRate ? <p className={styles.rateMessage}>{copy.rateLoading}</p> : localPerThousandWon !== null && wonPerLocal !== null ? <>
          <div className={styles.rateRows}>
            <strong>{displayMoney(1000, 'KRW', locale)} <span>≈</span> {displayMoney(localPerThousandWon, destination.currency, locale)}</strong>
            <span>1 {destination.currency} ≈ {displayMoney(wonPerLocal, 'KRW', locale)}</span>
          </div>
          {dates.length > 0 && <small>{copy.updated}: {dates.join(' · ')}</small>}
        </> : <p className={styles.rateMessage}>{copy.rateUnavailable}</p>}
        {rateError && currencyRate && <p className={styles.rateMessage}>{copy.rateUnavailable}</p>}
        <p className={styles.rateNote}>{copy.indicative} <a href="https://frankfurter.dev/" target="_blank" rel="noreferrer">Frankfurter</a></p>
      </section>
    </article>}
  </div>;
}
