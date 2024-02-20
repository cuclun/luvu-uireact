import 'app/static/styles/about-us.css';

const Content = () => {
  return (
    <div className="content">
      <div className="main about-us pt-16">
        <h1>Giới thiệu</h1>
        <h1 className="about-us__header text-center">Welcome to Luvu</h1>
        <p className="about-us__sub-header text-center">
          "Luvu puts its heart and soul into every product, giving people minimalism from the smallest things."
        </p>
        <hr />
        <p>
          &emsp;&emsp;Chắc hẳn chúng ta đều đã và đang gặp phải những rắc rối nhỏ nhặt trong cuộc sống hàng ngày từ việc túi áo quần bị quá
          tải bởi nhiều vật dụng cho tới việc chìa khóa, tai nghe, điện thoại bị thất lạc trong chính chiếc balo, túi xách mà chúng ta bỏ
          vào một cách lộn xộn. Nhưng rồi chúng ta dần cho đó là thói quen và sống chung với những vấn đề "nhỏ nhặt" này...
        </p>
        <p>
          &emsp;&emsp;Với thông điệp "More than Simplicity", Luvu dành trọn tâm huyết để làm ra các sản phẩm của mình. Không chỉ là sự
          đơn giản ở thiết kế bên ngoài giúp cho người dùng đỡ mất thời gian suy nghĩ đến việc lựa chọn quần áo phù hợp, mà thiết kế bên
          trong của mỗi sản phẩm đều được chăm chút, tinh gọn nhằm tạo ra sự tiện lợi và ngăn nắp cho người sử dụng.{' '}
        </p>
        <p>&emsp;&emsp;Hãy trải nghiệm và cảm nhận sự thay đổi của bản thân bạn cùng với Luvu nhé!</p>
        <div className="img">
          <img src="https://images.pexels.com/photos/4132651/pexels-photo-4132651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <hr />
        <h2 className="text-center">Have a good day! </h2>
      </div>
    </div>
  );
};

export { Content };
