import {PlusOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import {addRole, removeRole, updateRole} from '@/services/ant-design-pro/api';
import {getMenus} from "@/services/ant-design-pro/menu";

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
    message.error('添加失败');
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
  console.log(fields)
  const hide = message.loading('Configuring');
  try {
    await updateRole();
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.SysMenu[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRole({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.SysMenu>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      render: (dom) => {
        return (
          <a
            onClick={() => {

            }}
          >
            {dom}
          </a>
        );
      },
      fixed: 'left'
    },
    {
      title: '菜单链接',
      dataIndex: 'menuString',
    },
    {
      title: '类型',
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
      title: '描述',
      dataIndex: 'menuDesc',
      hideInForm: true,
    },
    {
      title: '创建日期',
      dataIndex: 'menuDesc',
      hideInForm: true,
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
  ];

  return (
    <PageContainer>
      <ProTable<API.SysMenu, API.PageParams>
        headerTitle='菜单列表'
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
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建菜单
          </Button>,
        ]}
        request={getMenus}
        columns={columns}
        defaultExpandAllRows={true}
      />
      <ModalForm
        title='新建角色'
        width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RoleItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label={'角色名称'}
          rules={[
            {
              required: true,
              message: '角色名称',
            },
          ]}
          name="roleName"
        />
        <ProFormText
          label={'角色编码'}
          rules={[
            {
              required: true,
              message: '角色编码',
            },
          ]}
          name="roleCode"
        />
        <ProFormTextArea label={'角色描述'} name="roleDesc"/>
        <ProFormSelect
          name="enabled"
          label="角色状态"
          options={[
            {label: '正常', value: '0'},
            {label: '禁用', value: '1'},
          ]}
          rules={[{required: true, message: ''}]}
        />
      </ModalForm>
      <ModalForm
        onFinish={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        visible={updateModalVisible}
      >
        <ProFormText
          label={'角色名称'}
          rules={[
            {
              required: true,
              message: '角色名称',
            },
          ]}
          name="roleName"
        />
        <ProFormText
          label={'角色编码'}
          rules={[
            {
              required: true,
              message: '角色编码',
            },
          ]}
          name="roleCode"
        />
        <ProFormTextArea label={'角色描述'} name="roleDesc"/>
        <ProFormSelect
          name="enabled"
          label="角色状态"
          options={[
            {label: '正常', value: '0'},
            {label: '禁用', value: '1'},
          ]}
          rules={[{required: true, message: ''}]}
        />
      </ModalForm>


    </PageContainer>
  );
};

export default TableList;
