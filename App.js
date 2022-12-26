import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AdithyaHrudayam from './src/Shotras/AdithyaHrudayam';
import Amaladipiran from './src/Shotras/Amaladipiran';
import BhajaYatirajam from './src/Bhajanes/BhajaYatirajam';
import BhajaneScreen from './src/Screens/BhajaneScreen';
import ChaturShloki from './src/Shotras/ChaturShloki';
//Shotras
import Dashavatara from './src/Shotras/Dashavatara';
import DeshikaMangalam from './src/Shotras/DeshikaMangalam';
import DheeraMaruthi from './src/Bhajanes/DheeraMaruthi';
import GarudaDandakam from './src/Shotras/GarudaDandakam';
import GodaSthuti from './src/Shotras/GodaSthuti';
import GopalaVimshathi from './src/Shotras/GopalaVimshathi';
import HanumanChalisa from './src/Bhajanes/HanumanChalisa';
import HareKrishnaMantram from './src/Bhajanes/HareKrishnaMantram';
import Hayagriva from './src/Shotras/Hayagriva';
import HomeScreen from './src/Screens/HomeScreen';
import JayaJayaVitala from './src/Bhajanes/JayaJayaVitala';
import Jitante from './src/Shotras/Jitante';
import KanninunShiruttamb from './src/Shotras/KanninunShiruttamb';
import KodandaRama from './src/Bhajanes/KodandaRama';
import MukundaMala from './src/Shotras/MukundaMala';
import Nyasadashaka from './src/Shotras/Nyasadashaka';
import { Provider as PaperProvider } from 'react-native-paper';
import RadheGovindha from './src/Bhajanes/RadheGovindha';
import RaghuveeraGadya from './src/Shotras/RaghuveeraGadya';
import Ramaraksha from './src/Shotras/Ramaraksha';
/* eslint-disable prettier/prettier */
import React from 'react';
import SettingsScreen from './src/Screens/SettingsScreen';
import Shatumurai from './src/Shotras/Shatumurai';
import ShatumuraiValitirunam from './src/Shotras/ShatumuraiValitirunam';
import ShotramScreen from './src/Screens/ShotramScreen';
import ShuddaBrahma from './src/Bhajanes/ShuddaBrahma';
import SreenivasaNeenePaliso from './src/Bhajanes/SreenivasaNeenePaliso';
import SriStuti from './src/Shotras/SriStuti';
import SriramChandirane from './src/Bhajanes/SriramChandirane';
import Sudarshanastaka from './src/Shotras/Sudarshanastaka';
import { ThemeProvider } from './src/providers/ThemeProvider';
import ThugireRangana from './src/Bhajanes/ThugireRangana';
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
