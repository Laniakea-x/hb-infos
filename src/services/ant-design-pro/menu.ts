import { request } from 'umi';
import {handler} from "@/services/ant-design-pro/common";

export async function fetchMenuData(
  params?: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/v2/sysmenu/query.do', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then((response: API.Response) => {
    return handler<API.SysMenu[]>(response)
  });
}

export async function getMenus(
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
  return request<API.SysMenuList>('/v2/sysmenu/query.do', {
    method: 'POST',
    params: {
      page: params.current,
      rows: params.pageSize,
      ...paramsx,
    },
    ...(options || {}),
  });
}
