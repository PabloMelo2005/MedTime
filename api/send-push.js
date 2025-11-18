// Arquivo: netlify/functions/send-push.js

const webpush = require('web-push');

// Puxa as chaves das variáveis de ambiente que você configurou no Netlify
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

// Configura a biblioteca web-push
// (Troque 'mailto:seu-email@exemplo.com' pelo seu email)
webpush.setVapidDetails(
    'mailto:pablobertoldo.melo@gmail.com',
    vapidPublicKey,
    vapidPrivateKey
);

// Esta é a função principal do Netlify
module.exports = async (req, res) => {
    // 1. Verifica se é POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // 2. Na Vercel, o 'req.body' já vem convertido em objeto JSON automaticamente
        const { subscription, payload } = req.body;

        const pushPayload = JSON.stringify(payload || {
            name: 'Teste',
            quantity: '1'
        });

        // 3. Envia a notificação
        await webpush.sendNotification(subscription, pushPayload);

        // 4. Responde com sucesso (Status 200)
        return res.status(200).json({ success: true, message: 'Push enviado via Vercel!' });

    } catch (error) {
        console.error('Erro Vercel:', error);

        // Se a inscrição for inválida
        if (error.statusCode === 410 || error.statusCode === 404) {
            return res.status(410).json({ error: 'Inscrição expirada' });
        }

        return res.status(500).json({
            success: false,
            message: 'Erro no servidor',
            error: error.message
        });
    }
};