var amqplib = require('amqplib')

var amqpConnection = amqplib.connect('amqp://localhost');   // инстанс подключения

const queue = 'dev-queue';    // название очереди


// Consumer
amqpConnection
    .then(function(connection) {
            return connection.createChannel();
        })
    .then(function(channel) {
            return channel.assertQueue(queue, {
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null
            }).then(function(ok) {
                return channel.consume(queue, function(body) {
                    if (body !== null) {
                        console.log(body.content.toString());
                        channel.ack(body);
                    }
                });
            });
        })
    .catch(console.warn);