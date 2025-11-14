// Arquivo: netlify/functions/send-push.js

const webpush = require('web-push');

// Puxa as chaves das variáveis de ambiente que você configurou no Netlify
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

// Configura a biblioteca web-push
// (Troque 'mailto:seu-email@exemplo.com' pelo seu email)
webpush.setVapidDetails(
    'mailto:seu-email@exemplo.com',
    vapidPublicKey,
    vapidPrivateKey
);

// Esta é a função principal do Netlify
exports.handler = async (event) => {
    // Só aceita requisições POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Pega os dados enviados pelo front-end (index.html)
        // Esperamos um objeto { subscription, payload }
        const { subscription, payload } = JSON.parse(event.body);

        // Prepara o payload (os dados do remédio)
        // O Service Worker vai receber isso no evento 'push'
        const pushPayload = JSON.stringify(payload || {
            name: 'Teste',
            quantity: '1'
        });

        // DISPARA A NOTIFICAÇÃO!
        await webpush.sendNotification(subscription, pushPayload);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Push enviado!' }),
        };

    } catch (error) {
        console.error('Erro ao enviar push:', error);

        // Se a inscrição for inválida (ex: usuário desinstalou o app),
        // o push falha.
        if (error.statusCode === 410 || error.statusCode === 404) {
            console.warn('Inscrição expirada ou inválida.');
            // (Aqui você deveria remover a inscrição do seu banco de dados)
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Erro no servidor', error: error.message }),
        };
    }
};