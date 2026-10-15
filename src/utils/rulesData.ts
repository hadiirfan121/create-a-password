export interface ElementData {
  symbol: string;
  name: string;
  number: number;
}

export const PERIODIC_TABLE: ElementData[] = [
  { symbol: 'H', name: 'Hydrogen', number: 1 },
  { symbol: 'He', name: 'Helium', number: 2 },
  { symbol: 'Li', name: 'Lithium', number: 3 },
  { symbol: 'Be', name: 'Beryllium', number: 4 },
  { symbol: 'B', name: 'Boron', number: 5 },
  { symbol: 'C', name: 'Carbon', number: 6 },
  { symbol: 'N', name: 'Nitrogen', number: 7 },
  { symbol: 'O', name: 'Oxygen', number: 8 },
  { symbol: 'F', name: 'Fluorine', number: 9 },
  { symbol: 'Ne', name: 'Neon', number: 10 },
  { symbol: 'Na', name: 'Sodium', number: 11 },
  { symbol: 'Mg', name: 'Magnesium', number: 12 },
  { symbol: 'Al', name: 'Aluminum', number: 13 },
  { symbol: 'Si', name: 'Silicon', number: 14 },
  { symbol: 'P', name: 'Phosphorus', number: 15 },
  { symbol: 'S', name: 'Sulfur', number: 16 },
  { symbol: 'Cl', name: 'Chlorine', number: 17 },
  { symbol: 'Ar', name: 'Argon', number: 18 },
  { symbol: 'K', name: 'Potassium', number: 19 },
  { symbol: 'Ca', name: 'Calcium', number: 20 },
  { symbol: 'Fe', name: 'Iron', number: 26 },
  { symbol: 'Cu', name: 'Copper', number: 29 },
  { symbol: 'Zn', name: 'Zinc', number: 30 },
  { symbol: 'Ag', name: 'Silver', number: 47 },
  { symbol: 'Pt', name: 'Platinum', number: 78 },
  { symbol: 'Au', name: 'Gold', number: 79 },
  { symbol: 'Pb', name: 'Lead', number: 82 },
];

export const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

export const TECH_SPONSORS = [
  { name: 'NVIDIA', tag: 'AI & GPU Computing Pioneer' },
  { name: 'INTEL', tag: 'Architecting Future Silicon' },
  { name: 'GITHUB', tag: 'Where the World Builds Software' },
];

export interface CountryGeo {
  name: string;
  capital: string;
  continent: string;
  clue: string;
}

export const COUNTRIES: CountryGeo[] = [
  { name: 'Japan', capital: 'Tokyo', continent: 'Asia', clue: 'High-tech nation renowned for robotics, bullet trains, and Mount Fuji.' },
  { name: 'Iceland', capital: 'Reykjavik', continent: 'Europe', clue: 'Volcanic island nation powered entirely by clean geothermal & hydro energy.' },
  { name: 'Canada', capital: 'Ottawa', continent: 'North America', clue: 'Vast northern country known for the maple leaf, quantum computing hubs, and northern lights.' },
  { name: 'Germany', capital: 'Berlin', continent: 'Europe', clue: 'European engineering powerhouse famous for automotive precision and the Autobahn.' },
  { name: 'Egypt', capital: 'Cairo', continent: 'Africa', clue: 'Ancient civilization on the Nile home to the Giza Pyramids and Great Sphinx.' },
];


export interface ChessPuzzle {
  fen: string;
  solution: string;
  turn: 'White';
  description: string;
  hint: string;
}

export const CHESS_PUZZLES: ChessPuzzle[] = [
  {
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    solution: 'Bxf7+',
    turn: 'White',
    description: 'White to move. Deliver check with bishop sacrifice!',
    hint: 'Bishop captures f7 pawn with check'
  },
  {
    fen: '6k1/5ppp/8/8/8/8/4rPPP/3R2K1 w - - 0 1',
    solution: 'Rd8+',
    turn: 'White',
    description: 'White to move. Back-rank tactical checkmate!',
    hint: 'Rook slides to back rank on d8'
  }
];

export const CODE_KEYWORDS = ['function', 'lambda', 'async', 'return'];

export const AFFIRMATIVE_WORDS = ['yes', 'definitely', 'affirmative', 'verified'];

export function generateCaptcha(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
