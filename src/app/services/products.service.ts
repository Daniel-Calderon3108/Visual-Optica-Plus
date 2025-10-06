import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  colors?: string[];
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() {}

  private slugify(s: string) {
    return s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita acentos
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')     // reemplaza espacios por guiones
      .replace(/(^-|-$)/g, '');
  }

  private products: Product[] = [
    {
      id: '1',
      name: 'Gafas de sol polarizadas',
      price: 180000,
      image: 'assets/img/gafas1.png',
      description:
        'Gafas de sol modernas con protección UV400, diseño ligero y elegante para un estilo único y máxima comodidad.',
      colors: ['#000', '#555'],
      slug: this.slugify('Gafas de sol polarizadas'),
    },
    {
      id: '2',
      name: 'Lentes oftálmicos antirreflejo',
      price: 250000,
      image: 'assets/img/lentes1.png',
      description:
        'Cristales con recubrimiento antirreflejo y filtro azul para mayor comodidad visual.',
      colors: ['#a49f9f', '#c7c7c7'],
      slug: this.slugify('Lentes oftálmicos antirreflejo'),
    },
    {
      id: '3',
      name: 'Montura metálica unisex',
      price: 190000,
      image: 'assets/img/montura1.png',
      description:
        'Diseño moderno con patillas flexibles y estructura ligera para uso diario.',
      colors: ['#ccc', '#999'],
      slug: this.slugify('Montura metálica unisex'),
    },
  ];

  getAll() {
    return this.products;
  }

  getBySlug(slug: string) {
    return this.products.find(p => p.slug === slug) ?? null;
  }
}
