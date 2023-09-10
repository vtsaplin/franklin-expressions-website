import { createNanoBlock } from './nblocks.js';

// eslint-disable-next-line no-unused-vars
createNanoBlock('stocks', (parent, ticker) => {
  const el = document.createElement('div');
  el.classList.add('stock-value');
  el.innerHTML = `<div>${ticker}</div>`;
  return el;
});
