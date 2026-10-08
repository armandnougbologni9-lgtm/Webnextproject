import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { Cocktail } from '@/data/cocktails';
import styles from './CocktailCard.module.css';

interface CocktailCardProps {
  cocktail: Cocktail;
  onSelect?: (cocktailName: string) => void;
}

export const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, onSelect }) => {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('selectCocktail', { detail: cocktail.name }));
    }
    if (onSelect) {
      onSelect(cocktail.name);
    }
  };

  return (
    <article className={styles.card} id={`cocktail-${cocktail.id}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={cocktail.image}
          alt={cocktail.name}
          width={600}
          height={420}
          className={styles.image}
        />
        {cocktail.isPopular && (
          <span className={styles.popularBadge}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            Populaire
          </span>
        )}
        <span className={styles.badge}>{cocktail.category}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.name}>{cocktail.name}</h3>
          <span className={styles.price}>{cocktail.price} €</span>
        </div>

        <p className={styles.tagline}>{cocktail.tagline}</p>
        <p className={styles.description}>{cocktail.description}</p>

        <div className={styles.ingredientsSection}>
          <div className={styles.ingredientsTitle}>Ingrédients d’élite</div>
          <ul className={styles.ingredientsList} aria-label={`Ingrédients de ${cocktail.name}`}>
            {cocktail.ingredients.map((item, idx) => (
              <li key={idx} className={styles.ingredientTag}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={`#contact?cocktail=${encodeURIComponent(cocktail.name)}`}
          className={styles.ctaButton}
          onClick={handleClick}
          aria-label={`Commander ${cocktail.name} pour ${cocktail.price} euros`}
        >
          <ShoppingBag size={17} />
          <span>Commander</span>
        </a>
      </div>
    </article>
  );
};

export default CocktailCard;
