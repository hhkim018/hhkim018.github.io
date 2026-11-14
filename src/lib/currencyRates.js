const CURRENCY_CACHE_KEY = 'tiny-tools-frankfurter-usd-rates-v2';
const CURRENCY_CACHE_TTL = 24 * 60 * 60 * 1000;
const FALLBACK_CURRENCIES = ['AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'IDR', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'SEK', 'SGD', 'THB', 'TWD', 'USD', 'VND', 'ZAR'];
let currencyRatesPromise = null;

export function readCurrencyCache() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const saved = JSON.parse(localStorage.getItem(CURRENCY_CACHE_KEY) || 'null');
    if (saved && Number.isFinite(saved.savedAt) && saved.rates && typeof saved.rates === 'object') return saved;
  } catch {}
  return null;
}

export async function loadCurrencyRates() {
  const cached = readCurrencyCache();
  if (cached && Date.now() - cached.savedAt < CURRENCY_CACHE_TTL) return cached;
  if (!currencyRatesPromise) {
    currencyRatesPromise = fetch('https://api.frankfurter.dev/v2/rates?base=USD')
      .then(async (response) => {
        if (!response.ok) throw new Error('Exchange rates request failed');
        const rows = await response.json();
        if (!Array.isArray(rows) || rows.length === 0) throw new Error('No exchange rates returned');
        const rates = { USD: 1 };
        const dates = { USD: rows[0]?.date || '' };
        for (const row of rows) {
          const code = String(row.quote || '').toUpperCase();
          const rate = Number(row.rate);
          if (/^[A-Z]{3}$/.test(code) && Number.isFinite(rate) && rate > 0) {
            rates[code] = rate;
            dates[code] = row.date || '';
          }
        }
        if (Object.keys(rates).length < 2) throw new Error('No usable exchange rates returned');
        const book = { savedAt: Date.now(), rates, dates };
        try { localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify(book)); } catch {}
        return book;
      })
      .finally(() => { currencyRatesPromise = null; });
  }
  return currencyRatesPromise;
}

export { CURRENCY_CACHE_TTL, FALLBACK_CURRENCIES };
