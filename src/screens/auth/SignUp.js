import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {useMMKVString} from 'react-native-mmkv';
import IrisTheme from '../../../src/common/Iris/Styles/IrisTheme';
import {EventRegister} from 'react-native-event-listeners';
import {useKeyboardHeight} from '../../../src/hooks/useKeyboardHeight';
import {IrisTextInput, IrisButton} from '../../../src/common/Iris';
import {setAuth} from '../../store/slices/AuthSlice';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [invisible, setInvisible] = useState(true);
  const [isAlredySignUp, setisAlredySignUp] = useState(null);
  const app = DeviceInfo.getBundleId();
  const keyboardHeight = useKeyboardHeight();
  const {navigate} = useNavigation();

  const onSubmit = useCallback(
    ({email, password}) => {
      Keyboard.dismiss();
      setLoading(true);
      setisAlredySignUp(null);
      dispatch(setAuth({email, password}));
    },
    [app, dispatch],
  );

  // const onSubmit = () => {};
  useEffect(() => {
    EventRegister.addEventListener('SignUpResponseError', () => {
      setLoading(false);
      setisAlredySignUp('Account already exists');
      setTimeout(() => {
        navigate('Login');
      }, 1000 * 2);
    });
  }, []);
  useEffect(() => {
    EventRegister.addEventListener('SignUpResponseGood', () => {
      setisAlredySignUp(null);
      setTimeout(() => {
        navigate('Landing');
        setLoading(false);
      }, 1000 * 5);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}>
        {({
          values,
          touched,
          errors,
          isValid,
          setFieldValue,
          setFieldTouched,
          submitForm,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.kbView}>
            <ResetFormOnSuccess setLoading={setLoading} />
            <View style={styles.logo} />
            {/* <Text style={styles.helloTitle}> </Text> */}
            <Text style={styles.subTitle}>
              Sign up for our job portal today and let us inspire you with
              tailored opportunities that match your skills and passions.
            </Text>
            <IrisTextInput
              style={styles.textInput}
              autoComplete={'email'}
              label={'Email'}
              keyboardType="email-address"
              value={String(values?.email || '')}
              onChangeText={text => {
                setFieldValue('email', text.trim());
              }}
              onBlur={() => {
                setFieldTouched('email', true);
              }}
              error={touched?.email && errors?.email}
              noSpaces
            />
            <IrisTextInput
              style={[styles.textInput, styles.lastInput]}
              label={'Password'}
              autoComplete={'password'}
              secureTextEntry={invisible}
              trailingIcon={() => (
                <Pressable onPress={() => setInvisible(!invisible)}>
                  <FontAwesomeIcon
                    icon={invisible ? faEyeSlash : faEye}
                    color={IrisTheme.Text300}
                  />
                </Pressable>
              )}
              value={String(values?.password || '')}
              onChangeText={text => {
                setFieldValue('password', text.trim());
              }}
              onBlur={() => {
                setFieldTouched('password', true);
              }}
              error={touched?.password && errors?.password}
              noSpaces
            />

            <IrisButton
              disabled={loading || !isValid}
              title={loading ? 'Signing Up...' : 'Sign Up'}
              height={42}
              onPress={submitForm}
            />
            {isAlredySignUp ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: 'red', fontSize: 12}}>
                  {isAlredySignUp}
                </Text>
              </View>
            ) : null}
            {keyboardHeight < 10 ? (
              <View style={styles.footerView}>
                <Image
                  source={require('../../assets/image/Logo.png')}
                  style={styles.bylogo}
                />
              </View>
            ) : null}
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const ResetFormOnSuccess = ({setLoading}) => {
  const {resetForm} = useFormikContext();
  useEffect(() => {
    EventRegister.addEventListener('loginResponse', () => {
      resetForm();
      setLoading(false);
    });
  }, [resetForm, setLoading]);
  return null;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Email required'),
  password: Yup.string().required('Password is required'),
});

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: IrisTheme.BG000,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  kbView: {
    flex: 1,
    maxWidth: 400,
  },
  logo: {
    resizeMode: 'contain',
    marginVertical: 0,
    width: 220,
    height: 150,
  },
  bylogo: {
    resizeMode: 'contain',
    marginVertical: 0,
    width: 110,
    height: 50,
  },
  helloTitle: {
    color: IrisTheme.PRIMARY400,
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '500',
  },
  subTitle: {
    color: IrisTheme.Text300,
    fontSize: 16,
    marginBottom: 30,
  },
  textInput: {
    marginVertical: 20,
  },
  lastInput: {
    marginBottom: 40,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 25,
    color: IrisTheme.Text400,
  },
  footerTextBold: {
    color: IrisTheme.PRIMARY400,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
    color: IrisTheme.RED400,
    marginVertical: 8,
  },
  forgotPasswordView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
