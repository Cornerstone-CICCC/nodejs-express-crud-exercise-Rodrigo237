import express,{ Request, Response, NextFunction } from 'express';
import productRouter from './routes/products.routes';

//Create server
const app = express();
const port = 3000;

app.use(express.json());

//routes
app.use("/products",productRouter)

// Fallback
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route")
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
