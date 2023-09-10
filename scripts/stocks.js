import { createNanoBlock } from './nblocks.js';

// eslint-disable-next-line no-unused-vars
createNanoBlock('ticker', (parent, ticker) => {
  const el = document.createElement('div');
  el.classList.add('ticker');
  el.innerHTML = `<div>${ticker}</div>`;
  return el;
});
