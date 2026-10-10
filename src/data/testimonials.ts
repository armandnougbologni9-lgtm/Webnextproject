export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Camille & Marc',
    role: 'Habitués du coucher de soleil',
    quote: 'On ne vient pas seulement boire un cocktail, on vient respirer. Le son des vagues, l’accueil bienveillant des barmen et la fraîcheur des verres créent une bulle de paix rare.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    author: 'Aurélien D.',
    role: 'Séminaire d’équipe',
    quote: 'Nous avons réservé l’espace professionnel pour un atelier de réflexion stratégique. Travailler face à l’océan dans ce calme, puis terminer sur la plage avec un cocktail sur-mesure a transformé notre journée.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    author: 'Séphora M.',
    role: 'Passionnée de mixologie',
    quote: 'La délicatesse des accords fruités et floraux sans aucune agressivité. Chaque recette est équilibrée, servie avec légèreté et sincérité.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
];
