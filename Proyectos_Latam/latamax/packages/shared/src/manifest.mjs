export const project = {
  "title": "LatamaX",
  "slug": "latamax",
  "codename": "latamax",
  "summary": "Red social estilo Twitter/X enfocada en audiencias de Latinoamerica.",
  "stack": [
    "Next.js 14",
    "Expo",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "WebSockets"
  ],
  "modules": [
    "feed social",
    "perfiles",
    "tendencias",
    "mensajeria",
    "notificaciones"
  ],
  "server": {
    "entry": "apps/api",
    "port": 4101
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/feed",
    "summary": "Timeline curada para LATAM",
    "response": {
      "items": [
        {
          "id": "post_1",
          "author": "@ana_mx",
          "content": "Bienvenidos a LatamaX",
          "lang": "es-MX"
        },
        {
          "id": "post_2",
          "author": "@joao_br",
          "content": "Noticias e tendencias regionais",
          "lang": "pt-BR"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/trends",
    "summary": "Temas en tendencia por pais",
    "response": {
      "items": [
        {
          "name": "#FutbolLatam",
          "country": "AR",
          "posts": 184200
        },
        {
          "name": "#TechColombia",
          "country": "CO",
          "posts": 45890
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/posts",
    "summary": "Crear un post y enviarlo a moderacion",
    "requestExample": {
      "content": "Hola LATAM",
      "lang": "es-CO"
    },
    "response": {
      "id": "post_new",
      "status": "queued",
      "moderation": "pending"
    }
  }
];
