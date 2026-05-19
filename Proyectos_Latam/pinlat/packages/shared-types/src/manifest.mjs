export const project = {
  "title": "PinLat",
  "slug": "pinlat",
  "codename": "pinlat",
  "summary": "Plataforma visual inspirada en Pinterest con enfoque regional, social y comercial.",
  "stack": [
    "Next.js 15",
    "Expo",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "FastAPI"
  ],
  "modules": [
    "feed visual",
    "pins",
    "boards",
    "busqueda",
    "cuentas de negocio"
  ],
  "server": {
    "entry": "apps/api",
    "port": 4103
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/feed",
    "summary": "Feed visual principal",
    "response": {
      "pins": [
        {
          "id": "pin_1",
          "title": "Decoracion andina",
          "image": "/mock/pin-1.jpg",
          "saves": 412,
          "author": "@mariana.deco",
          "palette": "terracota",
          "tags": ["decoracion", "andino", "textiles"]
        },
        {
          "id": "pin_2",
          "title": "Comida callejera CDMX",
          "image": "/mock/pin-2.jpg",
          "saves": 911,
          "author": "@chef.lupe",
          "palette": "maiz",
          "tags": ["comida", "mexico", "callejero"]
        },
        {
          "id": "pin_3",
          "title": "Cafetales de Antioquia",
          "image": "/mock/pin-3.jpg",
          "saves": 327,
          "author": "@cafe.colombiano",
          "palette": "verde-cafe",
          "tags": ["viajes", "colombia", "cafe"]
        },
        {
          "id": "pin_4",
          "title": "Sala boho minimalista",
          "image": "/mock/pin-4.jpg",
          "saves": 1284,
          "author": "@hogar.calido",
          "palette": "arena",
          "tags": ["hogar", "boho", "minimalismo"]
        },
        {
          "id": "pin_5",
          "title": "Pollera paisa moderna",
          "image": "/mock/pin-5.jpg",
          "saves": 198,
          "author": "@moda.medellin",
          "palette": "fucsia",
          "tags": ["moda", "colombia", "tradicional"]
        },
        {
          "id": "pin_6",
          "title": "Arepas reina pepiada",
          "image": "/mock/pin-6.jpg",
          "saves": 745,
          "author": "@cocina.venezolana",
          "palette": "amarillo",
          "tags": ["comida", "venezuela", "receta"]
        },
        {
          "id": "pin_7",
          "title": "Cartagena al atardecer",
          "image": "/mock/pin-7.jpg",
          "saves": 2056,
          "author": "@viajero.caribe",
          "palette": "coral",
          "tags": ["viajes", "colombia", "caribe"]
        },
        {
          "id": "pin_8",
          "title": "Macrame patagonico",
          "image": "/mock/pin-8.jpg",
          "saves": 412,
          "author": "@taller.austral",
          "palette": "ocre",
          "tags": ["decoracion", "argentina", "artesania"]
        },
        {
          "id": "pin_9",
          "title": "Outfit andino streetwear",
          "image": "/mock/pin-9.jpg",
          "saves": 567,
          "author": "@calle.lima",
          "palette": "morado",
          "tags": ["moda", "peru", "urbano"]
        },
        {
          "id": "pin_10",
          "title": "Ceviche del Pacifico",
          "image": "/mock/pin-10.jpg",
          "saves": 1390,
          "author": "@sabor.lima",
          "palette": "limon",
          "tags": ["comida", "peru", "mariscos"]
        },
        {
          "id": "pin_11",
          "title": "Cocina campestre uruguaya",
          "image": "/mock/pin-11.jpg",
          "saves": 233,
          "author": "@campo.uy",
          "palette": "tierra",
          "tags": ["hogar", "uruguay", "rustico"]
        },
        {
          "id": "pin_12",
          "title": "Bolsos wayuu coloridos",
          "image": "/mock/pin-12.jpg",
          "saves": 884,
          "author": "@artesano.guajira",
          "palette": "arcoiris",
          "tags": ["moda", "colombia", "wayuu"]
        },
        {
          "id": "pin_13",
          "title": "Vista del Machu Picchu",
          "image": "/mock/pin-13.jpg",
          "saves": 3120,
          "author": "@trekker.peru",
          "palette": "verde-piedra",
          "tags": ["viajes", "peru", "montaña"]
        },
        {
          "id": "pin_14",
          "title": "Mate gourmet rosarino",
          "image": "/mock/pin-14.jpg",
          "saves": 318,
          "author": "@matero.ar",
          "palette": "verde-mate",
          "tags": ["comida", "argentina", "tradicion"]
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/boards",
    "summary": "Tableros destacados",
    "response": {
      "boards": [
        {
          "id": "board_1",
          "name": "Recetas latinas",
          "pinCount": 87,
          "cover": "maiz",
          "owner": "@chef.lupe"
        },
        {
          "id": "board_2",
          "name": "Viajes en Sudamerica",
          "pinCount": 46,
          "cover": "coral",
          "owner": "@viajero.caribe"
        },
        {
          "id": "board_3",
          "name": "Hogar calido LATAM",
          "pinCount": 128,
          "cover": "arena",
          "owner": "@hogar.calido"
        },
        {
          "id": "board_4",
          "name": "Moda andina contemporanea",
          "pinCount": 54,
          "cover": "morado",
          "owner": "@calle.lima"
        },
        {
          "id": "board_5",
          "name": "Artesanias y textiles",
          "pinCount": 73,
          "cover": "ocre",
          "owner": "@taller.austral"
        },
        {
          "id": "board_6",
          "name": "Cafes con encanto",
          "pinCount": 39,
          "cover": "verde-cafe",
          "owner": "@cafe.colombiano"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/categories",
    "summary": "Categorias destacadas LATAM",
    "response": {
      "categories": [
        { "id": "cat_decoracion", "label": "Decoracion", "emoji": "🏺", "palette": "terracota" },
        { "id": "cat_viajes", "label": "Viajes", "emoji": "✈️", "palette": "coral" },
        { "id": "cat_comida", "label": "Comida", "emoji": "🌽", "palette": "maiz" },
        { "id": "cat_moda", "label": "Moda", "emoji": "👗", "palette": "fucsia" },
        { "id": "cat_hogar", "label": "Hogar", "emoji": "🛋️", "palette": "arena" },
        { "id": "cat_artesania", "label": "Artesania", "emoji": "🧶", "palette": "ocre" },
        { "id": "cat_cafe", "label": "Cafe", "emoji": "☕", "palette": "verde-cafe" },
        { "id": "cat_naturaleza", "label": "Naturaleza", "emoji": "🌿", "palette": "verde-piedra" }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/pin/featured",
    "summary": "Pin destacado del dia",
    "response": {
      "pin": {
        "id": "pin_featured",
        "title": "Mercado de Otavalo en vivo",
        "image": "/mock/pin-featured.jpg",
        "saves": 5421,
        "author": "@otavalo.market",
        "palette": "arcoiris",
        "description": "Recorrido visual por el mercado mas colorido de Ecuador, lleno de textiles y aromas.",
        "tags": ["ecuador", "mercado", "viajes", "cultura"]
      }
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/pins",
    "summary": "Crear pin en borrador",
    "requestExample": {
      "title": "Nuevo pin",
      "boardId": "board_1"
    },
    "response": {
      "id": "pin_new",
      "status": "draft",
      "indexed": false
    }
  }
];
