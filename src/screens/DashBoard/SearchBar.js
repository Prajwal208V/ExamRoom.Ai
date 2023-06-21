import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Style from '../../config/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props = {}) => {
  const {
    searchType = '',
    setSearchType = () => {},
    searchText = '',
    setSearchText = () => {},
    onSubmitEditing = () => {},
    accessibilityLabel = 'SearchBarComponent',
    testID = 'SearchBarComponent',
  } = props || {};
  return (
    <View>
      {/* ROW ONE */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 5,
        }}>
        <View style={{flex: 1}}>
          <View>
            <Searchbar
              onSubmitEditing={(evt = {}) => {
                const {nativeEvent: {text: searchString = ''} = {}} = evt || {};
                onSubmitEditing(searchString);
              }}
              placeholder="Search by title in City , Country"
              icon={() => null}
              inputStyle={[styles.buttonText]}
              value={searchText}
              onChangeText={setSearchText}
              inputStyle={styles.searchInputStyle}
              accessibilityLabel={`${accessibilityLabel}Input`}
              testID={`${testID}Input`}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.searchButtonContainer]}
          onPress={onSubmitEditing}
          disabled={!searchText.length}
          accessibilityLabel={`${accessibilityLabel}SubmitEditing`}
          testID={`${testID}SubmitEditing`}>
          <View
            style={[
              styles.searchButton,
              {
                backgroundColor: searchText.length
                  ? Style.color.cp_primary
                  : Style.color.cp_disabled,
              },
            ]}>
            <FontAwesomeIcon
              size={16}
              icon={faSearch}
              color={searchText.length ? '#fff' : '#000'}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchButtonContainer: {
    marginLeft: 10,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputStyle: {
    width: '100%',
    marginLeft: -40,
    fontWeight: '500',
    fontSize: 15,
  },
  buttonText: {
    color: Style.color.cp_disabled,
    fontSize: Style.font.smSize,
    fontWeight: 'bold',
  },
  buttonRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 35,
    backgroundColor: Style.color.cp_background,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Style.color.cp_disabled,
    marginHorizontal: 5,
  },
  buttonContainerActive: {
    backgroundColor: Style.color.cp_primary,
    borderColor: Style.color.cp_primary,
  },
  buttonTextActive: {
    color: Style.color.headerTintColor,
  },
});
