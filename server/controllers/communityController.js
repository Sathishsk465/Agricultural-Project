const CommunityPost = require('../models/CommunityPost');

exports.getPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find()
            .populate('user', 'name district')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPost = async (req, res) => {
    const { message, district } = req.body;
    try {
        const newPost = new CommunityPost({
            user: req.user.id,
            message,
            district
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
