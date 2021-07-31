import type {FC} from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

type OperationModalProps = {
  visible: boolean;
  current: Partial<API.RoleItem> | undefined;
  onDone: () => void;
  onSubmit: (values: API.RoleItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const {visible, current, onDone, onSubmit, children} = props;
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
      <ProFormTextArea label={'角色描述'} name="roleDesc"/>
    </ModalForm>
  );
};

export default OperationModal;
