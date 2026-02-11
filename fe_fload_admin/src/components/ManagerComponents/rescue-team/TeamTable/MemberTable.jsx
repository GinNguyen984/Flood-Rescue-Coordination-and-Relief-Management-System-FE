'use client';

import { useState, useEffect } from 'react';
import { Button, Tag, Spin, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getRescueTeamMembers, deleteTeamMember } from '../../../../../api/axios/ManagerApi/rescueTeamApi'; // điều chỉnh đường dẫn nếu cần
import './MemberTable.css';

export default function MemberTable({ teamId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách thành viên
  const fetchMembers = async () => {
    if (!teamId) return;
    try {
      setLoading(true);
      const response = await getRescueTeamMembers(teamId);
      setMembers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thành viên:', error);
      message.error('Không thể tải danh sách thành viên đội.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [teamId]);

  // Xử lý xóa thành viên
  const handleDeleteMember = (userId, fullName) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa thành viên "${fullName}" (ID: ${userId}) khỏi đội này?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteTeamMember(teamId, userId);
          message.success(`Đã xóa thành viên ${fullName} thành công!`);
          
          // Cập nhật lại danh sách sau khi xóa (cách 1: refetch)
          await fetchMembers();

          // Cách 2: filter local (nhanh hơn, không cần gọi API lại)
          // setMembers((prev) => prev.filter((m) => m.userId !== userId));
        } catch (error) {
          console.error('Lỗi khi xóa thành viên:', error);
          message.error('Xóa thành viên thất bại. Vui lòng thử lại.');
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="member-table-container loading">
        <Spin tip="Đang tải thành viên..." />
      </div>
    );
  }

  return (
    <div className="member-table-container">
      <div className="member-table-header">
        <h4>👥 Danh sách thành viên đội ({members.length})</h4>
      </div>

      <div className="member-table-wrapper">
        <div className="member-table-head">
          <span>ID</span>
          <span>HỌ TÊN</span>
          <span>ĐT LIÊN LẠC</span>
          <span>VỊ TRÍ TRONG ĐỘI</span>
          <span>HÀNH ĐỘNG</span>
        </div>

        {members.length === 0 ? (
          <div className="no-data">Chưa có thành viên nào trong đội</div>
        ) : (
          members.map((member) => (
            <MemberRow
              key={member.userId}
              {...member}
              teamId={teamId}
              onDelete={() => handleDeleteMember(member.userId, member.fullName)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function MemberRow({ userId, fullName, phone, roleInTeam, teamId, onDelete }) {
  return (
    <div className="member-row">
      <div className="id-cell" data-label="ID">
        <strong>{userId}</strong>
      </div>

      <div className="name-cell" data-label="Họ tên">
        <strong>{fullName}</strong>
      </div>

      <div className="phone-cell" data-label="Điện thoại">
        {phone || '—'}
      </div>

      <div className="role-cell" data-label="Vị trí">
        <Tag color="blue">{roleInTeam || 'Thành viên'}</Tag>
      </div>

      <div className="actions-cell" data-label="Hành động">
        <Button size="small" type="text" icon={<EditOutlined />}>
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