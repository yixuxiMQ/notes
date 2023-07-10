# 基于nx搭建monorepo项目

---

## 一、安装

```sh
npm i g nx@latest
```

## 二、搭建项目

```shell
// 创建项目
npx create-nx-workspace@latest

✔ Choose what to create                 · integrated
✔ What to create in the new workspace   · react-monorepo
✔ Repository name                       · todoApp
✔ Application name                      · todoApp
✔ Bundler to be used to build the application · vite
✔ Default stylesheet format             · less
✔ Enable distributed caching to make your CI faster · No

// 添加项目 nx@15版本或者更低版本使用 @nrwl/ 代替
npx nx g @nx/react:app packagename

// 添加 libs 库
npx nx g @nx/react:lib libname
npx nx g @nx/js:lib libname

// 在libs库中的公共组件项目库新增组件并且更新导出
npx nx g @nx/react:component --project=libname --export

```

## 三、参考链接

[点击查看](https://nx.dev/react-tutorial/1-code-generation)



