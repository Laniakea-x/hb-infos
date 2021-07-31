import {request} from "@@/plugin-request/request";
import {handler} from "@/services/ant-design-pro/common";

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
