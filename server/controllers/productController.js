const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('created_by', 'name phone');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addProduct = async (req, res) => {
    const { name, category, description, image, price_per_kg, location, whatsapp, seller_name } = req.body;
    try {
        const newProduct = new Product({
            created_by: req.user.id,
            name,
            category,
            description,
            image,
            price_per_kg,
            location,
            whatsapp,
            seller_name
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Check ownership
        if (product.created_by.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized: You can only edit your own products' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Check ownership
        if (product.created_by.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized: You can only delete your own products' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


