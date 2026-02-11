import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DiscoursePioneers from './component/Precursores';
import DiscourseSupportBrothers from './component/Nehemias';
import DiscourseKingdomForever from './EstudioBiblicoNehemias';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nehemias" element={<DiscourseKingdomForever />} />
        <Route path="*" element={<DiscourseKingdomForever />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
