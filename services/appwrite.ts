//track the searches made by users
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const databases = new Databases(client);


export const updateSearchCount = async (query: string, movie:Movie) => {
    
    try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ]);
    
    if (result.documents.length > 0) {
        const existingMovie = result.documents[0];
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
            count: existingMovie.count + 1,

        });
    } else {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });
    }  

} catch (error) {
    console.log(error);
    throw error;
}
    //check if a record of that search has already been stored
     //if a document is found, search count is incremented by 1
        //if no document is found, create a new document with search count set to 1
    
}