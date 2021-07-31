// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import {handler} from "@/services/ant-design-pro/common";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 获取规则列表 GET /api/rule */
export async function getRoles(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const paramsx = {}
  Object.keys(params).forEach(key => {
    paramsx[`params[${key}]`] = params[key]
  })

  return request<API.RoleItemList>('/v2/sysrole/query.do', {
    method: 'POST',
    params: {
      page: params.current,
      rows: params.pageSize,
      ...paramsx,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRole(params?: API.RoleItem, options?: { [key: string]: any }) {
  return request<API.Response>('/v2/sysrole/edit.do', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: params,
    ...(options || {}),
  }).then((response: API.Response) => {
    return handler<API.SysMenu[]>(response)
  });
}

/** 新建规则 POST /api/rule */
export async function addRole(params?: API.RoleItem, options?: { [key: string]: any }) {
  return request<API.Response>('/v2/sysrole/add.do', {
    method: 'POST',
    data: params,
    ...(options || {}),
  }).then((response: API.Response) => {
    return handler<API.SysMenu[]>(response)
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRole(params?: API.RoleItem, options?: { [key: string]: any }) {
  return request<API.Response>('/v2/sysrole/delete.do', {
    method: 'POST',
    params: {
      'ids': params?.id
    },
    requestType: "form",
    ...(options || {}),
  }).then((response: API.Response) => {
    return handler<API.SysMenu[]>(response)
  });
}

export async function getRoleById(id: string, options?: { [key: string]: any }) {
  return request<API.RoleItem>('/v2/sysrole/add.do', {
    method: 'GET',
    ...(options || {}),
  });
}
