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
            publicKey: "BC0r1sXwBXVzvAYPV_NMXpf2a4YKcvfQhtVZYnmax-5xo-k_W3dldhHEECO2f8Aiku9jf24LXc11oN3SDEOf82PP",
            privateKey: "cwT54ZZRUrwa_RKMJgKChvGvR5MFEu4mwNgyTM31dAk"
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
