# Node and Vite project


## Installation

Vue project can be created with ``npm create vuew@latest``.  

Enabled Typescipt: Yes  
Add JSX support: Yes  
Pinta(?) for state managemnebt: No  
Single Page Application: Yes  
Tests: No  

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

``npm install``

### Compile and Hot-Reload for Development

``npm run dev``

### Type-Check, Compile and Minify for Production

``npm run build``

### Lint with [ESLint](https://eslint.org/)

``npm run lint``

## Packages

- pinia: as store system 
- vue-final-modal: for modal windows


## UI Style

Inspiration from:
- https://stellarchain.io/ledgers
- https://www.perplexity.ai/
- https://etherscan.io/tx/0x7712f3ac3db9cefcf3540d8c2a873cd440d29bf09c5eeed451fc5d53d59082ac#statechange

