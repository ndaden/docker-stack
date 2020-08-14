import amqp from 'amqplib/callback_api';
import finalizeUserCreation from './users/finalizeUserCreation';

const RABBITMQ_URL = 'amqp://rabbit';
const QUEUE_NAME = 'hello';

amqp.connect(RABBITMQ_URL, async function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(async function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
        channel.consume(QUEUE_NAME, async function (msg) {
            if (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                const receivedObject = JSON.parse(msg.content.toString());
                if(receivedObject.service && receivedObject.data) {
                    console.log('Calling service :', receivedObject.service, ' with payload: ', receivedObject.data);
                    if(receivedObject.service === 'user') {
                        const result = await finalizeUserCreation(receivedObject.data);
                        if(result.data.success) {
                            channel.ack(msg);
                        }
                    }
                } else {
                    console.log('Bad message.');
                }
            }
        }, {
            noAck: false
        });
    });
});