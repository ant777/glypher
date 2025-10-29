
      //https://www.figma.com/design/qINwtdP8Bjoxs6nzcnHTny/Variables-Test?node-id=0-1&t=FUUnYDSb2RmtGfP6-1

const tok = 'figd_kWYfOaDGt_7aY6187raNvzkHuCy3yR4i4oCG3qZj'; // Replace with your actual token
const fileId = '1yZzu3i82eHCNbCB9QJmqu'; // Replace with the ID of your Figma file

async function getFigmaFileNodes(evt) {
    evt.preventDefault();
    const nodeId = window.nodeId.value.trim() || '429-653';
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`, {
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
    document.querySelector('pre').innerText = JSON.stringify(data, ' ', 2)  ;
    // You can now process the 'data' object, which contains information about your Figma file
  } catch (error) {
    console.error('Error fetching Figma file:', error);
  }
}

getFigmaFileNodes();        

function parseJSON(data) {
    return 

}

window.filter.addEventListener('submit', getFigmaFileNodes)