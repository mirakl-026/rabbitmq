var amqplib = require('amqplib')

var amqpConnection = amqplib.connect('amqp://localhost');   // инстанс подключения

const queue = 'dev-queue';    // название очереди

const message = "something to do";
const messageBytes = Buffer.from(message);

// Publisher
amqpConnection
    .then(function(connection) {
            return connection.createChannel();    // подключение возвращает канал
        })
    .then(function(channel) {
            return channel.assertQueue(queue).then(function(ok) {
                return channel.sendToQueue(queue, messageBytes);    // отправка в очередь
            });
        })
    .catch(console.warn);