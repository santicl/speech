import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DiscoursePioneers from './component/Precursores';
import DiscourseSupportBrothers from './component/Nehemias';
import DiscourseKingdomForever from './EstudioBiblicoNehemias';
import DiscourseKingdomForeverBlack from './EstudioBiblicoNehemiasNegro';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nehemias" element={<DiscourseKingdomForeverBlack />} />
        <Route path="*" element={<DiscourseKingdomForeverBlack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
