import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');
  console.log(currentUser);

  return currentUser ? <h1>You're signed in</h1> : <h1>You're not signed In</h1>;
};

LandingPage.getInitialProps = async context => {
    console.log("Landing===")
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;