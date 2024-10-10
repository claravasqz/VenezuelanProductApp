require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDb = require('./config/connectToDb');
const Store = require('./models/Store');
const Product = require('./models/Product');


connectToDb();
app.use(cors());

// ----------------------------

app.use(express.json());

app.post('/stores', async (req, res) => {
    const { name, address } = req.body;
    const newStore = new Store({
        name,
        address,
    });
    await newStore.save();
    res.json(newStore);
});

app.get('/stores', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/stores/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id).populate('products');
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/stores/:id', async (req, res) => {
    try {
        const updatedStore = await Store.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(updatedStore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/stores/:id', async (req, res) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.id);
        if (!deletedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json({ message: 'Store deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/products/popular', async (req, res) => {
    try{
        const popularProducts = await Product.find().sort({ views: -1 }).limit(5);
        res.json(popularProducts);
    } catch (error) {
        console.error('Error fetching popular products:', error);
        res.status(500).json({message: error.message});
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } },
            {new: true}
        ).populate('store', 'name address');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

       
        await Store.findByIdAndUpdate(deletedProduct.store, {
            $pull: { products: deletedProduct._id },
        });

        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --------------------------------

app.post('/products', async (req, res) => {
    const { name, price, category, storeId } = req.body;
    try {
        const store = await Store.findById(storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const newProduct = new Product({ name, price, category, store: storeId });
        await newProduct.save();


        store.products.push(newProduct._id);
        await store.save();

        res.json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find().populate('store', 'name address');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ----------------------------

app.get('/', (req, res) => {
    res.send('Venezuelan Product Finder API is running');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
