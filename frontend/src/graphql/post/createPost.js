import { gql, useMutation } from '@apollo/client'

const CREATE_POST = gql`
  mutation CreatePost($data: CreatePostInput!){
    createPost (data: $data)
    {
      title
      contentFull
    }
  }
`;

export function CreatePost() {
  let input;
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createPost({ variables: { data: {
              title: input.value,
              contentPreview: "Placeholder Content Preview",
              contentFull: "Placeholder Content Full",
              published: true,
              postType: "123",
              postTopic: "345",
              postTags: ["456", "567"]
          } } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}