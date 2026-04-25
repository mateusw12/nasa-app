import { HttpMethod } from "@/libs/enum";


interface EndpointDoc {
  method: HttpMethod;
  endpoint: string;
  useCase: string;
}

export const externalEndpoints: EndpointDoc[] = [
  {
    method: HttpMethod.GET,
    endpoint: "https://api.nasa.gov/planetary/apod?date=YYYY-MM-DD&api_key=YOUR_API_KEY",
    useCase: "Imagem (ou video) astronomica do dia.",
  },
  {
    method: HttpMethod.GET,
    endpoint:
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=YYYY-MM-DD&camera=fhaz&api_key=YOUR_API_KEY",
    useCase: "Fotos do rover Curiosity por data e camera.",
  },
  {
    method: HttpMethod.GET,
    endpoint:
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&api_key=YOUR_API_KEY",
    useCase: "Feed de asteroides proximos da Terra.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://api.nasa.gov/EPIC/api/natural/images?api_key=YOUR_API_KEY",
    useCase: "Imagens EPIC da Terra (colecao recente).",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://api.nasa.gov/EPIC/api/natural/date/YYYY-MM-DD?api_key=YOUR_API_KEY",
    useCase: "Imagens EPIC filtradas por data.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://api.nasa.gov/EONET/api/v3/events?limit=20&status=open&api_key=YOUR_API_KEY",
    useCase: "Eventos naturais abertos na Terra.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://api.nasa.gov/DONKI/FLR?startDate=YYYY-MM-DD&api_key=YOUR_API_KEY",
    useCase: "Eventos recentes de clima espacial (flares).",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://images-api.nasa.gov/search?q=mars&media_type=image,video",
    useCase: "Busca na NASA Image and Video Library.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://images-api.nasa.gov/asset/{nasa_id}",
    useCase: "Manifest com arquivos de um item da library.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://images-api.nasa.gov/metadata/{nasa_id}",
    useCase: "Localizacao do metadata de um item.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://images-api.nasa.gov/captions/{nasa_id}",
    useCase: "Localizacao das legendas de video.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "https://techport.nasa.gov/api/projects?updatedSince=2024-01-01",
    useCase: "Projetos e iniciativas da NASA TechPort.",
  },
  {
    method: HttpMethod.GET,
    endpoint:
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+20+pl_name,hostname,discoverymethod,disc_year+from+pscomppars+order+by+disc_year+desc&format=json",
    useCase: "Top exoplanetas mais recentes (consulta TAP).",
  },
];

export const internalEndpoints: EndpointDoc[] = [
  {
    method: HttpMethod.GET,
    endpoint: "/api/library/search?q=moon&media_type=video",
    useCase: "Busca unificada da library com cache e validacao de filtro.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "/api/library/asset/{nasaId}",
    useCase: "Retorna o manifest do item da NASA Library.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "/api/library/metadata/{nasaId}",
    useCase: "Retorna localizacao do metadata para um item.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "/api/library/captions/{nasaId}",
    useCase: "Retorna localizacao das legendas para um video.",
  },
  {
    method: HttpMethod.GET,
    endpoint: "/api/missions/curiosity-landing",
    useCase: "Foto da data de pouso da Curiosity usada na pagina Missions.",
  },
];

export const usageSteps: string[] = [
  "Defina NEXT_PUBLIC_NASA_API_KEY no arquivo .env local com uma chave valida da NASA.",
  "Nunca comite a chave em arquivos do projeto, README, codigo fonte ou logs.",
  "No client, prefira chamar endpoints internos /api para centralizar cache, validacoes e fallback.",
  "No server, utilize a camada libs/services para manter o acesso externo organizado.",
  "Para videos da Library, consulte /api/library/asset/{nasaId} e selecione um arquivo .mp4 do manifest.",
];
