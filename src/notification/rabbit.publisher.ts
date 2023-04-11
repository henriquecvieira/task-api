import * as amqp from 'amqplib';

export class Publisher {
  private connection: amqp.Connection;

  private channel: amqp.Channel;

  constructor(private readonly url: string, private readonly exchange: string) {
    this.connect();
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, 'fanout', {
      durable: false,
    });
    await this.channel.assertQueue('my-queue');
    await this.channel.bindQueue('my-queue', this.exchange, '');
  }

  async publish(message: string): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    this.channel.publish(this.exchange, 'the message is running!!', Buffer.from(message));
  }

  async disconnect(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
