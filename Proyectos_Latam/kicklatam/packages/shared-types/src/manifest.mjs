export const project = {
  "title": "KickLATAM",
  "slug": "kicklatam",
  "codename": "kicklatam",
  "summary": "Plataforma de streaming en vivo para LATAM con chat, monetizacion y VOD.",
  "stack": [
    "Next.js 14",
    "Expo",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "MongoDB",
    "FFmpeg"
  ],
  "modules": [
    "streams en vivo",
    "chat",
    "suscripciones",
    "moderacion",
    "vod"
  ],
  "server": {
    "entry": "services/gateway",
    "port": 4105
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/streams",
    "summary": "Streams destacados",
    "response": {
      "streams": [
        {
          "id": "stream_1",
          "title": "Rankeds Valorant LATAM Norte",
          "viewers": 12450,
          "language": "es",
          "category": "Gaming",
          "streamer": "ZeusPlay",
          "country": "MX",
          "thumbnailPalette": ["#22d3ee", "#0ea5e9"]
        },
        {
          "id": "stream_2",
          "title": "IRL caminando por Sao Paulo",
          "viewers": 3480,
          "language": "pt",
          "category": "IRL",
          "streamer": "LuanaTV",
          "country": "BR",
          "thumbnailPalette": ["#f472b6", "#a855f7"]
        },
        {
          "id": "stream_3",
          "title": "Cumbia y charla con la banda",
          "viewers": 5210,
          "language": "es",
          "category": "Musica",
          "streamer": "ElCheBeats",
          "country": "AR",
          "thumbnailPalette": ["#facc15", "#f97316"]
        },
        {
          "id": "stream_4",
          "title": "League of Legends Diamond grind",
          "viewers": 8900,
          "language": "es",
          "category": "Gaming",
          "streamer": "ColombiaTopLane",
          "country": "CO",
          "thumbnailPalette": ["#34d399", "#10b981"]
        },
        {
          "id": "stream_5",
          "title": "Charlando del Mundial de Esports",
          "viewers": 2740,
          "language": "es",
          "category": "Esports",
          "streamer": "ChilePlay",
          "country": "CL",
          "thumbnailPalette": ["#60a5fa", "#3b82f6"]
        },
        {
          "id": "stream_6",
          "title": "Asado y mate, preguntas abiertas",
          "viewers": 1820,
          "language": "es",
          "category": "Solo Chatting",
          "streamer": "MateuStream",
          "country": "AR",
          "thumbnailPalette": ["#fb7185", "#e11d48"]
        },
        {
          "id": "stream_7",
          "title": "Cocinando arepas en vivo",
          "viewers": 980,
          "language": "es",
          "category": "Cocina",
          "streamer": "CocinaCaracas",
          "country": "VE",
          "thumbnailPalette": ["#fbbf24", "#d97706"]
        },
        {
          "id": "stream_8",
          "title": "CS2 ranked + comentarios",
          "viewers": 15300,
          "language": "es",
          "category": "Gaming",
          "streamer": "FraggerPeru",
          "country": "PE",
          "thumbnailPalette": ["#a3e635", "#65a30d"]
        },
        {
          "id": "stream_9",
          "title": "Sesion DJ reggaeton old school",
          "viewers": 6700,
          "language": "es",
          "category": "Musica",
          "streamer": "DJBoricua",
          "country": "PR",
          "thumbnailPalette": ["#c084fc", "#7c3aed"]
        },
        {
          "id": "stream_10",
          "title": "Hablando de cripto LATAM",
          "viewers": 1240,
          "language": "es",
          "category": "Charla",
          "streamer": "CryptoTico",
          "country": "CR",
          "thumbnailPalette": ["#fcd34d", "#f59e0b"]
        },
        {
          "id": "stream_11",
          "title": "Fortnite con la comunidad",
          "viewers": 4380,
          "language": "es",
          "category": "Gaming",
          "streamer": "UruguayProGG",
          "country": "UY",
          "thumbnailPalette": ["#fda4af", "#f43f5e"]
        },
        {
          "id": "stream_12",
          "title": "Speedrun Hollow Knight cualquier porcentaje",
          "viewers": 3120,
          "language": "es",
          "category": "Gaming",
          "streamer": "EcuaSpeed",
          "country": "EC",
          "thumbnailPalette": ["#5eead4", "#0d9488"]
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/categories",
    "summary": "Categorias disponibles",
    "response": {
      "categories": [
        { "id": "gaming", "name": "Gaming", "viewers": 48230, "palette": ["#22c55e", "#15803d"] },
        { "id": "irl", "name": "IRL", "viewers": 12400, "palette": ["#f472b6", "#a21caf"] },
        { "id": "musica", "name": "Musica", "viewers": 18900, "palette": ["#facc15", "#ea580c"] },
        { "id": "charla", "name": "Charla", "viewers": 7600, "palette": ["#fcd34d", "#b45309"] },
        { "id": "esports", "name": "Esports", "viewers": 22100, "palette": ["#60a5fa", "#1d4ed8"] },
        { "id": "cocina", "name": "Cocina", "viewers": 3200, "palette": ["#fbbf24", "#92400e"] },
        { "id": "solo-chatting", "name": "Solo Chatting", "viewers": 9800, "palette": ["#fb7185", "#9f1239"] }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/vod",
    "summary": "VOD recientes",
    "response": {
      "vod": [
        { "id": "vod_1", "title": "Final Copa LATAM Valorant", "duration": "3:42:18", "views": 184200, "streamer": "ZeusPlay" },
        { "id": "vod_2", "title": "Tour por la favela en bici", "duration": "1:12:05", "views": 56400, "streamer": "LuanaTV" },
        { "id": "vod_3", "title": "Sesion completa cumbia 90s", "duration": "2:35:40", "views": 39800, "streamer": "ElCheBeats" },
        { "id": "vod_4", "title": "Stream completo Diamond LoL", "duration": "5:20:11", "views": 121300, "streamer": "ColombiaTopLane" },
        { "id": "vod_5", "title": "Debate Mundial Esports", "duration": "0:58:32", "views": 22700, "streamer": "ChilePlay" },
        { "id": "vod_6", "title": "Asado largo con invitados", "duration": "4:02:00", "views": 47100, "streamer": "MateuStream" },
        { "id": "vod_7", "title": "Receta de arepas paso a paso", "duration": "0:42:15", "views": 18900, "streamer": "CocinaCaracas" },
        { "id": "vod_8", "title": "Highlights CS2 Major", "duration": "1:48:30", "views": 87600, "streamer": "FraggerPeru" }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/chat/demo",
    "summary": "Chat demo para desarrollo",
    "response": {
      "messages": [
        { "id": "msg_1", "user": "mod_latam", "text": "Bienvenidos al stream", "color": "#22c55e" },
        { "id": "msg_2", "user": "viewer_22", "text": "Vamos con todo", "color": "#60a5fa" },
        { "id": "msg_3", "user": "shadowfox", "text": "Que clip ese ultimo!!", "color": "#f472b6" },
        { "id": "msg_4", "user": "elgato_arg", "text": "Saludos desde Cordoba", "color": "#facc15" },
        { "id": "msg_5", "user": "viewer_77", "text": "Subi el volumen del juego", "color": "#a78bfa" },
        { "id": "msg_6", "user": "mod_latam", "text": "Recuerden las reglas del chat", "color": "#22c55e" },
        { "id": "msg_7", "user": "pixel_chile", "text": "PogChamp", "color": "#fb7185" },
        { "id": "msg_8", "user": "br_fan", "text": "Manda saludo a Sao Paulo", "color": "#34d399" }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/chat/send",
    "summary": "Enviar mensaje al chat",
    "requestExample": {
      "streamerId": "stream_1",
      "message": "Hola comunidad"
    },
    "response": {
      "status": "sent",
      "id": "msg_mock_999"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/subscriptions",
    "summary": "Simular alta de suscripcion",
    "requestExample": {
      "streamerId": "streamer_77",
      "tier": "gold"
    },
    "response": {
      "status": "active",
      "renewsAt": "2026-04-13T00:00:00Z"
    }
  }
];
