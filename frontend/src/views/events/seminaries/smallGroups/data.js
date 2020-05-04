const data = {
  persons: {
    1: { id: 1, name: 'Lucas Alves', src: '', age: 26, organizator: true },
    2: { id: 2, name: 'Adriane Alves', src: '', age: 24, organizator: true },
    3: { id: 3, name: 'Erick Iwamoto', src: '', age: 23, organizator: false },
    4: { id: 4, name: 'Nelson Iwamoto', src: '', age: 60, organizator: false },
    5: {
      id: 5,
      name: 'Jaqueline Siqueira',
      src: '',
      age: 27,
      organizator: false,
    },
    6: { id: 6, name: 'Rafael Nespeche', src: '', age: 34, organizator: false },
  },
  columns: {
    persons: {
      id: 'persons',
      title: 'Pessoas',
      personIds: [1, 2, 3, 4, 5, 6],
    },
    group1: {
      id: 'group1',
      title: 'Grupo 1',
      personIds: [],
    },
  },
  columnOrder: ['persons', 'group1'],
  lastGroup: 1,
};

export default data;
