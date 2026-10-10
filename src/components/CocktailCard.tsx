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

      <style jsx>{`
        .cocktail-card {
          background-color: #FFFFFF;
          border-radius: 28px;
          border: 1px solid rgba(14, 116, 144, 0.12);
          box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 600ms var(--ease-wave), box-shadow 600ms var(--ease-wave);
        }

        .cocktail-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px -10px rgba(14, 116, 144, 0.12);
        }

        .card-image-box {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          background-color: var(--color-sky-soft);
        }

        .cocktail-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1000ms var(--ease-wave);
        }

        .cocktail-card:hover .cocktail-photo {
          transform: scale(1.04);
        }

        .card-category-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: var(--color-sea-blue);
          border: 1px solid rgba(14, 116, 144, 0.15);
        }

        .card-content {
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .card-tagline {
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-sand-gold);
          font-weight: 500;
          display: block;
          margin-bottom: 4px;
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--color-sea-dark);
          font-weight: 500;
          line-height: 1.25;
        }

        .card-price-pill {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--color-sea-blue);
          white-space: nowrap;
          background-color: var(--color-sky-soft);
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(14, 116, 144, 0.15);
        }

        .currency {
          font-size: 0.85rem;
          font-family: var(--font-sans);
          font-weight: 400;
          color: var(--color-text-muted);
        }

        .card-description {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          margin-bottom: 24px;
          flex: 1;
        }

        .ingredients-box {
          border-top: 1px solid rgba(14, 116, 144, 0.08);
          padding-top: 18px;
          margin-bottom: 28px;
        }

        .ingredients-label {
          display: block;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-light);
          margin-bottom: 10px;
        }

        .ingredients-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ingredient-pill {
          background-color: var(--color-bg-warm);
          border: 1px solid rgba(14, 116, 144, 0.1);
          border-radius: 9999px;
          padding: 4px 12px;
          font-size: 0.8rem;
          color: var(--color-text-main);
        }

        .card-action {
          margin-top: auto;
        }

        .btn-order-cocktail {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 9999px;
          background-color: var(--color-sea-dark);
          color: #FFFFFF;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          transition: all 400ms var(--ease-wave);
        }

        .btn-order-cocktail:hover {
          background-color: var(--color-sea-blue);
          box-shadow: 0 8px 24px rgba(14, 116, 144, 0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .card-image-box {
            height: 240px;
          }
          .card-content {
            padding: 24px 20px;
          }
          .card-header-row {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </article>
  );
}
