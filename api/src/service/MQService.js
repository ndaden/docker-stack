import amqp from 'amqplib/callback_api';

let _channel = null;
amqp.connect('amqp://rabbit', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        _channel = channel; 
    });
});

export const publishToQueue = (queueName, object) => {
    _channel.assertQueue(queueName, { durable: false });
    _channel.sendToQueue(queueName, Buffer.from(JSON.stringify(object)));
};

process.on('exit', (code) => {
    _channel.close();
    console.log('Closing rabbitmq channel. code:', code);
})
