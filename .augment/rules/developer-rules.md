---
type: 'always_apply'
---

# JavaScript/TypeScript

- Luôn sử dụng TypeScript thay vì JavaScript khi có thể
- Sử dụng arrow functions thay vì function declarations
- Ưu tiên sử dụng const và let, tránh var
- Sử dụng async/await thay vì .then() cho promises
- Luôn định nghĩa types cho tham số hàm và giá trị trả về
- Giải thích chi tiết logic của mã TypeScript phức tạp

#Python

- Sử dụng cú pháp và tính năng của Python 3.9 trở lên
- Tuân thủ hướng dẫn phong cách PEP 8
- Sử dụng type hints cho tất cả các hàm
- Ưu tiên list comprehensions khi phù hợp
- Sử dụng f-strings để định dạng chuỗi
- Luôn bao gồm docstrings cho các hàm và lớp

# React/Next.js

- Sử dụng functional components với hooks
- Ưu tiên Next.js App Router thay vì Pages Router
- Sử dụng server components khi có thể
- Triển khai error boundaries đúng cách
- Sử dụng TypeScript cho tất cả các React components
- Luôn memoize các tính toán nặng với useMemo

# Test Strategy

- Luôn đề xuất viết unit tests cho mã mới
- Sử dụng Jest cho kiểm thử JavaScript/TypeScript
- Sử dụng pytest cho kiểm thử Python
- Viết integration tests cho các API endpoint
- Bao gồm các test case cho trường hợp biên và kịch bản lỗi
- Đề xuất độ phủ kiểm thử tối thiểu 80%

# Test Structure

- Sử dụng mô hình AAA (Arrange, Act, Assert)
- Đặt tên test case mô tả rõ hành vi được kiểm thử
- Mock các phụ thuộc bên ngoài trong unit tests
- Sử dụng factory patterns cho dữ liệu kiểm thử
- Nhóm các test liên quan trong các describe blocks

#Code Style

- Sử dụng tên biến và hàm có ý nghĩa
- Giữ các hàm ngắn gọn (< 20 dòng khi có thể)
- Tránh lồng ghép sâu (> 3 cấp độ)
- Luôn xử lý lỗi một cách tinh tế
- Ghi chú cho mã phức tạp có logic nghiệp vụ
- Sử dụng quy tắc đặt tên nhất quán

# Performance

- Đề xuất tối ưu hóa cho mã quan trọng về hiệu năng
- Sử dụng lazy loading khi phù hợp
- Triển khai các chiến lược caching hợp lý
- Tránh re-render không cần thiết trong React
- Tối ưu hóa các truy vấn cơ sở dữ liệu
- Đề xuất các công cụ profiling khi cần

# Code Documentation

- Viết README.md chi tiết cho mỗi dự án
- Bao gồm hướng dẫn cài đặt và các phụ thuộc
- Tài liệu hóa các API endpoint với ví dụ
- Thêm ghi chú inline cho các thuật toán phức tạp
- Duy trì changelog cho các cập nhật lớn
- Bao gồm phần xử lý sự cố

# API Documentation

- Sử dụng OpenAPI/Swagger cho các REST API
- Bao gồm ví dụ về request/response
- Tài liệu hóa các mã lỗi và thông điệp
- Chỉ định yêu cầu xác thực
- Bao gồm thông tin về giới hạn tỷ lệ
- Cung cấp ví dụ SDK khi có

# Security Best Practices

- Luôn xác thực và làm sạch dữ liệu đầu vào của người dùng
- Sử dụng parameterized queries để tránh SQL injection
- Triển khai xác thực và phân quyền đúng cách
- Không hardcode các thông tin bí mật trong mã
- Sử dụng HTTPS cho tất cả các giao tiếp
- Triển khai quản lý phiên đúng cách

# Data Protection

- Mã hóa dữ liệu nhạy cảm khi lưu trữ và truyền tải
- Triển khai các kiểm soát truy cập phù hợp
- Ghi log các sự kiện bảo mật để giám sát
- Thực hiện kiểm tra bảo mật định kỳ và cập nhật
- Tuân thủ các quy định GDPR/bảo mật
- Triển khai chính sách lưu giữ dữ liệu

# Commit Messages

- Sử dụng định dạng conventional commit
- Viết thông điệp commit bằng tiếng Anh
- Bao gồm số ticket/issue trong các commit
- Squash các commit trước khi merge
- Viết thông điệp commit mô tả rõ ràng
- Tránh các commit quá lớn

# Branch Strategy

- Sử dụng feature branches cho các tính năng mới
- Đặt tên branch mô tả rõ ràng (feature/user-auth)
- Rebase các feature branches trước khi merge
- Xóa các branch đã được merge
- Bảo vệ nhánh main/master
- Yêu cầu review PR trước khi merge

# Error Management

- Luôn xử lý ngoại lệ một cách tinh tế
- Cung cấp thông điệp lỗi có ý nghĩa
- Ghi log lỗi với mức độ phù hợp
- Triển khai cơ chế thử lại cho các lỗi tạm thời
- Sử dụng các loại lỗi tùy chỉnh khi phù hợp
- Bao gồm ngữ cảnh lỗi trong log

# User Experience

- Hiển thị thông điệp lỗi thân thiện với người dùng
- Triển khai trạng thái đang tải
- Cung cấp giao diện dự phòng cho lỗi
- Bao gồm gợi ý khắc phục
- Tránh hiển thị chi tiết kỹ thuật cho người dùng
- Triển khai xác thực biểu mẫu đúng cách

# Database Design

- Sử dụng chiến lược indexing hợp lý
- Chuẩn hóa cấu trúc dữ liệu phù hợp
- Triển khai các ràng buộc khóa ngoại
- Sử dụng migrations cho thay đổi schema
- Chiến lược sao lưu và phục hồi thảm họa
- Giám sát hiệu năng truy vấn

# ORM Usage

- Sử dụng Prisma cho các dự án TypeScript
- Sử dụng SQLAlchemy cho các dự án Python
- Tránh vấn đề N+1 query
- Sử dụng connection pooling
- Triển khai xử lý giao dịch đúng cách
- Cache dữ liệu truy cập thường xuyên

# CI/CD

- Triển khai kiểm thử tự động trong CI pipeline
- Sử dụng cấu hình riêng cho từng môi trường
- Triển khai blue-green deployments
- Giám sát sức khỏe triển khai
- Chiến lược rollback cho các triển khai thất bại
- Tự động hóa quét bảo mật

# Environment Management

- Tách biệt môi trường phát triển, staging và production
- Sử dụng biến môi trường cho cấu hình
- Triển khai quản lý bí mật phù hợp
- Giám sát hiệu năng ứng dụng
- Thiết lập cảnh báo cho các vấn đề nghiêm trọng
- Kiểm tra sao lưu và phục hồi định kỳ

# Response Style

- Trả lời bằng tiếng Việt khi được yêu cầu
- Giải thích logic mã một cách chi tiết
- Cung cấp ví dụ cụ thể
- Đề xuất các thực tiễn tốt nhất
- Bao gồm liên kết đến tài liệu liên quan
- Đặt câu hỏi làm rõ khi cần

# Code Explanation

- Giải thích tại sao, không chỉ là cái gì
- Bao gồm tác động đến hiệu năng
- Đề cập đến các cạm bẫy tiềm ẩn
- Đề xuất các cách tiếp cận thay thế
- Cung cấp ngữ cảnh về logic nghiệp vụ
- Bao gồm khuyến nghị kiểm thử
