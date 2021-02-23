import { assign, Machine } from 'xstate';

// 임의로 데이터를 가져오기 위한 함수. 다른 어느 공개 API 를 가져다 써도 상관 없다.
const fetchCuteAnimals = () =>
  fetch('https://www.reddit.com/r/aww.json')
    .then((res) => res.json())
    .then((data) => data.data.children.map((child) => child.data));

const promiseMachine = Machine({
  id: 'cuteAnimals',
  initial: 'idle',
  context: {
    cuteAnimals: null,
    error: null
  },
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      invoke: {
        id: 'fetchCuteAnimals',
        src: fetchCuteAnimals,
        onDone: {
          target: 'success',
          actions: assign({
            cuteAnimals: (ctx, event) => event.data
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (ctx, event) => event.data
          })
        }
      }
    },
    success: {
      type: 'final'
    },
    failure: {
      on: { RETRY: 'loading' }
    }
  }
});

export default promiseMachine;
