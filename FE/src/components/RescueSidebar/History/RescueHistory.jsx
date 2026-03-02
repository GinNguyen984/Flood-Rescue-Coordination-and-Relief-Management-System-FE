import { useState } from "react";
import {
  Input,
  Button,
  Tag,
  Modal,
  Select,
  Spin,
  Alert,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { getRescueHistoryByPhone } from "../../../api/service/historyApi";
import "./RescueHistory.css";

const { TextArea } = Input;
const { Option } = Select;

const RescueHistory = () => {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const getStatusInfo = (statusId) => {
    switch (statusId) {
      case 1:
        return { text: "Đang xử lý", color: "orange" };
      case 2:
        return { text: "Hoàn thành", color: "green" };
      case 3:
        return { text: "Đã hủy", color: "red" };
      default:
        return { text: "Không xác định", color: "blue" };
    }
  };

  const handleSearch = async () => {
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    setHistories([]);

    try {
      const data = await getRescueHistoryByPhone(phone);

      const formattedData = data
        .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
        .map((item) => {
          const statusInfo = getStatusInfo(item.statusId);

          return {
            id: item.rescueRequestId,
            code: `#CH-${item.rescueRequestId}`,
            status: statusInfo.text,
            color: statusInfo.color,
            time: new Date(item.createdAt).toLocaleString(
              "vi-VN",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            desc: `Loại sự cố: ${item.requestType}`,
            phone: item.contactPhone,
            type: item.requestType,
            image: item.imageUrls?.[0] || null,
            lat: item.locationLat,
            lng: item.locationLng,
          };
        });

      setHistories(formattedData);
    } catch (err) {
      setError(
        err.message ||
          "Không tìm thấy lịch sử cứu hộ cho số điện thoại này"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar-top">
      <div className="history-title">
        ⏱️ <b>TRA CỨU LỊCH SỬ CỨU HỘ</b>
      </div>

      <div className="history-input">
        <Input
          placeholder="Nhập số điện thoại..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          loading={loading}
        >
          Tra cứu
        </Button>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginTop: 12 }}
        />
      )}

      {searched && !loading && (
        <div className="history-list-title">
          LỊCH SỬ YÊU CẦU ({histories.length})
        </div>
      )}

      {loading ? (
        <div className="loading-box">
          <Spin
            indicator={
              <LoadingOutlined
                spin
                style={{ fontSize: 32 }}
              />
            }
          />
          <p>Đang tải lịch sử...</p>
        </div>
      ) : (
        histories.map((item) => (
          <HistoryCard
            key={item.id}
            data={item}
            onEdit={() => setEditing(item)}
          />
        ))
      )}

      {searched &&
        !loading &&
        histories.length === 0 &&
        !error && (
          <p className="empty-text">
            Không có lịch sử cứu hộ.
          </p>
        )}

      <EditModal
        data={editing}
        onClose={() => setEditing(null)}
      />
    </div>
  );
};

export default RescueHistory;

/* ================= CARD ================= */

function HistoryCard({ data, onEdit }) {
  const isProcessing =
    data.status === "Đang xử lý";

  return (
    <div className={`history-card ${data.color}`}>
      <div className="history-row">
        <span className="code">
          Mã: {data.code}
        </span>
        <Tag color={data.color}>
          {data.status}
        </Tag>
      </div>

      <div className="time">
        📅 {data.time}
      </div>

      <div className="desc">
        {data.desc}
      </div>

      <div className="phone">
        📞 {data.phone}
      </div>

      {/* {data.image && (
        <img
          src={`http://localhost:8080${data.image}`}
          alt="rescue"
          className="history-image"
        />
      )} */}

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
          <Select
            defaultValue={data.type}
            style={{ width: "100%" }}
          >
            <Option value="TrafficAccident">
              Tai nạn giao thông
            </Option>
            <Option value="FireExplosion">
              Hỏa hoạn
            </Option>
          </Select>
        </div>

        <div>
          <label>Mô tả</label>
          <TextArea
            rows={4}
            defaultValue={data.desc}
          />
        </div>
      </div>
    </Modal>
  );
}