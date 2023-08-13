import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mapview: {
    ...StyleSheet.absoluteFill,
    height: Dimensions.get('screen').height,
  },
  buttonView: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center',
  },

  twoButtonsView: {
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'row',
    width: '100%',
  },
  savedButton: {
    backgroundColor: '#C4BB76',
    position: 'absolute',
    top: '2%',
    left: '5%',
    zIndex: 1,
  },
  modalParent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSubview: {
    backgroundColor: '#fff',
    width: '80%',
    paddingVertical: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  enterNameText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listNameText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: '25%',
    maxWidth: '30%',
  },
  textInput: {
    backgroundColor: 'lightgray',
    width: '80%',
    borderRadius: 4,
    marginVertical: '10%',
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: '5%',
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4%',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    borderRadius: 5,
  },
});

export default styles;
