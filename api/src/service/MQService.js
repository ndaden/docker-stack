import amqp from 'amqplib/callback_api';
import * as config from './config';

let _channel = null;
amqp.connect(config.RABBITMQ_URL, function (error0, connection) {
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
    _channel.assertQueue(queueName, { durable: true });
    _channel.sendToQueue(queueName, Buffer.from(JSON.stringify(object)), { persistent: true });
};

export const publishToExchange = (routingKey, object) => {
    _channel.assertExchange('amq.direct');
    const result = _channel.publish('amq.direct', routingKey, Buffer.from(JSON.stringify(object)));
    return result;
}

process.on('exit', (code) => {
    _channel.close();
    console.log('Closing rabbitmq channel. code:', code);
})
