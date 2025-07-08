const axios = require('axios');

const N8N_WEBHOOK_URL = process.env.N8N_GUIDE_GENERATION_WEBHOOK_URL || 'https_MOCK_N8N_URL_REPLACE_ME'; // Replace with actual or mock URL

const generateGuide = async (req, res) => {
  try {
    const { dealData, userContext } = req.body; // Assuming these are the inputs needed by n8n

    if (!dealData || !userContext) {
      return res.status(400).json({ message: 'Missing dealData or userContext in request body' });
    }

    // Prepare payload for n8n
    const payload = {
      deal: dealData,
      user: userContext,
      timestamp: new Date().toISOString(),
    };

    console.log(`Sending payload to n8n webhook: ${N8N_WEBHOOK_URL}`, payload);

    // Make POST request to n8n webhook
    const n8nResponse = await axios.post(N8N_WEBHOOK_URL, payload, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary n8n authentication headers if required
        // 'X-N8N-Api-Key': process.env.N8N_API_KEY
      }
    });

    console.log('Received response from n8n:', n8nResponse.data);

    // Assuming n8n returns the generated guide or a status
    // This will be refined based on actual n8n workflow response
    res.status(200).json({
      message: 'Successfully triggered n8n workflow for guide generation',
      n8nResponse: n8nResponse.data
    });

  } catch (error) {
    console.error('Error in generateGuide controller:', error.message);

    if (error.code === 'ECONNABORTED') {
      console.error('n8n webhook request timed out.');
      return res.status(504).json({ message: 'Request to guide generation service timed out.' });
    }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('n8n error response data:', error.response.data);
      console.error('n8n error response status:', error.response.status);
      return res.status(error.response.status || 500).json({
        message: 'Error response from guide generation service.',
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from n8n:', error.request);
      return res.status(503).json({ message: 'Guide generation service did not respond.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up n8n request:', error.message);
      return res.status(500).json({ message: 'Internal server error while contacting guide generation service.' });
    }
  }
};

module.exports = {
  generateGuide,
};
