let BASE_URL = ''
const TIME_OUT = 5000

if (import.meta.env.MODE === 'development') {
  BASE_URL = 'https://dqanony02.ytbig.cn/test';
} else if (import.meta.env.MODE === 'production')  {
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT };
