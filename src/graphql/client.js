import { ApolloClient, InMemoryCache } from "@apollo/client"
import { sensitiveData } from "../sensitiveData"

const client = new ApolloClient({
    uri: sensitiveData.hasuraUrl,
    cache: new InMemoryCache(),
    connectToDevTools: true, //To enable the devtools in your app in production
})

export default client