# 🧠 Copilot Prompt — NASA Space App (Next.js + React)

Você é um desenvolvedor sênior especializado em React e Next.js.
Crie uma aplicação completa chamada **“NASA Space App”** com as seguintes especificações:

---

## 🚀 Stack e Padrões

* Next.js (App Router, versão mais recente)
* React (versão mais recente)
* TypeScript
* Tailwind CSS
* Arquitetura baseada em Server Components + Client Components quando necessário
* Uso de boas práticas modernas (clean code, separação de responsabilidades)
* Fetch com cache e revalidação (Next.js caching)
* ESLint + Prettier configurados
* Estrutura escalável de pastas

---

## 🌌 Funcionalidades principais

A aplicação deve consumir a API pública da NASA:

Base URL:
https://api.nasa.gov/

Utilizar as seguintes rotas:

### 1. APOD (Astronomy Picture of the Day)

* Endpoint: `/planetary/apod`
* Exibir:

  * imagem ou vídeo
  * título
  * descrição
  * data
* Permitir navegação por data

---

### 2. Mars Rover Photos

* Endpoint: `/mars-photos/api/v1/rovers/curiosity/photos`
* Filtros:

  * data (earth_date)
  * câmera
* Exibir galeria com grid responsivo

---

### 3. Near Earth Objects (Asteroides)

* Endpoint: `/neo/rest/v1/feed`
* Mostrar:

  * lista de objetos próximos
  * tamanho estimado
  * distância da Terra
  * indicador visual de perigo (cores amigáveis, não assustadoras)

---

### 4. EPIC (Earth Images)

* Endpoint: `/EPIC/api/natural/images`
* Mostrar imagens da Terra com opção de data

---

## 🎨 UI/UX (Family Friendly)

* Design amigável, educativo e leve
* Cores suaves (azul, roxo, gradientes espaciais)
* Ícones simples e ilustrativos
* Evitar linguagem alarmista (principalmente em asteroides)
* Microinterações (hover, loading skeletons)
* Responsivo (mobile-first)

---

## 🧩 Componentes

Criar componentes reutilizáveis:

* Navbar
* Card (para imagens/dados)
* Gallery Grid
* Date Picker
* Loading Skeleton
* Error State amigável
* Empty State ilustrado

---

## ⚙️ Arquitetura

Organizar pastas assim:

/app
/(routes)
/components
/services (API layer)
/hooks
/types
/utils

---

## 🔌 Integração com API

* Criar camada de serviço (`services/nasa.ts`)
* Usar variável de ambiente:
  `NEXT_PUBLIC_NASA_API_KEY`
* Implementar funções:

  * getAPOD(date?)
  * getMarsPhotos(params)
  * getAsteroids()
  * getEarthImages()

---

## ⚡ Performance

* Usar:

  * `fetch` com `revalidate`
  * `loading.tsx`
  * `suspense`
* Lazy loading de imagens
* Otimização com `next/image`

---

## 🔐 Boas práticas

* Não expor API key diretamente em código
* Tipagem forte com TypeScript
* Tratamento de erros
* Fallback UI

---

## 📄 Extras (diferenciais)

* Página inicial com dashboard resumido
* Favoritar imagens (usar localStorage)
* Dark mode
* Animações leves (framer-motion)
* SEO básico (metadata)

---

## 🧪 Scripts

Configurar:

* dev
* build
* start
* lint

---

## 🎯 Objetivo final

Gerar uma aplicação moderna, interativa e educativa sobre o espaço, com excelente UX, código limpo e arquitetura escalável.

---

Gere todo o código necessário, incluindo:

* estrutura de pastas
* páginas
* componentes
* serviços
* estilos
* exemplos de uso

Certifique-se de que o projeto roda imediatamente após:

```bash
npm install
npm run dev
```

# 🧠 Copilot Prompt — NASA Space Platform (Full API Integration)

Crie uma aplicação moderna chamada **“NASA Space Platform”**, utilizando Next.js (App Router) e React com TypeScript.

A aplicação deve integrar múltiplas APIs públicas da NASA e organizar as funcionalidades em módulos bem definidos, com foco em experiência interativa, educativa e “family friendly”.

---

## 🚀 Stack

* Next.js (última versão, App Router)
* React (última versão)
* TypeScript
* Tailwind CSS
* Framer Motion (animações)
* Arquitetura baseada em Server Components
* Fetch com cache e revalidação

---

## 🧩 Estrutura de Módulos

### 🌌 1. Universo

Usar APIs:

* APOD
* Asteroids NeoWs
* Exoplanet
* SSD/CNEOS

Funcionalidades:

* Imagem do dia
* Lista de asteroides próximos
* Catálogo de exoplanetas
* Visualização de dados do sistema solar

---

### 🌍 2. Terra em Tempo Real

Usar:

* EPIC
* EONET
* GIBS

Funcionalidades:

* Imagens da Terra
* Eventos naturais (furacões, incêndios)
* Mapa interativo com camadas

---

### 🔴 3. Missões Espaciais

Usar:

* Mars Rover Photos
* Insight API

Funcionalidades:

* Fotos de Marte
* Clima em Marte
* Timeline de missões

---

### ⚡ 4. Clima Espacial

Usar:

* DONKI

Funcionalidades:

* Eventos solares
* Tempestades geomagnéticas
* Visualização amigável (não alarmista)

---

### 🛰️ 5. Satélites

Usar:

* TLE API
* Satellite Situation Center

Funcionalidades:

* Posição de satélites
* Visualização em mapa/globo

---

### 📚 6. Biblioteca NASA

Usar:

* NASA Image and Video Library

Funcionalidades:

* Busca por imagens e vídeos
* Galeria com filtros

---

### 🔬 7. Ciência & Tecnologia

Usar:

* Techport
* TechTransfer
* Open Science Data

Funcionalidades:

* Projetos da NASA
* Tecnologias desenvolvidas
* Dados científicos abertos

---

## 🎨 UI/UX

* Interface amigável e educativa
* Design “family friendly”
* Cores suaves (azul, roxo, espaço)
* Evitar linguagem alarmista
* Responsivo (mobile-first)
* Skeleton loading
* Animações leves

---

## ⚙️ Arquitetura

/app
/universe
/earth
/missions
/space-weather
/satellites
/library
/science
/components
/services
    -> api/ fetcher para o app/api
    -> classes static para cada grupo de rotas
/libs
    -> Pattern DTO de response e input
/hooks
/types
/utils

---

## 🔌 API Layer

Criar arquivo:
`/services/nasa.ts`

Funções:

* getAPOD()
* getAsteroids()
* getExoplanets()
* getEarthEvents()
* getMarsPhotos()
* getSpaceWeather()
* searchMedia()
* getSatellites()

---

## ⚡ Performance

* `fetch` com `revalidate`
* Suspense
* Streaming
* Lazy loading
* Otimização com next/image

---

## 🔐 Segurança

* Usar variável:
  `NEXT_PUBLIC_NASA_API_KEY`
* Não hardcodar API key

---

## ⭐ Extras

* Favoritos (localStorage)
* Dark mode
* Dashboard inicial
* SEO básico
* Estados de erro amigáveis

---

## 🎯 Objetivo

Criar uma plataforma interativa e educativa sobre o espaço, utilizando múltiplas APIs da NASA, com arquitetura escalável, código limpo e excelente experiência do usuário.

---

Gere todo o código necessário para rodar o projeto imediatamente.

