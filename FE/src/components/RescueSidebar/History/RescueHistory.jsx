import { useState } from "react";
import { Input, Button, Tag, Modal, Select } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import "./RescueHistory.css";

const { TextArea } = Input;
const { Option } = Select;

const RescueHistory = () => {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [histories, setHistories] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleSearch = () => {
    if (!phone) return;

    setHistories([
      {
        id: 1,
        code: "#CH-9821",
        status: "Hoàn thành",
        color: "green",
        time: "12/10/2023 14:30",
        desc: "Hỗ trợ vận chuyển vật phẩm thiết yếu tại Quận 1...",
        phone,
        type: "Hỗ trợ dân sinh",
      },
      {
        id: 2,
        code: "#CH-9855",
        status: "Đang xử lý",
        color: "orange",
        time: "Hôm nay, 09:15",
        desc: "Cấp cứu y tế khẩn cấp, cán xe lăn tại đường Lê Lợi.",
        phone,
        type: "Y tế khẩn cấp",
      },
    ]);

    setSearched(true);
  };

  return (
    <div className="sidebar-top">
      <div className="history-title">
        <span>⏱️</span>
        <b>TRA CỨU LỊCH SỬ CỨU HỘ</b>
      </div>

      <div className="history-input">
        <Input
          placeholder="Nhập số điện thoại..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Tra cứu
        </Button>
      </div>

      {searched && (
        <div className="history-list-title">
          LỊCH SỬ YÊU CẦU CỦA BẠN ({histories.length})
        </div>
      )}

      {searched &&
        histories.map((item) => (
          <HistoryCard
            key={item.id}
            data={item}
            onEdit={() => setEditing(item)}
          />
        ))}

      <EditModal data={editing} onClose={() => setEditing(null)} />
    </div>
  );
};

export default RescueHistory;

/* ================= CARD ================= */

function HistoryCard({ data, onEdit }) {
  const isProcessing = data.status === "Đang xử lý";

  return (
    <div className={`history-card ${data.color}`}>
      <div className="history-row">
        <span className="code">Mã: {data.code}</span>
        <Tag color={data.color}>{data.status}</Tag>
      </div>

      <div className="time">
        <span>📅</span>
        {data.time}
      </div>

      <div className="desc">{data.desc}</div>

      <div className="history-action">
        {isProcessing ? (
          <Button
            size="small"
            type="text"
            icon={<EditOutlined />}
            onClick={onEdit}
          >
            Chỉnh sửa
          </Button>
        ) : (
          <Button
            size="small"
            type="text"
            icon={<EyeOutlined />}
          >
            Xem chi tiết
          </Button>
        )}
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function EditModal({ data, onClose }) {
  if (!data) return null;

  return (
    <Modal
      open
      title="Chỉnh sửa yêu cầu cứu trợ"
      onCancel={onClose}
      onOk={onClose}
      okText="Lưu thay đổi"
      cancelText="Hủy"
    >
      <div className="modal-form">
        <div>
          <label>Số điện thoại</label>
          <Input defaultValue={data.phone} />
        </div>

        <div>
          <label>Loại sự cố</label>
          <Select defaultValue={data.type} style={{ width: "100%" }}>
            <Option value="Y tế khẩn cấp">Y tế khẩn cấp</Option>
            <Option value="Hỏa hoạn">Hỏa hoạn</Option>
            <Option value="Tai nạn giao thông">Tai nạn giao thông</Option>
            <Option value="Hỗ trợ dân sinh">Hỗ trợ dân sinh</Option>
          </Select>
        </div>

        <div>
          <label>Mô tả tình hình</label>
          <TextArea rows={4} defaultValue={data.desc} />
        </div>
      </div>
    </Modal>
  );
}
