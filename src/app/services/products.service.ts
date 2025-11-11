import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor() {
    this.loadIntitialProducts();
   }

  private slugify(s: string) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  private products: Product[] = [
    {
      id: '1',
      name: 'Gafas de sol polarizadas',
      price: 180000,
      description: 'Protección UV400 con marco de policarbonato resistente.',
      image: 'assets/img/gafas1.jpg',
      slug: this.slugify('Gafas de sol polarizadas'),
      stock: 31
    },
    {
      id: '2',
      name: 'Lentes oftálmicos antirreflejo',
      price: 250000,
      description: 'Cristales con recubrimiento antirreflejo y filtro azul.',
      image: 'assets/img/gafas2.jpg',
      slug: this.slugify('Lentes oftálmicos antirreflejo'),
      stock: 13
    },
    {
      id: '3',
      name: 'Montura metálica unisex',
      price: 190000,
      description: 'Diseño moderno con patillas flexibles.',
      image: 'assets/img/gafas3.jpg',
      slug: this.slugify('Montura metálica unisex'),
      stock: 12
    },
    {
      id: '1',
      name: 'Gafas de sol polarizadas',
      price: 180000,
      description: 'Protección UV400 con marco de policarbonato resistente.',
      image: 'assets/img/gafas1.jpg',
      slug: this.slugify('Gafas de sol polarizadas'),
      stock: 8
    },
    {
      id: '2',
      name: 'Lentes oftálmicos antirreflejo',
      price: 250000,
      description: 'Cristales con recubrimiento antirreflejo y filtro azul.',
      image: 'assets/img/gafas2.jpg',
      slug: this.slugify('Lentes oftálmicos antirreflejo'),
      stock: 20
    },
    {
      id: '3',
      name: 'Montura metálica unisex',
      price: 190000,
      description: 'Diseño moderno con patillas flexibles.',
      image: 'assets/img/gafas3.jpg',
      slug: this.slugify('Montura metálica unisex'),
      stock: 6
    },
  ];

  private async loadIntitialProducts() {
    try {
      const storedProducts = localStorage.getItem('products');

      if (storedProducts && storedProducts.length > 0) {
        this.products = JSON.parse(storedProducts);
        console.log('Products loaded from localStorage');
        return;
      }
      console.log('No products found in localStorage, using default products');
      await this.saveProducts();
    }
    catch (error) {
      console.error('Error loading products from localStorage', error);
    }
  }

  private async saveProducts() : Promise<void> {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  async getProducts(): Promise<Product[]> {
    await this.loadIntitialProducts();
    return new Promise((resolve) => {
      resolve([...this.products]);
    });
  }

  async getProductById(id: string): Promise<Product | undefined> {
    await this.loadIntitialProducts();
    return new Promise((resolve) => {
      const product = this.products.find(p => p.id === id);
      resolve(product);
    });
  }

  async getCategories(): Promise<string[]> {
    await this.loadIntitialProducts();
    return new Promise((resolve) => {
      const categories = Array.from(new Set(this.products.map(p => p.name)));
      resolve([...new Set(categories)]);
    });
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    await this.loadIntitialProducts();
    return new Promise((resolve) => {
      const product = this.products.find(p => p.slug === slug);
      resolve(product);
    });
  }
}

