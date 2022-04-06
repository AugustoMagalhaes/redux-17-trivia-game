const fetchPlayAPI = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error.message));
  return result;
};

export default fetchPlayAPI;
