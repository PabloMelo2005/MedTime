const webpush = require("web-push");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { subscription, payload } = req.body;

        if (!subscription || !payload) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        // 🔑 Suas chaves VAPID
        const vapidKeys = {
            publicKey: "BN5KpMkY3axPW2irYg6A6tRxnFDhahdATjsyNEHJ5L5fZG4Hveo5gNviteY7p81C8ZH8ecYKTxmm0UO8X-f3TzY",
            privateKey: "rpOX8hrfFrSOpgZLy7N9_V54OtGgtcKViDjKn1JY7X4"
        };

        webpush.setVapidDetails(
            "mailto:seuemail@dominio.com",
            vapidKeys.publicKey,
            vapidKeys.privateKey
        );

        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: `Hora do medicamento: ${payload.name}`,
                body: `Tomar ${payload.quantity} comprimido(s).`,
                icon: 'AppImages/android/android-launchericon-192-192.png'
            })
        );

        return res.status(200).json({ message: "Push enviado!" });

    } catch (err) {
        console.error("Erro no push:", err);
        return res.status(500).json({ error: "Falha ao enviar push" });
    }
};
