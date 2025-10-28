import fs from "fs";
import path from "path";
import { ListaDeCosas } from "./ListaDeCosas";
import { Product } from "./Product";

class ListaDeProductos extends ListaDeCosas {
  products: Product[] = [];

  constructor(n: string) {
    super(n);

    // Leer productos desde products.json
    const filePath = path.join(__dirname, "products.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const productsFromFile: Product[] = JSON.parse(data);

    // Agregar productos usando addProduct
    productsFromFile.forEach(p => this.addProduct(p));
  }

  addProduct(product: Product): void {
    const exists = this.products.some(p => p.id === product.id);
    if (!exists) this.products.push(product);
  }

  getProduct(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  getSortedByPrice(order: string): Product[] {
    return [...this.products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  }
}

export { ListaDeProductos };
