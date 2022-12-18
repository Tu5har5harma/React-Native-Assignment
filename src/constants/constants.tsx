import React from 'react';

export const sumArray = array => {
  let sum = 0;

  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }

  return sum;
};

export const texts = {
  today: 'Today',
  booked: 'Booked',
  overlapping: 'Overlapping',
  book: 'Book',
  cancel: 'Cancel',
};
