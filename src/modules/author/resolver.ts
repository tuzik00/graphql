import { createPubSub } from '@graphql-yoga/node';

const pubsub = createPubSub();
let currentNumber = 0;

function incrementNumber() {
  currentNumber++;
  pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}

incrementNumber();

export default {
  Query: {
    currentNumber() {
      return currentNumber;
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.subscribe('NUMBER_INCREMENTED'),
    },
  },
};
