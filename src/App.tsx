import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Mission } from "./pages/Mission";
import { Journey } from "./pages/Journey";
import { Verticals } from "./pages/Verticals";
import { EventsCalendar } from "./pages/EventsCalendar";
import { Pledge } from "./pages/Pledge";
import { State } from "./pages/State";
import { Documents } from "./pages/Documents";
import { ImpactStories } from "./pages/ImpactStories";
import { News } from "./pages/News";

import { ReachTeam } from "./pages/ReachTeam";
import { RaiseConcern } from "./pages/RaiseConcern";
import { GrievanceFlow } from "./pages/GrievanceFlow";

// Placeholder components for new pages
const Discover = () => <div className="py-24 text-center font-display font-black text-4xl uppercase">Discover Page Coming Soon</div>;
const Media = () => <div className="py-24 text-center font-display font-black text-4xl uppercase">Media Page Coming Soon</div>;
const Dashboard = () => <div className="py-24 text-center font-display font-black text-4xl uppercase">Dashboard Page Coming Soon</div>;
const FitIndia = () => <div className="py-24 text-center font-display font-black text-4xl uppercase">FIT India Page Coming Soon</div>;
const KhelSetu = () => <div className="py-24 text-center font-display font-black text-4xl uppercase">Khel Setu Page Coming Soon</div>;
const TrackingResult = () => <div className="py-24 text-center font-display font-black text-4xl uppercase">Tracking Results Page Coming Soon</div>;

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/verticals" element={<Verticals />} />
          <Route path="/events" element={<EventsCalendar />} />
          <Route path="/pledge" element={<Pledge />} />
          <Route path="/state" element={<State />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/documents/:category" element={<Documents />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/media/news" element={<News />} />
          <Route path="/media/impact-stories" element={<ImpactStories />} />
          <Route path="/media" element={<Media />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fit-india" element={<FitIndia />} />
          <Route path="/khel-setu" element={<KhelSetu />} />
          <Route path="/track/:id" element={<TrackingResult />} />
          <Route path="/contact" element={<ReachTeam />} />
          <Route path="/reach-team" element={<ReachTeam />} />
          <Route path="/contact/reach-team" element={<ReachTeam />} />
          <Route path="/contact/raise-concern" element={<RaiseConcern />} />
          <Route path="/grievance/new" element={<GrievanceFlow />} />
        </Routes>
      </Layout>
    </Router>
  );
}
