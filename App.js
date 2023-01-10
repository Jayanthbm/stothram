import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import BhajaYatirajam from './src/Bhajanes/BhajaYatirajam';
import BhajaneScreen from './src/Screens/BhajaneScreen';
import AdithyaHrudayam from './src/Shotras/AdithyaHrudayam';
import Amaladipiran from './src/Shotras/Amaladipiran';
import ChaturShloki from './src/Shotras/ChaturShloki';
//Shotras
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Biduvanayya from './src/Bhajanes/Biduvanayya';
import DheeraMaruthi from './src/Bhajanes/DheeraMaruthi';
import HanumanChalisa from './src/Bhajanes/HanumanChalisa';
import HanumaneThandayu from './src/Bhajanes/HanumaneThandayu';
import HareKrishnaMantram from './src/Bhajanes/HareKrishnaMantram';
import Harinarayana from './src/Bhajanes/Harinarayana';
import HigguveYaako from './src/Bhajanes/HigguveYaako';
import JayaJayaVitala from './src/Bhajanes/JayaJayaVitala';
import KodandaRama from './src/Bhajanes/KodandaRama';
import RadheGovindha from './src/Bhajanes/RadheGovindha';
import RadheShyam from './src/Bhajanes/RadheShyam';
import RamaLali from './src/Bhajanes/RamaLali';
import RamaRakshiso from './src/Bhajanes/RamaRakshiso';
import ShuddaBrahma from './src/Bhajanes/ShuddaBrahma';
import SreenivasaNeenePaliso from './src/Bhajanes/SreenivasaNeenePaliso';
import SriRamaManagala from './src/Bhajanes/SriRamaManagala';
import SriramChandirane from './src/Bhajanes/SriramChandirane';
import ThugireRangana from './src/Bhajanes/ThugireRangana';
import {ThemeProvider} from './src/providers/ThemeProvider';
import HomeScreen from './src/Screens/HomeScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import ShotramScreen from './src/Screens/ShotramScreen';
import Dashavatara from './src/Shotras/Dashavatara';
import DeshikaMangalam from './src/Shotras/DeshikaMangalam';
import GarudaDandakam from './src/Shotras/GarudaDandakam';
import GodaSthuti from './src/Shotras/GodaSthuti';
import GopalaVimshathi from './src/Shotras/GopalaVimshathi';
import Hayagriva from './src/Shotras/Hayagriva';
import Jitante from './src/Shotras/Jitante';
import KanninunShiruttamb from './src/Shotras/KanninunShiruttamb';
import MukundaMala from './src/Shotras/MukundaMala';
import Nyasadashaka from './src/Shotras/Nyasadashaka';
import RaghuveeraGadya from './src/Shotras/RaghuveeraGadya';
import Ramaraksha from './src/Shotras/Ramaraksha';
import Shatumurai from './src/Shotras/Shatumurai';
import ShatumuraiValitirunam from './src/Shotras/ShatumuraiValitirunam';
import SriStuti from './src/Shotras/SriStuti';
import Sudarshanastaka from './src/Shotras/Sudarshanastaka';
import Tirupalland from './src/Shotras/Tirupalland';
import Tirupalliyucchi from './src/Shotras/Tirupalliyucchi';
import Tiruppavai from './src/Shotras/Tiruppavai';
import VishnuSahasranamam from './src/Shotras/VishnuSahasranamam';

const switchNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  SettingsScreen: SettingsScreen,
  ShotramScreen: ShotramScreen,
  BhajaneScreen: BhajaneScreen,
  //Shotras
  Dashavatara: Dashavatara,
  GodaSthuti: GodaSthuti,
  GopalaVimshathi: GopalaVimshathi,
  Hayagriva: Hayagriva,
  MukundaMala: MukundaMala,
  RaghuveeraGadya: RaghuveeraGadya,
  Sudarshanastaka: Sudarshanastaka,
  Tiruppavai: Tiruppavai,
  GarudaDandakam: GarudaDandakam,
  VishnuSahasranamam: VishnuSahasranamam,
  Jitante: Jitante,
  Nyasadashaka: Nyasadashaka,
  Amaladipiran: Amaladipiran,
  KanninunShiruttamb: KanninunShiruttamb,
  ChaturShloki: ChaturShloki,
  Tirupalland: Tirupalland,
  Tirupalliyucchi: Tirupalliyucchi,
  Shatumurai: Shatumurai,
  ShatumuraiValitirunam: ShatumuraiValitirunam,
  DeshikaMangalam: DeshikaMangalam,
  SriStuti: SriStuti,
  AdithyaHrudayam: AdithyaHrudayam,
  Ramaraksha: Ramaraksha,
  //Bhajanes
  BhajaYatirajam: BhajaYatirajam,
  ThugireRangana: ThugireRangana,
  HanumanChalisa: HanumanChalisa,
  HareKrishnaMantram: HareKrishnaMantram,
  ShuddaBrahma: ShuddaBrahma,
  SreenivasaNeenePaliso: SreenivasaNeenePaliso,
  DheeraMaruthi: DheeraMaruthi,
  KodandaRama: KodandaRama,
  SriramChandirane: SriramChandirane,
  JayaJayaVitala: JayaJayaVitala,
  RadheGovindha: RadheGovindha,
  HanumaneThandayu: HanumaneThandayu,
  SriRamaManagala: SriRamaManagala,
  RamaRakshiso: RamaRakshiso,
  RamaLali: RamaLali,
  HigguveYaako: HigguveYaako,
  Biduvanayya: Biduvanayya,
  RadheShyam: RadheShyam,
  Harinarayana: Harinarayana,
});

const AppContainer = createAppContainer(switchNavigator);
const App = () => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    </PaperProvider>
  );
};
export default App;
