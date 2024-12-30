import React, { useEffect } from 'react';

const SoftComment = ({ url, width = "100%" }) => {
  useEffect(() => {
    // Kiểm tra nếu SDK đã tải thì khởi tạo lại plugin
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [url]); // Chạy lại nếu URL thay đổi

  return (
    <div className="fb-comments"
         data-href={url}
         data-width={width}
         data-numposts="5"
         data-lazy="true">
    </div>
  );
};

export default SoftComment;
