import { createNanoBlock } from './nblocks.js';

createNanoBlock('ticker', ({ params: [ticker] }) => {
  const el = document.createElement('span');
  el.innerText = `${560} ${ticker}`;
  return el;
});
