## 伪类、伪元素
  - 如果只需要兼容webkit、firefox、opera等浏览器，建议对于伪元素采用**双冒号**的写法，如果不得不兼容IE浏览器，还是CSS2的**单冒号**写法比较安全。

  - CSS3为了更好区分伪类、伪元素，就规定伪元素采用**双冒号**书写规范，但是在实际开发过程中，为了考虑兼容性，通常会选择采用**单冒号**书写规范

### W3C定义
  - css伪类用于向某些选择器添加特殊效果

  - css伪元素用于将特殊的效果添加到某些选择器

### 伪类
  - **:active**: 将样式添加到被激活的元素

  - **:fous**: 将样式添加到被选中的元素

  - **:hover**: 当鼠标悬浮在元素上方时，向元素添加样式

  - **:link**: 将特殊的样式添加到被未被访问过的链接

  - **:visited**: 将特殊的样式添加到被访问过的链接

  - **:first-child**: 将特殊的样式添加到元素的第一个元素

  - **:lange**: 允许创作者来定义指定的元素中使用的语言

### 伪元素
  - **:first-letter**: 将特殊样式添加到文本的首字母

  - **first:line**: 将特殊样式添加到文本的首行

  - **:before**: 在某元素之前插入某些内容

  - **:after**: 在某元素之后追加某些内容