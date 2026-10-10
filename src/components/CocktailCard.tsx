'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Cocktail } from '../data/cocktails';

interface CocktailCardProps {
  cocktail: Cocktail;
  priority?: boolean;
}

export default function CocktailCard({ cocktail, priority = false }: CocktailCardProps) {
  return (
    <article className="cocktail-card" aria-label={`Création : ${cocktail.name}`}>
      {/* PHOTO HAUTE DÉFINITION */}
      <div className="card-image-box">
        <Image
          src={cocktail.image}
          alt={`Cocktail ${cocktail.name} servi frais face à la mer`}
          width={560}
          height={400}
          className="cocktail-photo"
          priority={priority}
        />
        <div className="card-category-badge">{cocktail.category}</div>
      </div>

      {/* CONTENU AÉRÉ */}
      <div className="card-content">
        <div className="card-header-row">
          <div>
            <span className="card-tagline">{cocktail.tagline}</span>
            <h3 className="card-title">{cocktail.name}</h3>
          </div>
          <div className="card-price-pill">
            {cocktail.price} <span className="currency">{cocktail.currency}</span>
          </div>
        </div>

        <p className="card-description text-readable">
          {cocktail.description}
        </p>

        {/* LISTE DES INGRÉDIENTS */}
        <div className="ingredients-box">
          <span className="ingredients-label">Accords & Ingrédients :</span>
          <div className="ingredients-pills">
            {cocktail.ingredients.map((ing, i) => (
              <span key={i} className="ingredient-pill">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* BOUTON COMMANDER */}
        <div className="card-action">
          <Link
            href={`/contact?cocktail=${encodeURIComponent(cocktail.name)}`}
            className="btn-order-cocktail"
            aria-label={`Commander ${cocktail.name}`}
          >
            <ShoppingBag size={16} />
            <span>Commander ce cocktail</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
