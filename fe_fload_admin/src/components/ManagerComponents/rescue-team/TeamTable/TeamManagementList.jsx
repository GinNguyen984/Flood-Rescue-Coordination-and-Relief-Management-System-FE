'use client';

import { useState } from 'react';
import {
  Button,
  Tag,
  Modal,
  message,
  Form,
  Input,
  Select,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  deleteRescueTeam,
  updateRescueTeam,
} from '../../../../../api/axios/ManagerApi/rescueTeamApi'; // điều chỉnh đường dẫn nếu cần
import './TeamManagementList.css';
import MemberTable from './MemberTable';

const { Option } = Select;

export default function TeamManagementList({ teamsData, filterStatus, onTeamDeleted }) {
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [form] = Form.useForm();
  const [updating, setUpdating] = useState(false);

  const handleTeamClick = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };
// Mở modal sửa đội
const handleEditTeam = (team) => {
  setEditingTeam(team);
  form.setFieldsValue({
    rcName: team.name || '',
    rcPhone: team.phone || '',
    areaId: team.areaId || 1,          // ← FIX: mặc định areaId = 1 thay vì 0
    rcStatus: team.status === 'active' ? 'on duty' : 'rest',
  });
  setEditModalVisible(true);
};

// Xử lý submit form sửa đội
const handleUpdateTeam = async (values) => {
  if (!editingTeam) return;

  setUpdating(true);
  try {
    const payload = {
      rcName: values.rcName,
      rcPhone: values.rcPhone,
      areaId: Number(values.areaId) || 1,  // ← Đảm bảo là number và mặc định 1
      rcStatus: values.rcStatus,
    };

    console.log('Payload PUT:', payload); // Để debug

    await updateRescueTeam(editingTeam.id, payload);
    message.success(`Cập nhật đội ${values.rcName} thành công!`);

    setEditModalVisible(false);
    form.resetFields();

    if (onTeamDeleted) onTeamDeleted();
  } catch (error) {
    console.error('Lỗi PUT:', error.response?.data || error.message);
    message.error(
      error.response?.data?.message || 'Cập nhật đội thất bại. Vui lòng thử lại.'
    );
  } finally {
    setUpdating(false);
  }
};
  // Xử lý xóa đội (đã có từ trước)
  const handleDeleteTeam = (teamId, teamName) => {
    Modal.confirm({
      title: 'Xác nhận xóa đội cứu hộ',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa đội "${teamName}" (ID: ${teamId})? Hành động này không thể hoàn tác.`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteRescueTeam(teamId);
          message.success(`Đã xóa đội ${teamName} thành công!`);
          if (onTeamDeleted) onTeamDeleted();
        } catch (error) {
          console.error('Lỗi khi xóa đội:', error);
          message.error('Xóa đội thất bại. Vui lòng thử lại.');
        }
      },
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <span className="active">📋 Danh sách đội cứu hộ ({teamsData.length})</span>
        </div>
        <div className="header-actions">
          <Button icon={<PlusOutlined />} type="primary">
            Tạo Đội Cứu Hộ
          </Button>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-head">
          <span>TÊN ĐỘI</span>
          <span>CHUYÊN MÔN CHÍNH</span>
          <span>THÀNH VIÊN</span>
          <span>TRẠNG THÁI</span>
          <span>NHIỆM VỤ HIỆN TẠI</span>
          <span>HÀNH ĐỘNG</span>
        </div>

        {teamsData.map((team) => (
          <div key={team.id}>
            <TeamRow
              {...team}
              isExpanded={expandedTeamId === team.id}
              onTeamClick={() => handleTeamClick(team.id)}
              onEdit={() => handleEditTeam(team)}
              onDelete={() => handleDeleteTeam(team.id, team.name)}
            />
            {expandedTeamId === team.id && (
              <MemberTable teamId={team.id} />
            )}
          </div>
        ))}
      </div>

      {/* Modal chỉnh sửa đội */}
      <Modal
        title="Chỉnh sửa thông tin đội cứu hộ"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateTeam}
        >
          <Form.Item
            name="rcName"
            label="Tên đội"
            rules={[{ required: true, message: 'Vui lòng nhập tên đội!' }]}
          >
            <Input placeholder="Nhập tên đội" />
          </Form.Item>

          <Form.Item
            name="rcPhone"
            label="Số điện thoại liên lạc"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ!' },
            ]}
          >
            <Input placeholder="Ví dụ: 0901234567" />
          </Form.Item>

          <Form.Item
            name="areaId"
            label="Khu vực phụ trách (Area ID)"
          >
            <Input type="number" placeholder="Nhập ID khu vực (nếu có)" />
          </Form.Item>

          <Form.Item
            name="rcStatus"
            label="Trạng thái đội"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="on duty">Đang làm nhiệm vụ</Option>
              <Option value="rest">Đang nghỉ</Option>
              <Option value="off duty">Tạm nghỉ</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
            <Button
              onClick={() => setEditModalVisible(false)}
              style={{ marginRight: 12 }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={updating}
              disabled={updating}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

function TeamRow({ id, name, skill, members, status, mission, isExpanded, onTeamClick, onEdit, onDelete }) {
  return (
    <div className="table-row">
      <div className="team-info">
        <button className="expand-btn" onClick={onTeamClick}>
          {isExpanded ? <UpOutlined /> : <DownOutlined />}
        </button>
        <div>
          <strong>{name}</strong>
        </div>
      </div>

      <div>{skill || '—'}</div>

      <div>{members || 0} nhân viên</div>

      <div>
        {status === 'active' ? (
          <Tag color="green">ĐANG LÀM NHIỆM VỤ</Tag>
        ) : (
          <Tag color="default">ĐANG NGHỈ</Tag>
        )}
      </div>

      <div className="mission">{mission || '—'}</div>

      <div className="actions">
        <Button
          size="small"
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
        >
          Sửa
        </Button>
        <Button
          size="small"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
}