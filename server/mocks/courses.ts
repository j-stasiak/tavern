import { Course } from '../../src/models/Course';

export const COURSES_RESPONSE_MOCK: Course[] = [
  {
    id: 'ee4271b9-74c5-48b1-bb31-f35644337a21',
    title: 'Demo',
    description: 'Demo description',
    stepsAmount: 1,
    isActive: true,
    steps: [
      {
        id: '28acdb38-6fa0-4e12-a05b-46c0e9818a86',
        title: 'Demo step 1',
        description: 'Demo step 1 description',
        stepNumber: 1,
        isActive: true,
        expGrant: 100,
        expectedResult: '<div>Hello world!</div>'
      },
      {
        id: '28acdb38-6fa0-4e12-a05b-46c0e9818a98',
        title: 'Demo step 1',
        description: 'Demo step 2 desc',
        stepNumber: 2,
        isActive: true,
        expGrant: 100,
        expectedResult: '<div>Hello world bla</div>'
      }
    ]
  },
  {
    id: '025290b9-a939-42c6-a173-000f23045a92',
    title: 'Demo 2',
    description: 'Demo 2 description',
    stepsAmount: 1,
    isActive: true,
    steps: [
      {
        id: 'ec464b7b-71b8-44dd-a0bc-8ae7f3955e43',
        title: 'Demo 2 step 1',
        description: 'Demo 2 step 1 description',
        stepNumber: 1,
        isActive: true,
        expGrant: 100,
        expectedResult: '<div>Demo</div>'
      }
    ]
  },
  {
    id: '8981d6a7-bfff-4c51-a610-fc47bc97ba59',
    title: 'Demo 3',
    description: 'Demo 3 description',
    stepsAmount: 1,
    isActive: true,
    steps: [
      {
        id: 'df07212c-db66-48a0-abee-2f4c39c2f0f1',
        title: 'Demo 3 step 1',
        description: 'Demo 3 step 1 description,\nwrite: <h1>Demo3</h1>',
        stepNumber: 1,
        isActive: true,
        expGrant: 100,
        expectedResult: '<h1>Demo3</h1>'
      }
    ]
  }
];
