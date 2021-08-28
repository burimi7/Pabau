import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Grap from './grap';


const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});


function App() {

  return (
    <div>


        <ApolloProvider client={client}>
          
        <Grap />
        
        </ApolloProvider>

      
      

    </div>
  );
}

export default App;
