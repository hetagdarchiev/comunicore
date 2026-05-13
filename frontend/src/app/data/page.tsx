'use client';

import { useEffect, useState } from 'react';

import type { AnalyticsMetricsResponse } from '@/shared/api/generated';
import { apiBaseUrl } from '@/shared/api/setup';

function explain401(body: string): string {
  if (body.includes('failed to read security credentials')) {
    return (
      'Бэкенд не видит cookie сессии (sid). Сделай так: 1) запуск фронта через npm run dev:local ' +
      '(чтобы логин и метрики шли на один хост API); 2) войди в аккаунт на этом же фронте; 3) обнови эту страницу.'
    );
  }
  return body.replace(/\s+/g, ' ').slice(0, 280);
}

function formatMs(ms: number): string {
  if (ms >= 1_000_000) return `${(ms / 1_000_000).toFixed(2)} млн мс`;
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)} с`;
  return `${Math.round(ms)} мс`;
}

function formatPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-lg border border-neutral-200 bg-white p-4 shadow-sm'>
      <div className='text-xs text-neutral-500'>{label}</div>
      <div className='mt-1 text-lg font-medium text-blue-800'>{value}</div>
    </div>
  );
}

function MetricsBoard({ data }: { data: AnalyticsMetricsResponse }) {
  return (
    <div className='mt-6 space-y-8'>
      <section>
        <h2 className='mb-3 text-lg font-semibold text-blue-800'>Сводка</h2>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          <StatCard
            label='Среднее active (фокус вкладки)'
            value={formatMs(data.avgActiveTimeMs)}
          />
          <StatCard
            label='Среднее visible (вкладка видна)'
            value={formatMs(data.avgVisibleTimeMs)}
          />
          <StatCard
            label='Макс. active за батч'
            value={formatMs(data.maxActiveTimeMs)}
          />
          <StatCard
            label='Плотность связей (ответы / участники)'
            value={data.connectionDensity.toFixed(2)}
          />
          <StatCard
            label={`Отток (≥${data.dropoffAfterMessages} постов, неактивность ${data.dropoffInactiveDays} дн.)`}
            value={formatPct(data.dropoffChurnPercent)}
          />
          <StatCard
            label='Mobile: сессии'
            value={formatPct(data.mobilePctSessions)}
          />
          <StatCard
            label='Mobile: читатели'
            value={formatPct(data.mobilePctReaders)}
          />
          <StatCard
            label='Mobile: авторы'
            value={formatPct(data.mobilePctWriters)}
          />
          <StatCard
            label='Mobile: пользователи (по батчам)'
            value={formatPct(data.mobilePctUsers)}
          />
        </div>
      </section>

      {data.topTag ? (
        <section>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>Топ-тег</h2>
          <p className='rounded border border-neutral-200 bg-amber-50 px-4 py-3'>
            <span className='font-medium'>{data.topTag.tag}</span>
            <span className='ml-2 text-neutral-500'>
              — {data.topTag.usageCount} использований
            </span>
          </p>
        </section>
      ) : null}

      {(data.topThreadWeekly || data.topThreadMonthly) && (
        <section>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>
            Топ-треды
          </h2>
          <div className='grid gap-3 md:grid-cols-2'>
            {data.topThreadWeekly ? (
              <div className='rounded-lg border border-neutral-200 p-4'>
                <div className='text-xs text-neutral-500'>За 7 дней</div>
                <div className='font-medium'>
                  {`#${data.topThreadWeekly.threadId} ${data.topThreadWeekly.title}`}
                </div>
                <div className='text-sm text-neutral-500'>
                  Ответов в окне: {data.topThreadWeekly.repliesInWindow}
                </div>
              </div>
            ) : null}
            {data.topThreadMonthly ? (
              <div className='rounded-lg border border-neutral-200 p-4'>
                <div className='text-xs text-neutral-500'>За 30 дней</div>
                <div className='font-medium'>
                  {`#${data.topThreadMonthly.threadId} ${data.topThreadMonthly.title}`}
                </div>
                <div className='text-sm text-neutral-500'>
                  Ответов в окне: {data.topThreadMonthly.repliesInWindow}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      <section>
        <h2 className='mb-2 text-lg font-semibold text-blue-800'>
          Активность по часу (UTC)
        </h2>
        <div className='overflow-x-auto rounded-lg border border-neutral-200'>
          <table className='w-full min-w-[320px] text-sm'>
            <thead className='bg-blue-50'>
              <tr>
                <th className='px-3 py-2 text-left'>Час UTC</th>
                <th className='px-3 py-2 text-left'>Доля, %</th>
              </tr>
            </thead>
            <tbody>
              {data.activityByHourUtc.map((row) => (
                <tr key={row.hour} className='border-t border-neutral-200'>
                  <td className='px-3 py-2'>{row.hour}</td>
                  <td className='px-3 py-2'>{row.sharePercent.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-2'>
        <div>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>
            Топ пользователей по постам
          </h2>
          <TableUserCounts rows={data.topUsersByPosts} />
        </div>
        <div>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>
            Топ по созданным тредам
          </h2>
          <TableUserCounts rows={data.topUsersByThreads} />
        </div>
        <div>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>
            Только посты (без своих тредов)
          </h2>
          <TableUserCounts rows={data.postOnlyUsers} />
        </div>
        <div>
          <h2 className='mb-2 text-lg font-semibold text-blue-800'>
            Популярные теги
          </h2>
          <div className='overflow-x-auto rounded-lg border border-neutral-200'>
            <table className='w-full text-sm'>
              <thead className='bg-blue-50'>
                <tr>
                  <th className='px-3 py-2 text-left'>Тег</th>
                  <th className='px-3 py-2 text-left'>Тредов</th>
                </tr>
              </thead>
              <tbody>
                {data.popularTags.map((row) => (
                  <tr key={row.tag} className='border-t border-neutral-200'>
                    <td className='px-3 py-2'>{row.tag}</td>
                    <td className='px-3 py-2'>{row.threadCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className='mb-2 text-lg font-semibold text-blue-800'>
          Посты по дням
        </h2>
        <div className='overflow-x-auto rounded-lg border border-neutral-200'>
          <table className='w-full text-sm'>
            <thead className='bg-blue-50'>
              <tr>
                <th className='px-3 py-2 text-left'>День</th>
                <th className='px-3 py-2 text-left'>Постов</th>
              </tr>
            </thead>
            <tbody>
              {data.postsActivityByDay.map((row) => (
                <tr key={row.day} className='border-t border-neutral-200'>
                  <td className='px-3 py-2'>{row.day}</td>
                  <td className='px-3 py-2'>{row.postsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TableUserCounts({
  rows,
}: {
  rows: AnalyticsMetricsResponse['topUsersByPosts'];
}) {
  if (rows.length === 0) {
    return <p className='text-sm text-neutral-500'>Нет данных</p>;
  }
  return (
    <div className='overflow-x-auto rounded-lg border border-neutral-200'>
      <table className='w-full text-sm'>
        <thead className='bg-blue-50'>
          <tr>
            <th className='px-3 py-2 text-left'>Пользователь</th>
            <th className='px-3 py-2 text-left'>Счётчик</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.userId}-${row.name}`}
              className='border-t border-neutral-200'
            >
              <td className='px-3 py-2'>
                #{row.userId} {row.name}
              </td>
              <td className='px-3 py-2'>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DataPage() {
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<AnalyticsMetricsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setMetrics(null);
      setLoading(true);
      setHint(`API: ${apiBaseUrl}`);

      const me = await fetch(`${apiBaseUrl}/api/user/me`, {
        credentials: 'include',
      });

      if (!me.ok) {
        const t = await me.text();
        setError(
          me.status === 401
            ? explain401(t)
            : `Сначала нужна сессия. /api/user/me → HTTP ${me.status} ${t.slice(0, 120)}`,
        );
        setLoading(false);
        return;
      }

      const response = await fetch(`${apiBaseUrl}/api/analytics/metrics`, {
        credentials: 'include',
      });

      const ct = response.headers.get('content-type') ?? '';
      if (!ct.includes('application/json')) {
        const text = await response.text();
        setError(
          `Ожидался JSON, пришло ${ct.slice(0, 40)}… (первые символы: ${text.slice(0, 80).replace(/\s+/g, ' ')})`,
        );
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const raw = (await response.clone().text()).slice(0, 400);
        setError(
          response.status === 401
            ? explain401(raw)
            : `HTTP ${response.status} — ${raw.replace(/\s+/g, ' ')}`,
        );
        setLoading(false);
        return;
      }

      const data = (await response.json()) as AnalyticsMetricsResponse;
      setMetrics(data);
      setHint(`API: ${apiBaseUrl}`);
      setLoading(false);
    };

    void fetchData().catch((e: unknown) => {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    });
  }, []);

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <h1 className='text-2xl font-semibold text-blue-800'>
        Собранные данные (аналитика)
      </h1>
      {hint ? <p className='mt-2 text-sm text-neutral-500'>{hint}</p> : null}
      {loading ? <p className='mt-4 text-neutral-500'>Загрузка…</p> : null}
      {error ? (
        <p className='mt-4 text-orange-700' role='alert'>
          {error}
        </p>
      ) : null}
      {!loading && !error && metrics ? <MetricsBoard data={metrics} /> : null}
    </div>
  );
}
