import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {Formik, useFormikContext} from 'formik';
import * as Yup from "yup"
import IrisTheme from '../../../src/common/Iris/Styles/IrisTheme';
import {EventRegister} from 'react-native-event-listeners';
import {useKeyboardHeight} from '../../../src/hooks/useKeyboardHeight';
import {IrisTextInput, IrisButton} from '../../../src/common/Iris';
import {setLatUser} from '../../store/slices/AuthSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const app = DeviceInfo.getBundleId();
  const [invisible, setInvisible] = useState(true);
  const authData = useSelector(state => state.auth?.auth);
  const lastEmail = useSelector(state => state?.auth?.lastEmail);
  const keyboardHeight = useKeyboardHeight();
  const {navigate} = useNavigation();
  const [error, setError] = useState(null);

  const onSubmit = useCallback(
    ({email, password}) => {
      Keyboard.dismiss();
      setLoading(true);
      let finder = authData.find((iteam, index) => email === iteam?.email);
      if (finder) {
        if (finder.password === password) {
          setError(null);
          dispatch(setLatUser({email}));
          setTimeout(() => {
            navigate('Landing');
            setLoading(false);
          }, 1000 * 2);
        } else {
          setError('The username or password you entered is incorrect');
          setLoading(false);
        }
      } else {
        setError('could not find your account');
        setTimeout(() => {
          setLoading(false);
          navigate('Signup');
          setError(null);
        }, 1000 * 2);
      }
    },
    [app],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: lastEmail || '',
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
            <Image
              source={require('../../assets/image/logoImage.png')}
              style={styles.logo}
            />
            <Text style={styles.helloTitle}>Hello!</Text>
            <Text style={styles.subTitle}>Login first to continue</Text>
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
              title={loading ? 'Logging In...' : 'Login'}
              height={42}
              onPress={submitForm}
            />
            <TouchableOpacity
              onPress={() => {
                // unauthorizedLogOut();
                setTimeout(() => {
                  navigate('Signup');
                }, 100);
              }}>
              <Text style={styles.footerText}>Sign up</Text>
            </TouchableOpacity>
            {error ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: 'red', fontSize: 12}}>{error}</Text>
              </View>
            ) : null}
            {/* <TouchableOpacity
              onPress={() => {
                // unauthorizedLogOut();
                setTimeout(() => {
                  navigate('PasswordChanage');
                }, 100);
              }}>
              <Text style={[styles.footerText, {marginTop: 10}]}>
                Change password
              </Text>
            </TouchableOpacity> */}
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

export default LoginScreen;

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
