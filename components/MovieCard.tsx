import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const MovieCard = ({id,title,poster_path,vote_average,release_date}:Movie) => {
    console.log(poster_path);
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-[30%]">
            <Image
                source = {{uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`:`https://placeholder.co/600x450/1a1a1a/ffffff.png`}}

                className="w-full h-52 rounded-lg"
                resizeMode='cover'
            />
            <Text className="text-sm font-bold text-white mt-2">{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
