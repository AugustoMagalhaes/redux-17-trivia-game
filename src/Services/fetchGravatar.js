const fetchGravatar = async (hash) => {
  const url = `https://en.gravatar.com/${hash}.json`;
  const response = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log('Error: ', error.message));
    // .catch((err) =>  if(e instanceof TypeError) {console.error(err);} );
  return response;
};

export default fetchGravatar;
