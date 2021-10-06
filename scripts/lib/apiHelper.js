const blogApiHost = 'http://192.168.1.106:8088/blogapi';

// BlogAPI接口
const getArticleBasicListUrl = `${blogApiHost}/article/list`;

/**
 * 调用接口公共函数
 * @param path api文件中的接口调用地址
 * @param optionsParam 详细参数（JSON格式）
 * @param method GET or POST
 * @param csrfToken SpringBoot服务器的csrf_token
 */
async function axiosAPI(path, optionsParam, method = 'GET', csrfToken = '') {
  const timestamp = Date.now();
  method = method && method.toUpperCase() || null;

  const methods = ['GET', 'POST'];
  if (!methods.includes(method)) {
    throw new Error('调用接口传入的方法有误，请检查后再尝试!!!');
  }

  let url = `${path}?time_stamp=${timestamp}`;
  if (method === 'GET') {
    const query = optionsParamToString(optionsParam);
    if (query) url += `&${query}`;
  } else if (method === 'POST' && optionsParam) {
    optionsParam = JSON.stringify(optionsParam) || null;
  }

  let response;
  try {
    response = await $.getJSON(url, optionsParam);
  } catch (error) {
    alert(`调用接口失败: ${error.message}`);
  }

  const code = response && Number(response.code);
  if (code !== 0) {
    // 后台返回的错误直接抛给用户
    if (response && response.msg) {
      alert(response.msg);
    }
    alert(`调用接口失败，接口抛错: ${code}`);
  }

  return response && response.data || null;
}

/**
 * 将请求参数由JSON对象转为字符串拼接
 * @param optionsParam 请求参数对象
 */
function optionsParamToString(optionsParam) {
  if (!optionsParam) return '';

  let str = '';
  for (const key in optionsParam) {
    if (optionsParam && optionsParam[key]) {
      str += `&${key}=${optionsParam[key]}`;
    }
  }

  return str;
}

/**
 * 获取文章列表
 */
async function getArticleBasicList() {
  return axiosAPI(getArticleBasicListUrl, '', 'GET');
}

/**
 * 预留一个获取某个Cookie中的值方法，方便日后手动获取cookie的某个值
 */
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // 需要确定cookie字符串开始的值是否是我们想要的?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export {
  getArticleBasicList,
  getCookie,
};
