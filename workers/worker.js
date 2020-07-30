import amqp from 'amqplib/callback_api';

const RABBITMQ_URL = 'amqp://rabbit';
const QUEUE_NAME = 'hello';

amqp.connect(RABBITMQ_URL, function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(QUEUE_NAME, { durable: false });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
        channel.consume(QUEUE_NAME, function (msg) {
            if (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                const receivedObject = JSON.parse(msg.content.toString());
                if(receivedObject.service && receivedObject.data) {
                    console.log('Calling service :', receivedObject.service, ' with payload: ', receivedObject.data);
                } else {
                    console.log('Bad message.');
                }
                
                channel.ack(msg);
            }
        }, {
            noAck: false
        });
    });
});