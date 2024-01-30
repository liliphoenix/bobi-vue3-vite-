/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399

import { Component } from 'vue'

//  给vite添加一些客户端环境所用的类型
/// <reference types="vite/client" />
export {}

declare module 'vue' {
  export interface GlobalComponents {
    ALayout: (typeof import('ant-design-vue/es'))['Layout']
    ALayoutContent: (typeof import('ant-design-vue/es'))['LayoutContent']
    ALayoutFooter: (typeof import('ant-design-vue/es'))['LayoutFooter']
    ALayoutHeader: (typeof import('ant-design-vue/es'))['LayoutHeader']
    ALayoutSider: (typeof import('ant-design-vue/es'))['LayoutSider']
  }
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
