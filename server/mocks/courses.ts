import { Course } from '../../src/models/Course';

export const COURSES_RESPONSE_MOCK: Course[] = [
  {
    id: 'f3aa5c31-0d1b-4fee-b03c-b6316a9e7a01',
    title: 'Intermediate tutorial 4',
    description: 'This tutorial is for intermediate only',
    stepsAmount: 2,
    isActive: true,
    steps: [
      {
        id: '831de3ec-ad45-4c33-81c0-62302c307ab8',
        title: 'Intermediate tutorial pt. 1',
        description: 'Do this',
        stepNumber: 1,
        isActive: true,
        answer: '<div>my first course</div>'
      },
      {
        id: '00d0161e-d193-4bf5-a023-ade47f60ef59',
        title: 'Intermediate tutorial pt. 2',
        description: 'Do that',
        stepNumber: 2,
        isActive: true,
        answer: '<div>my first course</div>'
      }
    ]
  },
  {
    id: '819fa406-56d4-4420-b309-40972592cef1',
    title: 'Beginner tutorial 2',
    description: 'beginer tutek',
    stepsAmount: 2,
    isActive: true,
    steps: [
      {
        id: '0eaf2d9a-d332-4527-8770-6433b7cea122',
        title: 'beginer tutorial pt. 1',
        description: 'Do this',
        stepNumber: 1,
        isActive: true
      },
      {
        id: 'd52eb789-cc8a-4957-a0fd-f0a5bee29a9c',
        title: 'beginer tutorial pt. 2',
        description: 'Do that',
        stepNumber: 2,
        isActive: true
      }
    ]
  },
  {
    id: '078fe1e1-d618-4630-a6ad-d7d91d719ab4',
    title: 'amateur tutorial 1',
    description: 'amateur tutek',
    stepsAmount: 2,
    isActive: true,
    steps: [
      {
        id: '530645ab-50f4-4965-a4e7-f2e1a7d5f0d4',
        title: 'amateur tutorial pt. 1',
        description: 'Do this',
        stepNumber: 1,
        isActive: true
      },
      {
        id: 'c4b9665c-8fe8-4291-b549-3828c7e1dd60',
        title: 'amateur tutorial pt. 2',
        description: 'Do that',
        stepNumber: 2,
        isActive: true
      }
    ]
  }
];
