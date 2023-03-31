Đồ án cuối khóa FrontEnd LIKELION_SHINHAN
Tên: Mai Long Thành
Tên project: trang web quản lý nhân viên
Sơ lược về project:
	. Công nghệ sử dụng:
			+ FrontEnd: ReactJS, AntDesign
			+ BackEnd: MongoDB, NodeJS
	. Các chức năng của trang web:
			+ Đăng nhập và đăng ký
			+ Phân quyền: Admin & User.
			+ Thao tác trên web: List danh sách User theo dạng lưới (phân trang: 100 user thì mỗi 1 trang sẽ chứa từ 5 ~ 10 user)
			+ Admin có thể thực hiện lệnh xoá trực tiếp trên danh sách.
			+ Quyền xoá chỉ có mỗi admin được phép thực thi.
			+ User khi tạo được thêm trực tiếp vào danh sách.
			+ User có thể thực thi lệnh Modify cho chính user đó.
			+ Quyền modify chỉ có mỗi user được phép thực thi.
			+ Chỉ có user được phép xóa chính bản thân mình
			+ Trang usertable: .liệt kê danh sách người dùng hiện có với các thông tin như 
						( tên, email, vai trò, ngày tạo, action: xóa sửa) tùy vào admin hoặc user mà có các function khác nhau
			+ Trang Employee: chỉ có admin được quyền thêm, xóa, sửa.
			+ Trang Department hiển thị employement thuộc phòng ban cụ thể.
