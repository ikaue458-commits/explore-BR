export const statesData: Record<string, { name: string; spots: string[]; region: string; color: string }> = {
  AM: { name: "Amazonas", spots: ["Teatro Amazonas", "Encontro das Águas", "Praia da Ponta Negra", "Bosque da Ciência", "Lago Janauari"], region: "Norte", color: "#2D5A27" },
  PA: { name: "Pará", spots: ["Ver-o-Peso", "Ilha do Marajó", "Alter do Chão", "Estação das Docas", "Mangal das Garças"], region: "Norte", color: "#2D5A27" },
  AC: { name: "Acre", spots: ["Parque Nacional da Serra do Divisor", "Ponte Metálica de Rio Branco", "Palácio Rio Branco", "Gameleira", "Lagoa do Amapá"], region: "Norte", color: "#2D5A27" },
  RO: { name: "Rondônia", spots: ["Cachoeira do Samuel", "Mirante do Gavião", "Parque Nacional Pacaás Novos", "Pousada Rio Madeira", "Teatro Guaporé"], region: "Norte", color: "#2D5A27" },
  RR: { name: "Roraima", spots: ["Monte Roraima", "Parque Nacional do Viruá", "Praia Grande do Rio Branco", "Tepui", "Lagoa Caracaranã"], region: "Norte", color: "#2D5A27" },
  AP: { name: "Amapá", spots: ["Fortaleza de São José de Macapá", "Lago do Curiaú", "Arquipélago do Bailique", "RESEX do Cajari", "Marco Zero do Equador"], region: "Norte", color: "#2D5A27" },
  TO: { name: "Tocantins", spots: ["Parque Estadual do Cantão", "Cachoeira da Velha", "Jalapão", "Palmas", "Praia da Graciosa"], region: "Norte", color: "#2D5A27" },
  MA: { name: "Maranhão", spots: ["Lençóis Maranhenses", "São Luís Centro Histórico", "Parque Nacional dos Lençóis", "Praia dos Carneiros", "Alcântara"], region: "Nordeste", color: "#E63946" },
  PI: { name: "Piauí", spots: ["Delta do Parnaíba", "Parque Nacional Serra da Capivara", "Pedra do Castelo", "Lagoa de Itaipava", "Bonfim"], region: "Nordeste", color: "#E63946" },
  CE: { name: "Ceará", spots: ["Praia de Jericoacoara", "Canoa Quebrada", "Ubajara", "Morro Branco", "Serra de Baturité"], region: "Nordeste", color: "#E63946" },
  RN: { name: "Rio Grande do Norte", spots: ["Praia de Pipa", "Dunas de Genipabu", "Natal Centro", "Maracajaú", "São Miguel do Gostoso"], region: "Nordeste", color: "#E63946" },
  PB: { name: "Paraíba", spots: ["João Pessoa Orla", "Cabo Branco", "Praia do Coqueirinho", "Serra da Borborema", "Brejo das Freiras"], region: "Nordeste", color: "#E63946" },
  PE: { name: "Pernambuco", spots: ["Fernando de Noronha", "Porto de Galinhas", "Recife Antigo", "Serra Negra", "Vale do Catimbau"], region: "Nordeste", color: "#E63946" },
  AL: { name: "Alagoas", spots: ["Maceió Praia", "Maragogi", "Penedo", "São Miguel dos Milagres", "Paripueira"], region: "Nordeste", color: "#E63946" },
  SE: { name: "Sergipe", spots: ["Cânion do São Francisco", "Praia de Aracaju", "Parque Nacional Serra de Itabaiana", "Croa do Goré", "Laranjeiras"], region: "Nordeste", color: "#E63946" },
  BA: { name: "Bahia", spots: ["Porto Seguro", "Chapada Diamantina", "Pelourinho Salvador", "Praia do Espelho", "Lençóis"], region: "Nordeste", color: "#E63946" },
  MG: { name: "Minas Gerais", spots: ["Ouro Preto", "Diamantina", "Parque Estadual do Ibitipoca", "Tiradentes", "Capitólio"], region: "Sudeste", color: "#1D3557" },
  ES: { name: "Espírito Santo", spots: ["Guarapari", "Anchieta", "Pedra Azul", "Vila Velha", "Santa Teresa"], region: "Sudeste", color: "#1D3557" },
  RJ: { name: "Rio de Janeiro", spots: ["Cristo Redentor", "Pão de Açúcar", "Ilha Grande", "Búzios", "Paraty"], region: "Sudeste", color: "#1D3557" },
  SP: { name: "São Paulo", spots: ["Campos do Jordão", "Bonito SP", "Ilhabela", "Litoral Sul", "Interior Paulista"], region: "Sudeste", color: "#1D3557" },
  PR: { name: "Paraná", spots: ["Foz do Iguacu", "Ilha do Mel", "Curitiba Centro", "Vila Velha PR", "Guaratuba"], region: "Sul", color: "#FBC02D" },
  SC: { name: "Santa Catarina", spots: ["Praia de Florianópolis", "Balneário Camboriú", "Serra Gaúcha SC", "Blumenau", "Beto Carrero"], region: "Sul", color: "#FBC02D" },
  RS: { name: "Rio Grande do Sul", spots: ["Bento Gonçalves", "Gramado", "Canela", "Torres", "Litoral Gaúcho"], region: "Sul", color: "#FBC02D" },
  MS: { name: "Mato Grosso do Sul", spots: ["Pantanal", "Bonito MS", "Campo Grande", "Corumbá", "Piraputanga"], region: "Centro-Oeste", color: "#FB8500" },
  MT: { name: "Mato Grosso", spots: ["Chapada dos Guimarães", "Alta Floresta", "Cuiabá Histórica", "Rio Cristalino", "Barra do Garças"], region: "Centro-Oeste", color: "#FB8500" },
  GO: { name: "Goiás", spots: ["Chapada dos Veadeiros", "Caldas Novas", "Pirenópolis", "Serra Dourada", "Cachoeira Santa Maria"], region: "Centro-Oeste", color: "#FB8500" },
  DF: { name: "Distrito Federal", spots: ["Brasília Monumental", "Parque Nacional de Brasília", "Pontão do Lago Sul", "Santuário Dom Bosco", "Jardim Botânico"], region: "Centro-Oeste", color: "#FB8500" },
};

export const photographers = [
  { id: 1, name: "Lucas Mendes", drone: true, rating: 5, reviews: 89, price: "R$ 400 - R$ 800", status: "Available", img: "1", phone: "11992345678" },
  { id: 2, name: "Camila Rocha", drone: false, rating: 4, reviews: 54, price: "R$ 250 - R$ 450", status: "Available", img: "2", phone: "21987654321" },
  { id: 3, name: "Rafael Andrade", drone: true, rating: 5, reviews: 112, price: "R$ 500 - R$ 900", status: "Busy", img: "3", phone: "81998765432" },
  { id: 4, name: "Juliana Ferreira", drone: false, rating: 4, reviews: 38, price: "R$ 200 - R$ 380", status: "Available", img: "4", phone: "71985432100" },
  { id: 5, name: "Thiago Costa", drone: true, rating: 5, reviews: 201, price: "R$ 600 - R$ 1000", status: "Available", img: "5", phone: "48993210987" },
  { id: 6, name: "Mariana Souza", drone: false, rating: 3, reviews: 22, price: "R$ 180 - R$ 300", status: "Available", img: "6", phone: "85982345670" },
  { id: 7, name: "Pedro Oliveira", drone: true, rating: 4, reviews: 67, price: "R$ 450 - R$ 750", status: "Available", img: "7", phone: "92991123344" },
  { id: 8, name: "Ana Lima", drone: false, rating: 5, reviews: 95, price: "R$ 280 - R$ 500", status: "Available", img: "8", phone: "31980012233" },
];

export const drivers = [
  { id: 1, name: "Carlos Eduardo", car: "Toyota Hilux SW4", type: "SUV", capacity: 7, rating: 5, reviews: 143, status: "Available", img: "31", phone: "11980011122" },
  { id: 2, name: "Fernanda Nunes", car: "Volkswagen T-Cross", type: "SUV", capacity: 5, rating: 4, reviews: 78, status: "Available", img: "32", phone: "21993024455" },
  { id: 3, name: "Marcos Vieira", car: "Renault Duster", type: "SUV", capacity: 5, rating: 5, reviews: 211, status: "Busy", img: "33", phone: "81985436677" },
  { id: 4, name: "Beatriz Santos", car: "Hyundai HB20", type: "Sedan", capacity: 5, rating: 3, reviews: 34, status: "Available", img: "34", phone: "71990018899" },
  { id: 5, name: "Diego Alves", car: "Fiat Ducato Van", type: "Van", capacity: 12, rating: 5, reviews: 167, status: "Available", img: "35", phone: "48982340011" },
  { id: 6, name: "Patricia Lima", car: "Chevrolet Onix", type: "Sedan", capacity: 5, rating: 4, reviews: 89, status: "Available", img: "36", phone: "85998762233" },
  { id: 7, name: "Roberto Machado", car: "Ford Ranger", type: "Picape", capacity: 5, rating: 5, reviews: 304, status: "Available", img: "37", phone: "92981124455" },
  { id: 8, name: "Simone Castro", car: "Renault Kangoo", type: "Van", capacity: 7, rating: 4, reviews: 56, status: "Available", img: "38", phone: "31995436677" },
];

export const testimonials = [
  { 
    name: "Ana Paula", 
    location: "GO", 
    text: "Visitamos o Jalapão e foi incrível! O motorista conhecia todos os atalhos e o fotógrafo capturou momentos que jamais esqueceremos.", 
    rating: 5, 
    img: "40",
    photos: ["https://picsum.photos/seed/jalapao1/800/600", "https://picsum.photos/seed/jalapao2/800/600", "https://picsum.photos/seed/jalapao3/800/600"]
  },
  { 
    name: "Rodrigo e Família", 
    location: "PE", 
    text: "Fernando de Noronha é um sonho, e com o drone do fotógrafo ficou ainda mais mágico!", 
    rating: 5, 
    img: "41",
    photos: ["https://picsum.photos/seed/noronha1/800/600", "https://picsum.photos/seed/noronha2/800/600"]
  },
  { 
    name: "Marina Costa", 
    location: "BA", 
    text: "O motorista nos levou por toda Chapada Diamantina com muita segurança. Recomendo muito!", 
    rating: 5, 
    img: "42",
    photos: ["https://picsum.photos/seed/chapada1/800/600", "https://picsum.photos/seed/chapada2/800/600", "https://picsum.photos/seed/chapada3/800/600", "https://picsum.photos/seed/chapada4/800/600"]
  },
];
