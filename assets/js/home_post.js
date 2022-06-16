// Method to submit the form data for new post using ajax

{ 
    // console.log("hello");

    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data)
                {
                    let newPost=newPostDom(data.data.post);
                    // console.log(newPost)
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // console.log(data);
                    new Noty({
                        theme: 'relax',
                        text: "Post published",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    // method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">

        <p>
        
        ${ post.content}
              
               
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                    </small>
                    
                        <br>
    
                        <small>
                        ${ post.user.name}
                        </small>
        </p>
    
        <div class="post-comments">
           
    
                <form action="/comment/create" id="new-comment-form" method="POST">
                    <input type="text" name="content" placeholder="type here to add comment" required>
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add comment">
    
                </form>
              
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id }">
                           
                        </ul>
    
                    </div>
    
        </div>
    
    </li>`)
    }


    // Method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
                console.log(deleteLink);
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
               
                success: function(data){
                   
                    // console.log("Heya");
                    // console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    for(i of $(' .delete-post-button')){
        deletePost(i);
    }
    createPost();
}