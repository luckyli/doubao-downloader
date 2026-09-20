# 面板媒体筛选设计

## 目标

在主面板中增加图片/视频筛选，让用户可以快速查看并下载当前范围内的指定媒体类型，同时保持列表和分页统计一致。

## 设计

- `ConvFilter` 新增 `mediaType: "all" | "image" | "video"`，默认值为 `"all"`。
- 在现有 `ActionCard` 操作区增加“全部 / 图片 / 视频”分段切换，切换时将页码重置为 1。
- 分段选项显示当前会话与日期范围内的媒体数量；数量不受当前媒体筛选项影响。
- `useConvs` 和 `useCreationPagination` 使用相同的媒体筛选逻辑，保证列表内容、总数和页码一致。
- “全部下载”使用当前会话、日期范围和媒体筛选条件；“下载选中”保持选中项语义不变。
- 没有匹配项时继续使用现有“暂无数据”空状态。
- 移动端操作区允许换行，筛选控件保持足够的点击区域。

## 数据流

`App` 持有 `ConvFilter`，通过 `ConvFilterContext` 提供给面板。`MainPanel` 将筛选变更回调传给 `ActionCard`，列表和分页钩子从上下文读取 `mediaType`。筛选变更统一由 `MainPanel` 重置 `currentPage`。

## 验证

- 单元测试覆盖全部、图片、视频三种筛选结果。
- 分页测试覆盖媒体筛选后的总数与页数。
- 组件测试覆盖切换媒体类型时页码重置。
- 运行完整 `pnpm test` 和 `pnpm build`。

## 仓库规则

`.gitignore` 忽略任意层级名为 `superpowers` 或 `.superpowers` 的目录，避免视觉 companion 和相关工作目录进入仓库。
