const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'silva.raquel.de.sa@gmail.com',
    pass: 'cmqy naki lzhe bdil',
  },
});

transport
  .sendMail({
    from: 'Raquel 2 <silva.raquel.de.sa@gmail.com>',
    to: 'kekel.silva013@gmail.com',
    subject: 'Hello from Nodemailer',
    html: '<h1>Teste com email</h1> Eae bora trabalhar?',
  })
  .then(() => console.log(`enviou`))
  .catch((err) => console.log(err));
