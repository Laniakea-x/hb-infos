import type {FC} from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {TreeSelect} from "antd";
import {fetchMenuData} from "@/services/ant-design-pro/menu";
import {useEffect, useState} from "react";
import {DataNode} from "rc-tree-select/lib/interface";

type OperationModalProps = {
  visible: boolean;
  current: Partial<API.RoleItem> | undefined;
  onDone: () => void;
  onSubmit: (values: API.RoleItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const {visible, current, onDone, onSubmit, children} = props;

  const [treeData, setTreeData] = useState<DataNode[]>([
    {id: 1, pId: 0, value: '1', title: 'Expand to load'},
    {id: 2, pId: 0, value: '2', title: 'Expand to load'},
    {id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true},
  ])

  useEffect(() => {
    fetchMenuData().then(r => {
      setTreeData(r.map(data => {
        return {
          value: data.menuName,
          title: data.menuName,
          children: data.children?.map(data2 => {
            return {
              value: data2.menuName,
              title: data2.menuName,
            }
          })
        }
      }))
    })
  }, [])

  if (!visible) {
    return null;
  }
  return (
    <ModalForm<API.RoleItem>
      visible={visible}
      title={`角色${current ? '编辑' : '添加'}`}
      width={640}
      onFinish={async (values) => {
        return onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    >
      <ProFormText hidden={true} name="id"/>
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
      <ProFormSelect
        name="enabled"
        label="角色状态"
        options={[
          {label: '正常', value: '0'},
          {label: '禁用', value: '1'},
        ]}
        rules={[{required: true, message: ''}]}
      />

      <TreeSelect
        showSearch
        style={{width: '100%'}}
        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        treeData={
          treeData
        }
      >
      </TreeSelect>

      <ProFormTextArea label={'角色描述'} name="roleDesc"/>
    </ModalForm>
  );
};

export default OperationModal;
