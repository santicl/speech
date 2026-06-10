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

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meet" element={<MeetingProgram />} />
        <Route path="/discurso" element={<DiscourseSpiritualParadise />} />
        <Route path="/juda" element={<DiscourseSpiritualHealth />} />
        <Route path="*" element={<MeetingProgram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
