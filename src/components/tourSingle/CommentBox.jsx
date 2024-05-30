import React from "react";

export default function CommentBox() {
  return (
    <>
      <h2 className="text-30 pt-60">Leave a Reply</h2>


      <div className="contactForm y-gap-30 pt-30">
       
      

        <div className="row">
          <div className="col-12">
            <div className="form-input ">
              <textarea placeholder="Leave your comment here" required rows="5"></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button className="button -md -dark-1 bg-accent-1 text-white">
              Post Comment
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
