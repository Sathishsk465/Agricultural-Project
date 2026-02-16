const Scheme = require('../models/Scheme');

exports.getSchemes = async (req, res) => {
    try {
        const { category, min_land, search } = req.query;

        // Initial data seed if empty or outdated
        const count = await Scheme.countDocuments();
        if (count < 11) {
            await Scheme.deleteMany({}); // Clear old data to ensure new 11 schemes are loaded
            const sampleData = [
  {
    "scheme_id": "PMKISAN",
    "scheme_name": "பிரதமர் கிசான் சம்மான் நிதி திட்டம்",
    "description": "சிறு மற்றும் குறைந்த நிலப்பரப்புடைய விவசாயிகளுக்கு நேரடி வருமான உதவி வழங்கும் மத்திய அரசு திட்டம்.",
    "benefits": "வருடத்திற்கு ₹6000 மூன்று தவணைகளாக வழங்கப்படும்.",
    "eligibility": "சாகுபடி நிலம் கொண்ட சிறு மற்றும் குறைந்த நிலப்பரப்புடைய விவசாயிகள்.",
    "approximate_land_acres": "5 ஏக்கர் வரை",
    "min_land_required": 0,
    "category": "Income Support",
    "state_applicability": "All India",
    "image_url": "https://iref.net/wp-content/uploads/2025/07/PM-Kisan-Samman-Nidhi-Yojana-20th-Installment-Date-Benefits-Eligibility-Documents-Other-Detail.webp",
    "official_apply_link": "https://pmkisan.gov.in"
  },
  {
    "scheme_id": "PMFBY",
    "scheme_name": "பிரதமர் பயிர் காப்பீட்டு திட்டம்",
    "description": "இயற்கை பேரிடர்களால் ஏற்படும் பயிர் சேதத்திற்கான காப்பீடு வழங்கும் திட்டம்.",
    "benefits": "குறைந்த காப்பீட்டு கட்டணத்தில் பயிர் பாதுகாப்பு.",
    "eligibility": "அறிவிக்கப்பட்ட பயிர்களை வளர்க்கும் அனைத்து விவசாயிகளும்.",
    "approximate_land_acres": "1 ஏக்கர் மேல்",
    "min_land_required": 1,
    "category": "Insurance",
    "state_applicability": "All India",
    "image_url": "https://www.merikheti.com/assets/posts/m-2023-11-pradhan-mantri-fasal-bima-yojana.jpg",
    "official_apply_link": "https://pmfby.gov.in"
  },
  {
    "scheme_id": "KCC",
    "scheme_name": "கிசான் கிரெடிட் கார்டு திட்டம்",
    "description": "விவசாயிகளுக்கு குறைந்த வட்டி விகிதத்தில் கடன் வசதி வழங்கும் திட்டம்.",
    "benefits": "₹3 லட்சம் வரை சலுகை வட்டி கடன்.",
    "eligibility": "சாகுபடி நில ஆவணங்கள் கொண்ட விவசாயிகள்.",
    "approximate_land_acres": "1 ஏக்கர் மேல்",
    "min_land_required": 1,
    "category": "Credit",
    "state_applicability": "All India",
    "image_url": "https://nititantra.com/wp-content/uploads/2025/03/KCC-Card.jpg",
    "official_apply_link": "https://www.pmkisan.gov.in"
  },
  {
    "scheme_id": "SOILHC",
    "scheme_name": "மண் ஆரோக்கிய அட்டை திட்டம்",
    "description": "மண் பரிசோதனை செய்து உர பரிந்துரைகள் வழங்கும் அரசு திட்டம்.",
    "benefits": "இலவச மண் பரிசோதனை மற்றும் உர ஆலோசனை.",
    "eligibility": "சாகுபடி நிலம் கொண்ட அனைத்து விவசாயிகளும்.",
    "approximate_land_acres": "எந்த அளவு நிலம் இருந்தாலும்",
    "min_land_required": 0,
    "category": "Advisory",
    "state_applicability": "All India",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb17UvLfQtGWMcOiK2HXSJq_lkJdlmI7qTTg&s",
    "official_apply_link": "https://soilhealth.dac.gov.in"
  },
  {
    "scheme_id": "PMKSY",
    "scheme_name": "பிரதமர் கிருஷி சின்சாய் யோஜனா",
    "description": "நீர்ப்பாசனம் மற்றும் தண்ணீர் மேலாண்மை மேம்பாட்டிற்கான உதவி திட்டம்.",
    "benefits": "ட்ரிப் மற்றும் ஸ்பிரிங்கிளர் போன்ற மைக்ரோ பாசனத்திற்கு நிதி உதவி.",
    "eligibility": "சாகுபடி நிலம் கொண்ட விவசாயிகள்.",
    "approximate_land_acres": "1 ஏக்கர் மேல்",
    "min_land_required": 1,
    "category": "Irrigation",
    "state_applicability": "All India",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcDYzmp32gtt6hJQa_qPrcd4f5cfljX-4VGw&s",
    "official_apply_link": "https://pmksy.gov.in"
  },
  {
    "scheme_id": "PKVY",
    "scheme_name": "பாரம்பரிய கிருஷி வளர்ச்சி திட்டம்",
    "description": "இயற்கை மற்றும் கார்பன் குறைந்த விவசாயத்தை ஊக்குவிக்கும் திட்டம்.",
    "benefits": "இயற்கை உரங்கள் மற்றும் சான்றிதழ் பெற நிதி உதவி.",
    "eligibility": "இயற்கை விவசாயத்திற்கு மாற்றம் செய்ய விரும்பும் விவசாயிகள்.",
    "approximate_land_acres": "2 ஏக்கர் மேல்",
    "min_land_required": 2,
    "category": "Organic Farming",
    "state_applicability": "All India",
    "image_url": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
    "official_apply_link": "https://pgsindia-ncof.gov.in"
  }
];
            await Scheme.insertMany(sampleData);
        }



        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (min_land) {
            query.min_land_required = { $lte: Number(min_land) };
        }

        if (search) {
            query.$or = [
                { scheme_name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const schemes = await Scheme.find(query).sort({ created_at: -1 });
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin handlers (placeholders for future)
exports.addScheme = async (req, res) => {
    try {
        const scheme = new Scheme(req.body);
        await scheme.save();
        res.status(201).json(scheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(scheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteScheme = async (req, res) => {
    try {
        await Scheme.findByIdAndDelete(req.params.id);
        res.json({ message: 'Scheme deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
