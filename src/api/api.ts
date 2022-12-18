import axios from 'axios';
import React from 'react';

export const shiftBookApi = async (shiftId: string) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8080/shifts/${shiftId}/book`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('success');
  } catch (error) {
    console.error(error);
  }
};

export const shiftCancelApi = async (shiftId: string) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8080/shifts/${shiftId}/cancel`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('success');
  } catch (error) {
    console.error(error);
  }
};
