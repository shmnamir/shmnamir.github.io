import test from 'node:test';
import assert from 'node:assert/strict';
import { runtimeFixture } from './runtime-fixture.mjs';

function formData() {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: 'Test Visitor', email: 'test@example.invalid',
    message: 'A private test message', _honey: '', _subject: 'Portfolio enquiry' })) data.set(key, value);
  return data;
}
const eventNames = window => Array.from(window.dataLayer).filter(command => command[0] === 'event').map(command => command[1]);

for (const success of [true, 'true']) {
  test(`lead is recorded only after explicit provider acceptance (${typeof success})`, async () => {
    let resolveResponse;
    let request;
    const { load, window } = runtimeFixture({ fetch: (url, options) => {
      request = { url, options };
      return new Promise(resolve => { resolveResponse = resolve; });
    } });
    const { submitContact } = load('lib/contact-submission.ts');
    const submission = submitContact(formData());
    assert.deepEqual(eventNames(window), ['contact_submit_attempt']);
    assert.equal(request.url, 'https://formsubmit.co/ajax/amir.shamani@gmail.com');
    assert.equal(request.options.method, 'POST');
    assert.equal(JSON.parse(request.options.body).email, 'test@example.invalid');
    resolveResponse({ ok: true, json: async () => ({ success }) });
    await submission;
    assert.deepEqual(eventNames(window), ['contact_submit_attempt', 'generate_lead']);
    const events = JSON.stringify(window.dataLayer);
    for (const secret of ['Test Visitor', 'test@example.invalid', 'A private test message']) assert.ok(!events.includes(secret));
  });
}

for (const [label, fetch] of [
  ['HTTP failure', async () => ({ ok: false, json: async () => ({ success: true }) })],
  ['provider rejection', async () => ({ ok: true, json: async () => ({ success: false }) })],
  ['string rejection', async () => ({ ok: true, json: async () => ({ success: 'false' }) })],
  ['activation or unknown response', async () => ({ ok: true, json: async () => ({ message: 'Activation required' }) })],
  ['malformed response', async () => ({ ok: true, json: async () => { throw new SyntaxError('Not JSON'); } })],
  ['network error', async () => { throw new TypeError('Offline'); }],
]) {
  test(`${label} never creates a lead`, async () => {
    const { load, window } = runtimeFixture({ fetch });
    await assert.rejects(load('lib/contact-submission.ts').submitContact(formData()));
    assert.deepEqual(eventNames(window), ['contact_submit_attempt']);
  });
}

test('timeout aborts the request and never creates a lead', async () => {
  const { load, window } = runtimeFixture({
    setTimeout: callback => globalThis.setTimeout(callback, 0),
    fetch: (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('Aborted')));
    }),
  });
  await assert.rejects(load('lib/contact-submission.ts').submitContact(formData()));
  assert.deepEqual(eventNames(window), ['contact_submit_attempt']);
});

test('honeypot never sends or records a lead', async () => {
  const data = formData();
  data.set('_honey', 'spam');
  const { load, window } = runtimeFixture();
  await assert.rejects(load('lib/contact-submission.ts').submitContact(data));
  assert.equal(window.dataLayer, undefined);
});

test('form success is independent of blocked analytics and unavailable storage', async () => {
  const window = { location: { hostname: 'www.amirshamani.com' }, gtag: () => { throw new Error('Blocked'); } };
  Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('Storage unavailable'); } });
  const { load } = runtimeFixture({ window, fetch: async () => ({ ok: true, json: async () => ({ success: true }) }) });
  await assert.doesNotReject(load('lib/contact-submission.ts').submitContact(formData()));
});
