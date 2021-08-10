import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query Posts(
    $query: String
    $author_key: ID
    $post_key: ID
    $count: Int
    $offset: Int
    $orderBy: PostOrderByInput
  ) 
  {
    posts (
      query: $query
      author_key: $author_key
      post_key: $post_key
      count: $count
      offset: $offset
      orderBy: $orderBy
    )
    {
        _key
        title
        contentFull
    }
  }
`;


export function GetPosts({ onPostSelected }) {
    const { loading, error, data } = useQuery(GET_POSTS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <select name="post" onChange={onPostSelected}>
        {data.posts.map(post => (
          <option key={post._key} value={post.title}>
            {post.contentFull}
          </option>
        ))}
      </select>
    );
}

// function DogPhoto({ breed }) {
//     const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//       variables: { breed },
//     });
  
//     if (loading) return null;
//     if (error) return `Error! ${error}`;
  
//     return (
//       <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
//     );
//   }