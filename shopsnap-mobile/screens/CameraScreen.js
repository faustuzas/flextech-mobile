import React from "react";
import NotificationPopup from "react-native-push-notification-popup";

import { withNavigationFocus } from "react-navigation";

import {
  Alert,
  StyleSheet,
  Text,
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
  };

  async componentDidMount() {
    const { permissions } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: permissions[Permissions.CAMERA].status === "granted"
    });
  }

  processPicture = picture => {
    fetch("https://epicentertop.azurewebsites.net/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(picture.base64)
    })
      .then(
        response =>
          new Promise(function(resolve, reject) {
            console.log(response);
          }),
        ex => {
            this.showErrorPopup(String(ex));
        }
      );
  };

  showPopup = message => {
    this.popup.show({
      appIconSource: require("../assets/images/robot-dev.jpg"),
      appTitle: "Epicenter",
      timeText: "Now",
      title: "You've found something!",
      body: message
    });
  };

  showErrorPopup = message => {
    this.popup.show({
      appIconSource: require("../assets/images/robot-dev.jpg"),
      appTitle: "Epicenter",
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
        onPictureSaved: picture => this.processPicture(picture)
      })
      .catch(error => {
        // TODO: only show error popup when a lot of takePicture() end up there
        this.showErrorPopup(String(error));
      });
    this.setState({
      foo: Math.random()
    });
  };

  onFilmButton = () => {
    const { isFilming } = this.state;
    if (this.camera && !isFilming) this.takePicture();
    this.setState({ isFilming: !isFilming });
  };

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this.onFilmButton}
          style={{ alignSelf: "center" }}
        >
          <Ionicons
            name="ios-radio-button-on"
            size={70}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ position: 'relative', flex: 1 }}>
            <View style={{flexDirection:'column', flex: 3}}>

            </View>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                  position: 'absolute',
                  bottom: 0,
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              {this.renderBottomBar()}
            </View>
          </Camera>
          <NotificationPopup ref={ref => (this.popup = ref)} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: "#fff"
    },
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
    }
  });

export default withNavigationFocus(CameraScreen);