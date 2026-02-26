# 💊 MedTime - Seu Assistente de Medicação

![Status do Projeto](https://img.shields.io/badge/status-beta%201.0-blue)
![Plataforma](https://img.shields.io/badge/plataforma-web%20|%20android-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

O **MedTime** é uma aplicação web progressiva (PWA) projetada para ajudar usuários a gerenciar seus horários de medicação. O projeto evoluiu para incluir funcionalidades de backend (API) e alertas sonoros, garantindo uma experiência completa mesmo em dispositivos móveis.

## ✨ Funcionalidades

* **👥 Múltiplos Perfis:** Gerencie a medicação de vários usuários.
* **🔔 Notificações Push & Sons:** Alertas visuais para garantir que você ouça o lembrete.
* **✏️ Gestão Completa:** Adicione, edite e exclua lembretes e perfis.
* **📶 Suporte Offline:** Funciona sem internet graças ao Service Worker (`pwabuilder-sw.js`).
* **☁️ Integração com API:** Estrutura pronta para funções serverless e backend (pasta `api/`).

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Backend/API:** Node.js (Funções Serverless).
* **PWA:** Service Workers, Manifest JSON.
* **Deploy:** Configurado para Netlify (`netlify.toml`) e compatível com Vercel.
* **Gerenciamento de Pacotes:** NPM (`package.json`).

## 📦 Estrutura do Repositório

```text
medtime/
├── api/                # Funções Serverless / Backend da aplicação
├── AppImages/          # Ícones e assets gráficos para o Android/iOS
├── Sounds/             # Arquivos de áudio para alarmes e notificações
├── node_modules/       # Dependências do projeto (Node.js)
├── index.html          # Página principal da aplicação
├── style.css           # Folha de estilos
├── manifest.json       # Configuração do PWA (Nome, Ícones, Cores)
├── offline.html        # Página exibida quando o usuário está sem internet
├── pwabuilder-sw.js    # Service Worker (Cache e funcionamento Offline)
├── package.json        # Definição de dependências e scripts do projeto
├── netlify.toml        # Arquivo de configuração para deploy no Netlify
└── README.md           # Documentação do projeto
