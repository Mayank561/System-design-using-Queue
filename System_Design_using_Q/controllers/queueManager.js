const amqp = require('amqplib');

const QName = 'tasks';
let channel = null;

async function createChannel() {
  if (channel) return channel;

  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    console.log('Connected to RabbitMQ');
    channel = await connection.createChannel();
    await channel.assertQueue(QName, { durable: true });
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

const enqueueR = async (userId, req) => {
  try {
    const ch = await createChannel();
    ch.sendToQueue(
      QName,
      Buffer.from(JSON.stringify({ userId, req })),
      { persistent: true }
    );
    console.log('Request enqueued:', userId, req);
  } catch (error) {
    console.error('Error enqueuing request:', error);
    throw error;
  }
};

const dequeueR = async () => {
  try {
    const ch = await createChannel();
    const msg = await ch.get(QName);
    if (msg) {
      const task = JSON.parse(msg.content.toString());
      console.log('Dequeued task:', task.userId, task.req);
      ch.ack(msg);
      return task;
    }
    return null;
  } catch (error) {
    console.error('Error dequeuing request:', error);
    throw error;
  }
};

module.exports = {
  enqueueR,
  dequeueR,
};
