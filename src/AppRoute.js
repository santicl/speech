import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DiscoursePioneers from './component/Precursores';
import DiscourseSupportBrothers from './component/Nehemias';
import DiscourseKingdomForever from './EstudioBiblicoNehemias';
import DiscourseKingdomForeverBlack from './EstudioBiblicoNehemiasNegro';
import DiscourseAnnualReport from './ReportAnual';
import DiscourseCampaign from './Campains';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nehemias" element={<DiscourseCampaign />} />
        <Route path="*" element={<DiscourseCampaign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
