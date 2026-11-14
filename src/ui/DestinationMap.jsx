'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './DestinationMap.module.css';

setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString());

export default function DestinationMap({ destination, locale }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const initialDestination = useRef(destination);
  const lastDestinationId = useRef(destination.id);
  const [unavailable, setUnavailable] = useState(false);
  const name = destination.name?.[locale] || destination.name?.en || destination.id;

  useEffect(() => {
    if (!containerRef.current) {
      setUnavailable(true);
      return undefined;
    }

    const first = initialDestination.current;
    let map;
    try {
      map = new Map({
        container: containerRef.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [first.lng, first.lat],
        zoom: 9,
        attributionControl: true,
        dragRotate: false,
        pitchWithRotate: false,
      });
    } catch {
      setUnavailable(true);
      return undefined;
    }

    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    markerRef.current = new Marker({ color: '#4f7b59' })
      .setLngLat([first.lng, first.lat])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || lastDestinationId.current === destination.id) return;
    lastDestinationId.current = destination.id;
    markerRef.current?.setLngLat([destination.lng, destination.lat]);
    map.flyTo({
      center: [destination.lng, destination.lat],
      zoom: 9,
      duration: 1300,
      essential: false,
    });
  }, [destination.id, destination.lat, destination.lng]);

  return <section className={styles.mapSection}>
    <h3>{locale === 'ko' ? '지도 위치' : locale === 'ja' ? '地図上の位置' : locale === 'zh' ? '地图位置' : 'Map location'}</h3>
    {unavailable && <p className={styles.mapFallback}>{locale === 'ko' ? '이 브라우저에서는 지도를 표시할 수 없습니다.' : locale === 'ja' ? 'このブラウザーでは地図を表示できません。' : locale === 'zh' ? '此浏览器无法显示地图。' : 'The map is not available in this browser.'}</p>}
    <div className={`${styles.map} ${unavailable ? styles.mapUnavailable : ''}`} ref={containerRef} aria-label={`${name} map location`} />
  </section>;
}
