import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ButtonFilled, ButtonMinimal, globalCSS, Heading, Provider, View } from '@go1d/go1d';
import IconGo1Logo from '@go1d/go1d/build/components/Icons/Go1Logo';
import IconLogout from '@go1d/go1d/build/components/Icons/Logout';
import { useState } from 'react';
import { useEffect } from 'react';
import Discover from './components/Discover';

globalCSS();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const params = new URLSearchParams(window.location.hash.substr(1));

  useEffect(() => {
    const token = params.get('access_token') as string;
    if (token) {
      window.localStorage.setItem('token', token);
      setToken(token);
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }, [params]);

  const handleOnLogout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
  };

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL + '/graphql/query',
  });

  const authLink = setContext((_, { headers }) => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const token = params.get('access_token') || localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Provider mode="dark">
        <View height="100vh" paddingTop={8}>
          { token ? (
            <>
              <View
                position="fixed"
                flexDirection="row"
                justifyContent="space-between"
                paddingX={5}
                paddingY={4}
                zIndex={100}
                css={{
                  backgroundColor: '#192223', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                }}
              >
                <View flexDirection="row">
                  <IconGo1Logo size={6} color="contrast" />
                  <Heading visualHeadingLevel="Heading 5" semanticElement="h5" marginLeft={3} color="contrast" marginTop={3}>FLIX</Heading>
                </View>
                <ButtonMinimal icon={IconLogout} onClick={handleOnLogout}>Logout</ButtonMinimal>
              </View>
              <Discover />
            </>
          ) : (
            <View alignItems="center" justifyContent="center" height="100%">
              <ButtonFilled
                size="lg" 
                color="complementary" 
                href={`https://auth.go1.com/oauth/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=user.read account.read lo.read enrollment.read enrollment.write user.write`}
              >
                Login
              </ButtonFilled>
            </View>
          )}
        </View>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
