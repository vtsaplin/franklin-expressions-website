import { createNanoBlock } from './nanoblocks.js';

createNanoBlock('ticker', ({ args }) => {
  const el = document.createElement('span');
  el.innerText = `${560} ${args}`;
  return el;
});
