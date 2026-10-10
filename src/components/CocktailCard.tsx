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

        {/* BOUTON COMMANDER ET PAYER SUR FEDAPAY (OBLIGATOIRE) */}
        <div className="card-action">
          <a
            href="https://me.fedapay.com/Cocktails"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-order-cocktail"
            aria-label={`Commander et payer en ligne ${cocktail.name} sur FedaPay`}
          >
            <ShoppingBag size={16} />
            <span>Payer & Commander ({cocktail.price} {cocktail.currency})</span>
          </a>
        </div>
      </div>
    </article>
  );
}
