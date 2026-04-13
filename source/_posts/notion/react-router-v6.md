---
title: react router v6
date: 2021-11-23 16:05
description: route v6 的事项和配置
tags:
  - react
categories:
  - [react]
notion_id: 5ccb5290-71ff-47cb-8399-0cae4f6cb859
---

- Swithch替换为Routes

- 路由可以嵌套

- 不能再使用正则匹配去匹配地址

- 去除withRouter高阶函数，增加`useLocation`,`useHistory`等hook函数。

## 使用配置

### 示例

```javascript
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import your route components too

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```
