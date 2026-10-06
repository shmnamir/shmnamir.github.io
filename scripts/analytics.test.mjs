import test from 'node:test';
import assert from 'node:assert/strict';
import { runtimeFixture } from './runtime-fixture.mjs';

test('GA queues Arguments commands, configures the correct ID once, then tracks events', () => {
  const { load, window } = runtimeFixture();
  const analytics = load('lib/analytics.ts');
  analytics.trackEvent('view_cv', { content_type: 'web_cv' });
  analytics.initializeAnalytics();
  analytics.trackEvent('view_project', { project_number: '01' });
  assert.deepEqual(Array.from(window.dataLayer, command => command[0]), ['js', 'config', 'event', 'event']);
  for (const command of window.dataLayer) {
    assert.equal(Object.prototype.toString.call(command), '[object Arguments]');
    assert.equal(Array.isArray(command), false);
  }
  assert.equal(window.dataLayer[1][1], 'G-P1GXT99RF2');
  assert.equal(window.dataLayer[1][2].send_page_view, true);
  assert.equal(window.dataLayer[2][1], 'view_cv');
});

test('SSR, localhost and preview hosts never initialize production analytics', () => {
  for (const window of [undefined, { location: { hostname: 'localhost' } },
    { location: { hostname: 'preview.chatgpt.site' } },
    { location: { hostname: 'www.amirshamani.com.example.org' } }]) {
    const { load } = runtimeFixture({ window });
    const analytics = load('lib/analytics.ts');
    assert.equal(analytics.analyticsEnabled(), false);
    analytics.initializeAnalytics();
    analytics.trackEvent('generate_lead');
    assert.equal(window?.dataLayer, undefined);
  }
});

test('existing tag and queue are preserved; a broken tag cannot break the UI', () => {
  const calls = [];
  const existing = (...args) => calls.push(args);
  const window = { location: { hostname: 'amirshamani.com' }, dataLayer: ['existing'], gtag: existing };
  const { load } = runtimeFixture({ window });
  const analytics = load('lib/analytics.ts');
  analytics.initializeAnalytics();
  assert.equal(window.gtag, existing);
  assert.deepEqual(window.dataLayer, ['existing']);
  assert.equal(calls[1][1], 'G-P1GXT99RF2');
  window.gtag = () => { throw new Error('Extension failure'); };
  assert.doesNotThrow(() => analytics.trackEvent('view_cv'));
});
