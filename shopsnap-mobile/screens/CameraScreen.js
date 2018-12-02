import React from "react";
import { ActivityIndicator } from "react-native";
import NotificationPopup from "react-native-push-notification-popup";

import { withNavigationFocus } from "react-navigation";

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';

import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Slider,
  Platform
} from "react-native";

import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";

import {
  Constants,
  Camera,
  FileSystem,
  Permissions,
  BarCodeScanner,
  Notifications
} from "expo";
import {
  Text,
  Picker,
  Form
} from "native-base";
import { CameraLayover } from "../components/CameraLayover";

class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <CustomCamera isScreenFocused={this.props.isFocused} />
    );
  }
}

class CustomCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isSendingReceipt: false,
    selectedStore: "",
    confirmDialog: false,
    itemsRead: []
  };

  onValueChange(value) {
    this.setState({
      selectedStore: value
    });
  }

  async componentDidMount() {
    const { permissions } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: permissions[Permissions.CAMERA].status === "granted"
    });
  }

  confirmItems = () => {

    const data = JSON.stringify({
      StoreID: 3,
      Date: "2018-12-01",
      UserID: 1,
      ReceiptFoundItemList: this.state.itemsRead
    });

    console.log(data);
    fetch("https://shopsnapwebapi.azurewebsites.net/api/receipt/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
      .then(res => console.log(data))
      .catch(err => console.log(err));
  };

  processPicture = async picture => {
    this.setState({ isSendingReceipt: true });
    const saveOptions = {
      compress: 0.7,
      format: 'jpeg',
      base64: true
    };
    const img = await Expo.ImageManipulator.manipulateAsync(picture.uri, [], saveOptions);
    console.log(img.base64.length);
    fetch("https://shopsnapwebapi.azurewebsites.net/api/values", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(img.base64)
    })
      .then(
        response => {this.setState({isSendingReceipt: false}); return response.json()},
        ex => {
          console.log("catch in processPicture after fetch");
          //this.showErrorPopup(String(ex));
        }
      )
      .then(jsonResponse => {
        this.setState({
          confirmDialog: true,
          itemsRead: jsonResponse || []
        });
      });
  };

  showPopup = message => {
    this.popup.show({
      appIconSource: require("../assets/images/robot-dev.jpg"),
      appTitle: "Shopsnap",
      timeText: "Now",
      title: "You've found something!",
      body: message
    });
  };

  showErrorPopup = message => {
    this.popup.show({
      appIconSource: require("../assets/images/robot-dev.jpg"),
      appTitle: "Shopsnap",
      timeText: "Now",
      title: "Error!",
      body: message
    });
  };

  takePicture = () => {
    console.log("takePicture()");
    this.camera
      .takePictureAsync({
        base64: true,
        quality: 0,
        onPictureSaved: picture => {
          this.processPicture(picture);
        }
      })
      .catch(error => {
        console.log("takepicture catch");
        //this.showErrorPopup(String(error));
      });
    this.setState({
      foo: Math.random()
    });
  };

  onFilmButton = () => {
    if (this.camera) this.takePicture();
  };

  renderBottomBar = () => {
    if (this.state.isSendingReceipt) {
      return (
        <View style={styles.bottomBar}>
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              style={{     flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20 }}
              size="large"
              color="white"
            />
          </View>
        </View>
      );
    }
    
    return (
      <View style={styles.bottomBar}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.onFilmButton}
            style={{ alignSelf: "center" }}
          >
            <Ionicons name="ios-radio-button-on" size={70} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ position: "relative", flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.camera}
            type={this.state.type}
          >
            <CameraLayover />
            <View style={styles.bottomBarContainer}>
              {this.renderBottomBar()}
            </View>
          </Camera>
          <NotificationPopup ref={ref => (this.popup = ref)} />
          <Dialog
            onDismiss={() => {
              this.setState({ confirmDialog: false });
            }}
            width={0.9}
            visible={this.state.confirmDialog}
            rounded
            dialogTitle={
              <DialogTitle
                title="Nuskenuota"
                style={{
                  backgroundColor: '#F7F7F8',
                }}
                hasTitleBar={false}
                align="left"
              />
            }
            actions={[
              <DialogButton
                text="Kartoti"
                onPress={() => {
                  this.setState({ confirmDialog: false });
                }}
                key="button-1"
              />,
              <DialogButton
                text="Gerai"
                onPress={() => {
                  this.setState({ confirmDialog: false });
                  this.confirmItems();
                }}
                key="button-2"
              />,
            ]}
          >
            <DialogContent
              style={{
                backgroundColor: '#F7F7F8',
              }}
            >
              { this.state.itemsRead.map(item => (
                <View>
                  <Text>{item.Name}</Text>
                </View>
              )) }
            </DialogContent>
          </Dialog>
        </View>
      );
    }
  }
}

const styles = {
  bottomButton: {
    marginBottom: 0,
    flex: 0.3,
    height: 58,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },

  bottomBar: {
    paddingBottom: 5,
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row"
  },

  camera: {
    flex: 1,
    position: "relative"
  },

  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    zIndex: 5,
    backgroundColor: "transparent",
    flexDirection: "row"
  }
};

export default withNavigationFocus(CameraScreen);
