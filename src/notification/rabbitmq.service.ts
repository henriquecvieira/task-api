import { Injectable } from '@nestjs/common';
import { Publisher } from './rabbit.publisher';

@Injectable()
export class RabbitMQService {
  private readonly publisher: Publisher;

  constructor() {
    this.publisher = new Publisher('amqp://localhost', 'my-exchange');
  }

  async publishMessage(message: string): Promise<void> {
    await this.publisher.connect();
    await this.publisher.publish(message);
    await this.publisher.disconnect();
  }
}
export { Publisher };
