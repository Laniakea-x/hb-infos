import ProTable, {ProColumns} from "@ant-design/pro-table";
import {getMenus} from "@/services/ant-design-pro/menu";

const AuthList: React.FC = () => {

  const columns: ProColumns<API.RoleItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      fixed: 'left'
    },
    {
      title: '菜单描述',
      dataIndex: 'menuDesc',
    },
  ];

  return (
    <ProTable<API.RoleItem, API.PageParams>
      headerTitle='权限列表'
      rowKey="key"
      request={getMenus}
      columns={columns}
      search={false}
    />
  );
}

export default AuthList
