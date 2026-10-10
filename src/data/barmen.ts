export interface Barman {
  id: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  signatureName: string;
  signatureTitle: string;
  signatureCocktail: {
    name: string;
    description: string;
    ingredients: string[];
    price: string;
  };
}

export const BARMEN_TEAM: Barman[] = [
  {
    id: 'tiago-silva',
    name: 'Tiago Silva',
    role: 'Chef Barman & Maître des Agrumes',
    tagline: 'L’écoute attentive et la douceur des agrumes frais',
    description:
      'Au rez-de-chaussée de notre maison, Tiago vous accueille en t-shirt avec un sourire apaisant. Jamais pressé, toujours à l’écoute, il échange chaleureusement avec chaque client accoudé au comptoir pour cerner son humeur avant de composer son verre dans un calme absolu. Ses gestes sont d’une minutie exemplaire, transformant chaque fruit pressé minute en une caresse pour l’âme.',
    image: '/barmen/tiago-silva.jpg',
    alt: 'Tiago Silva, barman souriant en t-shirt décontracté au rez-de-chaussée, garnissant avec minutie un cocktail au romarin pour un client',
    signatureName: 'Tiago Silva',
    signatureTitle: 'Chef Barman Fondateur',
    signatureCocktail: {
      name: 'Brise de Bonerris',
      description:
        'Une création signature vive et revigorante qui capture l’instant où la première brise marine touche le rivage chaud.',
      ingredients: ['Yuzu frais pressé', 'Gin infusé au romarin sauvage', 'Liqueur de bergamote', 'Eau saline gazéifiée'],
      price: '14 €',
    },
  },
  {
    id: 'malo-guerand',
    name: 'Malo Guérand',
    role: 'Alchimiste des Botaniques & Distillats Marins',
    tagline: 'La sérénité des herbes côtières et des sels précieux',
    description:
      'Vêtu de son t-shirt en coton écru, Malo insuffle au comptoir une paix communicative. Lorsqu’un client s’installe face à lui, il prend plaisir à lui expliquer les vertus de la salicorne, des poivres rares et des fleurs marines qu’il assemble sous ses yeux. Servir un client est pour lui un rituel de bienveillance et de lenteur partagée.',
    image: '/barmen/malo-guerand.jpg',
    alt: 'Malo Guérand, barman barbu en t-shirt blanc, servant un cocktail fumé avec le sourire à une cliente au comptoir face à l’océan',
    signatureName: 'Malo Guérand',
    signatureTitle: 'Mixologue Botanique',
    signatureCocktail: {
      name: 'Écume Crépusculaire',
      description:
        'Un élixir profond et fumé, hommage aux couchers de soleil dorés lorsque l’horizon s’embrase de pourpre.',
      ingredients: ['Mezcal doux fumé au bois flotté', 'Fleur de sureau sauvage', 'Sel rose marin de Guérande', 'Zeste de pamplemousse rose'],
      price: '16 €',
    },
  },
  {
    id: 'clementine-roche',
    name: 'Clémentine Roche',
    role: 'Créatrice des Nectars & Mocktails Délicats',
    tagline: 'La poésie des fruits tropicaux et des glaces cristallines',
    description:
      'Toujours rayonnante dans son t-shirt décontracté, Clémentine sculpte chaque bloc de glace cristalline et dépose les fleurs comestibles avec une infinie délicatesse. Face aux hôtes, elle crée un havre où le temps s’arrête, servant des créations subtiles et des nectars sans alcool qui réveillent les sens avec légèreté.',
    image: '/barmen/clementine-roche.jpg',
    alt: 'Clémentine Roche, barmade souriante en t-shirt beige et tablier, tendant un cocktail frais garni de fleurs tropicales à un client',
    signatureName: 'Clémentine Roche',
    signatureTitle: 'Créatrice Nectars & Mocktails',
    signatureCocktail: {
      name: 'Nectar d’Or Céleste',
      description:
        'Une composition sans alcool veloutée et parfumée, célébrant la générosité des fruits gorgés de soleil.',
      ingredients: ['Mangue sauvage pressée à froid', 'Cardamome verte concassée', 'Ginger beer artisanale', 'Brume de fleur d’oranger'],
      price: '12 €',
    },
  },
];
