export interface SpacePhoto {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  alt: string;
  image: string;
  tag: string;
}

export const SPACE_PHOTOS: SpacePhoto[] = [
  {
    id: 'barmen',
    title: 'L’Artisanat au Rez-de-Chaussée',
    subtitle: 'Nos barmen en tenue décontractée',
    description: 'Au rez-de-chaussée, nos barmen vous accueillent en t-shirt avec le sourire, créant chaque cocktail avec minutie dans un calme absolu. L’étage supérieur demeure un havre discret, réservé à l’équipe qui veille au soin et à l’âme de notre maison.',
    alt: 'Barmen de Cóctel Bonerris préparant des créations au bord de l’océan dans une ambiance calme et chaleureuse',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    tag: 'Rez-de-chaussée & Bar',
  },
  {
    id: 'jeux',
    title: 'L’Espace Jeux & Détente',
    subtitle: 'Rires, complicité et brise marine',
    description: 'Un salon aéré pour partager un jeu de société, défier vos amis aux échecs ou savourer un moment de complicité bercé par le clapotis de l’eau.',
    alt: 'Espace de jeux convivial et lumineux au bord de mer',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    tag: 'Détente & Loisirs',
  },
  {
    id: 'espace-pro',
    title: 'L’Espace Professionnel Privatisable',
    subtitle: 'Pour vos séminaires, réunions et ateliers',
    description: 'Une salle lumineuse face à l’océan, conçue pour stimuler la créativité et accueillir vos réunions d’équipe, présentations ou ateliers privés dans la sérénité.',
    alt: 'Salle de réunion et espace professionnel avec vue panoramique sur l’océan',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Location Pro & Séminaires',
  },
  {
    id: 'plage',
    title: 'Notre Plage Réservée',
    subtitle: 'Un rivage aménagé gracieusement pour vous',
    description: 'Un espace de sable fin entièrement financé et entretenu par Cóctel Bonerris pour ses clients. Installez-vous sur un transat, les pieds dans le sable chaud, un verre à la main.',
    alt: 'Plage privée et transats face à la mer sous le soleil doux',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tag: 'Plage & Transats',
  },
  {
    id: 'ambiance',
    title: 'L’Ambiance Générale du Lieu',
    subtitle: 'Lumière naturelle, bois clair et paix infinie',
    description: 'L’harmonie entre l’architecture épurée, le bois blanchi et l’horizon bleu. Ici, le temps suspend son vol pour laisser place à la respiration et à la gratitude.',
    alt: 'Vue d’ensemble du lounge Cóctel Bonerris ouvert sur la mer',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    tag: 'Cadre & Horizon',
  },
];
