import React, { memo, useReducer, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { AppContext } from '../context/ContextProvider';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const { onInputChange, id } = props;
  const { colors } = useContext(AppContext);
  const styles = useStyles(colors);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputArea}>
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
        />
        {!inputState.isValid && inputState.touched && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    formControl: {
      width: '100%',
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginBottom: 2,
      color: colors.text,
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      color: colors.text,
    },
    errorContainer: {
      marginVertical: 5,
    },
    errorText: {
      fontFamily: 'open-sans',
      color: colors.accent,
      fontSize: 13,
    },
    inputArea: {
      marginBottom: 20,
    },
  });

// export default memo(Input, (prevProps, newProps) => {
//   console.log('memo', prevProps, newProps);
//   return false;
// });
export default Input;
