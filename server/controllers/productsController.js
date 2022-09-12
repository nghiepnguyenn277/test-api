
import { v4 as uuid } from "uuid"

let products = [];

export const getProducts = (req, res) => {
    res.send(products);
};


export const createProduct = (req, res) => {
    const product = req.body;

    product.push({ ...product, id: uuid() });
    res.send(" Products add sucssecs");
};

export const getProduct = (req, res) => {
    const singleProduct = products.filter((product) => product.id === req.params.id);
    res.send(singleProduct);
}

export const deleteProduct = (req, res) => {
    products = products.filter((product) => product.id == req.params.id)
    res.send("delete Sucessfull")
}

export const updateProduct = (req, res) => {
    products = products.find((product) => product.id === req.params.id)

    product.name = req.body.name;
    product.description = req.body.description;
    product.short_description = req.body.short_description
    product.price = req.body.price;
    categories[0][id]

    res.send("Update Sucessfull")
}