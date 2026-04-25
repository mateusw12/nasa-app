# NASA Space Platform

Plataforma front-end educativa para explorar dados e midias oficiais da NASA em uma experiencia moderna, responsiva e com foco em usabilidade.

## Visao Geral

O projeto agrega diferentes fontes publicas da NASA em modulos tematicos, com cache inteligente, tratamento de erro amigavel e arquitetura separada por camadas (API client, services, DTOs, hooks e componentes).

## Principais Funcionalidades

- APOD (Astronomy Picture of the Day)
- Galeria de fotos de Marte (Curiosity)
- Monitoramento de asteroides proximos da Terra
- Imagens da Terra (EPIC) e eventos naturais (EONET)
- Busca em NASA Image and Video Library (imagens e videos)
- Missoes com conteudo curado
- Clima espacial (DONKI)
- Ciencia (TechPort + Exoplanet Archive)
- Pagina de documentacao de endpoints em `/docs`

## Stack Tecnica

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query 5
- Framer Motion
- ESLint + Prettier

## Requisitos

- Node.js 20+
- npm 10+

## Instalar e Executar

1. Instale dependencias:

```bash
npm install
```

2. Crie seu arquivo de ambiente local:

```bash
cp env.example .env
```

3. Defina sua chave da NASA no `.env`:

```env
NEXT_PUBLIC_NASA_API_KEY=YOUR_API_KEY
```

4. Rode em desenvolvimento:

```bash
npm run dev
```

5. Abra no navegador:

`http://localhost:3000`

## Scripts

- `npm run dev`: inicia ambiente local
- `npm run build`: gera build de producao
- `npm run start`: sobe app em modo producao
- `npm run lint`: executa validacao de codigo
- `npm run format`: formata o projeto

## Rotas da Aplicacao

- `/` Dashboard
- `/apod`
- `/mars`
- `/asteroids`
- `/earth`
- `/earth-live`
- `/universe`
- `/missions`
- `/library`
- `/space-weather`
- `/science`
- `/satellites`
- `/docs`

## Endpoints Internos (BFF)

- `GET /api/library/search`
- `GET /api/library/asset/{nasaId}`
- `GET /api/library/metadata/{nasaId}`
- `GET /api/library/captions/{nasaId}`
- `GET /api/missions/curiosity-landing`

Esses endpoints encapsulam chamadas externas, padronizam erros e aplicam politicas de cache.

## Fontes de Dados Externas

- NASA Open APIs (`api.nasa.gov`)
- NASA Image and Video Library (`images-api.nasa.gov`)
- NASA TechPort (`techport.nasa.gov`)
- NASA Exoplanet Archive (`exoplanetarchive.ipac.caltech.edu`)

## Estrutura de Pastas

```text
app/
	(routes)/         Paginas principais da aplicacao
	api/              Endpoints internos (BFF)
components/         Componentes reutilizaveis de UI
hooks/              Hooks client-side (TanStack Query)
libs/
	api/              Clients HTTP/base clients
	services/         Regras de acesso a dados por dominio
	DTO/              Tipos de respostas (contratos)
	enum/             Enums compartilhados
	helpers/          Funcoes utilitarias de dominio
utils/              Utilitarios gerais
```

## Boas Praticas de Seguranca

- Nao comite chave de API em arquivos versionados.
- Use placeholders em documentacao e exemplos (`YOUR_API_KEY`).
- Prefira chamadas via endpoints internos em vez de acessar APIs externas diretamente no client.
- Revise logs e prints para garantir que nenhum segredo foi exposto.

## Qualidade e Validacao

Antes de abrir PR:

```bash
npm run lint
npm run build
```

## Licenca

Este projeto esta sob a licenca definida no arquivo LICENSE.
