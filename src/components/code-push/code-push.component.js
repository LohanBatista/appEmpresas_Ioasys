import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {connect} from 'react-redux';

import codePush from 'react-native-code-push';
import {VText} from '~/components/index';

export class CodePush extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateText: '',
      progress: 0,
      codePushStatus: '',
      isRequired: false,
    };
  }

  componentDidMount() {
    codePush.sync(
      {
        updateDialog: false,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
        installMode: codePush.InstallMode.ON_NEXT_RESTART,
      },
      (status) => {
        this.setState({codePushStatus: status});
      },
      ({receivedBytes, totalBytes}) => {
        const progress = (receivedBytes / totalBytes) * 100;

        this.setState({
          updateText: `${Math.round(progress)}%`,
          progress,
          totalBytes,
          receivedBytes,
        });
      },
    );
  }

  render() {
    const {progress, receivedBytes, updateText, codePushStatus} = this.state;

    if (!this.props.isCodePushUpdateRequired) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bodyCenter}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
            {codePushStatus === 7 && (
              <>
                <VText style={styles.text}>Instalando atualização</VText>

                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressBarFill, {width: `${progress}%`}]}
                  />
                </View>

                {!!receivedBytes && (
                  <VText style={styles.smallText}>{`${updateText}`}</VText>
                )}
              </>
            )}
            {codePushStatus === 8 && (
              <VText style={styles.text}>Aguarde...</VText>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({app}) => {
  return {
    isCodePushUpdateRequired: app.isCodePushUpdateRequired,
  };
};

export const CodePushConnected = connect(mapStateToProps)(CodePush);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loaderContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCenter: {
    height: 230,
    width: 300,
    alignItems: 'center',
    marginTop: 60,
  },
  progressBar: {
    width: 260,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
  },
  progressBarFill: {
    backgroundColor: '#FFBB00',
    height: 4,
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 12,
    marginTop: 10,
  },
});
