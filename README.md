# Woofstagram - Make an Instagram App (React Native)

Projeto desenvolvido com **React Native + Expo (JavaScript)** seguindo os roteiros dos PDFs:

- **Projeto 7 - Make an Instagram App** (formulário de cadastro completo de tutor + pet) Carlos André
- **Projeto 8 - Make an Instagram App** (home com componentes reutilizáveis, cards e posts) José Agra
- **Projeto 9 - Make an Instagram App** (navegação Stack + Tabs) Luiz Felipe Carvalho

O foco principal foi construir a estrutura de navegação do app, incluindo:

- `NavigationContainer` como raiz.
- Navegação de autenticação com **Stack Navigator** (`SignIn`, `SignUp`) e guard de autenticação.
- Navegação principal com **Bottom Tab Navigator** (`Home`, `Feed`, `Catalog`, `Account`).
- Navegação programática entre telas (com lógica correta).
- Formulários com **Formik** e validações inteligentes.
- Tela Home com `Trending Woofs` e `New Woof Posts` consumindo dados mock.

---

## Stack utilizada

- React Native
- Expo
- JavaScript
- React Navigation
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- `react-native-screens`
- `react-native-safe-area-context`
- Formik
- React Native Web (para execução/export web)


---

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm
- Expo Go no celular (opcional, para testar em dispositivo físico)

---

## Como executar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm run start
```

3. Abra em uma plataforma:

- `a` para Android (emulador)
- `w` para Web
- ou escaneie o QR Code com o Expo Go

Também existem scripts prontos:

```bash
npm run android
npm run ios
npm run web
```

---

## Estrutura de pastas

```text
.
├─ App.js
├─ app.json
├─ index.js
├─ package.json
├─ src
│  ├─ navigation
│  │  └─ MainNavigator.js
│  ├─ data
│  │  └─ woofData.js
│  ├─ components
│  │  ├─ base
│  │  │  ├─ Avatar.js
│  │  │  ├─ Heading.js
│  │  │  └─ Title.js
│  │  ├─ form
│  │  │  └─ InputWithLabel.js
│  │  └─ woof
│  │     ├─ WoofCard.js
│  │     └─ WoofPost.js
│  └─ screens
│     ├─ SignInScreen.js
│     ├─ SignUpScreen.js
│     ├─ HomeScreen.js
│     ├─ FeedScreen.js
│     ├─ CatalogScreen.js
│     └─ AccountScreen.js
└─ assets
```

---

## Fluxo de navegação implementado

### 1) Navegação raiz

No `App.js` foi adicionado o `NavigationContainer` envolvendo todo o app.

### 2) Stack de autenticação

Foi criado um stack com as telas:

- `SignIn`
- `SignUp`
- `Main` (renderiza o `MainNavigator`)

Também foi configurado:

```js
screenOptions={{ headerShown: false }}
```

Isso substitui o comportamento antigo do `headerMode: 'none'` (API legada), mantendo o resultado solicitado no roteiro.

### 3) Bottom tabs para área principal

No `MainNavigator`, foram criadas as abas:

- `Home`
- `Feed`
- `Catalog`
- `Account`

### 4) Navegação programática (corrigida)

- `Entrar` em `SignIn` tenta autenticar.
- `Ir para cadastro` em `SignIn` abre `SignUp`.
- `Cadastrar` em `SignUp` cria conta válida e autentica.
- Quando autenticado, usuário acessa `Main`; ao sair, volta ao fluxo de auth.

---

## Projeto 7 implementado (formulário completo com validação)

No cadastro (`SignUp`) foram implementados os campos pedidos:

- E-mail
- Senha
- Confirmar senha
- Nome do pet
- Data de nascimento do pet (AAAA-MM-DD)
- Raça
- Brinquedo favorito

Componente reutilizável `InputWithLabel` criado para padronizar campos.

Validações:

- obrigatoriedade de campos
- formato de e-mail
- senha mínima
- confirmação de senha
- formato de data
- bloqueio de duplicidade de usuário/e-mail

Também foi adicionado controle de tentativas de login:

- 3 tentativas inválidas bloqueiam o login temporariamente (30s).

---

## Projeto 8 implementado (home visual e componentes reutilizáveis)

Componentes base reutilizáveis:

- `Avatar`
- `Heading`
- `Title`

Componentes de domínio:

- `WoofCard` (pet em destaque)
- `WoofPost` (post com imagem + texto)

Tela `Home`:

- seção horizontal `Trending Woofs` (ScrollView horizontal)
- seção `New Woof Posts`
- renderização por `.map()` usando dados mock (`woofData`)

---

## Possíveis próximos passos

- Persistir sessão de autenticação (SecureStore/AsyncStorage + tokens de backend).
- Hash de senha no backend (nunca em texto puro).
- Ícones personalizados nas tabs.
- Trocar ScrollView por FlatList para listas grandes.
- Integração real com API para usuários, pets e posts.

---

## Créditos

Projeto criado como exercício guiado de navegação React Native com base no roteiro do PDF do desafio.
