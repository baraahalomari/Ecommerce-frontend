import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import decode from 'jwt-decode';
import './style.css';
import { getComments, postComment } from '../../action/comments';
const Comments = ({ currentPrudoct }) => {
  const dispatch = useDispatch();
  const [value1, setValue1] = useState('');
  const { comments } = useSelector((state) => state.comments);
  const token = JSON.parse(localStorage.getItem('profile'));
  if (token) {
    var decodedToken = decode(token.token);
  }
  console.log(comments)
  useEffect(() => {
    dispatch(getComments(currentPrudoct.id));
  }, [])

  const handleAddComment = () => {

    dispatch(postComment(currentPrudoct.id, decodedToken.name, value1))
    setValue1('');
  }

  return (
    <div className="comment-container">
      <h3>Comments</h3>

      <InputText value={value1} onChange={(e) => setValue1(e.target.value)} />
      {value1 ? <Button icon="pi pi-check" className="p-button-rounded" aria-label="Filter" id="btn-comment" onClick={handleAddComment} />
        : <Button icon="pi pi-check" className="p-button-rounded" aria-label="Filter" id="btn-comment" disabled={true} />}
      {comments?.map((comment) => (
        <div key={comment.id} className="comentdiv">
          <div className="name">Name : {comment.user_name}</div>
          <p>{comment.comment}</p>
          
        </div>
      ))}
    </div>
  )
}

export default Comments