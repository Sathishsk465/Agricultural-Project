exports.getWeatherData = async (req, res) => {
    // In a real app, you'd call OpenWeatherMap here
    // For now, returning mock data from backend
    try {
        const mockWeather = {
            temp: 32,
            condition: 'வெப்பம்',
            humidity: 65,
            windSpeed: 12,
            forecast: [
                { day: 'நாளை', temp: 31, condition: 'மேகமூட்டம்' },
                { day: 'மறுநாள்', temp: 33, condition: 'வெப்பம்' },
                { day: 'ஞாயிறு', temp: 29, condition: 'மழை' }
            ]
        };
        res.json(mockWeather);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
