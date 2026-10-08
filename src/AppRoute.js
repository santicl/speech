import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DiscoursePioneers from './component/Precursores';
import DiscourseSupportBrothers from './component/Nehemias';
import DiscourseKingdomForever from './EstudioBiblicoNehemias';
import DiscourseKingdomForeverBlack from './EstudioBiblicoNehemiasNegro';
import DiscourseAnnualReport from './ReportAnual';
import DiscourseCampaign from './Campains';
import MeetingProgram from './App';
import DiscourseLessons80And81 from './leason';
import DiscourseSpiritualParadise from './component/ParaisoEspiritual';
import DiscourseSpiritualHealth from './component/SpiritualHealth';
import SpeechOutline from './Dis';
import NavigationButtons from './Buttons';
import DiscourseHolySpirit from './EstudioBiblicoTwo';
import DiscourseAbrahamWar from './Abraham';
import DiscourseNewCovenant from './nuevo-pacto';
import DiscourseEvacuationDrill from './evacuation';
import VideoSpeedCalculator from './component/Calculate';
import Astrolab from './component/AstroF';
import DiscourseJehovahProtectsWidows from './component/Widows';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiscourseJehovahProtectsWidows />} />
        <Route path="/widows" element={<DiscourseJehovahProtectsWidows />} />
        <Route path="/calculate" element={<VideoSpeedCalculator />} />
        <Route path="/astro" element={<Astrolab />} />
        <Route path="/meet" element={<MeetingProgram />} />
        <Route path="/evacuacion" element={<DiscourseEvacuationDrill />} />
        <Route path="/nuevo-pacto" element={<DiscourseNewCovenant />} />
        <Route path="/abraham" element={<DiscourseAbrahamWar />} />
        <Route path="/nehemias" element={<DiscourseHolySpirit />} />
        <Route path="/discurso" element={<DiscourseSpiritualParadise />} />
        <Route path="/gran-creador" element={<SpeechOutline />} />
        <Route path="/juda" element={<DiscourseSpiritualHealth />} />
        <Route path="*" element={<NavigationButtons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
