export const project = {
  "title": "ViaLatin",
  "slug": "vialatin",
  "codename": "vialatin",
  "summary": "App de navegacion comunitaria tipo Waze con reportes y seguridad para LATAM.",
  "stack": [
    "React Native",
    "NestJS",
    "PostGIS",
    "MongoDB",
    "Redis",
    "OSRM",
    "Kafka"
  ],
  "modules": [
    "rutas",
    "reportes comunitarios",
    "trafico",
    "seguridad",
    "mapas"
  ],
  "server": {
    "entry": "services/api-gateway",
    "port": 4106
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/routes/demo",
    "summary": "Ruta estimada entre dos puntos",
    "response": {
      "routeId": "route_demo_1",
      "etaMinutes": 18,
      "distanceKm": 9.4,
      "warnings": [
        "lluvia intensa",
        "peaje cercano"
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/incidents",
    "summary": "Incidentes recientes",
    "response": {
      "incidents": [
        { "id": "inc_1",  "type": "accident", "severity": "high",   "city": "Bogota",       "country": "CO", "lat":  4.6533, "lng": -74.0836, "reportedAt": "2026-05-19T13:42:00Z", "votes": 28 },
        { "id": "inc_2",  "type": "pothole",  "severity": "medium", "city": "Lima",         "country": "PE", "lat": -12.0464, "lng": -77.0428, "reportedAt": "2026-05-19T12:55:00Z", "votes": 14 },
        { "id": "inc_3",  "type": "police",   "severity": "low",    "city": "CDMX",         "country": "MX", "lat": 19.4326, "lng": -99.1332, "reportedAt": "2026-05-19T13:10:00Z", "votes":  9 },
        { "id": "inc_4",  "type": "hazard",   "severity": "high",   "city": "Buenos Aires", "country": "AR", "lat": -34.6037, "lng": -58.3816, "reportedAt": "2026-05-19T11:20:00Z", "votes": 41 },
        { "id": "inc_5",  "type": "traffic",  "severity": "high",   "city": "Sao Paulo",    "country": "BR", "lat": -23.5505, "lng": -46.6333, "reportedAt": "2026-05-19T13:05:00Z", "votes": 52 },
        { "id": "inc_6",  "type": "accident", "severity": "medium", "city": "Santiago",     "country": "CL", "lat": -33.4489, "lng": -70.6693, "reportedAt": "2026-05-19T10:45:00Z", "votes": 18 },
        { "id": "inc_7",  "type": "pothole",  "severity": "low",    "city": "Quito",        "country": "EC", "lat":  -0.1807, "lng": -78.4678, "reportedAt": "2026-05-19T09:30:00Z", "votes":  6 },
        { "id": "inc_8",  "type": "police",   "severity": "low",    "city": "Bogota",       "country": "CO", "lat":  4.7110, "lng": -74.0721, "reportedAt": "2026-05-19T08:15:00Z", "votes": 11 },
        { "id": "inc_9",  "type": "hazard",   "severity": "medium", "city": "CDMX",         "country": "MX", "lat": 19.3910, "lng": -99.2837, "reportedAt": "2026-05-19T12:00:00Z", "votes": 22 },
        { "id": "inc_10", "type": "traffic",  "severity": "medium", "city": "Lima",         "country": "PE", "lat": -12.1191, "lng": -77.0306, "reportedAt": "2026-05-19T13:25:00Z", "votes": 17 },
        { "id": "inc_11", "type": "accident", "severity": "high",   "city": "Sao Paulo",    "country": "BR", "lat": -23.5613, "lng": -46.6565, "reportedAt": "2026-05-19T13:50:00Z", "votes": 33 },
        { "id": "inc_12", "type": "hazard",   "severity": "low",    "city": "Santiago",     "country": "CL", "lat": -33.4569, "lng": -70.6483, "reportedAt": "2026-05-19T07:55:00Z", "votes":  4 }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/traffic",
    "summary": "Zonas de trafico actuales en LATAM",
    "response": {
      "zones": [
        { "id": "tz_1", "area": "Bogota - Av. Boyaca",        "level": "high",   "etaImpact": "+22 min" },
        { "id": "tz_2", "area": "CDMX - Periferico Sur",      "level": "high",   "etaImpact": "+30 min" },
        { "id": "tz_3", "area": "Lima - Via Expresa",         "level": "medium", "etaImpact": "+12 min" },
        { "id": "tz_4", "area": "Buenos Aires - Gral. Paz",   "level": "medium", "etaImpact": "+9 min"  },
        { "id": "tz_5", "area": "Santiago - Costanera Norte", "level": "low",    "etaImpact": "+3 min"  },
        { "id": "tz_6", "area": "Sao Paulo - Marginal Tiete", "level": "high",   "etaImpact": "+38 min" },
        { "id": "tz_7", "area": "Quito - Av. Occidental",     "level": "low",    "etaImpact": "+2 min"  }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/cities",
    "summary": "Ciudades cubiertas por ViaLatin",
    "response": {
      "cities": [
        { "id": "bog", "name": "Bogota",       "country": "CO", "lat":  4.7110, "lng": -74.0721 },
        { "id": "mex", "name": "CDMX",         "country": "MX", "lat": 19.4326, "lng": -99.1332 },
        { "id": "bue", "name": "Buenos Aires", "country": "AR", "lat": -34.6037, "lng": -58.3816 },
        { "id": "lim", "name": "Lima",         "country": "PE", "lat": -12.0464, "lng": -77.0428 },
        { "id": "scl", "name": "Santiago",     "country": "CL", "lat": -33.4489, "lng": -70.6693 },
        { "id": "sao", "name": "Sao Paulo",    "country": "BR", "lat": -23.5505, "lng": -46.6333 },
        { "id": "uio", "name": "Quito",        "country": "EC", "lat":  -0.1807, "lng": -78.4678 }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/routes/plan",
    "summary": "Planificar ruta entre origen y destino",
    "requestExample": {
      "from": "Bogota - Chapinero",
      "to": "Bogota - Usaquen"
    },
    "response": {
      "routeId": "route_plan_2026_001",
      "etaMinutes": 27,
      "distanceKm": 11.8,
      "warnings": [
        "trafico alto en Av. Boyaca",
        "reporte de accidente en NQS",
        "lluvia ligera"
      ],
      "alternatives": 2
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/reports",
    "summary": "Crear reporte comunitario",
    "requestExample": {
      "type": "police",
      "lat": 4.6097,
      "lng": -74.0817
    },
    "response": {
      "status": "accepted",
      "review": "community"
    }
  }
];
