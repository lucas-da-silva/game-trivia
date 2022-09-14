const getUrl = (category, difficult, type, token) => {
  if (category && difficult && type) {
    return `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficult}&type=${type}&token=${token}`;
  }
  if (category && difficult) {
    return `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficult}&token=${token}`;
  }
  if (category && type) {
    return `https://opentdb.com/api.php?amount=5&category=${category}&type=${type}&token=${token}`;
  }
  if (difficult && type) {
    return `https://opentdb.com/api.php.php?amount=5&difficulty=${difficult}&type=${type}&token=${token}`;
  }
  if (category) {
    return `https://opentdb.com/api.php?amount=5&category=${category}&token=${token}`;
  }
  if (difficult) {
    return `https://opentdb.com/api.php?amount=5&difficulty=${difficult}&token=${token}`;
  }
  if (type) {
    return `https://opentdb.com/api.php?amount=5&type=${type}&token=${token}`;
  }
  return `https://opentdb.com/api.php?amount=5&token=${token}`;
};

const apiQuestions = async (category, difficult, type) => {
  const url = getUrl(category, difficult, type, localStorage.getItem('token'));
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export default apiQuestions;
