// NOTE função responsável por pegar as informações do token
export const fetchPlayAPI = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error.message));
  return result;
};

// NOTE função responsável por resgatar as perguntas
export const fetchQuestionAPI = async (token) => {
  const numberOfQuestions = 5;
  const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  const result = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error.message));
  console.log(result);
  return result;
};
