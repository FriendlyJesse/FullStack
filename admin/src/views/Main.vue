<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="defaultOpeneds" unique-opened :default-active="$route.path">
        <el-submenu v-for="item in menu" :key="item.index" :index="item.index">
          <template slot="title">
            <i class="el-icon-message"></i>{{item.title}}
          </template>
          <el-menu-item-group v-for="childItem in item.children" :key="childItem.title">
            <template slot="title">{{childItem.title}}</template>
            <el-menu-item v-for="childByChildItem in childItem.children" :key="childByChildItem.name" :index="childByChildItem.path">{{childByChildItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="dropdown">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{admin.username}}</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data () {
    return {
      defaultOpeneds: ['1'],
      menu: [
        {
          title: '内容管理',
          index: '1',
          children: [
            {
              title: '物品',
              children: [
                {
                  path: '/items/create',
                  name: '新建物品'
                },
                {
                  path: '/items/list',
                  name: '物品列表'
                }
              ]
            },
            {
              title: '英雄',
              children: [
                {
                  path: '/heroes/create',
                  name: '新建英雄'
                },
                {
                  path: '/heroes/list',
                  name: '英雄列表'
                }
              ]
            },
            {
              title: '文章',
              children: [
                {
                  path: '/articles/create',
                  name: '新建文章'
                },
                {
                  path: '/articles/list',
                  name: '文章列表'
                }
              ]
            }
          ]
        },
        {
          title: '运营管理',
          index: '2',
          children: [
            {
              title: '广告位',
              children: [
                {
                  path: '/ads/create',
                  name: '新建广告位'
                },
                {
                  path: '/ads/list',
                  name: '广告位列表'
                }
              ]
            }
          ]
        },
        {
          title: '系统管理',
          index: '3',
          children: [
            {
              title: '分类',
              children: [
                {
                  path: '/categories/create',
                  name: '新建分类'
                },
                {
                  path: '/categories/list',
                  name: '分类列表'
                }
              ]
            },
            {
              title: '管理员',
              children: [
                {
                  path: '/admins/create',
                  name: '新建管理员'
                },
                {
                  path: '/admins/list',
                  name: '管理员列表'
                }
              ]
            }
          ]
        }
      ],
      admin: {}
    }
  },
  created () {
    let admin = localStorage.getItem('admin')
    if (admin) this.admin = JSON.parse(admin)
  },
  methods: {
    dropdown (command) {
      switch (command) {
        case 'logut':
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          this.$router.push('/')
        break
      }
    }
  }
}
</script>