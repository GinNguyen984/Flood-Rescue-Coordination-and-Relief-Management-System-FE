import {
    CheckCircleFilled,
    CarFilled,
    MedicineBoxFilled,
    SafetyCertificateFilled,
  } from "@ant-design/icons";
  import "./MissionProgress.css";
  
  const steps = [
    { label: "ĐÃ NHẬN", icon: <CheckCircleFilled /> },
    { label: "ĐANG DI CHUYỂN", icon: <CarFilled /> },
    { label: "TẠI HIỆN TRƯỜNG", icon: <MedicineBoxFilled /> },
    { label: "HOÀN THÀNH", icon: <SafetyCertificateFilled /> },
  ];
  
  export default function MissionProgress({ step = 1 }) {
    return (
      <div className="mission-progress">
        {steps.map((s, index) => {
          const active = index + 1 <= step;
  
          return (
            <div key={index} className="progress-step">
              <div className={`progress-icon ${active ? "active" : ""}`}>
                {s.icon}
              </div>
              <span className={active ? "active" : ""}>{s.label}</span>
  
              {index < steps.length - 1 && (
                <div className={`progress-line ${active ? "active" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
  