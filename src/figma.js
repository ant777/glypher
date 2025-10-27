//https://www.figma.com/design/qINwtdP8Bjoxs6nzcnHTny/Variables-Test?node-id=0-1&t=FUUnYDSb2RmtGfP6-1

const tt = ''; // Replace with your actual token
const fileId = 'qINwtdP8Bjoxs6nzcnHTny'; // Replace with the ID of your Figma file

async function getFigmaFileNodes() {
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}/nodes?ids=0-1`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': personalAccessToken,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Figma file data:', JSON.stringify(data));
    // You can now process the 'data' object, which contains information about your Figma file
  } catch (error) {
    console.error('Error fetching Figma file:', error);
  }
}

getFigmaFileNodes();