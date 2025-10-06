import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
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
    },
    {
      id: '2',
      name: 'Lentes oftálmicos antirreflejo',
      price: 250000,
      description: 'Cristales con recubrimiento antirreflejo y filtro azul.',
      image: 'assets/img/gafas2.jpg',
      slug: this.slugify('Lentes oftálmicos antirreflejo'),
    },
    {
      id: '3',
      name: 'Montura metálica unisex',
      price: 190000,
      description: 'Diseño moderno con patillas flexibles.',
      image: 'assets/img/gafas3.jpg',
      slug: this.slugify('Montura metálica unisex'),
    },
    {
      id: '1',
      name: 'Gafas de sol polarizadas',
      price: 180000,
      description: 'Protección UV400 con marco de policarbonato resistente.',
      image: 'assets/img/gafas1.jpg',
      slug: this.slugify('Gafas de sol polarizadas'),
    },
    {
      id: '2',
      name: 'Lentes oftálmicos antirreflejo',
      price: 250000,
      description: 'Cristales con recubrimiento antirreflejo y filtro azul.',
      image: 'assets/img/gafas2.jpg',
      slug: this.slugify('Lentes oftálmicos antirreflejo'),
    },
    {
      id: '3',
      name: 'Montura metálica unisex',
      price: 190000,
      description: 'Diseño moderno con patillas flexibles.',
      image: 'assets/img/gafas3.jpg',
      slug: this.slugify('Montura metálica unisex'),
    },
  ];

  getAll() { return this.products; }
  getBySlug(slug: string) { return this.products.find(p => p.slug === slug) ?? null; }
}

