import "./RescueSidebar.css";
import RescueHistory from "./History/RescueHistory";
import RescueTeamList from "./TeamList/RescueTeamList";

const RescueSidebar = () => {
  return (
    <aside className="rescue-sidebar">
      <RescueHistory />
      <RescueTeamList />
    </aside>
  );
};

export default RescueSidebar;
