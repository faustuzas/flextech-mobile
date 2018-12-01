import React from "react";
import { ActivityIndicator } from "react-native";
import NotificationPopup from "react-native-push-notification-popup";

import { withNavigationFocus } from "react-navigation";

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
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  Text
} from "native-base";
import { CameraLayover } from "../components/CameraLayover";

class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <CustomCamera isScreenFocused={this.props.isFocused} />;
  }
}

class CustomCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isSendingReceipt: false
  };

  async componentDidMount() {
    const { permissions } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: permissions[Permissions.CAMERA].status === "granted"
    });
  }

  processPicture = picture => {
    this.setState({ isSendingReceipt: true });
    fetch("https://epicentertop.azurewebsites.net/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(picture.base64)
    })
      .then(
        response => undefined,
        ex => {
          console.log("catch in processPicture after fetch");
          //this.showErrorPopup(String(ex));
        }
      );
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
        this.showErrorPopup(String(error));
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
