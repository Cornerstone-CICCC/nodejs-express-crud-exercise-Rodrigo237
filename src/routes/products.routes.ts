import { Router, Request, Response } from 'express'
import { Product } from '../types/products'

const productRouter = Router()

// In-memory database
let products: Product[] = [];
let nextId = 1;


/**
 * Get all products
 * 
 * @route GET /products
 * @param { Request } req - Express request object.
 * @param { Response } res - Express response object.
 * @returns { void } - Responds with list of users.
 */
productRouter.get('/', (req: Request, res:Response) => {
  res.json(products);
});

/**
 * Get user by id
 * 
 * @route GET /products/:id
 * @param { Request } req - Express request object containing id.
 * @param { Response } res - Express response object.
 * @returns { void } - Responds with todo by id.
 */
productRouter.get('/:id', (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

/**
 * Add user
 * 
 * @route POST /
 * @param { Request } req - Express request object containing user object.
 * @param { Response } res - Express response object.
 * @returns { void } - Responds with created user.
 */
productRouter.post('/', (req:Request, res:Response) => {
  const { product_name, product_description, product_price } = req.body;
  
  // Validate required fields
  if (!product_name || !product_description || product_price === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Validate price is a positive number
  if (typeof product_price !== 'number' || product_price < 0) {
    return res.status(400).json({ message: 'Product price must be a positive number' });
  }

  const newProduct: Product = {
    id: nextId++,
    product_name,
    product_description,
    product_price
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * Update products by id
 * 
 * @route PUT /products/:id
 * @param { Request } - Express request object which contains id param and user object.
 * @param { Response } - Express response object.
 * @returns { void } - Respond with updated user object.
 */
productRouter.put('/:id', (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

/**
 * Delete product by id
 * 
 * @route DELETE /users/:id
 * @param { Request } req - Express request object.
 * @param { Response } res - Express response object.
 * @returns { void } - Responds with deletion message.
 */
productRouter.delete('/:id', (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).send('Product not found');
  }
});

export default productRouter