const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { minify: minifyJS } = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify: minifyHTML } = require('html-minifier-terser');

const SRC_DIR  = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

// Clean dist
fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

async function build() {
  // 1. Read source JS
  const srcJS = fs.readFileSync(path.join(SRC_DIR, 'main.js'), 'utf8');

  // 2. Minify with Terser
  const terserResult = await minifyJS(srcJS, {
    compress: { passes: 3, drop_console: false },
    mangle: { toplevel: true },
    format: { comments: false },
  });

  // 3. Obfuscate — scrambles string literals, variable names, control flow
  const obfuscated = JavaScriptObfuscator.obfuscate(terserResult.code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    unicodeEscapeSequence: false,
    renameGlobals: false,
    selfDefending: false,
  });

  const finalJS = obfuscated.getObfuscatedCode();

  // 4. Content-hash filename (like React build output)
  const hash = crypto.createHash('sha256').update(finalJS).digest('hex').slice(0, 8);
  const jsFilename = `main.${hash}.js`;

  fs.writeFileSync(path.join(DIST_DIR, jsFilename), finalJS);
  console.log(`✓ JS  → dist/${jsFilename} (${(finalJS.length / 1024).toFixed(1)} kB)`);

  // 5. Read and process HTML: strip inline <script>...</script>, inject external ref
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  // Remove the inline script block (everything from <script> to </script> at end of body)
  html = html.replace(/<script>[\s\S]*?<\/script>\s*<\/body>/, `<script src="${jsFilename}" defer></script>\n</body>`);

  // 6. Minify HTML
  const minifiedHTML = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: false, // already handled by terser above
    useShortDoctype: true,
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), minifiedHTML);
  console.log(`✓ HTML → dist/index.html (${(minifiedHTML.length / 1024).toFixed(1)} kB)`);

  // 7. Copy static assets
  const assets = ['my-resume.pdf', 'Me Prof.jpg', 'upwork.png'];
  for (const asset of assets) {
    const src = path.join(__dirname, asset);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(DIST_DIR, asset));
      console.log(`✓ Asset → dist/${asset}`);
    }
  }

  console.log('\nBuild complete → dist/');
}

build().catch(err => { console.error(err); process.exit(1); });
