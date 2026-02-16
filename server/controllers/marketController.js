const RESOURCE_ID = process.env.RESOURCES_ID;
const API_KEY = process.env.DATA_GOV_API_KEY;

// Simple in-memory cache to reduce API calls and avoid rate limits
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper for fetching with retry logic
const fetchWithRetry = async (url, options = {}, retries = 3, backoff = 1000) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'User-Agent': 'Mozilla/5.0 (Vivasayi Agriculture App)',
            }
        });
        if (!response.ok) {
            if (response.status === 401) throw new Error('Unauthorized: Invalid API Key');
            throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (retries > 0 && (error.code === 'ECONNRESET' || error.message.includes('fetch failed'))) {
            console.warn(`Fetch failed (${error.message}). Retrying in ${backoff}ms... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw error;
    }
};

exports.getMarketPrices = async (req, res) => {
    try {
        const { state, district, market, commodity } = req.query;

        // Cache Key based on filters
        const cacheKey = JSON.stringify({ state, district, market, commodity });
        const cached = cache.get(cacheKey);

        if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
            return res.json(cached.data);
        }

        let url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=100`;

        if (state) url += `&filters[state]=${state}`;
        if (district) url += `&filters[district]=${district}`;
        if (market) url += `&filters[market]=${market}`;
        if (commodity) url += `&filters[commodity]=${commodity}`;

        const data = await fetchWithRetry(url);

        if (data.records) {
            const formattedRecords = data.records.map(record => ({
                state: record.state,
                district: record.district,
                market: record.market,
                commodity: record.commodity,
                variety: record.variety,
                grade: record.grade,
                arrival_date: record.arrival_date,
                min_price: parseFloat(record.min_price) || 0,
                max_price: parseFloat(record.max_price) || 0,
                modal_price: parseFloat(record.modal_price) || 0
            }));

            // Store in cache
            cache.set(cacheKey, {
                timestamp: Date.now(),
                data: formattedRecords
            });

            res.json(formattedRecords);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error fetching market prices:', error.message);
        const status = error.message.includes('Unauthorized') ? 401 : 500;
        res.status(status).json({ message: error.message || 'Internal Server Error' });
    }
};

exports.addMarketPrice = async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed - Using External API' });
};


