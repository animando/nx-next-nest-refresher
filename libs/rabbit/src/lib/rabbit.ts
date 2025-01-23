import { randomBytes } from 'crypto';

export const TOPIC_EXCHANGE_NAME = 'animando.topic-exchange';
export const FANOUT_EXCHANGE_NAME = 'animando.fanout-exchange';
export const DIRECT_EXCHANGE_NAME = 'animando.direct-exchange';
export const WEBSOCKETS_EXCHANGE_NAME = 'animando.websockets-exchange';

const createRandomId = () => randomBytes(16).toString('hex');
export const createQueueName =
  (service: string) =>
  (exchange: string) =>
  (queueName: string, ephemeral = false) => {
    const suffix = ephemeral ? `-${createRandomId()}` : '';
    return [service, exchange, `${queueName}${suffix}`].join('#');
  };
