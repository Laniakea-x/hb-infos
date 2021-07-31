import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {addRole, getRoles, removeRole, updateRole} from '@/services/ant-design-pro/role';
import OperationModal from "@/pages/sysrole/components/OperationModal";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RoleItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRole(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error(`添加失败: ${error}`);
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.RoleItem) => {
  const hide = message.loading('修改中');
  try {
    await updateRole(fields);
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error(`修改失败：${error}`);
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RoleItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRole(selectedRows[0]);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error(`删除失败：${error}`);
    return false;
  }
};

const TableList: React.FC = () => {

  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<API.RoleItem> | undefined>(undefined);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.RoleItem>[] = [
    {
      dataIndex: 'id',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      hideInSearch: true,
      hideInSetting: true
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '禁用',
        },
        1: {
          text: '正常',
        },
      },
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: React.ReactNode, entity: API.RoleItem) => [
        <a key="config"
           onClick={() => {
           }}
        >
          成员
        </a>,
        <a key="config"
           onClick={() => {
             setVisible(true)
             setCurrent(entity)
           }}
        >
          修改
        </a>,
        <a key="subscribeAlert" onClick={() => {
        }}>
          权限
        </a>,
        <Popconfirm
          title="确认要删除吗?"
          onConfirm={async () => {
            const success = await handleRemove([entity]);
            if (success && actionRef.current) {
              setVisible(false)
              setCurrent({});
              actionRef.current.reload();
            }
          }}
          okText="确认"
          cancelText="取消"
        >
          <a key="remove">
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RoleItem, API.PageParams>
        headerTitle='角色列表'
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
              setCurrent({})
            }}
          >
            <PlusOutlined/> 新建角色
          </Button>,
        ]}
        request={getRoles}
        columns={columns}
      />

      <OperationModal
        visible={visible}
        current={current}
        onDone={(() => {
          setVisible(false);
          setCurrent({});
        })}
        onSubmit={async (values: API.RoleItem) => {
          const success = values.id ? await handleUpdate(values) : await handleAdd(values);
          if (success && actionRef.current) {
            setVisible(false)
            setCurrent({});
            actionRef.current.reload();
          }
        }}
      />

    </PageContainer>
  );
}


export default TableList;
