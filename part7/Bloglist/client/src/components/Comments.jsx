import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../reducers/blogsReducer";
import { Form, Button } from "react-bootstrap";

const Comments = ({user,comments}) => {
  const [comment, setComment] = useState("")
  const id = useParams().id
  const dispatch = useDispatch();

  const handleCreateComment = (event) => {
    event.preventDefault();
    const newComment = {
      text: comment
    }
    dispatch(createComment(id, newComment))
    setComment("")
  }
  return (
    <div>
      <h3>comments</h3>
      <Form className="row g-2" onSubmit={handleCreateComment} style={{display : user ? "" : "none"}} >
        <Form.Group className="col-auto">
          <Form.Control 
          type="text" 
          id="comment"
          name="comment"  
          value={comment} 
          onChange={({target}) => setComment(target.value)}
          />
        </Form.Group>
        <Button className="col-auto" type="submit">add comment</Button>
      </Form>
      <ul>
        {comments.map((comment) => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  )
}

export default Comments;
