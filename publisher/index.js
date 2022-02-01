var amqplib = require('amqplib')

var amqpConnection = amqplib.connect('amqp://localhost');   // инстанс подключения

const queue = 'dev-queue';    // название очереди

const message = "something to do:";



// Publisher
for (let i = 0; i < 10; i++) {

    const messageBytes = Buffer.from(message + i);

    amqpConnection
        .then(function(connection) {
                return connection.createChannel();    // подключение возвращает канал
            })
        .then(function(channel) {
                return channel.assertQueue(queue, {
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null
                }).then(function(ok) {
                    return channel.sendToQueue(queue, messageBytes);    // отправка в очередь
                });
            })
        .catch(console.warn);
}

// channel assertExchange("ex_name").assertQueue(...)