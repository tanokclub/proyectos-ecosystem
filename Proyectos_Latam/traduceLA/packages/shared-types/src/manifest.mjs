export const project = {
  "title": "TraduceLA",
  "slug": "traduceLA",
  "codename": "traduceLA",
  "summary": "Traductor conversacional para LATAM con texto, voz y variantes regionales.",
  "stack": [
    "Flutter",
    "Fastify",
    "PostgreSQL",
    "Redis",
    "Whisper",
    "DeepL"
  ],
  "modules": [
    "traduccion de texto",
    "modo conversacion",
    "historial",
    "dialectos",
    "tts/stt"
  ],
  "server": {
    "entry": "packages/api",
    "port": 4104
  }
};

export const apiRoutes = [
  {
    "method": "POST",
    "path": "/api/v1/translate/text",
    "summary": "Traducir texto",
    "requestExample": {
      "text": "Buenos dias",
      "source_lang": "es-CO",
      "target_lang": "en-US"
    },
    "response": {
      "translatedText": "Good morning",
      "detectedSource": "es-CO",
      "latencyMs": 120
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/translate/voice",
    "summary": "Transcribir audio y traducirlo (mock)",
    "requestExample": {
      "audioBase64": "<binary-base64>",
      "source_lang": "es-MX",
      "target_lang": "en-US"
    },
    "response": {
      "transcript": "Buenos dias, donde queda el mercado?",
      "translatedText": "Good morning, where is the market?",
      "detectedSource": "es-MX",
      "confidence": 0.94,
      "latencyMs": 480
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/conversation/session",
    "summary": "Crear sesion de conversacion bilingue",
    "requestExample": {
      "langA": "es-MX",
      "langB": "pt-BR"
    },
    "response": {
      "sessionId": "conv_001",
      "status": "active"
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/history",
    "summary": "Historial reciente",
    "response": {
      "items": [
        {
          "id": "tr_1",
          "input": "Donde esta el hotel?",
          "output": "Where is the hotel?",
          "sourceLang": "es-CO",
          "targetLang": "en-US",
          "createdAt": "2026-05-18T14:22:00Z"
        },
        {
          "id": "tr_2",
          "input": "Obrigado",
          "output": "Gracias",
          "sourceLang": "pt-BR",
          "targetLang": "es-MX",
          "createdAt": "2026-05-18T15:10:00Z"
        },
        {
          "id": "tr_3",
          "input": "Que chevere todo",
          "output": "Everything is awesome",
          "sourceLang": "es-CO",
          "targetLang": "en-US",
          "createdAt": "2026-05-19T08:01:00Z"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/languages",
    "summary": "Lista de idiomas y variantes LATAM soportadas",
    "response": {
      "items": [
        { "code": "es-MX", "name": "Espanol (Mexico)", "flag": "MX", "family": "es" },
        { "code": "es-CO", "name": "Espanol (Colombia)", "flag": "CO", "family": "es" },
        { "code": "es-AR", "name": "Espanol (Argentina)", "flag": "AR", "family": "es" },
        { "code": "es-CL", "name": "Espanol (Chile)", "flag": "CL", "family": "es" },
        { "code": "es-PE", "name": "Espanol (Peru)", "flag": "PE", "family": "es" },
        { "code": "es-EC", "name": "Espanol (Ecuador)", "flag": "EC", "family": "es" },
        { "code": "es-VE", "name": "Espanol (Venezuela)", "flag": "VE", "family": "es" },
        { "code": "pt-BR", "name": "Portugues (Brasil)", "flag": "BR", "family": "pt" },
        { "code": "pt-PT", "name": "Portugues (Portugal)", "flag": "PT", "family": "pt" },
        { "code": "en-US", "name": "Ingles (EE.UU.)", "flag": "US", "family": "en" },
        { "code": "qu-PE", "name": "Quechua (Peru)", "flag": "PE", "family": "indigena" },
        { "code": "gn-PY", "name": "Guarani (Paraguay)", "flag": "PY", "family": "indigena" },
        { "code": "ay-BO", "name": "Aimara (Bolivia)", "flag": "BO", "family": "indigena" }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/dialects",
    "summary": "Dialectos regionales soportados",
    "response": {
      "items": [
        {
          "code": "nortenio-mx",
          "name": "Nortenio (Mexico)",
          "region": "Norte de Mexico",
          "baseLang": "es-MX",
          "description": "Variante del norte mexicano, con prestamos del ingles y entonacion marcada."
        },
        {
          "code": "paisa",
          "name": "Paisa (Colombia)",
          "region": "Antioquia y eje cafetero",
          "baseLang": "es-CO",
          "description": "Habla paisa con voseo, diminutivos en -ico y lexico cafetero."
        },
        {
          "code": "rioplatense",
          "name": "Rioplatense",
          "region": "Argentina y Uruguay",
          "baseLang": "es-AR",
          "description": "Voseo, sheismo (ll/y como sh) y entonacion italianizada."
        },
        {
          "code": "andino",
          "name": "Andino",
          "region": "Andes (PE, BO, EC)",
          "baseLang": "es-PE",
          "description": "Influencia del quechua y aimara, orden SOV ocasional."
        },
        {
          "code": "caribenio",
          "name": "Caribenio",
          "region": "Caribe (VE, Colombia costa, RD, Cuba, PR)",
          "baseLang": "es-VE",
          "description": "Aspiracion de /s/ final, ritmo acelerado y lexico afrocaribenio."
        }
      ]
    }
  }
];
