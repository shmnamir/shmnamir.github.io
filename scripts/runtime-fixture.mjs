import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

// Run the actual TypeScript modules in isolated browser-like globals without
// contacting Google or FormSubmit or adding runtime dependencies to the site.
export function runtimeFixture(overrides = {}) {
  const window = { location: { hostname: 'www.amirshamani.com' } };
  const context = vm.createContext({ window, setTimeout, clearTimeout, AbortController,
    fetch: () => { throw new Error('Network must be mocked'); }, ...overrides });
  const cache = new Map();
  function load(relativePath) {
    const filename = path.resolve(relativePath);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      fileName: filename,
    });
    const run = vm.runInContext(`(function(require, module, exports) { ${outputText}\n})`, context);
    run(specifier => load(path.resolve(path.dirname(filename), specifier + '.ts')), module, module.exports);
    return module.exports;
  }
  return { window: context.window, load };
}
