import { Machine } from 'xstate';

const promiseMachine = Machine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {},
    resolved: {},
    rejected: {},
  },
});

export default promiseMachine;
