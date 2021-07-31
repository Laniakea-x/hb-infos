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

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/v2/login/init.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: body,
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
export async function getUsers(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  let paramsx = {}
  for (let paramsKey in params) {
    paramsx["params[" + paramsKey + "]"] = params[paramsKey]
  }
  return request<API.RuleList>('/v2/sysuser/query.do', {
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
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(params?: API.RoleItem, options?: { [key: string]: any }) {
  console.log(params)
  return request<API.Response>('/v2/sysrole/add.do', {
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

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
