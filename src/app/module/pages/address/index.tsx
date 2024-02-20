import { Header, Nav, Footer } from 'app/module/layouts/index';

const Address = () => {
    return (
        <>
            <Header />
            <Nav />
            <div className="content">
                <div style={{ fontSize: '1.2rem' }} className="main address pt-16">
                    <h1>CỬA HÀNG</h1>
                    <h4 className="address__sub-header text-center">
                        Hãy ghé thăm cửa hàng của Luvu để xem trực tiếp các sản phẩm nhé!
                    </h4>
                    <hr />
                    <p>
                        &emsp;&emsp;Hệ thống cửa hàng của Luvu:
                    </p>
                    <ul>
                        <li><b>Chi nhánh số 1: 23 Phạm Như Xương, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng</b></li>
                        <li><b>Chi nhánh số 2: 71 Trần Quang Diệu, Phường 14, Quận 3, Hồ Chí Minh</b></li>
                    </ul>
                    <p>&emsp;&emsp;Hãy trải nghiệm và cảm nhận sự thay đổi của bản thân bạn cùng với Luvu nhé!</p>
                    <hr />
                    <p className="text-center">Nếu quý khách có bất kỳ yêu cầu hay thắc mắc nào hoặc không hài lòng về sản phẩm/dịch vụ của Luvu, hãy liên hệ với chúng tôi tại qua số điện thoại <b>0774565149</b></p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export { Address };
