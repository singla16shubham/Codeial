{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url: '/comment/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                    console.log(data);

                   

                    new Noty({
                        theme: 'relax',
                        text: "Comment published",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    // Method to return a comment to be added in the dom
    let newCommentDom = function(comment){
        // console.log(comment);
       return $(`<li id="comment-${ comment._id }">
       <p>
           ${comment.content}
             
                   <small>
                       <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                   </small>
           
                
           <br>
           <small>
               ${comment.user.name}
           </small>
       </p>
       
   </li>`)
    };

    // method to delete a comment from the dom
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    };

    // Assign action to delete buttons of all comments to delete using ajax
    for(i of $(' .delete-comment-button')){
        deleteComment(i);
    }

    createComment();
}