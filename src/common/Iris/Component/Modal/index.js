import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modalbox';
import IrisTheme from '../../Styles/IrisTheme';
import {IrisText} from '../../Component/Text';

const IrisModal = ({
  children = null,
  title = '',
  isVisible = false,
  header = null,
  footer = null,
  backButton = false,
  closeButton = true,
  onBackPress = () => {},
  demography = false,
  onClose = () => {},
  onCloseButton = () => {},
  paddingTop = 40,
  textStyle,
  headColor,
  headerFontWeight,
  avoidKeyboard,
  keyBoardHeight = 0,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      isOpen={isVisible}
      coverScreen={true}
      position="bottom"
      backButtonClose={true}
      onClosed={onClose}
      swipeToClose
      swipeArea={paddingTop + (insets?.top || 0) + 20}
      backdropColor={IrisTheme.BG800}
      backdropOpacity={0.5}
      onClosingState={state => (state ? onClose() : null)}
      style={[styles.container, {paddingTop: paddingTop + (insets?.top || 0)}]}>
      <View style={styles.draggerStyle} />

      <View
        style={[
          styles.modalStyle,
          avoidKeyboard
            ? {
                paddingBottom: keyBoardHeight + 20,
              }
            : {},
        ]}>
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor: IrisTheme.BG200,
            },
          ]}>
          <View style={styles.titleWrap}>
            <IrisText
              weight={headerFontWeight ? headerFontWeight : 'bold'}
              style={[styles.tileText, textStyle]}>
              {title}
            </IrisText>
          </View>
          {backButton ? (
            <TouchableOpacity
              style={[styles.headButton, styles.btnBack]}
              onPress={onBackPress}>
              <FontAwesomeIcon icon={faArrowLeft} size={20} color="#8B94B1" />
            </TouchableOpacity>
          ) : null}
          <View style={styles.spacer} />
          {closeButton ? (
            <TouchableOpacity
              style={[styles.btnClose, styles.headButton]}
              onPress={onCloseButton}>
              <FontAwesomeIcon icon={faTimes} size={20} color="#8B94B1" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.contentWrapper}>
          {header}

          {children}

          {footer}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: IrisTheme.BG200,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    justifyContent: 'space-between',
    position: 'relative',
  },
  modalStyle: {
    flex: 1,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  titleWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {fontSize: 16, fontWeight: 'bold'},
  draggerStyle: {
    backgroundColor: 'white',
    width: 40,
    alignSelf: 'center',
    height: 4,
    borderRadius: 16,
    marginBottom: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headButton: {
    justifyContent: 'center',
  },
  btnBack: {
    paddingLeft: 13,
    alignItems: 'flex-start',
  },
  btnClose: {
    alignItems: 'flex-end',
    paddingRight: 13,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  spacer: {
    flex: 1,
  },
});

export default IrisModal;
