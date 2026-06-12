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

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationButtons />} />
        <Route path="/meet" element={<MeetingProgram />} />
        <Route path="/discurso" element={<DiscourseSpiritualParadise />} />
        <Route path="/gran-creador" element={<SpeechOutline />} />
        <Route path="/juda" element={<DiscourseSpiritualHealth />} />
        <Route path="*" element={<NavigationButtons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
