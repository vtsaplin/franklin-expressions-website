const nblocks = new Map();

function findTextNodes(parent) {
  let all = [];
  for (let node = parent.firstChild; node; node = node.nextSibling) {
    if (node.nodeType === Node.TEXT_NODE) all.push(node);
    else all = all.concat(findTextNodes(node));
  }
  return all;
}

/**
 * Create a nano block
 * The renderer should return a valid HTMLElement. This parameter is mandatory.
 * @param name The name of the block
 * @param renderer The renderer function
 */
export function createNanoBlock(name, renderer) {
  nblocks.set(name.toLowerCase(), renderer);
}

/**
 * Parse nano block parameters, support string and array.
 * parseString("aa, bb, cc") -> [ 'aa', 'bb', 'cc' ]
 * parseString("aa, [x, y, z], cc") -> [ 'aa', [ 'x', 'y', 'z' ], 'cc' ]
 * @param params string representing nanoblock parameters
 * @returns an array representation of the parameters
 */
function parseParams(params) {
  const segments = params.split(',').map((segment) => segment.trim());
  const result = [];

  let tempArray = [];
  let isInArray = false;

  segments.forEach((segment) => {
    if (isInArray) {
      if (segment.endsWith(']')) {
        tempArray.push(segment.slice(0, -1).trim());
        result.push(tempArray);
        tempArray = [];
        isInArray = false;
      } else {
        tempArray.push(segment.trim());
      }
    } else if (segment.startsWith('[')) {
      if (segment.endsWith(']')) {
        result.push(segment.slice(1, -1).trim());
      } else {
        tempArray.push(segment.slice(1).trim());
        isInArray = true;
      }
    } else {
      result.push(segment);
    }
  });

  return result;
}

/**
 * Renders nano blocks
 * @param parent The parent element
 * @param context The context object
 */
export function renderNanoBlocks(parent = document.body, context = undefined) {
  const regex = /{([^}]+)}/g;
  findTextNodes(parent).forEach((node) => {
    const text = node.textContent.trim();
    const matches = text.match(regex);
    if (matches) {
      matches.forEach((match) => {
        const [name, ...params] = parseParams(match.slice(1, -1));
        const renderer = nblocks.get(name.toLowerCase());
        if (renderer) {
          const element = renderer(parent, ...(context ? [context] : []), ...params);
          element.classList.add('nanoblock');
          const oldElement = node.parentNode;
          oldElement.parentNode.replaceChild(element, oldElement);
        }
      });
    }
  });
}
