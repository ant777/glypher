
      //https://www.figma.com/design/qINwtdP8Bjoxs6nzcnHTny/Variables-Test?node-id=0-1&t=FUUnYDSb2RmtGfP6-1

const tok = 'figd_kWYfOaDGt_7aY6187raNvzkHuCy3yR4i4oCG3qZj'; // Replace with your actual token
const fileId = '1yZzu3i82eHCNbCB9QJmqu'; // Replace with the ID of your Figma file

function getFileId() {
    return fileId;
}

async function requestVariables() {
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${getFileId()}/variables/published`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': tok,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.warn(JSON.stringify(data, ' ', 2));
    // You can now process the 'data' object, which contains information about your Figma file
  } catch (error) {
    console.error('Error fetching Figma vars:', error);
  }

}
async function getFigmaFileNodes(evt) {
    evt.preventDefault();
    const nodeId = window.nodeId.value.trim() || '429:706' || '429-653';
  try {
    // requestVariables();
    const response = await fetch(`https://api.figma.com/v1/files/${getFileId()}/nodes?ids=${nodeId}`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': tok,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    document.querySelector('pre').innerText = JSON.stringify(data, ' ', 2);
    const css = parseNodes(data);
    insertCSS(css);    
    // You can now process the 'data' object, which contains information about your Figma file
  } catch (error) {
    console.error('Error fetching Figma file:', error);
  }
}
    

function toRGBA(rgba) {
    return `rgba(${Math.round(rgba.r * 255)},${Math.round(rgba.g * 255)},${Math.round(rgba.b * 255)},${rgba.a})`;

}
function buildCSSRecurse(node, parSel = '') {
    let childOutput = '';
    if (node.name === 'Button') {

        childOutput += `${parSel} button {
            display: flex;
            ${node.backgroundColor ? `background-color: ${toRGBA(node.backgroundColor)};` : ''}
            ${node.cornerRadius ? `border-radius: ${node.cornerRadius}px;` : ''}
            padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;
            border: ${node.borderWeight || 0}px solid #000;
            flex-direction: column;
        }`;
        parSel += 'button ';
    } else 
    if (node.name === 'Footer' && node.children[0] && node.children[0].layoutMode.toLowerCase() === 'vertical') {
        childOutput += `${parSel} .footer {
            display: flex;
            ${node.children[0].itemSpacing ? `gap: ${node.children[0].itemSpacing}px;` : ''}
            flex-direction: column;
        }`;
        parSel += '.footer ';
    } else {
        if(node.fills){

            childOutput += `${parSel} {
            
            ${node.fills[0] ? `color: ${toRGBA(node.fills[0].color)};` : ''}
            }`;
        } 
    }
    childOutput += node.children ? node.children.map(it => buildCSSRecurse(it, parSel)).join('\n') : '';
    return childOutput;
}
function parseNodes(data) {
    console.warn(Object.values(data.nodes)[0].document)
    return buildCSSRecurse(Object.values(data.nodes)[0].document);

}

window.filter.addEventListener('submit', getFigmaFileNodes);

async function getTabId() { 
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will be an array containing the active tab from the last focused window.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab ? tab.id : null;
 }

async function insertCSS(css) {
console.warn(css);
    chrome.scripting
        .insertCSS({
        target : {tabId : await getTabId()},
        css : css,
        })
        .then(() => console.log("CSS injected"));
}