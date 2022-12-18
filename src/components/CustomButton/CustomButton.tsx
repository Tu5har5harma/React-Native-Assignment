import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

type CustomButtomProps = {
  title: string;
  overlapping?: boolean;
  disabled?: boolean;
  onClick: Function;
  loader: boolean;
};

export const CustomButton = ({
  title,
  overlapping,
  disabled,
  onClick,
  loader,
}: CustomButtomProps) => {
  return (
    <TouchableHighlight
      onPress={disabled ? null : onClick}
      style={{
        borderColor:
          title === 'Cancel' ? '#EED2EF' : overlapping ? '#F7F8FB' : '#CAEFD8',
        borderWidth: 1.2,
        borderRadius: 50,
        paddingVertical: 7,
        width: 80,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '500',
          color:
            title === 'Cancel'
              ? '#E2006A'
              : overlapping
              ? '#CBD2E1'
              : '#16A64D',
        }}>
        {title}
      </Text>
    </TouchableHighlight>
  );
};
