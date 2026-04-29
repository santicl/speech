import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DiscoursePioneers from './component/Precursores';
import DiscourseSupportBrothers from './component/Nehemias';
import DiscourseKingdomForever from './EstudioBiblicoNehemias';
import DiscourseKingdomForeverBlack from './EstudioBiblicoNehemiasNegro';
import DiscourseAnnualReport from './ReportAnual';
import DiscourseCampaign from './Campains';
import MeetingProgram from './App';
import DiscourseLessons80And81 from './leason';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nehemias" element={<DiscourseLessons80And81 />} />
        <Route path="*" element={<DiscourseLessons80And81 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
