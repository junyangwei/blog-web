import { getArticleBasicList } from './lib/apiHelper.js';

// 加载文章列表
setArticleList();

async function setArticleList() {
  // 获取文章列表
  const articleList = await getArticleBasicList();

  let content = '';

  // 当没有任何信息时，展示空提示
  if (!(articleList && articleList.length)) {
    content += `<p>没有任何文章<p>`;

    document.getElementById("articles").innerHTML = content;
    return;
  }

  // 将笔记信息添加到无序列表中
  for (const item of articleList) {
    // content += `<a href="article.html?article_id=${item.id}">
    content += `
<div class="col-6">
<div class="p-3 border">
<h4>${item.title}</h1>
<p>${item.content}</p>
</div>
</div>`
// </a>`
  }

  document.getElementById("articles").innerHTML = content;
}