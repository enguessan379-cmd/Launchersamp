import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { DownloadSvg } from '../../assets/svg/index';
import { ButtonLauncher, LoaderContainer } from '../../components';
import { usePermisionFile } from '../../hooks/usePermisionFile';
import { useSpaceDownlload } from '../../hooks/useSpaceDownload';
import { styles } from '../../styles/LoaderStyle';

type InitiationScreenType = NativeStackScreenProps<any>;

export const DownloadStartScreen = React.memo(
  ({ navigation }: InitiationScreenType) => {
    const { fetchPermision } = usePermisionFile();
    const { fetchSpace } = useSpaceDownlload();

    const onPressDownload = () => {
      if (!fetchPermision()) {
        return;
      }

      if (!fetchSpace()) {
        return;
      }

      return navigation.replace('DownloadScreen');
    };

    return (
      <LoaderContainer>
        <Text style={styles.titleSub}>Salut 👋</Text>
        <Text style={styles.subtitle}>
          Ravis de te voir sur{'\n'}
          notre projet !
        </Text>
        <View style={styles.buttons}>
          <ButtonLauncher
            btnWidth={'100%'}
            background={'#C97B1E'}
            IconLeft={DownloadSvg}
            onPress={onPressDownload}>
            Télécharger le jeu
          </ButtonLauncher>
        </View>
      </LoaderContainer>
    );
  },
);
