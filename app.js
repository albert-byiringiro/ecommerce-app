import express from "express";

const app = express()
const PORT = 3000

// dummy data:
const products = [
    { id: 1, name: "Apple", description: "Fruits from the hills of Rwanda", price: 350 },
    { id: 2, name: "Chairs", description: "Fruits from the hills of Rwanda", price: 350 },
    { id: 3, name: "Mona Lisa Painting", description: "Fruits from the hills of Rwanda", price: 350 },
    { id: 4, name: "Bulova Watch", description: "Fruits from the hills of Rwanda", price: 350 },
]

app.use(express.json())

app.get('/items', (req, res) => {
    res.status(200).json(products)
})

app.get('/items/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product)
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})