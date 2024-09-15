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
        return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(product)
})

app.post('/items', (req, res) => {
    const { name, description, price } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Product name is required' })
    }

    if (!description) {
        return res.status(400).json({ error: 'Product description is required' })
    }

    if (!price) {
        return res.status(400).json({ error: 'Product price is required' })
    }

    const newProduct = { id: products.length + 1, name, description, price }

    res.status(201).json(newProduct)
})

app.put('/items/:id', (req, res) => {
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id))

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' })
    }

    const updateProduct = { ...products[productIndex], ...req.body, id: products[productIndex].id }

    products[productIndex] = updateProduct

    res.status(200).json(updateProduct)
})

app.delete('/items/:id', (req, res) => {
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id))

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' })
    }

    products.splice(productIndex, 1);

    res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})