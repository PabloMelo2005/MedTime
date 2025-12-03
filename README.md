# 💊 MedTime - Seu Assistente de Medicação

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
![Plataforma](https://img.shields.io/badge/plataforma-web%20|%20android-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

O **MedTime** é uma aplicação web progressiva (PWA) projetada para ajudar usuários a gerenciar seus horários de medicação de forma simples, eficiente e segura. Com suporte para múltiplos perfis e funcionamento offline, o MedTime garante que você nunca perca uma dose, mesmo sem internet.

## ✨ Funcionalidades

* **👥 Múltiplos Perfis:** Gerencie a medicação de vários membros da família em um único dispositivo (ex: Pai, Mãe, Avó).
* **🔔 Lembretes e Alarmes:** Receba alertas visuais e notificações push quando for hora de tomar seu remédio.
* **✏️ Gestão Completa (CRUD):** Adicione, edite e exclua lembretes facilmente.
* **📅 Histórico de Doses:** Acompanhe o que foi tomado no dia atual para evitar doses duplas ou esquecimentos.
* **📶 100% Offline (PWA):** A aplicação funciona perfeitamente sem conexão com a internet após o primeiro acesso.
* **🔒 Privacidade Total:** Todos os dados são salvos localmente no dispositivo (LocalStorage). Nenhum dado é enviado para a nuvem.
* **📱 Instalável:** Pode ser instalado como um aplicativo nativo no Android, iOS e Desktop.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrão, sem dependência de frameworks pesados, garantindo leveza e performance.

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização responsiva e moderna (Variáveis CSS, Flexbox, Animações).
* **JavaScript (Vanilla):** Lógica da aplicação, manipulação do DOM e gestão de estado.
* **LocalStorage:** Persistência de dados no navegador.
* **Service Workers:** Cache de arquivos e funcionamento offline.
* **Phosphor Icons:** Biblioteca de ícones moderna e limpa.

## 📸 Screenshots

<div style="display: flex; gap: 10px;">
  <img src="AppImages/android/android-launchericon-192-192.png" alt="Ícone MedTime" width="100">
  </div>

## 🚀 Como Executar Localmente

Como o projeto é estático (HTML/CSS/JS), é muito simples de rodar.

### Pré-requisitos
Um navegador moderno (Chrome, Edge, Firefox). Para testar as funcionalidades de PWA (Service Workers), recomenda-se usar um servidor local simples.

### Passo a Passo

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/medtime.git](https://github.com/seu-usuario/medtime.git)
    ```
2.  Entre na pasta:
    ```bash
    cd medtime
    ```
3.  Inicie um servidor local (Exemplo com Python ou extensão Live Server do VS Code):
    * **VS Code:** Instale a extensão "Live Server", clique com o botão direito em `index.html` e escolha "Open with Live Server".
    * **Python 3:**
        ```bash
        python -m http.server
        ```
4.  Acesse no navegador: `http://127.0.0.1:8000` (ou a porta indicada).

## 📦 Estrutura do Projeto

```text
medtime/
├── index.html          # Estrutura e Lógica Principal (SPA)
├── style.css           # Estilos e Tema
├── manifest.json       # Configuração do PWA (Nome, Ícones, Cores)
├── pwabuilder-sw.js    # Service Worker (Cache e Offline)
├── offline.html        # Página de fallback para falta de conexão
└── AppImages/          # Ícones gerados para o Android/iOS
    └── android/
