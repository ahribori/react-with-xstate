import { assign, Machine } from 'xstate';

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

const practiceMachine = Machine({
  id: 'counter',
  initial: 'idle',
  context: {
    count: 0
  },
  states: {
    idle: {
      on: {
        INC: {
          actions: assign({ count: increment })
        },
        DEC: {
          actions: assign({ count: decrement })
        }
      }
    }
  }
});
